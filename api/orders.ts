import type { VercelRequest, VercelResponse } from '@vercel/node'

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD
const TABLE_NAME = process.env.SUPABASE_ORDERS_TABLE || 'orders'
const STATUS_COLUMN = process.env.SUPABASE_STATUS_COLUMN || 'order_status'
const ALLOWED_STATUSES = ['new', 'in_progress', 'delivered']

type SupabaseResult = {
  code?: string
  message?: string
  [key: string]: unknown
}

type SupabaseOrder = Record<string, unknown> & {
  order_status?: string
  status?: string
}

function json(res: VercelResponse, status: number, payload: unknown) {
  return res.status(status).json(payload)
}

function requiredString(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0
}

function supabaseTableMissing(result: SupabaseResult | null) {
  const message = String(result?.message || '').toLowerCase()
  return result?.code === 'PGRST205' || message.includes('could not find the table') || message.includes('schema cache')
}

function tableSetupError() {
  return `Supabase table "public.${TABLE_NAME}" is not ready yet. Open Supabase → SQL Editor, run the SQL from supabase/orders.sql, then redeploy/retry.`
}

function normalizeOrder(order: SupabaseOrder | null) {
  if (!order || typeof order !== 'object') return order
  return {
    ...order,
    status: order.order_status || order.status || 'new',
    order_status: order.order_status || order.status || 'new',
  }
}

function getAdminPassword(req: VercelRequest) {
  const authHeader = req.headers.authorization || ''
  return authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
}

function isAdminAuthorized(req: VercelRequest) {
  return Boolean(ADMIN_PASSWORD && getAdminPassword(req) === ADMIN_PASSWORD)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return json(res, 500, {
      error:
        'Supabase environment variables are missing. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel Project Settings → Environment Variables.',
    })
  }

  if (req.method === 'POST') {
    const body = req.body || {}
    const requiredFields = ['fullName', 'whatsapp', 'email', 'birthDate', 'birthTime', 'birthPlace', 'gender']
    const missing = requiredFields.filter((field) => !requiredString(body[field]))

    if (missing.length) {
      return json(res, 400, { error: `Missing required fields: ${missing.join(', ')}` })
    }

    const order = {
      full_name: String(body.fullName).trim(),
      whatsapp: String(body.whatsapp).trim(),
      email: String(body.email).trim(),
      birth_date: String(body.birthDate),
      birth_time: String(body.birthTime),
      birth_place: String(body.birthPlace).trim(),
      gender: String(body.gender),
      stripe_session_id: typeof body.stripeSessionId === 'string' ? body.stripeSessionId : '',
      [STATUS_COLUMN]: 'new',
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(order),
    })

    const result = await response.json().catch(() => null)

    if (!response.ok) {
      return json(res, response.status, {
        error: supabaseTableMissing(result) ? tableSetupError() : result?.message || 'Could not save order.',
        details: result,
      })
    }

    return json(res, 200, { success: true, order: normalizeOrder(Array.isArray(result) ? result[0] : result) })
  }

  if (req.method === 'GET') {
    if (!isAdminAuthorized(req)) {
      return json(res, 401, { error: 'Unauthorized admin access.' })
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}?select=*&order=created_at.desc`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    })

    const result = await response.json().catch(() => null)

    if (!response.ok) {
      return json(res, response.status, {
        error: supabaseTableMissing(result) ? tableSetupError() : result?.message || 'Could not load orders.',
        details: result,
      })
    }

    return json(res, 200, { orders: Array.isArray(result) ? result.map(normalizeOrder) : [] })
  }

  if (req.method === 'PATCH') {
    if (!isAdminAuthorized(req)) {
      return json(res, 401, { error: 'Unauthorized admin access.' })
    }

    const body = req.body || {}
    const id = typeof body.id === 'string' ? body.id : ''
    const status = typeof body.status === 'string' ? body.status : ''

    if (!id) {
      return json(res, 400, { error: 'Missing order id.' })
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      return json(res, 400, { error: `Invalid status. Use one of: ${ALLOWED_STATUSES.join(', ')}` })
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}?id=eq.${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({ [STATUS_COLUMN]: status }),
    })

    const result = await response.json().catch(() => null)

    if (!response.ok) {
      return json(res, response.status, {
        error: supabaseTableMissing(result) ? tableSetupError() : result?.message || 'Could not update order status.',
        details: result,
      })
    }

    return json(res, 200, { success: true, order: normalizeOrder(Array.isArray(result) ? result[0] : result) })
  }

  res.setHeader('Allow', 'GET, POST, PATCH')
  return json(res, 405, { error: 'Method not allowed.' })
}
