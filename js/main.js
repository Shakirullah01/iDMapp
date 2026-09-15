/* ============================================
   MedAccess — Main JavaScript
   ============================================
   EDIT THESE VALUES before going live:
   ============================================ */

const SITE_CONFIG = {
  /* Brand name shown in footer copyright & dynamic spots */
  BRAND_NAME: "iMD Medical Resources",

  /* Contact channels — replace placeholders with your real details */
  WHATSAPP_NUMBER: "+923135025985",       // e.g. "1234567890" (country code, no + or spaces)
  TELEGRAM_USERNAME: "iMDapp_official",   // e.g. "yourusername" (without @)
  CONTACT_EMAIL: "info@imedicaldoctor.com",          // e.g. "hello@yourdomain.com"

  /* Pricing display — change these strings anytime */
  PRICES: {
    sixMonths: "$50",
    oneYear: "$100",
    twoYears: "$200"
  },

  /* Plan labels used in contact messages */
  PLANS: {
    sixMonths: "6 Months",
    oneYear: "1 Year",
    twoYears: "2 Years"
  }
};

/* ============================================
   Contact link builders
   ============================================ */

function getWhatsAppUrl(planLabel) {
  const number = SITE_CONFIG.WHATSAPP_NUMBER;
  let message = "Hello, I would like to get access to the medical resource platform.";
  if (planLabel) {
    message = `Hello, I would like to get access to the ${planLabel} plan.`;
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function getTelegramUrl() {
  return `https://t.me/${SITE_CONFIG.TELEGRAM_USERNAME}`;
}

function getEmailUrl(planLabel) {
  const email = SITE_CONFIG.CONTACT_EMAIL;
  const subject = planLabel
    ? `Access Request - ${planLabel} Plan`
    : "Access Request";
  const body = planLabel
    ? `Hello, I would like to get access to the ${planLabel} plan. Please send me the payment instructions.`
    : "Hello, I would like to get access to the medical resource platform. Please send me the payment instructions.";
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/* ============================================
   Access modal
   ============================================ */

let selectedPlan = null;

function openAccessModal(planKey) {
  const modal = document.getElementById("access-modal");
  if (!modal) return;

  selectedPlan = planKey || null;
  const planLabel = planKey && SITE_CONFIG.PLANS[planKey]
    ? SITE_CONFIG.PLANS[planKey]
    : null;

  const planEl = document.getElementById("modal-plan-label");
  if (planEl) {
    if (planLabel) {
      planEl.textContent = `Selected plan: ${planLabel}`;
      planEl.classList.add("is-visible");
    } else {
      planEl.textContent = "";
      planEl.classList.remove("is-visible");
    }
  }

  updateModalLinks(planLabel);

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  const closeBtn = modal.querySelector(".modal__close");
  if (closeBtn) closeBtn.focus();
}

function closeAccessModal() {
  const modal = document.getElementById("access-modal");
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  selectedPlan = null;
}

function updateModalLinks(planLabel) {
  const wa = document.getElementById("modal-whatsapp");
  const tg = document.getElementById("modal-telegram");
  const em = document.getElementById("modal-email");

  if (wa) wa.href = getWhatsAppUrl(planLabel);
  if (tg) tg.href = getTelegramUrl();
  if (em) em.href = getEmailUrl(planLabel);
}

function initAccessModal() {
  const modal = document.getElementById("access-modal");
  if (!modal) return;

  document.querySelectorAll("[data-open-access]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const plan = el.getAttribute("data-plan") || null;
      openAccessModal(plan);
    });
  });

  modal.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeAccessModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeAccessModal();
    }
  });
}

/* ============================================
   Mobile navigation
   ============================================ */

function initMobileNav() {
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__menu");
  const backdrop = document.querySelector(".nav__backdrop");
  if (!toggle || !menu) return;

  function setOpen(isOpen) {
    toggle.setAttribute("aria-expanded", String(isOpen));
    menu.classList.toggle("is-open", isOpen);
    if (backdrop) backdrop.classList.toggle("is-open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!open);
  });

  if (backdrop) {
    backdrop.addEventListener("click", () => setOpen(false));
  }

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });
}

/* ============================================
   Brand name injection & contact hrefs
   ============================================ */

function applyBrandName() {
  document.querySelectorAll("[data-brand]").forEach((el) => {
    el.textContent = SITE_CONFIG.BRAND_NAME;
  });

  document.title = document.title.replace(/YOUR BRAND/g, SITE_CONFIG.BRAND_NAME);

  document.querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]').forEach((meta) => {
    if (meta.content) {
      meta.content = meta.content.replace(/YOUR BRAND/g, SITE_CONFIG.BRAND_NAME);
    }
  });
}

