// =========================================================================
// TecnoParts Chinandega - Control de Inventario
// Bento Grid Architecture + Dynamic Calculations + Light/Dark Mode
// =========================================================================

const STORAGE_KEY = 'tecnoparts_store_v2';
const THEME_KEY = 'tecnoparts_theme';

const DEFAULT_SUPPLIERS = [
  { id: 'SUP-01', name: 'Distribuidora Norte', contact: 'ventas@disnorte.com.ni', lead: 5, active: true },
  { id: 'SUP-02', name: 'Importadora Occidente', contact: 'pedidos@impoccidente.com', lead: 3, active: true },
  { id: 'SUP-03', name: 'Tecno Supply', contact: 'contacto@tecnosupply.ni', lead: 7, active: true }
];

const DEFAULT_CATEGORIES = ['Celulares','Pantallas','Baterías','Cargadores','Cables','Fundas','Audífonos','Memorias'];

const DEFAULT_PRODUCTS = [
  { sku: 'CAR-20W', name: 'Cargador 20W', category: 'Cargadores', supplierId: 'SUP-01', cost: 180, price: 320, stock: 25, active: true, sales30: 120, historyDays: 30 },
  { sku: 'CAB-USBC', name: 'Cable USB-C reforzado', category: 'Cables', supplierId: 'SUP-01', cost: 65, price: 140, stock: 76, active: true, sales30: 82, historyDays: 30 },
  { sku: 'FUN-A15', name: 'Funda Samsung A15', category: 'Fundas', supplierId: 'SUP-02', cost: 55, price: 120, stock: 112, active: true, sales30: 59, historyDays: 30 },
  { sku: 'BAT-J7', name: 'Batería Samsung J7', category: 'Baterías', supplierId: 'SUP-03', cost: 210, price: 380, stock: 0, active: true, sales30: 32, historyDays: 30 },
  { sku: 'PAN-A12', name: 'Pantalla Samsung A12', category: 'Pantallas', supplierId: 'SUP-03', cost: 1250, price: 1900, stock: 3, active: true, sales30: 24, historyDays: 30 },
  { sku: 'AUD-BT1', name: 'Audífonos Bluetooth 1', category: 'Audífonos', supplierId: 'SUP-02', cost: 280, price: 520, stock: 41, active: true, sales30: 68, historyDays: 30 },
  { sku: 'MEM-64G', name: 'Memoria MicroSD 64GB', category: 'Memorias', supplierId: 'SUP-01', cost: 240, price: 420, stock: 8, active: true, sales30: 29, historyDays: 30 },
  { sku: 'CAR-33W', name: 'Cargador rápido 33W', category: 'Cargadores', supplierId: 'SUP-01', cost: 250, price: 460, stock: 38, active: true, sales30: 16, historyDays: 30 },
  { sku: 'CAB-LTG', name: 'Cable Lightning 1m', category: 'Cables', supplierId: 'SUP-02', cost: 90, price: 180, stock: 4, active: true, sales30: 45, historyDays: 30 },
  { sku: 'FUN-R12', name: 'Funda Redmi 12', category: 'Fundas', supplierId: 'SUP-02', cost: 45, price: 110, stock: 96, active: true, sales30: 20, historyDays: 30 },
  { sku: 'BAT-A50', name: 'Batería Motorola A50', category: 'Baterías', supplierId: 'SUP-03', cost: 260, price: 470, stock: 12, active: true, sales30: 25, historyDays: 30 },
  { sku: 'PAN-IP11', name: 'Pantalla iPhone 11', category: 'Pantallas', supplierId: 'SUP-03', cost: 2800, price: 3900, stock: 2, active: true, sales30: 18, historyDays: 30 },
  { sku: 'AUD-TWS2', name: 'Audífonos TWS Pro', category: 'Audífonos', supplierId: 'SUP-02', cost: 430, price: 750, stock: 65, active: true, sales30: 22, historyDays: 30 },
  { sku: 'MEM-128G', name: 'Memoria MicroSD 128GB', category: 'Memorias', supplierId: 'SUP-01', cost: 390, price: 650, stock: 32, active: true, sales30: 15, historyDays: 30 },
  { sku: 'CAR-USB', name: 'Cargador USB universal', category: 'Cargadores', supplierId: 'SUP-01', cost: 100, price: 220, stock: 27, active: true, sales30: 14, historyDays: 30 },
  { sku: 'CAB-MIC', name: 'Cable Micro USB', category: 'Cables', supplierId: 'SUP-02', cost: 45, price: 100, stock: 0, active: true, sales30: 20, historyDays: 30 },
  { sku: 'FUN-IP11', name: 'Funda iPhone 11', category: 'Fundas', supplierId: 'SUP-02', cost: 80, price: 180, stock: 57, active: true, sales30: 18, historyDays: 30 },
  { sku: 'BAT-HUA', name: 'Batería Huawei Y9', category: 'Baterías', supplierId: 'SUP-03', cost: 230, price: 430, stock: 7, active: true, sales30: 15, historyDays: 30 },
  { sku: 'PAN-J7', name: 'Pantalla Samsung J7', category: 'Pantallas', supplierId: 'SUP-03', cost: 720, price: 1250, stock: 18, active: true, sales30: 12, historyDays: 30 },
  { sku: 'CEL-A15', name: 'Samsung Galaxy A15', category: 'Celulares', supplierId: 'SUP-01', cost: 5200, price: 6800, stock: 14, active: true, sales30: 10, historyDays: 30 },
  { sku: 'CEL-R12', name: 'Redmi Note 12', category: 'Celulares', supplierId: 'SUP-01', cost: 4800, price: 6200, stock: 9, active: true, sales30: 9, historyDays: 30 },
  { sku: 'FUN-M14', name: 'Funda Moto G14', category: 'Fundas', supplierId: 'SUP-02', cost: 60, price: 130, stock: 36, active: true, sales30: 8, historyDays: 30 },
  { sku: 'CAR-CAR', name: 'Cargador para carro', category: 'Cargadores', supplierId: 'SUP-01', cost: 160, price: 300, stock: 5, active: true, sales30: 11, historyDays: 30 },
  { sku: 'AUD-CAB', name: 'Audífonos cableados', category: 'Audífonos', supplierId: 'SUP-02', cost: 90, price: 180, stock: 22, active: true, sales30: 14, historyDays: 30 },
  { sku: 'MEM-32G', name: 'Memoria MicroSD 32GB', category: 'Memorias', supplierId: 'SUP-01', cost: 150, price: 280, stock: 3, active: true, sales30: 9, historyDays: 30 },
  { sku: 'PAN-A32', name: 'Pantalla Samsung A32', category: 'Pantallas', supplierId: 'SUP-03', cost: 1150, price: 1850, stock: 20, active: true, sales30: 8, historyDays: 30 },
  { sku: 'BAT-IP8', name: 'Batería iPhone 8', category: 'Baterías', supplierId: 'SUP-03', cost: 480, price: 850, stock: 0, active: true, sales30: 6, historyDays: 30 },
  { sku: 'CAB-2M', name: 'Cable USB-C 2m', category: 'Cables', supplierId: 'SUP-01', cost: 110, price: 240, stock: 44, active: true, sales30: 19, historyDays: 30 },
  { sku: 'FUN-X6', name: 'Funda Xiaomi X6', category: 'Fundas', supplierId: 'SUP-02', cost: 70, price: 160, stock: 64, active: true, sales30: 12, historyDays: 30 },
  { sku: 'CAR-65W', name: 'Cargador laptop 65W', category: 'Cargadores', supplierId: 'SUP-01', cost: 680, price: 1050, stock: 16, active: true, sales30: 5, historyDays: 30 }
];

const DEFAULT_USERS = [
  { username: 'admin1', name: 'Administrador principal', role: 'ADMIN', pass: 'Admin123', active: true, locked: false, failedAttempts: 0, lastAccess: '11 oct 2026, 09:36' },
  { username: 'vendedor1', name: 'Vendedor de mostrador', role: 'VENDEDOR', pass: 'Vend123', active: true, locked: false, failedAttempts: 0, lastAccess: '11 oct 2026, 09:42' }
];

const DEFAULT_MOVEMENTS = [
  { id: 'MOV-1001', date: '11 oct 2026, 09:42', type: 'SALIDA', sku: 'CAB-USBC', qty: 2, user: 'vendedor1', reason: 'Venta mostrador' },
  { id: 'MOV-1002', date: '11 oct 2026, 09:36', type: 'AJUSTE', sku: 'PAN-A12', qty: -1, user: 'admin1', reason: 'Daño' },
  { id: 'MOV-1003', date: '10 oct 2026, 16:18', type: 'SALIDA', sku: 'AUD-BT1', qty: 1, user: 'vendedor1', reason: 'Venta mostrador' },
  { id: 'MOV-1004', date: '10 oct 2026, 11:20', type: 'ENTRADA', sku: 'CAB-USBC', qty: 20, user: 'admin1', reason: 'Recepción mercancía' }
];

const DEFAULT_RESTOCKS = [
  { id: 'REP-0041', sku: 'PAN-A12', status: 'APROBADA', suggested: 20, requestedQty: 20, created: '10 oct 2026', reason: 'Reposición crítica' }
];

const DEFAULT_LOGS = [
  { date: '11 oct 2026, 09:42', user: 'vendedor1', action: 'Registrar salida', entity: 'CAB-USBC', result: 'ÉXITO' },
  { date: '11 oct 2026, 09:36', user: 'admin1', action: 'Ajuste de stock', entity: 'PAN-A12', result: 'ÉXITO' },
  { date: '10 oct 2026, 16:18', user: 'vendedor1', action: 'Registrar salida', entity: 'AUD-BT1', result: 'ÉXITO' },
  { date: '10 oct 2026, 15:02', user: 'admin1', action: 'Inicio de sesión', entity: 'Sesión', result: 'ÉXITO' }
];

// Estado central en memoria
let store = {
  products: [],
  suppliers: [],
  users: [],
  movements: [],
  restocks: [],
  logs: [],
  currentUser: null,
  currentView: 'dashboard',
  autoApproveRestock: false,
  valuationMode: 'cost' // 'cost' o 'price'
};

// UI State para componentes y pestañas
const uiState = {
  inventory: { search: '', category: '', status: '', sortCol: 'sku', sortDir: 'asc', page: 1, pageSize: 10 },
  suppliers: { search: '', sortCol: 'name', sortDir: 'asc', page: 1, pageSize: 10 },
  history: { search: '', date: '', page: 1, pageSize: 10 },
  alerts: { level: 'TODAS', page: 1, pageSize: 10 },
  productsTab: 'products',
  dashRange: 30,
  dashCat: '',
  dashSubTab: 'top' // 'top', 'lowest', 'excess'
};

function formatNow() {
  const d = new Date();
  const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const day = d.getDate();
  const m = months[d.getMonth()];
  const y = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${day} ${m} ${y}, ${hh}:${mm}`;
}

function formatDateOnly() {
  return new Date().toISOString().split('T')[0];
}

function saveStore() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      products: store.products,
      suppliers: store.suppliers,
      users: store.users,
      movements: store.movements,
      restocks: store.restocks,
      logs: store.logs,
      currentUser: store.currentUser,
      autoApproveRestock: store.autoApproveRestock,
      valuationMode: store.valuationMode
    }));
  } catch (e) {
    console.error('Error saving store', e);
  }
}

function loadStore() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      store.products = parsed.products || [];
      store.suppliers = parsed.suppliers || [];
      store.users = parsed.users || [];
      store.movements = parsed.movements || [];
      store.restocks = parsed.restocks || [];
      store.logs = parsed.logs || [];
      store.currentUser = parsed.currentUser || null;
      store.autoApproveRestock = parsed.autoApproveRestock || false;
      store.valuationMode = parsed.valuationMode || 'cost';
      return;
    } catch (e) {
      console.error('Failed to parse store', e);
    }
  }
  resetToDefault(false);
}

function resetToDefault(notify = true) {
  store.products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
  store.suppliers = JSON.parse(JSON.stringify(DEFAULT_SUPPLIERS));
  store.users = JSON.parse(JSON.stringify(DEFAULT_USERS));
  store.movements = JSON.parse(JSON.stringify(DEFAULT_MOVEMENTS));
  store.restocks = JSON.parse(JSON.stringify(DEFAULT_RESTOCKS));
  store.logs = JSON.parse(JSON.stringify(DEFAULT_LOGS));
  store.autoApproveRestock = false;
  store.valuationMode = 'cost';
  saveStore();
  if (notify) {
    toast('Datos restablecidos', 'Se restauraron los datos iniciales de demostración.');
    refreshAppUI();
  }
}

function logAudit(action, entity, result = 'ÉXITO', user = null) {
  const u = user || store.currentUser?.username || 'sistema';
  store.logs.unshift({
    date: formatNow(),
    user: u,
    action,
    entity,
    result
  });
  saveStore();
}

// -------------------------------------------------------------
// REGLAS DE NEGOCIO Y CÁLCULOS DINÁMICOS
// -------------------------------------------------------------
function getSupplier(id) {
  return store.suppliers.find(s => s.id === id) || { name: 'Distribuidora Norte', lead: 5, active: true };
}

function getProductMetrics(p) {
  const sup = getSupplier(p.supplierId);
  const lead = sup.lead || 5;

  const sales30 = Number(p.sales30 || 0);
  const cd = Math.ceil(sales30 / 30);
  const ss = Math.ceil(cd * 2);
  const pr = Math.ceil(cd * lead) + ss;

  const alreadyOrdered = store.restocks
    .filter(r => r.sku === p.sku && (r.status === 'APROBADA' || r.status === 'PENDIENTE'))
    .reduce((sum, r) => sum + (r.requestedQty || r.suggested || 0), 0);

  const rawSuggested = Math.ceil(cd * (lead + 30)) + ss - p.stock - alreadyOrdered;
  const suggested = Math.max(0, rawSuggested);

  const coverageDays = cd > 0 ? p.stock / cd : 999;

  let status = 'NORMAL';
  if (p.stock <= 0) {
    status = 'AGOTADO';
  } else if (p.stock <= ss) {
    status = 'CRÍTICO';
  } else if (p.stock <= pr) {
    status = 'BAJO';
  } else if (coverageDays > 90) {
    status = 'EXCESO';
  } else {
    status = 'NORMAL';
  }

  const hasHistory = (p.historyDays === undefined || p.historyDays >= 14);

  return { cd, ss, pr, lead, suggested, coverageDays, status, hasHistory, alreadyOrdered };
}

function ensureRestockRequest(sku, pMetrics) {
  if (!pMetrics.hasHistory) return;
  if (!['AGOTADO', 'CRÍTICO', 'BAJO'].includes(pMetrics.status)) return;

  const existing = store.restocks.find(r => r.sku === sku && r.status === 'PENDIENTE');
  if (!existing && pMetrics.suggested > 0) {
    const nextId = `REP-${String(store.restocks.length + 42).padStart(4, '0')}`;
    store.restocks.unshift({
      id: nextId,
      sku,
      status: store.autoApproveRestock ? 'APROBADA' : 'PENDIENTE',
      suggested: pMetrics.suggested,
      requestedQty: pMetrics.suggested,
      created: formatNow().split(',')[0],
      reason: `Stock en estado ${pMetrics.status}`
    });
    saveStore();
  }
}

function getActiveAlerts() {
  return store.products
    .filter(p => p.active)
    .map(p => ({ product: p, metrics: getProductMetrics(p) }))
    .filter(x => ['AGOTADO', 'CRÍTICO', 'BAJO'].includes(x.metrics.status))
    .sort((a, b) => {
      const order = { AGOTADO: 1, CRÍTICO: 2, BAJO: 3 };
      return order[a.metrics.status] - order[b.metrics.status];
    });
}

function pluralUnits(n) {
  return Number(n) === 1 ? '1 unidad' : `${n} unidades`;
}

function formatC(n) {
  return 'C$ ' + Number(n).toLocaleString('es-NI');
}

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));

// -------------------------------------------------------------
// TOASTS, MODALES Y DRAWERS
// -------------------------------------------------------------
function toast(title, msg, error = false) {
  const d = document.createElement('div');
  d.className = 'toast' + (error ? ' error' : '');
  d.innerHTML = `<strong>${esc(title)}</strong><span>${esc(msg)}</span>`;
  $('#toastRegion').appendChild(d);
  setTimeout(() => d.remove(), 4000);
}

function openModal(title, bodyHtml, onConfirm, confirmText = 'Confirmar', isDanger = false) {
  const modalRoot = $('#modalRoot');
  modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-head">
          <h3>${esc(title)}</h3>
          <button class="icon-circle-btn" id="closeModalBtn">×</button>
        </div>
        <div class="modal-body">${bodyHtml}</div>
        <div class="modal-actions">
          <button class="btn btn-secondary" id="cancelModalBtn">Cancelar</button>
          <button class="btn ${isDanger ? 'btn-danger' : 'btn-primary'}" id="confirmModalBtn">${esc(confirmText)}</button>
        </div>
      </div>
    </div>
  `;
  $('#closeModalBtn').onclick = closeModal;
  $('#cancelModalBtn').onclick = closeModal;
  $('#confirmModalBtn').onclick = () => {
    if (onConfirm() !== false) closeModal();
  };
}

