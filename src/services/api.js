const BASE = 'https://orbitcad.app'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || body.error || `Request failed (${res.status})`)
  }
  return res.json()
}

export const api = {
  getMe: () => request('/api/me'),
  getProjects: () => request('/api/projects'),
  createProject: (name) => request('/api/projects', { method: 'POST', body: JSON.stringify({ name }) }),
  saveProject: (id, data) => request(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  generate: (prompt, projectId) => request('/api/mark3/generate', {
    method: 'POST',
    body: JSON.stringify({ prompt, projectId }),
  }),
  exportAudit: (format) => request('/api/export/audit', {
    method: 'POST',
    body: JSON.stringify({ format }),
  }),
  redeemCode: (code) => request('/api/license/redeem', {
    method: 'POST',
    body: JSON.stringify({ code }),
  }),
  checkout: (priceId) => request('/api/billing/checkout', {
    method: 'POST',
    body: JSON.stringify({ priceId }),
  }),
  billingPortal: () => request('/api/billing/portal', { method: 'POST' }),
}
