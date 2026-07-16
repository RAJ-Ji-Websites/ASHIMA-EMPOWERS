// Self-contained Supabase orders API — no external dependencies needed
// Uses direct fetch() to Supabase REST API

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL

const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD || 'ashima0414'
const TABLE_NAME = process.env.SUPABASE_ORDERS_TABLE || 'ashima_orders'
const STATUS_COLUMN = process.env.SUPABASE_STATUS_COLUMN || 'order_status'
const ALLOWED_STATUSES = ['new', 'in_progress', 'delivered']

function json(res: any, status: number, payload: any) {
  return res.status(status).json(payload)
}

function requiredString(value: any) {
  return typeof value === 'string' && value.trim().length > 0
}

function normalizeOrder(order: any) {
  if (!order || typeof order !== 'object') return order
  return {
    ...order,
    status: order.order_status || order.status || 'new',
    order_status: order.order_status || order.status || 'new',
  }
}

function getAdminPassword(req: any) {
  const authHeader = req.headers.authorization || ''
  return authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
}

function isAdminAuthorized(req: any) {
  const incoming = getAdminPassword(req)
  return Boolean(ADMIN_PASSWORD && incoming === ADMIN_PASSWORD)
}

const supabaseHeaders = (extra: Record<string, string> = {}) => ({
  apikey: SUPABASE_KEY as string,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  ...extra,
})

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(204).end()

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return json(res, 500, {
      error:
        'Supabase environment variables are missing. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.',
    })
  }

  try {
    // ─── POST: Create new order ───
    if (req.method === 'POST') {
      const body = req.body || {}
      const requiredFields = ['fullName', 'whatsapp', 'email', 'birthDate', 'birthTime', 'birthPlace', 'gender']
      const missing = requiredFields.filter((field: string) => !requiredString(body[field]))

      if (missing.length) {
        return json(res, 400, { error: `Missing required fields: ${missing.join(', ')}` })
      }

      const order: Record<string, any> = {
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

      // Add service_type if provided
      if (body.serviceType && typeof body.serviceType === 'string') {
        order.service_type = body.serviceType
      }

      const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}`, {
        method: 'POST',
        headers: supabaseHeaders({ Prefer: 'return=representation' }),
        body: JSON.stringify(order),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        console.error('Insert error:', result)
        return json(res, response.status, {
          error: result?.message || 'Could not save order. Please try again.',
          details: result,
        })
      }

      const inserted = Array.isArray(result) ? result[0] : result
      return json(res, 200, { success: true, order: normalizeOrder(inserted) })
    }

    // ─── GET: Fetch all orders (admin only) ───
    if (req.method === 'GET') {
      if (!isAdminAuthorized(req)) {
        return json(res, 401, { error: 'Unauthorized admin access.' })
      }

      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/${TABLE_NAME}?select=*&order=created_at.desc`,
        { headers: supabaseHeaders() }
      )

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        console.error('Fetch error:', result)
        return json(res, response.status, {
          error: result?.message || 'Could not load orders.',
          details: result,
        })
      }

      return json(res, 200, { orders: Array.isArray(result) ? result.map(normalizeOrder) : [] })
    }

    // ─── PATCH: Update order status (admin only) ───
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

      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/${TABLE_NAME}?id=eq.${encodeURIComponent(id)}`,
        {
          method: 'PATCH',
          headers: supabaseHeaders({ Prefer: 'return=representation' }),
          body: JSON.stringify({ [STATUS_COLUMN]: status }),
        }
      )

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        console.error('Update error:', result)
        return json(res, response.status, {
          error: result?.message || 'Could not update order status.',
          details: result,
        })
      }

      const updated = Array.isArray(result) ? result[0] : result
      return json(res, 200, { success: true, order: normalizeOrder(updated) })
    }

    // ─── DELETE: Delete order (admin only) ───
    if (req.method === 'DELETE') {
      if (!isAdminAuthorized(req)) {
        return json(res, 401, { error: 'Unauthorized admin access.' })
      }

      const body = req.body || {}
      const id = typeof body.id === 'string' ? body.id : ''

      if (!id) {
        return json(res, 400, { error: 'Missing order id.' })
      }

      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/${TABLE_NAME}?id=eq.${encodeURIComponent(id)}`,
        {
          method: 'DELETE',
          headers: supabaseHeaders(),
        }
      )

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        console.error('Delete error:', result)
        return json(res, response.status, {
          error: result?.message || 'Could not delete order.',
          details: result,
        })
      }

      return json(res, 200, { success: true })
    }

    res.setHeader('Allow', 'GET, POST, PATCH, DELETE')
    return json(res, 405, { error: 'Method not allowed.' })
  } catch (err) {
    console.error('API error:', err)
    return json(res, 500, { error: err instanceof Error ? err.message : 'Internal server error' })
  }
}