function closeModal() {
  $('#modalRoot').innerHTML = '';
}

function openDrawer(title, bodyHtml, footerHtml = '') {
  const modalRoot = $('#modalRoot');
  modalRoot.innerHTML = `
    <div class="drawer-backdrop" id="drawerBackdrop">
      <div class="drawer">
        <div class="drawer-head">
          <h3>${esc(title)}</h3>
          <button class="icon-circle-btn" id="closeDrawerBtn">×</button>
        </div>
        <div class="drawer-body">${bodyHtml}</div>
        ${footerHtml ? `<div class="drawer-footer">${footerHtml}</div>` : ''}
      </div>
    </div>
  `;
  $('#closeDrawerBtn').onclick = closeModal;
  $('#drawerBackdrop').onclick = e => {
    if (e.target.id === 'drawerBackdrop') closeModal();
  };
}

// -------------------------------------------------------------
// NAVEGACIÓN RIEL BENTO & ROLES
// -------------------------------------------------------------
const navByRole = {
  VENDEDOR: [
    ['vendedorHome', '⌂', 'Inicio'],
    ['existencias', '▦', 'Existencias'],
    ['venta', '↗', 'Registrar venta'],
    ['alertas', '⚠', 'Alertas'],
    ['historial', '≡', 'Mi historial']
  ],
  ADMIN: [
    ['dashboard', '⌂', 'Tablero'],
    ['existencias', '▦', 'Existencias'],
    ['venta', '↗', 'Registrar venta'],
    ['alertas', '⚠', 'Alertas'],
    ['productos', '◈', 'Productos y proveedores'],
    ['entradas', '↓', 'Entradas'],
    ['ajustes', '⊙', 'Ajustes'],
    ['usuarios', '♙', 'Usuarios'],
    ['reportes', '▤', 'Reportes']
  ]
};

function checkAccess(view) {
  if (!store.currentUser) return false;
  const allowed = navByRole[store.currentUser.role].map(item => item[0]);
  return allowed.includes(view);
}

function go(view) {
  if (!store.currentUser) {
    showLoginView();
    return;
  }

  if (!checkAccess(view)) {
    logAudit('Intento acceso denegado', `Pantalla ${view}`, 'ERROR');
    toast('Acceso denegado', 'No tienes permisos para ver esta sección.', true);
    const fallbackView = store.currentUser.role === 'ADMIN' ? 'dashboard' : 'vendedorHome';
    if (view !== fallbackView) {
      go(fallbackView);
    }
    return;
  }

  store.currentView = view;
  saveStore();
  renderRailNavigation();
  updateBadges();

  const meta = {
    dashboard: ['Panel general', 'Tablero'],
    vendedorHome: ['Mostrador', 'Inicio'],
    existencias: ['Inventario', 'Existencias'],
    venta: ['Movimientos', 'Registrar venta'],
    alertas: ['Inventario', 'Alertas'],
    historial: ['Movimientos', 'Mi historial'],
    productos: ['Catálogo', 'Productos y proveedores'],
    entradas: ['Movimientos', 'Entradas'],
    ajustes: ['Inventario', 'Ajustes'],
    usuarios: ['Administración', 'Usuarios'],
    reportes: ['Análisis', 'Reportes']
  }[view] || ['TecnoParts', 'Sistema'];

  $('#breadcrumb').textContent = meta[0];
  $('#pageTitle').textContent = meta[1];
  $('#pageContent').innerHTML = views[view] ? views[view]() : `<div class="empty">Sección no disponible</div>`;

  bindViewHandlers(view);
}

function updateBadges() {
  const alertsCount = getActiveAlerts().length;
  $$('.notif-badge').forEach(b => {
    b.textContent = alertsCount;
    b.style.display = alertsCount > 0 ? 'inline-block' : 'none';
  });
}

function renderRailNavigation() {
  const railNav = $('#railNav');
  if (!store.currentUser) return;
  const items = navByRole[store.currentUser.role];
  const alertsCount = getActiveAlerts().length;

  railNav.innerHTML = items.map(item => {
    let countBadge = '';
    if (item[0] === 'alertas' && alertsCount > 0) {
      countBadge = `<span class="rail-badge">${alertsCount}</span>`;
    }
    const isActive = store.currentView === item[0];
    return `
      <button class="rail-btn ${isActive ? 'active' : ''}" data-view="${item[0]}" data-tooltip="${item[2]}">
        <span>${item[1]}</span>
        ${countBadge}
      </button>
    `;
  }).join('');

  railNav.querySelectorAll('.rail-btn').forEach(btn => {
    btn.onclick = () => go(btn.dataset.view);
  });
}

function refreshAppUI() {
  if (store.currentUser) {
    $('#loginView').classList.add('hidden');
    $('#appView').classList.remove('hidden');
    $('#topUser').textContent = store.currentUser.username;
    $('#railAvatarChar').textContent = store.currentUser.username[0].toUpperCase();

    const defaultRoleView = store.currentUser.role === 'ADMIN' ? 'dashboard' : 'vendedorHome';
    const initialView = (store.currentView && checkAccess(store.currentView)) ? store.currentView : defaultRoleView;
    go(initialView);
  } else {
    showLoginView();
  }
}

function showLoginView() {
  $('#appView').classList.add('hidden');
  $('#loginView').classList.remove('hidden');
  $('#loginForm').reset();
  $('#loginError').classList.add('hidden');
}

