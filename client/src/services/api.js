const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = (token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const storedToken = token || localStorage.getItem('hcs_token');
  if (storedToken) {
    headers['Authorization'] = `Bearer ${storedToken}`;
  }
  return headers;
};

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Network request failed');
  }
  return data;
}

export const api = {
  // Catalog
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/products?${query}`);
    return handleResponse(res);
  },

  async getProduct(slugOrId) {
    const res = await fetch(`${API_BASE}/products/${slugOrId}`);
    return handleResponse(res);
  },

  async getCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    return handleResponse(res);
  },

  async getFlavors() {
    const res = await fetch(`${API_BASE}/flavors`);
    return handleResponse(res);
  },

  async getBottles() {
    const res = await fetch(`${API_BASE}/bottles`);
    return handleResponse(res);
  },

  // Campaigns & Promotions (CMS)
  async getCampaigns() {
    const res = await fetch(`${API_BASE}/campaigns`);
    return handleResponse(res);
  },

  async getCampaign(idOrSlug) {
    const res = await fetch(`${API_BASE}/campaigns/${idOrSlug}`);
    return handleResponse(res);
  },

  async createCampaign(data) {
    const res = await fetch(`${API_BASE}/campaigns`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async updateCampaign(id, data) {
    const res = await fetch(`${API_BASE}/campaigns/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async deleteCampaign(id) {
    const res = await fetch(`${API_BASE}/campaigns/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Rewards & Points
  async getRewards() {
    const res = await fetch(`${API_BASE}/rewards`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  async redeemPoints(data) {
    const res = await fetch(`${API_BASE}/rewards/redeem`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // Gift Cards
  async createGiftCard(data) {
    const res = await fetch(`${API_BASE}/gift-cards`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async getGiftCard(code) {
    const res = await fetch(`${API_BASE}/gift-cards/${code}`);
    return handleResponse(res);
  },

  // Custom Coffee Lab
  async createCustomCoffee(data) {
    const res = await fetch(`${API_BASE}/custom-coffee`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async getCustomCoffee(id) {
    const res = await fetch(`${API_BASE}/custom-coffee/${id}`);
    return handleResponse(res);
  },

  async getRecentCustomCoffees() {
    const res = await fetch(`${API_BASE}/custom-coffee`);
    return handleResponse(res);
  },

  // Orders
  async createOrder(orderData) {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(orderData),
    });
    return handleResponse(res);
  },

  async getOrder(id) {
    const res = await fetch(`${API_BASE}/orders/${id}`);
    return handleResponse(res);
  },

  async updateOrderStatus(id, status) {
    const res = await fetch(`${API_BASE}/orders/${id}/status`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    return handleResponse(res);
  },

  async getMyOrders() {
    const res = await fetch(`${API_BASE}/orders/my-orders`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Locations & Reviews & Contact
  async getLocations() {
    const res = await fetch(`${API_BASE}/locations`);
    return handleResponse(res);
  },

  async getReviews() {
    const res = await fetch(`${API_BASE}/reviews`);
    return handleResponse(res);
  },

  async submitReview(data) {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async submitContact(data) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async subscribeNewsletter(data) {
    const res = await fetch(`${API_BASE}/newsletter`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
  },

  async register(data) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async getProfile() {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Admin
  async getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  async getAdminOrders() {
    const res = await fetch(`${API_BASE}/admin/orders`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  async createAdminProduct(productData) {
    const res = await fetch(`${API_BASE}/admin/products`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(productData),
    });
    return handleResponse(res);
  },

  async updateAdminProduct(id, productData) {
    const res = await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(productData),
    });
    return handleResponse(res);
  },

  async deleteAdminProduct(id) {
    const res = await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  async createAdminFlavor(data) {
    const res = await fetch(`${API_BASE}/admin/flavors`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async createAdminBottle(data) {
    const res = await fetch(`${API_BASE}/admin/bottles`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async createAdminLocation(data) {
    const res = await fetch(`${API_BASE}/admin/locations`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async getAdminMessages() {
    const res = await fetch(`${API_BASE}/admin/messages`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  async updateAdminMessageStatus(id, status) {
    const res = await fetch(`${API_BASE}/admin/messages/${id}/status`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    return handleResponse(res);
  },
};
