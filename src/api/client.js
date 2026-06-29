export const BASE_URL = ''

// Task 6.3: map backend error codes to user-friendly messages
export const ERROR_MESSAGES = {
  GEOMETRY_FAILED: "We couldn't generate that part. Try simplifying your description.",
  UNSUPPORTED_COMPONENT: 'UNSUPPORTED_COMPONENT', // sentinel — caller renders a special UI
  RATE_LIMITED: 'Too many requests. Please wait a moment and try again.',
  UNAUTHORIZED: 'Your session expired. Refresh the page to continue.',
  INSUFFICIENT_CREDITS: 'No export credits remaining. Upgrade to download your file.',
}

function friendlyMessage(body, status) {
  const code = body?.code || body?.errorCode || ''
  if (ERROR_MESSAGES[code]) return { message: ERROR_MESSAGES[code], code }
  if (!navigator.onLine) return { message: 'network_error', code: 'NETWORK_ERROR' }
  const msg = body?.message || body?.error || `Request failed (${status})`
  return { message: msg, code }
}

async function request(path, options = {}) {
  let res
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    })
  } catch {
    const err = new Error('network_error')
    err.code = 'NETWORK_ERROR'
    throw err
  }

  const body = await res.json().catch(() => ({}))

  if (!res.ok) {
    const { message, code } = friendlyMessage(body, res.status)
    const err = new Error(message)
    err.code = code
    err.status = res.status
    throw err
  }

  return body
}

export const client = {
  // Task 5 — required interface
  checkHealth: async () => {
    try {
      const r = await fetch(`${BASE_URL}/api/health`, { credentials: 'include', signal: AbortSignal.timeout(4000) })
      return r.ok
    } catch {
      return false
    }
  },

  generatePart: (prompt, componentType) => request('/api/mark3/generate', {
    method: 'POST',
    body: JSON.stringify({ prompt, ...(componentType ? { componentType } : {}) }),
  }),

  redeemCode: (code) => request('/api/license/redeem', {
    method: 'POST',
    body: JSON.stringify({ code }),
  }),

  // Remaining endpoints used by App.jsx
  getMe: () => request('/api/me'),
  getProjects: () => request('/api/projects'),
  createProject: (name) => request('/api/projects', { method: 'POST', body: JSON.stringify({ name }) }),
  saveProject: (id, data) => request(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  exportAudit: (format) => request('/api/export/audit', {
    method: 'POST',
    body: JSON.stringify({ exportType: format, source: 'react_frontend' }),
  }),
  checkout: (priceId) => request('/api/billing/checkout', {
    method: 'POST',
    body: JSON.stringify({ priceId }),
  }),
  billingPortal: () => request('/api/billing/portal', { method: 'POST' }),

  // Export download URLs (authenticated via session cookie)
  exportStlUrl: () => `${BASE_URL}/api/mark3/export/stl`,
  exportStepUrl: () => `${BASE_URL}/api/mark3/export/step`,
}