// -------------------------------------------------------------
// VISTAS DEL SISTEMA (BENTO GRID LAYOUT)
// -------------------------------------------------------------
const views = {
  // 1. TABLERO DEL ADMINISTRADOR (BENTO GRID 12-COLUMNS)
  dashboard: () => {
    const alerts = getActiveAlerts();
    const activeProducts = store.products.filter(p => p.active);
    const totalCostValue = activeProducts.reduce((sum, p) => sum + (p.stock * p.cost), 0);
    const totalPriceValue = activeProducts.reduce((sum, p) => sum + (p.stock * p.price), 0);
    const displayVal = store.valuationMode === 'price' ? totalPriceValue : totalCostValue;

    const outOfStock = activeProducts.filter(p => p.stock === 0).length;
    const withMetrics = activeProducts.map(p => ({ p, m: getProductMetrics(p) }));
    const excessProducts = withMetrics.filter(x => x.m.status === 'EXCESO');
    const lowestCoverage = withMetrics.filter(x => x.m.cd > 0).sort((a,b) => a.m.coverageDays - b.m.coverageDays);

    const pendingRestocks = store.restocks.filter(r => r.status === 'PENDIENTE');

    // Filtros de Más Vendidos
    const days = uiState.dashRange || 30;
    const cat = uiState.dashCat || '';
    let filteredTop = activeProducts.filter(p => !cat || p.category === cat);
    filteredTop.sort((a, b) => (b.sales30 || 0) - (a.sales30 || 0));
    const chartItems = filteredTop.slice(0, 10).map(p => ({
      sku: p.sku,
      units: Math.round((p.sales30 || 0) * (days / 30))
    }));
    const maxUnits = Math.max(1, ...chartItems.map(c => c.units));
    const totalPeriodSales = chartItems.reduce((s, c) => s + c.units, 0);

    // Clasificación ABC
    const salesValues = activeProducts.map(p => ({ p, val: (p.sales30 || 0) * p.price })).sort((a,b) => b.val - a.val);
    const sumVal = Math.max(1, salesValues.reduce((s, x) => s + x.val, 0));
    let run = 0;
    const aList = [], bList = [], cList = [];
    salesValues.forEach(x => {
      run += x.val;
      const pct = run / sumVal;
      if (pct <= 0.8) aList.push(x.p);
      else if (pct <= 0.95) bList.push(x.p);
      else cList.push(x.p);
    });

    // Alertas prioritarias (primeras 3)
    const topAlerts = alerts.slice(0, 3);
    const mostSevere = topAlerts[0];
    const otherAlerts = topAlerts.slice(1);

    const alertPct = activeProducts.length > 0 ? Math.round((alerts.length / activeProducts.length) * 100) : 0;

    return `
      <!-- FILA DE 3 MINI TARJETAS COMPACTAS (KPIs) -->
      <div class="kpi-row">
        <div class="kpi-card" id="kpiActiveProds" title="Ver Existencias">
          <div class="kpi-label">PRODUCTOS ACTIVOS</div>
          <div class="kpi-value">${activeProducts.length}</div>
          <div class="kpi-trend">↑ En catálogo comercial</div>
        </div>
        <div class="kpi-card" id="kpiAlertProds" title="Ver Alertas">
          <div class="kpi-label">EN ALERTA</div>
          <div class="kpi-value" style="color:var(--orange)">${alerts.length}</div>
          <div class="kpi-trend down">↓ Requieren atención</div>
        </div>
        <div class="kpi-card" id="kpiStockoutProds" title="Ver Agotados">
          <div class="kpi-label">AGOTADOS</div>
          <div class="kpi-value" style="color:var(--red)">${outOfStock}</div>
          <div class="kpi-trend down">0 unidades en estante</div>
        </div>
      </div>

      <!-- CUADRÍCULA BENTO PRINCIPAL (12 COLUMNAS) -->
      <div class="bento-grid-12">
        <!-- ZONA A: TARJETA GRANDE SUPERIOR IZQUIERDA (8 COLUMNAS) -->
        <div class="bento-card bento-col-8">
          <div class="bento-card-head">
            <div>
              <h3 class="bento-card-title">Rotación de Inventario</h3>
              <div class="chip-group" style="margin-top:8px">
                <button class="chip-btn ${uiState.dashSubTab==='top'?'active':''}" id="subTabTop">Más vendidos</button>
                <button class="chip-btn ${uiState.dashSubTab==='lowest'?'active':''}" id="subTabLowest">Menor cobertura</button>
                <button class="chip-btn ${uiState.dashSubTab==='excess'?'active':''}" id="subTabExcess">EXCESO</button>
              </div>
            </div>

            <!-- CHIPS DE FILTRO DE RANGO Y CATEGORÍA -->
            <div class="chip-group">
              <button class="chip-btn ${days===7?'active':''}" data-range="7">7d</button>
              <button class="chip-btn ${days===30?'active':''}" data-range="30">30d</button>
              <button class="chip-btn ${days===90?'active':''}" data-range="90">90d</button>
            </div>
          </div>

          ${uiState.dashSubTab === 'top' ? `
            <div class="bar-chart">
              ${chartItems.map(c => `
                <div class="bar-wrap click-row dash-bar-item" data-sku="${c.sku}" title="Clic para ver detalle de ${c.sku}">
                  <strong>${c.units}</strong>
                  <div class="bar" style="height:${Math.max(10, (c.units / maxUnits) * 140)}px"></div>
                  <small>${c.sku}</small>
                </div>
              `).join('')}
            </div>
          ` : uiState.dashSubTab === 'lowest' ? `
            <div class="bento-list" style="margin-top:10px">
              ${lowestCoverage.slice(0, 5).map(x => `
                <div class="bento-list-item click-row dash-bar-item" data-sku="${x.p.sku}">
                  <div style="display:flex;align-items:center;gap:10px">
                    <div class="bento-item-avatar">${x.p.sku[0]}</div>
                    <div>
                      <strong>${esc(x.p.name)} <span class="sku">${x.p.sku}</span></strong>
                      <small style="display:block;color:var(--muted)">Stock: ${pluralUnits(x.p.stock)} · Consumo: ${x.m.cd} u/día</small>
                    </div>
                  </div>
                  <span class="badge ${x.m.status}">Cobertura ${Math.floor(x.m.coverageDays)} días</span>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="bento-list" style="margin-top:10px">
              ${excessProducts.length === 0 ? `<div class="empty">No hay existencias en exceso (> 90 días).</div>` : excessProducts.slice(0, 5).map(x => `
                <div class="bento-list-item click-row dash-bar-item" data-sku="${x.p.sku}">
                  <div style="display:flex;align-items:center;gap:10px">
                    <div class="bento-item-avatar">${x.p.sku[0]}</div>
                    <div>
                      <strong>${esc(x.p.name)} <span class="sku">${x.p.sku}</span></strong>
                      <small style="display:block;color:var(--muted)">Stock: ${pluralUnits(x.p.stock)} · Cobertura: ${Math.floor(x.m.coverageDays)} días</small>
                    </div>
                  </div>
                  <span class="badge EXCESO">EXCESO</span>
                </div>
              `).join('')}
            </div>
          `}

          <div style="display:flex;justify-content:flex-end;align-items:center;margin-top:20px;padding-top:14px;border-top:1px solid var(--line)">
            <span class="muted" style="font-size:11px;font-weight:600">Total unidades vendidas en período: <b>${totalPeriodSales}</b></span>
          </div>
        </div>

        <!-- ZONA B: COLUMNA DERECHA SUPERIOR (4 COLUMNAS): ALERTAS PRIORITARIAS -->
        <div class="bento-card bento-col-4">
          <div class="bento-card-head">
            <h3 class="bento-card-title">Alertas Prioritarias</h3>
            <span class="bento-card-sub">${alerts.length} ${alerts.length === 1 ? 'activa' : 'activas'}</span>
          </div>

          <div class="bento-list">
            ${topAlerts.length === 0 ? `
              <div class="empty" style="padding:24px">Sin alertas pendientes. Inventario abastecido.</div>
            ` : `
              <!-- ELEMENTO DESTACADO EN FORMA DE PÍLDORA (EL MÁS GRAVE) -->
              <div class="pill-highlight-card" id="mostSeverePill" data-sku="${mostSevere.product.sku}">
                <div class="pill-highlight-left">
                  <div class="pill-highlight-icon">${mostSevere.metrics.status === 'AGOTADO' ? '!' : '△'}</div>
                  <div>
                    <strong style="font-size:12px;display:block">${esc(mostSevere.product.name)}</strong>
                    <small style="color:var(--muted)">${pluralUnits(mostSevere.product.stock)} · ${Math.floor(mostSevere.metrics.coverageDays)} días</small>
                  </div>
                </div>
                <span class="badge ${mostSevere.metrics.status}">${mostSevere.metrics.status}</span>
              </div>

              <!-- ELEMENTOS ADICIONALES (LISTA DE 2) -->
              ${otherAlerts.map(a => `
                <div class="bento-list-item click-row dash-bar-item" data-sku="${a.product.sku}">
                  <div style="display:flex;align-items:center;gap:10px">
                    <div class="bento-item-avatar">${a.product.name[0]}</div>
                    <div>
                      <strong style="font-size:12px;display:block">${esc(a.product.name)}</strong>
                      <small style="color:var(--muted)">Stock: ${pluralUnits(a.product.stock)} · Cobertura: ${Math.floor(a.metrics.coverageDays)} días</small>
                    </div>
                  </div>
                  <span class="badge ${a.metrics.status}">${a.metrics.status}</span>
                </div>
              `).join('')}
            `}
          </div>

          <button class="btn btn-secondary full" id="btnGoToAlerts" style="margin-top:auto">
            Ver todas las alertas (${alerts.length}) →
          </button>
        </div>

        <!-- ZONA C1: FILA INFERIOR IZQUIERDA: CLASIFICACIÓN ABC (6 COLUMNAS) -->
        <div class="bento-card bento-col-6">
          <div class="bento-card-head">
            <div>
              <h3 class="bento-card-title">Clasificación ABC</h3>
              <span class="bento-card-sub">Principio de Pareto 80 / 15 / 5</span>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:12px;margin:12px 0">
            <div class="abc-item click-row" id="dashAbcA" style="padding:12px;text-align:center">
              <strong style="color:var(--green)">Clase A</strong>
              <small style="display:block;margin-top:4px">${aList.length} prod. (80%)</small>
            </div>
            <div class="abc-item click-row" id="dashAbcB" style="padding:12px;text-align:center">
              <strong style="color:var(--orange)">Clase B</strong>
              <small style="display:block;margin-top:4px">${bList.length} prod. (15%)</small>
            </div>
            <div class="abc-item click-row" id="dashAbcC" style="padding:12px;text-align:center">
              <strong style="color:var(--blue)">Clase C</strong>
              <small style="display:block;margin-top:4px">${cList.length} prod. (5%)</small>
            </div>
          </div>

          <div class="thin-progress-bar">
            <div class="thin-seg-a" style="width:80%"></div>
            <div class="thin-seg-b" style="width:15%"></div>
            <div class="thin-seg-c" style="width:5%"></div>
          </div>
          <small class="muted" style="margin-top:8px;display:block">Concentración por volumen de ventas acumulado</small>
        </div>

        <!-- ZONA C2: FILA INFERIOR DERECHA: VALOR DEL INVENTARIO (6 COLUMNAS) -->
        <div class="bento-card bento-col-6">
          <div class="bento-card-head">
            <h3 class="bento-card-title">Valor del Inventario</h3>
            <div class="switch-container ${store.valuationMode === 'price' ? 'on' : ''}" id="toggleValuation" title="Alternar entre Costo y Precio">
              <span>${store.valuationMode === 'cost' ? 'Costo' : 'Venta'}</span>
              <div class="switch-track">
                <div class="switch-thumb"></div>
              </div>
            </div>
          </div>

          <div style="margin:auto 0;text-align:center">
            <div style="font:700 32px 'Space Grotesk';color:var(--green);letter-spacing:-0.03em">
              ${formatC(displayVal)}
            </div>
            <small class="muted">Calculado según stock activo y ${store.valuationMode === 'cost' ? 'costo unitario' : 'precio de mostrador'}</small>
          </div>

          <!-- FILA DE CONTROLES TIPO REPRODUCTOR -->
          <div class="player-controls">
            <button class="player-btn-round" id="btnExportQuickReport" title="Exportar existencias">↓</button>
            <button class="player-btn-main" id="btnRefreshDashMain" title="Actualizar datos">↻</button>
            <button class="player-btn-round" id="btnGoToReports" title="Ir a Reportes">▤</button>
          </div>

          <!-- BARRA FINA CON PORCENTAJE EN ALERTA -->
          <div class="thin-progress-bar" style="margin-top:12px">
            <div style="width:${alertPct}%;background:var(--red);height:100%"></div>
            <div style="width:${100 - alertPct}%;background:var(--green);height:100%"></div>
          </div>
          <small class="muted" style="display:flex;justify-content:space-between;margin-top:4px;font-size:10px">
            <span>En alerta: ${alertPct}%</span>
            <span>Abastecido: ${100 - alertPct}%</span>
          </small>
        </div>
      </div>
    `;
  },

  // 4. VISTA INICIO PARA EL VENDEDOR (BENTO SIMPLIFICADO)
  vendedorHome: () => {
    const alerts = getActiveAlerts();
    const todaySales = store.movements.filter(m => m.user === store.currentUser.username && m.type === 'SALIDA');
    const todayUnits = todaySales.reduce((s, m) => s + m.qty, 0);
    const lastMov = todaySales[0] || { sku: '—', qty: 0, date: 'Sin ventas hoy' };

    return `
      <div class="bento-grid-12">
        <!-- TARJETA GRANDE ACCESO RÁPIDO VENTA (8 COLUMNAS) -->
        <div class="bento-card bento-col-8">
          <div class="bento-card-head">
            <div>
              <h3 class="bento-card-title">Mostrador de Ventas</h3>
              <span class="bento-card-sub">Consulta de stock y registro rápido</span>
            </div>
            <button class="btn btn-primary" id="vendedorGoSaleBtn">Registrar venta ↗</button>
          </div>

          <div class="callout info">
            Escribe o escanea el SKU para consultar disponibilidad inmediata en almacén:
          </div>
          <div class="inline-form" style="position:relative;margin-top:12px">
            <input id="vendedorQuickSku" placeholder="Ej. CAR-20W" autocomplete="off" style="flex:1" />
            <button class="btn btn-secondary" id="vendedorQuickSearchBtn">Consultar</button>
          </div>
          <div id="vendedorQuickResult" class="hidden" style="margin-top:16px"></div>
        </div>

        <!-- COLUMNA DERECHA: ALERTAS ACTIVAS (4 COLUMNAS) -->
        <div class="bento-card bento-col-4">
          <div class="bento-card-head">
            <h3 class="bento-card-title">Alertas de Stock</h3>
            <span class="badge ${alerts.length > 0 ? 'CRÍTICO' : 'NORMAL'}">${alerts.length}</span>
          </div>

          <div class="bento-list">
            ${alerts.slice(0, 3).map(a => `
              <div class="bento-list-item click-row view-product-alert" data-sku="${a.product.sku}">
                <div style="display:flex;align-items:center;gap:10px">
                  <div class="bento-item-avatar">${a.product.name[0]}</div>
                  <div>
                    <strong style="font-size:12px;display:block">${esc(a.product.name)}</strong>
                    <small style="color:var(--muted)">Stock: ${pluralUnits(a.product.stock)}</small>
                  </div>
                </div>
                <span class="badge ${a.metrics.status}">${a.metrics.status}</span>
              </div>
            `).join('')}
          </div>

          <button class="btn btn-secondary full" id="vendedorGoAlertsBtn" style="margin-top:auto">
            Ver todas las alertas →
          </button>
        </div>

        <!-- 3 TARJETAS INFERIORES -->
        <div class="bento-card bento-col-4">
          <div class="bento-card-head">
            <h3 class="bento-card-title">Mis Ventas de Hoy</h3>
            <span class="badge NORMAL">${todaySales.length} salidas</span>
          </div>
          <div style="margin:auto 0;text-align:center">
            <div style="font:700 32px 'Space Grotesk';color:var(--green)">${todayUnits} u.</div>
            <small class="muted">Unidades despachadas en tu turno</small>
          </div>
          <div class="thin-progress-bar">
            <div style="width:${Math.min(100, todayUnits * 5)}%;background:var(--green)"></div>
          </div>
        </div>

        <div class="bento-card bento-col-4 click-row" id="vendedorGoExistencias">
          <div class="bento-card-head">
            <h3 class="bento-card-title">Existencias</h3>
            <span class="bento-card-sub">Catálogo</span>
          </div>
          <div style="margin:auto 0">
            <div style="font:700 20px 'Space Grotesk'">${store.products.filter(p => p.active).length} Productos</div>
            <small class="muted">Precios de venta y stock al instante</small>
          </div>
          <button class="btn btn-secondary full" style="margin-top:auto">Consultar inventario →</button>
        </div>

        <div class="bento-card bento-col-4 click-row" id="vendedorGoHistorial">
          <div class="bento-card-head">
            <h3 class="bento-card-title">Mi Último Movimiento</h3>
            <span class="sku">${lastMov.sku}</span>
          </div>
          <div style="margin:auto 0">
            <div style="font:700 18px 'Space Grotesk'">${lastMov.qty > 0 ? pluralUnits(lastMov.qty) : 'Sin ventas'}</div>
            <small class="muted">${lastMov.date}</small>
          </div>
          <button class="btn btn-secondary full" style="margin-top:auto">Ver mi historial →</button>
        </div>
      </div>
    `;
  },

  // 2. EXISTENCIAS
  existencias: () => {
    const isAdmin = store.currentUser.role === 'ADMIN';
    const state = uiState.inventory;

    let list = store.products.filter(p => p.active);
    if (state.search) {
      const q = state.search.toLowerCase();
      list = list.filter(p => p.sku.toLowerCase().includes(q) || p.name.toLowerCase().includes(q));
    }
    if (state.category) {
      list = list.filter(p => p.category === state.category);
    }
    if (state.status) {
      list = list.filter(p => getProductMetrics(p).status === state.status);
    }

    list.sort((a, b) => {
      let va = a[state.sortCol];
      let vb = b[state.sortCol];
      if (state.sortCol === 'status') {
        va = getProductMetrics(a).status;
        vb = getProductMetrics(b).status;
      }
      if (va < vb) return state.sortDir === 'asc' ? -1 : 1;
      if (va > vb) return state.sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    const totalRows = list.length;
    const totalPages = Math.max(1, Math.ceil(totalRows / state.pageSize));
    const start = (state.page - 1) * state.pageSize;
    const paged = list.slice(start, start + state.pageSize);

    return `
      <!-- BARRA SUPERIOR DE ACCIONES Y FILTROS ESTILO BENTO CHIPS -->
      <div class="bento-card" style="padding:16px 20px">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
          <div style="display:flex;gap:10px;align-items:center;flex:1;min-width:240px">
            <div class="search-wrap" style="flex:1">
              <span>⌕</span>
              <input id="invSearchInput" value="${esc(state.search)}" placeholder="Buscar por SKU o nombre..." />
            </div>
            <select id="invCatFilter">
              <option value="">Todas las categorías</option>
              ${DEFAULT_CATEGORIES.map(c => `<option value="${c}" ${state.category===c?'selected':''}>${c}</option>`).join('')}
            </select>
            <select id="invStatusFilter">
              <option value="">Todos los estados</option>
              ${['AGOTADO','CRÍTICO','BAJO','NORMAL','EXCESO'].map(s => `<option value="${s}" ${state.status===s?'selected':''}>${s}</option>`).join('')}
            </select>
          </div>
          <div style="display:flex;gap:10px">
            ${isAdmin ? `<button class="btn btn-secondary" id="openNewProductBtn">+ Nuevo producto</button>` : ''}
            <button class="btn btn-primary" id="exportInventoryCsvBtn">↓ Exportar CSV</button>
          </div>
        </div>
      </div>

      <!-- TABLA PRINCIPAL EN TARJETA BENTO -->
      <div class="bento-card table-card">
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th class="sort-th" data-col="sku">SKU ${state.sortCol==='sku'?(state.sortDir==='asc'?'▲':'▼'):''}</th>
                <th class="sort-th" data-col="name">Producto ${state.sortCol==='name'?(state.sortDir==='asc'?'▲':'▼'):''}</th>
                <th class="sort-th" data-col="category">Categoría ${state.sortCol==='category'?(state.sortDir==='asc'?'▲':'▼'):''}</th>
                <th class="sort-th" data-col="stock">Stock ${state.sortCol==='stock'?(state.sortDir==='asc'?'▲':'▼'):''}</th>
                <th class="sort-th" data-col="status">Estado ${state.sortCol==='status'?(state.sortDir==='asc'?'▲':'▼'):''}</th>
                ${isAdmin ? `<th>Costo</th><th>Acciones</th>` : ''}
              </tr>
            </thead>
            <tbody>
              ${paged.length === 0 ? `<tr><td colspan="7" class="empty">No se encontraron productos con los filtros aplicados.</td></tr>` : paged.map(p => {
                const m = getProductMetrics(p);
                return `
                  <tr class="click-row row-product" data-sku="${p.sku}">
                    <td><span class="sku">${p.sku}</span></td>
                    <td>
                      <div class="product-cell">
                        <span class="product-thumb">${p.category === 'Celulares' ? '▣' : '◈'}</span>
                        <strong>${esc(p.name)}</strong>
                      </div>
                    </td>
                    <td class="category">${esc(p.category)}</td>
                    <td><strong>${pluralUnits(p.stock)}</strong></td>
                    <td><span class="badge ${m.status}">${m.status}</span></td>
                    ${isAdmin ? `
                      <td>${formatC(p.cost)}</td>
                      <td><button class="btn btn-ghost btn-edit-prod" data-sku="${p.sku}" onclick="event.stopPropagation()">Editar</button></td>
                    ` : ''}
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <div class="pagination-bar">
          <span>Mostrando ${totalRows === 0 ? 0 : start + 1} a ${Math.min(totalRows, start + state.pageSize)} de ${totalRows} productos</span>
          <div class="pagination-controls">
            <button id="invPrevPage" ${state.page <= 1 ? 'disabled' : ''}>Anterior</button>
            <span style="padding:5px 8px">Pág. ${state.page} de ${totalPages}</span>
            <button id="invNextPage" ${state.page >= totalPages ? 'disabled' : ''}>Siguiente</button>
          </div>
        </div>
      </div>
    `;
  },

  // 3. REGISTRAR VENTA
  venta: () => {
    const recentSales = store.movements.filter(m => m.type === 'SALIDA').slice(0, 5);

    return `
      <div class="bento-grid-12">
        <!-- TARJETA IZQUIERDA: FORMULARIO PRINCIPAL Y SCANNER -->
        <div class="bento-card bento-col-8">
          <div class="bento-card-head">
            <h3 class="bento-card-title">Registrar Venta de Mostrador</h3>
            <span class="bento-card-sub">Actualización en tiempo real</span>
          </div>

          <div class="callout info">Escribe o escanea el SKU del producto para consultar existencias y precio.</div>
          <div class="inline-form" style="position:relative;margin-top:10px">
            <label style="position:relative;flex:1">
              SKU del producto
              <input id="saleSkuInput" placeholder="Ej. CAR-20W" autocomplete="off" />
              <div id="saleSuggestions" class="suggestions-box hidden"></div>
            </label>
            <button class="btn btn-secondary" id="searchSaleSkuBtn">Buscar</button>
          </div>
          <div id="saleProductBox" class="hidden" style="margin-top:16px"></div>
        </div>

        <!-- COLUMNA DERECHA: ÚLTIMAS SALIDAS -->
        <div class="bento-card bento-col-4">
          <div class="bento-card-head">
            <h3 class="bento-card-title">Últimas Salidas</h3>
            <span class="bento-card-sub">Recientes</span>
          </div>

          <div class="bento-list">
            ${recentSales.length === 0 ? `<div class="empty">No hay salidas registradas recientemente.</div>` : recentSales.map(s => `
              <div class="bento-list-item">
                <div style="display:flex;align-items:center;gap:10px">
                  <div class="bento-item-avatar" style="background:var(--green-soft);color:var(--green)">↗</div>
                  <div>
                    <strong style="font-size:12px;display:block">${s.sku} · ${pluralUnits(s.qty)}</strong>
                    <small style="color:var(--muted)">${s.date} · ${esc(s.user)}</small>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // 4. ALERTAS
  alertas: () => {
    const isAdmin = store.currentUser.role === 'ADMIN';
    const state = uiState.alerts;
    let list = getActiveAlerts();
    if (state.level !== 'TODAS') {
      list = list.filter(a => a.metrics.status === state.level);
    }

    return `
      <!-- TARJETA SUPERIOR DE FILTROS (CHIPS) -->
      <div class="bento-card" style="padding:16px 20px">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
          <div style="display:flex;gap:8px;align-items:center">
            <span class="muted" style="font-size:12px;font-weight:700">FILTRAR POR GRAVEDAD:</span>
            <div class="chip-group">
              <button class="chip-btn ${state.level==='TODAS'?'active':''}" data-alert-lvl="TODAS">Todas</button>
              <button class="chip-btn ${state.level==='AGOTADO'?'active':''}" data-alert-lvl="AGOTADO">Agotado</button>
              <button class="chip-btn ${state.level==='CRÍTICO'?'active':''}" data-alert-lvl="CRÍTICO">Crítico</button>
              <button class="chip-btn ${state.level==='BAJO'?'active':''}" data-alert-lvl="BAJO">Bajo</button>
            </div>
          </div>
          <span class="muted">${list.length} ${list.length === 1 ? 'producto requiere atención' : 'productos requieren atención'}</span>
        </div>
      </div>

      <!-- LISTA DE ALERTAS EN TARJETA BENTO -->
      <div class="bento-card">
        <div class="bento-list">
          ${list.length === 0 ? `<div class="empty">No hay alertas para este filtro. Todo el inventario está abastecido.</div>` : list.map(a => `
            <div class="bento-list-item click-row view-product-alert" data-sku="${a.product.sku}">
              <div style="display:flex;align-items:center;gap:12px">
                <div class="bento-item-avatar ${a.metrics.status==='AGOTADO'?'badge AGOTADO':'badge CRÍTICO'}">
                  ${a.metrics.status === 'AGOTADO' ? '!' : '△'}
                </div>
                <div>
                  <strong style="font-size:13px;display:block">${esc(a.product.name)} <span class="sku">${a.product.sku}</span></strong>
                  <small style="color:var(--muted)">Stock: ${pluralUnits(a.product.stock)} · Consumo: ${a.metrics.cd} u/día · Cobertura: ${a.metrics.cd > 0 ? Math.floor(a.metrics.coverageDays) + ' días' : '0 días'}</small>
                </div>
              </div>
              <div style="display:flex;gap:10px;align-items:center">
                <span class="badge ${a.metrics.status}">${a.metrics.status}</span>
                
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // 5. MI HISTORIAL (VENDEDOR)
  historial: () => {
    const state = uiState.history;
    let list = store.movements.filter(m => m.user === store.currentUser.username && m.type === 'SALIDA');
    if (state.search) list = list.filter(m => m.sku.toLowerCase().includes(state.search.toLowerCase()));
    if (state.date) list = list.filter(m => m.date.includes(state.date));

    const totalRows = list.length;
    const totalPages = Math.max(1, Math.ceil(totalRows / state.pageSize));
    const start = (state.page - 1) * state.pageSize;
    const paged = list.slice(start, start + state.pageSize);

    return `
      <div class="bento-card" style="padding:16px 20px">
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <div class="search-wrap" style="flex:1">
            <span>⌕</span>
            <input id="histSearchInput" value="${esc(state.search)}" placeholder="Buscar por SKU..." />
          </div>
          <input type="text" id="histDateInput" value="${esc(state.date)}" placeholder="Filtrar por fecha..." />
        </div>
      </div>

      <div class="bento-card table-card">
        <div class="table-scroll">
          <table>
            <thead>
              <tr><th>Fecha y Hora</th><th>SKU</th><th>Producto</th><th>Cantidad</th><th>Resultado</th></tr>
            </thead>
            <tbody>
              ${paged.length === 0 ? `<tr><td colspan="5" class="empty">No hay registros de salidas.</td></tr>` : paged.map(m => {
                const p = store.products.find(x => x.sku === m.sku);
                return `
                  <tr>
                    <td>${m.date}</td>
                    <td class="sku">${m.sku}</td>
                    <td><strong>${esc(p?.name || 'Producto')}</strong></td>
                    <td><strong>${pluralUnits(m.qty)}</strong></td>
                    <td><span class="badge NORMAL">ÉXITO</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
        <div class="pagination-bar">
          <span>Mostrando ${totalRows === 0 ? 0 : start + 1} a ${Math.min(totalRows, start + state.pageSize)} de ${totalRows} movimientos</span>
          <div class="pagination-controls">
            <button id="histPrevPage" ${state.page <= 1 ? 'disabled' : ''}>Anterior</button>
            <span style="padding:5px 8px">Pág. ${state.page} de ${totalPages}</span>
            <button id="histNextPage" ${state.page >= totalPages ? 'disabled' : ''}>Siguiente</button>
          </div>
        </div>
      </div>
    `;
  },

  // 6. PRODUCTOS Y PROVEEDORES (ADMIN)
  productos: () => {
    const isProds = uiState.productsTab === 'products';
    const activeProducts = store.products.filter(p => p.active);
    const activeSuppliers = store.suppliers.filter(s => s.active);

    return `
      <div class="bento-card" style="padding:16px 20px">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
          <div class="chip-group">
            <button class="chip-btn ${isProds ? 'active' : ''}" id="subTabProds">Productos (${activeProducts.length})</button>
            <button class="chip-btn ${!isProds ? 'active' : ''}" id="subTabSupps">Proveedores (${activeSuppliers.length})</button>
          </div>
          <div style="display:flex;gap:10px">
            <button class="btn btn-secondary" id="tabNewProdBtn">+ Nuevo producto</button>
            <button class="btn btn-primary" id="tabNewSuppBtn">+ Nuevo proveedor</button>
          </div>
        </div>
      </div>

      <div class="bento-card table-card">
        <div class="table-scroll">
          ${isProds ? `
            <table>
              <thead>
                <tr><th>SKU</th><th>Nombre</th><th>Categoría</th><th>Proveedor</th><th>Costo</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
              </thead>
              <tbody>
                ${activeProducts.map(p => {
                  const s = getSupplier(p.supplierId);
                  return `
                    <tr>
                      <td class="sku">${p.sku}</td>
                      <td><strong>${esc(p.name)}</strong></td>
                      <td>${esc(p.category)}</td>
                      <td>${esc(s.name)}</td>
                      <td>${formatC(p.cost)}</td>
                      <td>${formatC(p.price)}</td>
                      <td>${pluralUnits(p.stock)}</td>
                      <td>
                        <button class="btn btn-ghost btn-edit-prod" data-sku="${p.sku}">Editar</button>
                        <button class="btn btn-ghost btn-deact-prod" data-sku="${p.sku}" style="color:var(--red)">Desactivar</button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          ` : `
            <table>
              <thead>
                <tr><th>ID</th><th>Proveedor</th><th>Contacto</th><th>Días de entrega</th><th>Productos asociados</th><th>Acciones</th></tr>
              </thead>
              <tbody>
                ${activeSuppliers.map(s => {
                  const count = store.products.filter(p => p.supplierId === s.id && p.active).length;
                  return `
                    <tr>
                      <td class="sku">${s.id}</td>
                      <td><strong>${esc(s.name)}</strong></td>
                      <td>${esc(s.contact)}</td>
                      <td><strong>${s.lead} días</strong></td>
                      <td>${count} productos</td>
                      <td>
                        <button class="btn btn-ghost btn-edit-supp" data-id="${s.id}">Editar</button>
                        <button class="btn btn-ghost btn-deact-supp" data-id="${s.id}" style="color:var(--red)">Desactivar</button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          `}
        </div>
      </div>
    `;
  },

  // 7. ENTRADAS (ADMIN)
  entradas: () => {
    const approvedRequests = store.restocks.filter(r => r.status === 'APROBADA');

    return `
      <div class="bento-grid-12">
        <div class="bento-card bento-col-8">
          <div class="bento-card-head">
            <h3 class="bento-card-title">Recepción de Mercancía</h3>
            <span class="bento-card-sub">Abastecimiento y cierre de alertas</span>
          </div>

          <div class="field-grid">
            <label style="position:relative">
              SKU
              <input id="entrySku" placeholder="Ej. CAR-20W" autocomplete="off" />
              <div id="entrySuggestions" class="suggestions-box hidden"></div>
            </label>
            <label>
              Cantidad
              <input id="entryQty" type="number" min="1" placeholder="0" />
            </label>
            <label class="field-wide">
              Proveedor
              <select id="entrySupplier">
                ${store.suppliers.filter(s => s.active).map(s => `<option value="${s.id}">${esc(s.name)} · ${s.lead} días</option>`).join('')}
              </select>
            </label>
            <label class="field-wide">
              Fecha
              <input type="date" id="entryDate" value="${formatDateOnly()}" />
            </label>
          </div>
          <button class="btn btn-primary" id="btnSubmitEntry" style="margin-top:18px">Registrar entrada</button>
        </div>

        <div class="bento-card bento-col-4">
          <div class="bento-card-head">
            <h3 class="bento-card-title">Últimas Entradas</h3>
            <span class="bento-card-sub">Histórico de recepción</span>
          </div>

          <div class="bento-list">
            ${store.movements.filter(m => m.type === 'ENTRADA').slice(0, 5).map(m => {
              const p = store.products.find(x => x.sku === m.sku);
              return `
                <div class="bento-list-item">
                  <div style="display:flex;align-items:center;gap:10px">
                    <div class="bento-item-avatar" style="background:var(--green-soft);color:var(--green)">↓</div>
                    <div>
                      <strong style="font-size:12px;display:block">${m.sku} · ${esc(p?.name || '')}</strong>
                      <small style="color:var(--muted)">${m.date} · +${m.qty} u.</small>
                    </div>
                  </div>
                  <span class="badge EXCESO">${m.qty} u.</span>
                </div>
              `;
            }).join('') || '<div class="empty">Sin entradas recientes.</div>'}
          </div>
        </div>
      </div>
    `;
  },

  // 8. AJUSTES (ADMIN)
  ajustes: () => {
    const recentAdjustments = store.movements.filter(m => m.type === 'AJUSTE').slice(0, 5);

    return `
      <div class="bento-grid-12">
        <div class="bento-card bento-col-8">
          <div class="bento-card-head">
            <h3 class="bento-card-title">Ajustes de Inventario</h3>
            <span class="bento-card-sub">Corrección con trazabilidad</span>
          </div>

          <div class="callout warning">Los ajustes modifican el stock directamente. Verifica el conteo físico antes de guardar.</div>
          <div class="field-grid" style="margin-top:14px">
            <label style="position:relative">
              SKU
              <input id="adjSku" placeholder="Ej. PAN-A12" autocomplete="off" />
              <div id="adjSuggestions" class="suggestions-box hidden"></div>
            </label>
            <label>
              Tipo de ajuste
              <select id="adjType">
                <option value="aumento">Aumento (+)</option>
                <option value="disminucion">Disminución (-)</option>
              </select>
            </label>
            <label>
              Cantidad a ajustar
              <input id="adjQty" type="number" min="1" placeholder="Ej. 2" />
            </label>
            <label>
              Motivo obligatorio
              <select id="adjReason">
                <option value="">Selecciona un motivo...</option>
                <option value="Daño">Daño</option>
                <option value="Pérdida">Pérdida</option>
                <option value="Conteo físico">Conteo físico</option>
                <option value="Otro">Otro</option>
              </select>
            </label>
          </div>
          <button class="btn btn-primary" id="btnSaveAdjustment" style="margin-top:18px">Guardar ajuste</button>
        </div>

        <div class="bento-card bento-col-4">
          <div class="bento-card-head">
            <h3 class="bento-card-title">Últimos Ajustes</h3>
            <span class="bento-card-sub">Auditoría</span>
          </div>

          <div class="bento-list">
            ${recentAdjustments.length === 0 ? `<div class="empty">No se han registrado ajustes.</div>` : recentAdjustments.map(a => `
              <div class="bento-list-item">
                <div style="display:flex;align-items:center;gap:10px">
                  <div class="bento-item-avatar" style="background:var(--orange-bg);color:var(--orange)">⊙</div>
                  <div>
                    <strong style="font-size:12px;display:block">${a.sku} · ${a.qty > 0 ? '+' : ''}${a.qty} u.</strong>
                    <small style="color:var(--muted)">${a.date} · ${esc(a.reason)} (${esc(a.user)})</small>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // 9. USUARIOS (ADMIN)
  usuarios: () => {
    return `
      <div class="bento-card" style="padding:16px 20px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <h3 class="bento-card-title">Gestión de Usuarios</h3>
            <span class="muted" style="font-size:12px">Control de accesos y seguridad</span>
          </div>
          <button class="btn btn-primary" id="openNewUserBtn">+ Nuevo usuario</button>
        </div>
      </div>

      <div class="bento-card table-card">
        <div class="table-scroll">
          <table>
            <thead>
              <tr><th>Usuario</th><th>Nombre</th><th>Rol</th><th>Estado</th><th>Intentos</th><th>Último acceso</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              ${store.users.map(u => {
                const isSelf = u.username === store.currentUser.username;
                return `
                  <tr>
                    <td class="sku">${esc(u.username)}</td>
                    <td><strong>${esc(u.name)}</strong></td>
                    <td><span class="badge ${u.role === 'ADMIN' ? 'EXCESO' : 'NORMAL'}">${u.role}</span></td>
                    <td>
                      ${u.locked ? `<span class="badge CRÍTICO">BLOQUEADO</span>` : (u.active ? `<span class="badge NORMAL">ACTIVO</span>` : `<span class="badge AGOTADO">INACTIVO</span>`)}
                    </td>
                    <td>${u.failedAttempts || 0}</td>
                    <td>${u.lastAccess || 'Nunca'}</td>
                    <td>
                      <button class="btn btn-ghost btn-reset-pass" data-user="${u.username}">Restablecer contraseña</button>
                      ${u.locked ? `<button class="btn btn-ghost btn-unlock-user" data-user="${u.username}" style="color:var(--orange)">Desbloquear</button>` : ''}
                      ${!isSelf ? `
                        <button class="btn btn-ghost btn-toggle-user" data-user="${u.username}" style="color:${u.active ? 'var(--red)' : 'var(--green)'}">
                          ${u.active ? 'Desactivar' : 'Activar'}
                        </button>
                      ` : ''}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 10. REPORTES (ADMIN)
  reportes: () => {
    return `
      <div class="bento-grid-12">
        <div class="bento-card bento-col-6">
          <div class="bento-card-head">
            <h3 class="bento-card-title">Reporte de Existencias</h3>
            <span class="bento-card-sub">Stock y valorización</span>
          </div>
          <p class="muted" style="font-size:12px">Catálogo completo con stock actual, costos, estado y cobertura.</p>
          <div style="display:flex;gap:10px;margin-top:auto">
            <button class="btn btn-primary export-rep-btn" data-type="existencias">Exportar a CSV</button>
            <button class="btn btn-secondary preview-rep-btn" data-type="existencias">Vista previa</button>
          </div>
        </div>

        <div class="bento-card bento-col-6">
          <div class="bento-card-head">
            <h3 class="bento-card-title">Reporte de Movimientos</h3>
            <span class="bento-card-sub">Histórico</span>
          </div>
          <p class="muted" style="font-size:12px">Registro consolidado de salidas, entradas y ajustes registrados.</p>
          <div style="display:flex;gap:10px;margin-top:auto">
            <button class="btn btn-primary export-rep-btn" data-type="movimientos">Exportar a CSV</button>
            <button class="btn btn-secondary preview-rep-btn" data-type="movimientos">Vista previa</button>
          </div>
        </div>

        <div class="bento-card bento-col-12" id="reportPreviewContainer" style="display:none;padding:0"></div>
      </div>
    `;
  }
};

// -------------------------------------------------------------
// EVENT HANDLERS DE LAS VISTAS
// -------------------------------------------------------------
function bindViewHandlers(view) {
  if (view === 'dashboard') {
    $('#kpiActiveProds').onclick = () => { uiState.inventory.status = ''; go('existencias'); };
    $('#kpiAlertProds').onclick = () => go('alertas');
    $('#kpiStockoutProds').onclick = () => { uiState.inventory.status = 'AGOTADO'; go('existencias'); };
    
    $('#subTabTop').onclick = () => { uiState.dashSubTab = 'top'; go('dashboard'); };
    $('#subTabLowest').onclick = () => { uiState.dashSubTab = 'lowest'; go('dashboard'); };
    $('#subTabExcess').onclick = () => { uiState.dashSubTab = 'excess'; go('dashboard'); };

    $$('.chip-btn[data-range]').forEach(btn => {
      btn.onclick = () => {
        uiState.dashRange = Number(btn.dataset.range);
        go('dashboard');
      };
    });

    $$('.dash-bar-item').forEach(b => {
      b.onclick = () => showProductDetailDrawer(b.dataset.sku);
    });

    $('#mostSeverePill')?.addEventListener('click', () => showProductDetailDrawer($('#mostSeverePill').dataset.sku));
    $('#btnGoToAlerts').onclick = () => go('alertas');

    $('#dashAbcA').onclick = () => filterInventoryABC(0.8);
    $('#dashAbcB').onclick = () => filterInventoryABC(0.95);
    $('#dashAbcC').onclick = () => filterInventoryABC(1.0);



    $('#toggleValuation').onclick = () => {
      store.valuationMode = store.valuationMode === 'cost' ? 'price' : 'cost';
      saveStore();
      go('dashboard');
    };

    $('#btnExportQuickReport').onclick = () => downloadInventoryCSV();
    $('#btnRefreshDashMain').onclick = () => {
      toast('Tablero actualizado', `Datos recalculados a las ${new Date().toLocaleTimeString('es-NI')}.`);
      go('dashboard');
    };
    $('#btnGoToReports').onclick = () => go('reportes');
  }

  if (view === 'vendedorHome') {
    $('#vendedorGoSaleBtn').onclick = () => go('venta');
    $('#vendedorGoAlertsBtn').onclick = () => go('alertas');
    $('#vendedorGoExistencias').onclick = () => go('existencias');
    $('#vendedorGoHistorial').onclick = () => go('historial');

    const qInput = $('#vendedorQuickSku');
    $('#vendedorQuickSearchBtn').onclick = () => {
      const sku = qInput.value.trim().toUpperCase();
      const p = store.products.find(x => x.sku === sku && x.active);
      const resBox = $('#vendedorQuickResult');
      resBox.classList.remove('hidden');
      if (!p) {
        resBox.innerHTML = `<div class="callout" style="background:var(--red-bg);color:var(--red)">SKU no encontrado en catálogo.</div>`;
      } else {
        const m = getProductMetrics(p);
        resBox.innerHTML = `
          <div class="notice">
            <strong>${esc(p.name)} (${p.sku})</strong>
            <span>Precio: <b>${formatC(p.price)}</b> · Stock disponible: <b>${pluralUnits(p.stock)}</b> (<span class="badge ${m.status}">${m.status}</span>)</span>
          </div>
        `;
      }
    };
    $$('.view-product-alert').forEach(item => {
      item.onclick = () => showProductDetailDrawer(item.dataset.sku);
    });
  }

  if (view === 'existencias') {
    const sIn = $('#invSearchInput');
    sIn.oninput = () => {
      uiState.inventory.search = sIn.value;
      uiState.inventory.page = 1;
      go('existencias');
      $('#invSearchInput').focus();
    };
    $('#invCatFilter').onchange = e => {
      uiState.inventory.category = e.target.value;
      uiState.inventory.page = 1;
      go('existencias');
    };
    $('#invStatusFilter').onchange = e => {
      uiState.inventory.status = e.target.value;
      uiState.inventory.page = 1;
      go('existencias');
    };
    $$('.sort-th').forEach(th => {
      th.onclick = () => {
        const col = th.dataset.col;
        if (uiState.inventory.sortCol === col) {
          uiState.inventory.sortDir = uiState.inventory.sortDir === 'asc' ? 'desc' : 'asc';
        } else {
          uiState.inventory.sortCol = col;
          uiState.inventory.sortDir = 'asc';
        }
        go('existencias');
      };
    });
    $('#invPrevPage')?.addEventListener('click', () => {
      if (uiState.inventory.page > 1) { uiState.inventory.page--; go('existencias'); }
    });
    $('#invNextPage')?.addEventListener('click', () => {
      uiState.inventory.page++; go('existencias');
    });
    $('#exportInventoryCsvBtn').onclick = () => downloadInventoryCSV();
    if ($('#openNewProductBtn')) $('#openNewProductBtn').onclick = () => openProductModal();
    $$('.btn-edit-prod').forEach(btn => {
      btn.onclick = e => { e.stopPropagation(); openProductModal(btn.dataset.sku); };
    });
    $$('.row-product').forEach(r => {
      r.onclick = () => showProductDetailDrawer(r.dataset.sku);
    });
  }

  if (view === 'venta') {
    const skuInput = $('#saleSkuInput');
    const suggBox = $('#saleSuggestions');
    skuInput.oninput = () => {
      const q = skuInput.value.trim().toUpperCase();
      if (!q) { suggBox.classList.add('hidden'); return; }
      const matches = store.products.filter(p => p.active && p.sku.includes(q)).slice(0, 5);
      if (matches.length > 0) {
        suggBox.innerHTML = matches.map(m => `
          <div class="suggestion-item" data-sku="${m.sku}">${m.sku} - ${esc(m.name)} (Stock: ${m.stock})</div>
        `).join('');
        suggBox.classList.remove('hidden');
        suggBox.querySelectorAll('.suggestion-item').forEach(it => {
          it.onclick = () => {
            skuInput.value = it.dataset.sku;
            suggBox.classList.add('hidden');
            searchProductForSale(it.dataset.sku);
          };
        });
      } else {
        suggBox.classList.add('hidden');
      }
    };
    skuInput.onkeydown = e => {
      if (e.key === 'Enter') {
        suggBox.classList.add('hidden');
        searchProductForSale(skuInput.value.trim().toUpperCase());
      }
    };
    $('#searchSaleSkuBtn').onclick = () => {
      suggBox.classList.add('hidden');
      searchProductForSale(skuInput.value.trim().toUpperCase());
    };
  }

  if (view === 'alertas') {
    $$('.chip-btn[data-alert-lvl]').forEach(btn => {
      btn.onclick = () => {
        uiState.alerts.level = btn.dataset.alertLvl;
        go('alertas');
      };
    });
    $$('.view-product-alert').forEach(item => {
      item.onclick = () => showProductDetailDrawer(item.dataset.sku);
    });
    $$('.btn-req-restock').forEach(btn => {
      btn.onclick = e => {
        e.stopPropagation();
        openRestockModal(btn.dataset.sku);
      };
    });
  }

  if (view === 'historial') {
    const sInput = $('#histSearchInput');
    const dInput = $('#histDateInput');
    sInput.oninput = () => {
      uiState.history.search = sInput.value;
      uiState.history.page = 1;
      go('historial');
      $('#histSearchInput').focus();
    };
    dInput.oninput = () => {
      uiState.history.date = dInput.value;
      uiState.history.page = 1;
      go('historial');
      $('#histDateInput').focus();
    };
    $('#histPrevPage')?.addEventListener('click', () => {
      if (uiState.history.page > 1) { uiState.history.page--; go('historial'); }
    });
    $('#histNextPage')?.addEventListener('click', () => {
      uiState.history.page++; go('historial');
    });
  }

  if (view === 'productos') {
    $('#tabNewProdBtn').onclick = () => openProductModal();
    $('#tabNewSuppBtn').onclick = () => openSupplierModal();
    $('#subTabProds').onclick = () => { uiState.productsTab = 'products'; go('productos'); };
    $('#subTabSupps').onclick = () => { uiState.productsTab = 'suppliers'; go('productos'); };
    $$('.btn-edit-prod').forEach(btn => btn.onclick = () => openProductModal(btn.dataset.sku));
    $$('.btn-deact-prod').forEach(btn => {
      btn.onclick = () => {
        openModal(
          'Desactivar producto',
          `<p>¿Deseas desactivar el producto <b>${btn.dataset.sku}</b>? Ya no estará disponible para ventas ni entradas.</p>`,
          () => {
            const p = store.products.find(x => x.sku === btn.dataset.sku);
            if (p) {
              p.active = false;
              logAudit('Desactivar producto', p.sku, 'ÉXITO');
              saveStore();
              toast('Producto desactivado', `${p.name} fue retirado.`);
              go('productos');
            }
          },
          'Desactivar',
          true
        );
      };
    });
    $$('.btn-edit-supp').forEach(btn => btn.onclick = () => openSupplierModal(btn.dataset.id));
    $$('.btn-deact-supp').forEach(btn => {
      btn.onclick = () => {
        const sid = btn.dataset.id;
        const linked = store.products.filter(p => p.supplierId === sid && p.active);
        if (linked.length > 0) {
          toast('Acción no permitida', `No se puede desactivar un proveedor que tiene ${linked.length} productos activos asociados.`, true);
          return;
        }
        openModal(
          'Desactivar proveedor',
          `<p>¿Deseas desactivar el proveedor <b>${sid}</b>?</p>`,
          () => {
            const s = store.suppliers.find(x => x.id === sid);
            if (s) {
              s.active = false;
              logAudit('Desactivar proveedor', s.name, 'ÉXITO');
              saveStore();
              toast('Proveedor desactivado', `${s.name} desactivado.`);
              go('productos');
            }
          },
          'Desactivar',
          true
        );
      };
    });
  }

  if (view === 'entradas') {
    const skuIn = $('#entrySku');
    const suggBox = $('#entrySuggestions');
    skuIn.oninput = () => {
      const q = skuIn.value.trim().toUpperCase();
      if (!q) { suggBox.classList.add('hidden'); return; }
      const matches = store.products.filter(p => p.active && p.sku.includes(q)).slice(0, 5);
      if (matches.length > 0) {
        suggBox.innerHTML = matches.map(m => `<div class="suggestion-item" data-sku="${m.sku}">${m.sku} - ${esc(m.name)}</div>`).join('');
        suggBox.classList.remove('hidden');
        suggBox.querySelectorAll('.suggestion-item').forEach(it => {
          it.onclick = () => {
            skuIn.value = it.dataset.sku;
            suggBox.classList.add('hidden');
            const prod = store.products.find(p => p.sku === it.dataset.sku);
            if (prod?.supplierId) $('#entrySupplier').value = prod.supplierId;
          };
        });
      } else {
        suggBox.classList.add('hidden');
      }
    };

    $('#btnSubmitEntry').onclick = () => {
      const sku = skuIn.value.trim().toUpperCase();
      const qty = Number($('#entryQty').value);
      if (!sku) { toast('Campo requerido', 'Ingresa el SKU del producto.', true); return; }
      const prod = store.products.find(p => p.sku === sku && p.active);
      if (!prod) { toast('SKU no encontrado', 'El producto no existe o está inactivo.', true); return; }
      if (isNaN(qty) || qty <= 0 || !Number.isInteger(qty)) { toast('Cantidad inválida', 'Debe ser un número entero mayor que cero.', true); return; }

      const prevM = getProductMetrics(prod);
      prod.stock += qty;
      const newM = getProductMetrics(prod);

      store.movements.unshift({
        id: `MOV-${Date.now().toString().slice(-4)}`,
        date: formatNow(),
        type: 'ENTRADA',
        sku,
        qty,
        user: store.currentUser.username,
        reason: 'Recepción directa'
      });
      logAudit('Registrar entrada', sku, 'ÉXITO');

      if (['AGOTADO','CRÍTICO','BAJO'].includes(prevM.status) && newM.status === 'NORMAL') {
        toast('Alerta cerrada', `${prod.name} superó el punto de reorden y volvió a estado NORMAL.`);
      }
      saveStore();
      toast('Entrada registrada', `Se agregaron ${pluralUnits(qty)} a ${prod.name}. Stock actual: ${pluralUnits(prod.stock)}.`);
      go('entradas');
    };

    $$('.btn-receive-req').forEach(btn => {
      btn.onclick = () => {
        const req = store.restocks.find(r => r.id === btn.dataset.id);
        if (!req) return;
        const prod = store.products.find(p => p.sku === req.sku);
        const qtyVal = req.requestedQty || req.suggested || 1;

        openModal(
          `Recibir solicitud ${req.id}`,
          `
            <div class="field-grid">
              <label>SKU<input value="${req.sku}" disabled /></label>
              <label>Producto<input value="${esc(prod?.name || '')}" disabled /></label>
              <label class="field-wide">Cantidad a recibir
                <input id="receiveReqQty" type="number" min="1" value="${qtyVal}" />
              </label>
            </div>
          `,
          () => {
            const q = Number($('#receiveReqQty').value);
            if (isNaN(q) || q <= 0 || !Number.isInteger(q)) {
              toast('Cantidad inválida', 'Debe ser un entero mayor a cero.', true);
              return false;
            }
            if (prod) {
              const prevM = getProductMetrics(prod);
              prod.stock += q;
              const newM = getProductMetrics(prod);
              req.status = 'RECIBIDA';

              store.movements.unshift({
                id: `MOV-${Date.now().toString().slice(-4)}`,
                date: formatNow(),
                type: 'ENTRADA',
                sku: prod.sku,
                qty: q,
                user: store.currentUser.username,
                reason: `Solicitud ${req.id}`
              });
              logAudit('Recibir reposición', req.id, 'ÉXITO');

              if (['AGOTADO','CRÍTICO','BAJO'].includes(prevM.status) && newM.status === 'NORMAL') {
                toast('Alerta resuelta', `${prod.name} volvió a estado NORMAL.`);
              }
              saveStore();
              toast('Mercancía recibida', `Stock actualizado a ${pluralUnits(prod.stock)}.`);
              go('entradas');
            }
          },
          'Confirmar recepción'
        );
      };
    });
  }

  if (view === 'ajustes') {
    const skuIn = $('#adjSku');
    const suggBox = $('#adjSuggestions');
    skuIn.oninput = () => {
      const q = skuIn.value.trim().toUpperCase();
      if (!q) { suggBox.classList.add('hidden'); return; }
      const matches = store.products.filter(p => p.active && p.sku.includes(q)).slice(0, 5);
      if (matches.length > 0) {
        suggBox.innerHTML = matches.map(m => `<div class="suggestion-item" data-sku="${m.sku}">${m.sku} - ${esc(m.name)} (Stock: ${m.stock})</div>`).join('');
        suggBox.classList.remove('hidden');
        suggBox.querySelectorAll('.suggestion-item').forEach(it => {
          it.onclick = () => {
            skuIn.value = it.dataset.sku;
            suggBox.classList.add('hidden');
          };
        });
      } else {
        suggBox.classList.add('hidden');
      }
    };

    $('#btnSaveAdjustment').onclick = () => {
      const sku = skuIn.value.trim().toUpperCase();
      const type = $('#adjType').value;
      const qty = Number($('#adjQty').value);
      const reason = $('#adjReason').value.trim();

      if (!sku) { toast('SKU requerido', 'Ingresa el código SKU.', true); return; }
      const prod = store.products.find(p => p.sku === sku && p.active);
      if (!prod) { toast('SKU no encontrado', 'El producto no existe en el catálogo.', true); return; }
      if (isNaN(qty) || qty <= 0 || !Number.isInteger(qty)) { toast('Cantidad inválida', 'Debe ser un entero positivo.', true); return; }
      if (!reason) { toast('Motivo obligatorio', 'El motivo es obligatorio para registrar un ajuste.', true); return; }

      if (type === 'disminucion' && prod.stock - qty < 0) {
        toast('Ajuste inválido', `La disminución no puede dejar el stock negativo (disponible: ${prod.stock}).`, true);
        return;
      }

      const diff = type === 'aumento' ? qty : -qty;
      prod.stock += diff;

      store.movements.unshift({
        id: `MOV-${Date.now().toString().slice(-4)}`,
        date: formatNow(),
        type: 'AJUSTE',
        sku,
        qty: diff,
        user: store.currentUser.username,
        reason
      });
      logAudit('Ajuste de inventario', `${sku} (${diff > 0 ? '+' : ''}${diff})`, 'ÉXITO');

      const metrics = getProductMetrics(prod);
      ensureRestockRequest(prod.sku, metrics);
      saveStore();
      toast('Ajuste guardado', `Stock de ${prod.name} actualizado a ${pluralUnits(prod.stock)}.`);
      go('ajustes');
    };
  }

  if (view === 'usuarios') {
    $('#openNewUserBtn').onclick = () => openUserModal();
    $$('.btn-reset-pass').forEach(btn => {
      btn.onclick = () => {
        const u = store.users.find(x => x.username === btn.dataset.user);
        if (!u) return;
        const tempPass = 'Tecno' + Math.floor(1000 + Math.random() * 9000);
        u.pass = tempPass;
        u.locked = false;
        u.failedAttempts = 0;
        logAudit('Restablecer contraseña', u.username, 'ÉXITO');
        saveStore();
        openModal(
          'Nueva contraseña generada',
          `<div class="callout success">Contraseña temporal para <b>${esc(u.username)}</b>: <div style="font-size:18px;font-weight:700;margin-top:8px">${tempPass}</div></div><p class="muted">Entrégala al usuario.</p>`,
          () => true,
          'Entendido'
        );
      };
    });
    $$('.btn-unlock-user').forEach(btn => {
      btn.onclick = () => {
        const u = store.users.find(x => x.username === btn.dataset.user);
        if (u) {
          u.locked = false;
          u.failedAttempts = 0;
          logAudit('Desbloquear usuario', u.username, 'ÉXITO');
          saveStore();
          toast('Usuario desbloqueado', `La cuenta de ${u.username} fue desbloqueada.`);
          go('usuarios');
        }
      };
    });
    $$('.btn-toggle-user').forEach(btn => {
      btn.onclick = () => {
        const u = store.users.find(x => x.username === btn.dataset.user);
        if (!u) return;
        const act = u.active ? 'desactivar' : 'activar';
        openModal(
          `Confirmar ${act}`,
          `<p>¿Deseas ${act} al usuario <b>${esc(u.name)}</b>?</p>`,
          () => {
            u.active = !u.active;
            logAudit(`${act} usuario`, u.username, 'ÉXITO');
            saveStore();
            toast('Estado actualizado', `Usuario ${u.username} ahora está ${u.active ? 'ACTIVO' : 'INACTIVO'}.`);
            go('usuarios');
          },
          u.active ? 'Desactivar' : 'Activar',
          u.active
        );
      };
    });
  }

  if (view === 'reportes') {
    $$('.export-rep-btn').forEach(btn => btn.onclick = () => downloadReportCSV(btn.dataset.type));
    $$('.preview-rep-btn').forEach(btn => btn.onclick = () => showReportPreview(btn.dataset.type));
  }
}

// -------------------------------------------------------------
// VENTANAS MODALES ESPECÍFICAS
// -------------------------------------------------------------
function openRestocksManagementModal() {
  const pending = store.restocks.filter(r => r.status === 'PENDIENTE');
  const approved = store.restocks.filter(r => r.status === 'APROBADA');

  const html = `
    <div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <h4 style="margin:0">Solicitudes de Reposición (${store.restocks.length})</h4>
        <span class="badge ${pending.length > 0 ? 'BAJO' : 'NORMAL'}">${pending.length} Pendientes</span>
      </div>

      <div class="table-scroll" style="max-height:360px">
        <table>
          <thead>
            <tr><th>Solicitud</th><th>Producto</th><th>Sugerida</th><th>Estado</th><th>Acción</th></tr>
          </thead>
          <tbody>
            ${store.restocks.length === 0 ? `<tr><td colspan="5" class="empty">No hay solicitudes registradas.</td></tr>` : store.restocks.map(r => {
              const p = store.products.find(x => x.sku === r.sku);
              return `
                <tr>
                  <td class="sku">${r.id}</td>
                  <td><strong>${esc(p?.name || '')}</strong><br><small class="sku">${r.sku}</small></td>
                  <td><strong>${r.requestedQty || r.suggested} u.</strong></td>
                  <td><span class="badge ${r.status==='PENDIENTE'?'BAJO':r.status==='APROBADA'?'NORMAL':'EXCESO'}">${r.status}</span></td>
                  <td>
                    ${r.status === 'PENDIENTE' ? `
                      <div style="display:flex;gap:6px">
                        <button class="btn btn-primary approve-req-btn" data-id="${r.id}" style="padding:4px 8px;font-size:11px">Aprobar</button>
                        <button class="btn btn-danger reject-req-btn" data-id="${r.id}" style="padding:4px 8px;font-size:11px">Rechazar</button>
                      </div>
                    ` : r.status === 'APROBADA' ? `
                      <button class="btn btn-secondary receive-from-modal" data-id="${r.id}" style="padding:4px 8px;font-size:11px">Ir a Entradas</button>
                    ` : '—'}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  openModal('Gestión de Reposición', html, () => true, 'Cerrar');

  $$('.approve-req-btn').forEach(btn => {
    btn.onclick = () => {
      const r = store.restocks.find(x => x.id === btn.dataset.id);
      if (r) {
        r.status = 'APROBADA';
        logAudit('Aprobar reposición', r.id, 'ÉXITO');
        saveStore();
        toast('Solicitud aprobada', `La reposición ${r.id} ahora está lista en Entradas.`);
        closeModal();
        go(store.currentView);
      }
    };
  });

  $$('.reject-req-btn').forEach(btn => {
    btn.onclick = () => {
      const r = store.restocks.find(x => x.id === btn.dataset.id);
      if (r) {
        r.status = 'RECHAZADA';
        logAudit('Rechazar reposición', r.id, 'ÉXITO');
        saveStore();
        toast('Solicitud rechazada', `La reposición ${r.id} fue rechazada.`);
        closeModal();
        go(store.currentView);
      }
    };
  });

  $$('.receive-from-modal').forEach(btn => {
    btn.onclick = () => {
      closeModal();
      go('entradas');
    };
  });
}

function searchProductForSale(sku) {
  const box = $('#saleProductBox');
  if (!sku) {
    box.classList.remove('hidden');
    box.innerHTML = `<div class="callout warning">Por favor ingresa un código SKU para buscar.</div>`;
    return;
  }
  const p = store.products.find(x => x.sku === sku && x.active);
  if (!p) {
    box.classList.remove('hidden');
    box.innerHTML = `<div class="callout" style="background:var(--red-bg);color:var(--red)">SKU no encontrado. Verifica el código e inténtalo de nuevo.</div>`;
    return;
  }

  const m = getProductMetrics(p);
  box.classList.remove('hidden');
  box.innerHTML = `
    <div class="notice">
      <strong>${esc(p.name)}</strong>
      <span>${p.sku} · Stock actual: <b>${pluralUnits(p.stock)}</b> · Estado: <span class="badge ${m.status}">${m.status}</span></span>
    </div>
    ${p.stock === 0 ? `
      <div class="callout" style="background:var(--red-bg);color:var(--red);margin-top:10px">
        Este producto está AGOTADO. No se pueden procesar salidas.
      </div>
    ` : `
      <label style="margin-top:14px">
        Cantidad a retirar
        <input id="saleQtyInput" type="number" min="1" max="${p.stock}" value="1" />
      </label>
      <button class="btn btn-primary" id="btnConfirmSale" style="margin-top:14px">Registrar salida ↗</button>
    `}
  `;

  if (p.stock > 0) {
    $('#btnConfirmSale').onclick = () => {
      const qty = Number($('#saleQtyInput').value);
      if (isNaN(qty) || qty < 1 || !Number.isInteger(qty)) {
        toast('Cantidad inválida', 'Ingresa una cantidad entera mayor a cero.', true);
        return;
      }
      if (qty > p.stock) {
        toast('Stock insuficiente', `Stock insuficiente: disponible ${p.stock}`, true);
        return;
      }

      const prevStatus = m.status;
      p.stock -= qty;
      p.sales30 = (p.sales30 || 0) + qty;
      const newM = getProductMetrics(p);

      store.movements.unshift({
        id: `MOV-${Date.now().toString().slice(-4)}`,
        date: formatNow(),
        type: 'SALIDA',
        sku: p.sku,
        qty,
        user: store.currentUser.username,
        reason: 'Venta mostrador'
      });
      logAudit('Registrar salida', p.sku, 'ÉXITO');

      if (['AGOTADO', 'CRÍTICO', 'BAJO'].includes(newM.status)) {
        if (prevStatus === 'NORMAL' || newM.status === 'AGOTADO' || newM.status === 'CRÍTICO') {
          toast('Alerta generada', `Se generó una alerta para ${p.name} (${newM.status}).`);
          ensureRestockRequest(p.sku, newM);
        }
      }

      saveStore();
      toast('Salida registrada', `${p.name}: salida de ${pluralUnits(qty)} registrada con éxito.`);
      $('#saleSkuInput').value = '';
      $('#saleProductBox').classList.add('hidden');
      $('#saleSkuInput').focus();
      go('venta');
    };
  }
}

function showProductDetailDrawer(sku) {
  const p = store.products.find(x => x.sku === sku);
  if (!p) return;
  const m = getProductMetrics(p);
  const s = getSupplier(p.supplierId);
  const isAdmin = store.currentUser.role === 'ADMIN';
  const lastMovs = store.movements.filter(mov => mov.sku === sku).slice(0, 5);

  const bodyHtml = `
    <div>
      <h4 style="margin:0 0 4px;font-size:18px">${esc(p.name)}</h4>
      <span class="sku">${p.sku}</span> · <span class="category">${esc(p.category)}</span>
    </div>
    <div class="drawer-metric">
      <div><small>Stock actual</small><strong>${pluralUnits(p.stock)}</strong></div>
      <div><small>Estado</small><strong><span class="badge ${m.status}">${m.status}</span></strong></div>
    </div>
    <div class="drawer-metric">
      <div><small>Consumo diario (CD)</small><strong>${m.cd} u/día</strong></div>
      <div><small>Stock de seguridad (SS)</small><strong>${pluralUnits(m.ss)}</strong></div>
    </div>
    <div class="drawer-metric">
      <div><small>Punto de reorden (PR)</small><strong>${m.pr} u.</strong></div>
      <div><small>Cobertura</small><strong>${m.cd > 0 ? Math.floor(m.coverageDays) + ' días' : 'Sin rotación'}</strong></div>
    </div>
    <div class="drawer-metric">
      <div><small>Proveedor</small><strong>${esc(s.name)}</strong></div>
      <div><small>Tiempo de entrega</small><strong>${m.lead} días</strong></div>
    </div>
    <div class="card" style="padding:14px">
      <h5 style="margin:0 0 10px;font-size:12px;color:var(--muted);text-transform:uppercase">Últimos movimientos</h5>
      ${lastMovs.length === 0 ? `<div class="empty" style="padding:10px">Sin movimientos registrados.</div>` : lastMovs.map(mov => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--line);font-size:12px">
          <div>
            <strong>${mov.type} (${mov.qty > 0 ? '+' : ''}${mov.qty})</strong>
            <small style="display:block;color:var(--muted)">${mov.date} · ${esc(mov.user)}</small>
          </div>
          <span class="badge ${mov.type==='SALIDA'?'NORMAL':'EXCESO'}">${mov.type}</span>
        </div>
      `).join('')}
    </div>
  `;

  openDrawer(`Detalle de ${p.sku}`, bodyHtml, '');
}

function openProductModal(editSku = null) {
  const isEdit = Boolean(editSku);
  const p = isEdit ? store.products.find(x => x.sku === editSku) : null;

  const html = `
    <div class="field-grid">
      <label>SKU único<input id="prodModalSku" value="${esc(p?.sku || '')}" ${isEdit ? 'disabled' : ''} placeholder="Ej. CAR-20W" /></label>
      <label>Nombre del producto<input id="prodModalName" value="${esc(p?.name || '')}" placeholder="Nombre descriptivo" /></label>
      <label>Categoría
        <select id="prodModalCat">
          ${DEFAULT_CATEGORIES.map(c => `<option value="${c}" ${p?.category===c?'selected':''}>${c}</option>`).join('')}
        </select>
      </label>
      <label>Proveedor
        <select id="prodModalSupp">
          ${store.suppliers.filter(s => s.active).map(s => `<option value="${s.id}" ${p?.supplierId===s.id?'selected':''}>${esc(s.name)}</option>`).join('')}
        </select>
      </label>
      <label>Costo (C$)<input id="prodModalCost" type="number" min="1" value="${p?.cost || ''}" placeholder="Costo" /></label>
      <label>Precio (C$)<input id="prodModalPrice" type="number" min="1" value="${p?.price || ''}" placeholder="Precio" /></label>
      <label class="field-wide">Stock actual<input id="prodModalStock" type="number" min="0" value="${p ? p.stock : 0}" /></label>
    </div>
  `;

  openModal(
    isEdit ? `Editar ${p.sku}` : 'Nuevo producto',
    html,
    () => {
      const sku = $('#prodModalSku').value.trim().toUpperCase();
      const name = $('#prodModalName').value.trim();
      const category = $('#prodModalCat').value;
      const supplierId = $('#prodModalSupp').value;
      const cost = Number($('#prodModalCost').value);
      const price = Number($('#prodModalPrice').value);
      const stock = Number($('#prodModalStock').value);

      if (!sku || !name || isNaN(cost) || cost <= 0 || isNaN(price) || price <= 0 || isNaN(stock) || stock < 0) {
        toast('Datos incompletos', 'Completa todos los campos con valores válidos.', true);
        return false;
      }
      if (!isEdit && store.products.some(x => x.sku === sku)) {
        toast('SKU duplicado', 'Ya existe un producto con este código SKU.', true);
        return false;
      }

      if (isEdit) {
        p.name = name; p.category = category; p.supplierId = supplierId; p.cost = cost; p.price = price; p.stock = stock;
        logAudit('Editar producto', p.sku, 'ÉXITO');
        toast('Producto actualizado', `${p.name} guardado correctamente.`);
      } else {
        store.products.push({ sku, name, category, supplierId, cost, price, stock, active: true, sales30: 0, historyDays: 0 });
        logAudit('Crear producto', sku, 'ÉXITO');
        toast('Producto creado', `${name} agregado al catálogo.`);
      }
      saveStore();
      go(store.currentView);
      return true;
    },
    isEdit ? 'Guardar cambios' : 'Crear producto'
  );
}

function openSupplierModal(editId = null) {
  const isEdit = Boolean(editId);
  const s = isEdit ? store.suppliers.find(x => x.id === editId) : null;

  const html = `
    <div class="field-grid">
      <label class="field-wide">Nombre del proveedor<input id="suppModalName" value="${esc(s?.name || '')}" /></label>
      <label class="field-wide">Contacto<input id="suppModalContact" value="${esc(s?.contact || '')}" /></label>
      <label class="field-wide">Días de entrega (1 a 30)<input id="suppModalLead" type="number" min="1" max="30" value="${s ? s.lead : 5}" /></label>
    </div>
  `;

  openModal(
    isEdit ? `Editar ${s.name}` : 'Nuevo proveedor',
    html,
    () => {
      const name = $('#suppModalName').value.trim();
      const contact = $('#suppModalContact').value.trim();
      const lead = Number($('#suppModalLead').value);

      if (!name || !contact || isNaN(lead) || lead < 1 || lead > 30) {
        toast('Datos inválidos', 'Revisa los campos del proveedor.', true);
        return false;
      }
      if (isEdit) {
        s.name = name; s.contact = contact; s.lead = lead;
        logAudit('Editar proveedor', s.id, 'ÉXITO');
      } else {
        const nextId = `SUP-${String(store.suppliers.length + 1).padStart(2, '0')}`;
        store.suppliers.push({ id: nextId, name, contact, lead, active: true });
        logAudit('Crear proveedor', nextId, 'ÉXITO');
      }
      saveStore();
      toast('Proveedor guardado', `${name} procesado correctamente.`);
      go('productos');
      return true;
    }
  );
}

function openUserModal() {
  const html = `
    <div class="field-grid">
      <label>Nombre completo<input id="userModalName" placeholder="Ej. Juan Pérez" /></label>
      <label>Nombre de usuario<input id="userModalUsername" placeholder="Ej. vendedor2" /></label>
      <label>Rol
        <select id="userModalRole">
          <option value="VENDEDOR">VENDEDOR</option>
          <option value="ADMIN">ADMINISTRADOR</option>
        </select>
      </label>
      <label>Contraseña temporal<input id="userModalPass" value="Tecno1234" /></label>
    </div>
  `;
  openModal('Nuevo usuario', html, () => {
    const name = $('#userModalName').value.trim();
    const username = $('#userModalUsername').value.trim().toLowerCase();
    const role = $('#userModalRole').value;
    const pass = $('#userModalPass').value.trim();

    if (!name || !username || !pass || pass.length < 4) {
      toast('Datos incompletos', 'El usuario y contraseña deben ser válidos.', true);
      return false;
    }
    if (store.users.some(u => u.username === username)) {
      toast('Usuario existente', 'Ese nombre de usuario ya está en uso.', true);
      return false;
    }
    store.users.push({ username, name, role, pass, active: true, locked: false, failedAttempts: 0, lastAccess: 'Nunca' });
    logAudit('Crear usuario', username, 'ÉXITO');
    saveStore();
    toast('Usuario registrado', `Se creó el usuario ${username}.`);
    go('usuarios');
    return true;
  });
}

function openRestockModal(presetSku = '') {
  const prods = store.products.filter(p => p.active);
  const selected = presetSku ? prods.find(p => p.sku === presetSku) : prods[0];
  const m = selected ? getProductMetrics(selected) : { suggested: 10 };

  const html = `
    <div class="field-grid">
      <label class="field-wide">Producto a reponer
        <select id="restockModalSku">
          ${prods.map(p => `<option value="${p.sku}" ${p.sku===presetSku?'selected':''}>${p.sku} - ${esc(p.name)} (Stock: ${p.stock})</option>`).join('')}
        </select>
      </label>
      <label class="field-wide">Cantidad sugerida / solicitada
        <input id="restockModalQty" type="number" min="1" value="${m.suggested || 10}" />
      </label>
    </div>
  `;
  openModal('Solicitar reposición manual', html, () => {
    const sku = $('#restockModalSku').value;
    const qty = Number($('#restockModalQty').value);
    if (isNaN(qty) || qty <= 0 || !Number.isInteger(qty)) {
      toast('Cantidad inválida', 'Debe ser un entero mayor a cero.', true);
      return false;
    }
    const nextId = `REP-${String(store.restocks.length + 42).padStart(4, '0')}`;
    store.restocks.unshift({
      id: nextId,
      sku,
      status: store.autoApproveRestock ? 'APROBADA' : 'PENDIENTE',
      suggested: qty,
      requestedQty: qty,
      created: formatNow().split(',')[0],
      reason: 'Solicitud manual'
    });
    logAudit('Solicitar reposición', `${sku} (${qty} u.)`, 'ÉXITO');
    saveStore();
    toast('Solicitud creada', `Reposición ${nextId} para ${sku} registrada.`);
    go(store.currentView);
    return true;
  });
}

function filterInventoryABC(threshold) {
  uiState.inventory.search = '';
  uiState.inventory.status = '';
  go('existencias');
}

// -------------------------------------------------------------
// REPORTES & CSV
// -------------------------------------------------------------
function downloadInventoryCSV() {
  const isAdmin = store.currentUser.role === 'ADMIN';
  const headers = isAdmin
    ? ['SKU', 'Producto', 'Categoría', 'Stock', 'Estado', 'Costo', 'Precio', 'Consumo Diario', 'Cobertura']
    : ['SKU', 'Producto', 'Categoría', 'Stock', 'Estado', 'Precio', 'Consumo Diario', 'Cobertura'];

  const rows = store.products.filter(p => p.active).map(p => {
    const m = getProductMetrics(p);
    return isAdmin
      ? [p.sku, p.name, p.category, p.stock, m.status, p.cost, p.price, m.cd, Math.floor(m.coverageDays)]
      : [p.sku, p.name, p.category, p.stock, m.status, p.price, m.cd, Math.floor(m.coverageDays)];
  });

  const csv = [headers, ...rows].map(r => r.map(x => `"${String(x).replaceAll('"', '""')}"`).join(',')).join('\n');
  triggerDownload(csv, 'tecnoparts-existencias.csv');
}

function downloadReportCSV(type) {
  let headers = [];
  let rows = [];
  if (type === 'existencias') {
    headers = ['SKU', 'Producto', 'Categoría', 'Stock', 'Estado', 'Costo', 'Precio'];
    rows = store.products.filter(p => p.active).map(p => [p.sku, p.name, p.category, p.stock, getProductMetrics(p).status, p.cost, p.price]);
  } else if (type === 'movimientos') {
    headers = ['ID', 'Fecha', 'Tipo', 'SKU', 'Cantidad', 'Usuario', 'Motivo'];
    rows = store.movements.map(m => [m.id, m.date, m.type, m.sku, m.qty, m.user, m.reason]);
  }
  const csv = [headers, ...rows].map(r => r.map(x => `"${String(x).replaceAll('"', '""')}"`).join(',')).join('\n');
  triggerDownload(csv, `tecnoparts-${type}.csv`);
}

function triggerDownload(content, filename) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  toast('Descarga iniciada', `El archivo ${filename} se descargó correctamente.`);
}

function showReportPreview(type) {
  const box = $('#reportPreviewContainer');
  if (!box) return;
  box.style.display = 'block';

  if (type === 'existencias') {
    box.innerHTML = `
      <div class="table-tools" style="border:0">
        <h4 style="margin:0;flex:1">Vista previa: Existencias actuales</h4>
        <button class="btn btn-secondary" onclick="window.print()">Imprimir reporte</button>
      </div>
      <div class="table-scroll">
        <table>
          <thead><tr><th>SKU</th><th>Producto</th><th>Categoría</th><th>Stock</th><th>Estado</th><th>Costo</th><th>Total</th></tr></thead>
          <tbody>
            ${store.products.filter(p => p.active).map(p => `
              <tr>
                <td class="sku">${p.sku}</td><td><strong>${esc(p.name)}</strong></td><td>${esc(p.category)}</td>
                <td>${pluralUnits(p.stock)}</td><td><span class="badge ${getProductMetrics(p).status}">${getProductMetrics(p).status}</span></td>
                <td>${formatC(p.cost)}</td><td><strong>${formatC(p.stock * p.cost)}</strong></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } else if (type === 'movimientos') {
    box.innerHTML = `
      <div class="table-tools" style="border:0">
        <h4 style="margin:0;flex:1">Vista previa: Movimientos recientes</h4>
        <button class="btn btn-secondary" onclick="window.print()">Imprimir reporte</button>
      </div>
      <div class="table-scroll">
        <table>
          <thead><tr><th>Fecha</th><th>Tipo</th><th>SKU</th><th>Cantidad</th><th>Usuario</th><th>Motivo</th></tr></thead>
          <tbody>
            ${store.movements.map(m => `
              <tr>
                <td>${m.date}</td><td><span class="badge ${m.type==='SALIDA'?'NORMAL':m.type==='ENTRADA'?'EXCESO':'BAJO'}">${m.type}</span></td>
                <td class="sku">${m.sku}</td><td><strong>${m.qty}</strong></td><td>${esc(m.user)}</td><td>${esc(m.reason || '—')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
}

// -------------------------------------------------------------
// EVENTOS GLOBALES Y TEMAS (LIGHT / DARK)
// -------------------------------------------------------------
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  const icon = $('#themeIcon');
  if (icon) icon.textContent = theme === 'dark' ? '☾' : '☼';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

function setupGlobalEvents() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(savedTheme);

  $('#themeToggleBtn').onclick = toggleTheme;

  $('#loginForm').onsubmit = e => {
    e.preventDefault();
    const uVal = $('#loginUser').value.trim();
    const pVal = $('#loginPassword').value.trim();
    const errBox = $('#loginError');

    const user = store.users.find(u => u.username.toLowerCase() === uVal.toLowerCase());
    if (!user) {
      errBox.textContent = 'Usuario o contraseña incorrectos';
      errBox.classList.remove('hidden');
      return;
    }
    if (!user.active) {
      errBox.textContent = 'Esta cuenta está desactivada. Contacte al administrador.';
      errBox.classList.remove('hidden');
      logAudit('Intento fallido', user.username, 'ERROR', user.username);
      return;
    }
    if (user.locked) {
      errBox.textContent = 'Cuenta bloqueada. Contacte al administrador.';
      errBox.classList.remove('hidden');
      logAudit('Intento cuenta bloqueada', user.username, 'ERROR', user.username);
      return;
    }

    if (user.pass === pVal) {
      user.failedAttempts = 0;
      user.lastAccess = formatNow();
      store.currentUser = user;
      store.currentView = user.role === 'ADMIN' ? 'dashboard' : 'vendedorHome';
      logAudit('Inicio de sesión', 'Sesión iniciada', 'ÉXITO', user.username);
      saveStore();
      toast('Bienvenido', `Sesión iniciada como ${user.name}`);
      refreshAppUI();
    } else {
      user.failedAttempts = (user.failedAttempts || 0) + 1;
      logAudit('Contraseña errónea', user.username, 'ERROR', user.username);
      if (user.failedAttempts >= 5) {
        user.locked = true;
        saveStore();
        errBox.textContent = 'Cuenta bloqueada. Contacte al administrador.';
      } else {
        saveStore();
        errBox.textContent = `Usuario o contraseña incorrectos (Intento ${user.failedAttempts} de 5)`;
      }
      errBox.classList.remove('hidden');
    }
  };

  $$('[data-demo-login]').forEach(btn => {
    btn.onclick = () => {
      const uName = btn.dataset.demoLogin;
      const user = store.users.find(u => u.username === uName);
      if (user && user.active && !user.locked) {
        user.failedAttempts = 0;
        user.lastAccess = formatNow();
        store.currentUser = user;
        store.currentView = user.role === 'ADMIN' ? 'dashboard' : 'vendedorHome';
        logAudit('Inicio de sesión rápido', 'Demo', 'ÉXITO', user.username);
        saveStore();
        toast('Bienvenido', `Acceso de demostración como ${user.name}`);
        refreshAppUI();
      } else if (user?.locked) {
        toast('Cuenta bloqueada', 'Esta cuenta está bloqueada por intentos fallidos.', true);
      }
    };
  });

  $('#userMenuBtn')?.addEventListener('click', e => {
    e.stopPropagation();
    openUserDropdown();
  });
  $('#railAvatarBtn')?.addEventListener('click', e => {
    e.stopPropagation();
    openUserDropdown(true);
  });

  $('#supportModalBtn')?.addEventListener('click', () => {
    const role = store.currentUser?.role;
    openModal(
      'Centro de Soporte y Ayuda',
      `
        <div style="line-height:1.6">
          <p><b>Rol activo:</b> ${role === 'ADMIN' ? 'Administrador' : 'Vendedor'}</p>
          <hr style="border:0;border-top:1px solid var(--line);margin:12px 0" />
          ${role === 'ADMIN' ? `
            <p>• <b>Tablero Bento:</b> Rotación, menor cobertura, excedentes y clasificación ABC.</p>
            <p>• <b>Existencias:</b> Inventario con filtros, ordenación y paginación en tiempo real.</p>
            <p>• <b>Entradas & Ajustes:</b> Confirmación de abastecimiento y correcciones con motivo obligatorio.</p>
            <p>• <b>Usuarios:</b> Creación, desbloqueo y restablecimiento de credenciales.</p>
          ` : `
            <p>• <b>Inicio:</b> Resumen del mostrador y accesos rápidos a operaciones.</p>
            <p>• <b>Registrar venta:</b> Búsqueda por SKU y salida inmediata de mercancía.</p>
            <p>• <b>Alertas & Historial:</b> Consulta de alertas activas y tus ventas del turno.</p>
          `}
        </div>
      `,
      () => true,
      'Entendido'
    );
  });

  $('#notificationBtn')?.addEventListener('click', e => {
    e.stopPropagation();
    const existing = $('.notif-popover');
    if (existing) { existing.remove(); return; }
    const alerts = getActiveAlerts();
    const pop = document.createElement('div');
    pop.className = 'notif-popover';
    pop.innerHTML = `
      <div class="notif-head">
        <h4 style="margin:0;font-size:13px">Alertas de inventario (${alerts.length})</h4>
        <small style="color:var(--muted)">Atención inmediata</small>
      </div>
      <div class="notif-list">
        ${alerts.length === 0 ? `<div class="empty" style="padding:15px">No hay alertas activas.</div>` : alerts.map(a => `
          <div class="notif-item" data-sku="${a.product.sku}">
            <div>
              <strong style="font-size:12px;display:block">${esc(a.product.name)}</strong>
              <small style="color:var(--muted)">Stock: ${pluralUnits(a.product.stock)}</small>
            </div>
            <span class="badge ${a.metrics.status}">${a.metrics.status}</span>
          </div>
        `).join('')}
      </div>
    `;
    $('.bento-topbar-actions').appendChild(pop);
    pop.querySelectorAll('.notif-item').forEach(it => {
      it.onclick = () => { pop.remove(); go('alertas'); };
    });
  });

  document.addEventListener('click', () => {
    $('.notif-popover')?.remove();
    $('.user-dropdown')?.remove();
    $('#saleSuggestions')?.classList.add('hidden');
    $('#entrySuggestions')?.classList.add('hidden');
    $('#adjSuggestions')?.classList.add('hidden');
  });
}

function switchUserTo(targetUsername) {
  const target = store.users.find(u => u.username === targetUsername);
  if (!target) {
    toast('Usuario no encontrado', 'No se encontró la cuenta solicitada.', true);
    return;
  }
  if (!target.active) {
    toast('Cuenta inactiva', 'Esta cuenta está desactivada.', true);
    return;
  }
  if (target.locked) {
    toast('Cuenta bloqueada', 'Esta cuenta está bloqueada por intentos fallidos.', true);
    return;
  }

  logAudit('Cambio de usuario', `Cambio a ${target.username}`, 'ÉXITO', store.currentUser?.username);
  target.failedAttempts = 0;
  target.lastAccess = formatNow();
  store.currentUser = target;
  store.currentView = target.role === 'ADMIN' ? 'dashboard' : 'vendedorHome';
  saveStore();
  toast('Sesión cambiada', `Ahora estás como ${target.name} (${target.role})`);
  refreshAppUI();
}

function openUserDropdown(fromRail = false) {
  const existing = $('.user-dropdown');
  if (existing) { existing.remove(); return; }

  const drop = document.createElement('div');
  drop.className = 'user-dropdown' + (fromRail ? ' from-rail' : '');

  const otherUsers = store.users.filter(u => u.username !== store.currentUser.username && u.active && !u.locked);

  drop.innerHTML = `
    <div style="padding:6px 10px;font-size:11px;color:var(--muted);border-bottom:1px solid var(--line)">
      Conectado como: <b>${store.currentUser.username}</b>
      <div style="font-size:10px;color:var(--green);font-weight:700">${store.currentUser.role === 'ADMIN' ? 'Administrador' : 'Vendedor'}</div>
    </div>
    
    ${otherUsers.length > 0 ? `
      <div class="user-dropdown-section">Cambiar a otro usuario:</div>
      ${otherUsers.map(u => `
        <button class="btn-switch-user" data-switch-user="${u.username}">
          <span style="font-size:14px">${u.role === 'ADMIN' ? '🛡️' : '👤'}</span>
          <div style="text-align:left;line-height:1.2">
            <div>${esc(u.name)}</div>
            <small style="color:var(--muted);font-weight:400;font-size:10px">${u.username} · ${u.role}</small>
          </div>
        </button>
      `).join('')}
      <div style="border-bottom:1px solid var(--line);margin:4px 0"></div>
    ` : ''}

    <button id="dropResetBtn" style="color:var(--green)">↻ Restablecer datos de ejemplo</button>
    <button id="dropLogoutBtn">↪ Cerrar sesión</button>
  `;

  if (fromRail) {
    $('#railAvatarBtn').appendChild(drop);
  } else {
    $('#userMenuWrapper').appendChild(drop);
  }

  drop.querySelectorAll('.btn-switch-user').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      drop.remove();
      switchUserTo(btn.dataset.switchUser);
    };
  });

  $('#dropResetBtn').onclick = (e) => {
    e.stopPropagation();
    drop.remove();
    openModal(
      'Restablecer datos de prueba',
      '<p>¿Deseas reiniciar los datos a su estado original de fábrica?</p>',
      () => resetToDefault(true),
      'Restablecer',
      true
    );
  };

  $('#dropLogoutBtn').onclick = (e) => {
    e.stopPropagation();
    drop.remove();
    logout();
  };
}

function logout() {
  if (store.currentUser) {
    logAudit('Cierre de sesión', 'Sesión cerrada', 'ÉXITO', store.currentUser.username);
  }
  store.currentUser = null;
  saveStore();
  toast('Sesión finalizada', 'Has cerrado sesión correctamente.');
  showLoginView();
}

window.addEventListener('DOMContentLoaded', () => {
  loadStore();
  setupGlobalEvents();
  refreshAppUI();
});