function applyContactLinks() {
  document.querySelectorAll("[data-contact='whatsapp']").forEach((el) => {
    const plan = el.getAttribute("data-plan") || null;
    const label = plan && SITE_CONFIG.PLANS[plan] ? SITE_CONFIG.PLANS[plan] : null;
    el.href = getWhatsAppUrl(label);
  });

  document.querySelectorAll("[data-contact='telegram']").forEach((el) => {
    el.href = getTelegramUrl();
  });

  document.querySelectorAll("[data-contact='email']").forEach((el) => {
    const plan = el.getAttribute("data-plan") || null;
    const label = plan && SITE_CONFIG.PLANS[plan] ? SITE_CONFIG.PLANS[plan] : null;
    el.href = getEmailUrl(label);
  });
}

function applyPrices() {
  document.querySelectorAll("[data-price='sixMonths']").forEach((el) => {
    el.textContent = SITE_CONFIG.PRICES.sixMonths;
  });
  document.querySelectorAll("[data-price='oneYear']").forEach((el) => {
    el.textContent = SITE_CONFIG.PRICES.oneYear;
  });
  document.querySelectorAll("[data-price='twoYears']").forEach((el) => {
    el.textContent = SITE_CONFIG.PRICES.twoYears;
  });
}

/* ============================================
   FAQ accordion
   ============================================ */

function initFaq() {
  document.querySelectorAll(".faq-item__question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const isOpen = item.classList.contains("is-open");

      document.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
        openItem.classList.remove("is-open");
        const q = openItem.querySelector(".faq-item__question");
        if (q) q.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* ============================================
   Resource library (resources.html)
   ============================================ */

let allResources = [];
let activeCategory = "All";
let activeType = "All";
let searchQuery = "";

async function initResources() {
  const grid = document.getElementById("resource-grid");
  if (!grid) return;

  try {
    const response = await fetch("data/resources.json");
    if (!response.ok) throw new Error("Failed to load resources");
    const data = await response.json();
    allResources = data.resources || [];
  } catch (err) {
    grid.innerHTML = `
      <div class="resource-empty">
        <p>Unable to load resources. Please check <code>data/resources.json</code>.</p>
      </div>`;
    console.error(err);
    return;
  }

  const searchInput = document.getElementById("resource-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderResources();
    });
  }

  document.querySelectorAll("[data-filter-category]").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("[data-filter-category]").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activeCategory = chip.getAttribute("data-filter-category");
      renderResources();
    });
  });

  document.querySelectorAll("[data-filter-type]").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("[data-filter-type]").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activeType = chip.getAttribute("data-filter-type");
      renderResources();
    });
  });

  /* Pre-select category from URL ?category=USMLE */
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get("category");
  if (catParam) {
    const match = document.querySelector(`[data-filter-category="${catParam}"]`);
    if (match) {
      document.querySelectorAll("[data-filter-category]").forEach((c) => c.classList.remove("is-active"));
      match.classList.add("is-active");
      activeCategory = catParam;
    }
  }

  renderResources();
}

function renderResources() {
  const grid = document.getElementById("resource-grid");
  if (!grid) return;

  const filtered = allResources.filter((item) => {
    const matchesCategory =
      activeCategory === "All" ||
      item.category === activeCategory ||
      (item.tags && item.tags.includes(activeCategory));

    const matchesType =
      activeType === "All" || item.type === activeType;

    const haystack = `${item.title} ${item.description} ${item.category} ${item.type}`.toLowerCase();
    const matchesSearch = !searchQuery || haystack.includes(searchQuery);

    return matchesCategory && matchesType && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="resource-empty">
        <p>No resources match your filters. Try a different search or category.</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered
    .map(
      (item) => `
    <article class="card resource-card">
      <div class="resource-card__meta">
        <span class="tag tag--category">${escapeHtml(item.category)}</span>
        <span class="tag">${escapeHtml(item.type)}</span>
      </div>
      <h3 class="card__title">${escapeHtml(item.title)}</h3>
      <p class="card__text">${escapeHtml(item.description)}</p>
      <button type="button" class="card__link" data-open-access style="background:none;border:none;padding:0;cursor:pointer;font:inherit;">
        Get Access
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6"/>
        </svg>
      </button>
    </article>`
    )
    .join("");

  grid.querySelectorAll("[data-open-access]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openAccessModal(null);
    });
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ============================================
   Day / Night theme
   ============================================ */

const THEME_KEY = "medaccess-theme";

function getPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

function applyTheme(theme) {
  const next = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem(THEME_KEY, next);

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    const isDark = next === "dark";
    btn.setAttribute("aria-label", isDark ? "Switch to day view" : "Switch to night view");
    btn.setAttribute("title", isDark ? "Day view" : "Night view");
  });
}

function initThemeToggle() {
  applyTheme(getPreferredTheme());

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });
}

/* ============================================
   Init
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  applyBrandName();
  applyContactLinks();
  applyPrices();
  initThemeToggle();
  initMobileNav();
  initAccessModal();
  initFaq();
  initResources();
});
