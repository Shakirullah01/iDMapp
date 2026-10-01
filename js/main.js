/* ============================================
   iMD Medical Resources — Main JavaScript
   ============================================
   Update the configuration below when site details change.
   ============================================ */

const SITE_CONFIG = {
  /* Brand name shown in footer copyright & dynamic spots */
  BRAND_NAME: "iMD Medical Resources",

  /* Configured support channels used by site contact links */
  WHATSAPP_NUMBER: "+923135025985",
  TELEGRAM_USERNAME: "iMDapp_official",
  CONTACT_EMAIL: "info@imedicaldoctor.com",

  /* Pricing display — change these strings anytime */
  PRICES: {
    sixMonths: "$50",
    oneYear: "$75",
    twoYears: "$150"
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
  const number = SITE_CONFIG.WHATSAPP_NUMBER.replace(/\D/g, "");
  let message = "Hello, I would like to get access to iMD app";
  if (planLabel) {
    const planKey = Object.keys(SITE_CONFIG.PLANS).find((key) => SITE_CONFIG.PLANS[key] === planLabel);
    message = `Hello, I would like to get access to iMD app.\nPlan: ${planLabel} — ${planKey ? SITE_CONFIG.PRICES[planKey] : ""}`;
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
  if (!modal) {
    document.querySelectorAll("[data-open-access]").forEach((el) => {
      el.removeAttribute("data-open-access");
      el.setAttribute("href", "pricing.html");
    });
    return;
  }

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

function initFloatingWhatsApp() {
  if (document.querySelector(".whatsapp-float")) return;

  const link = document.createElement("a");
  link.className = "whatsapp-float";
  link.href = getWhatsAppUrl();
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", "Contact us on WhatsApp");
  link.title = "Contact us on WhatsApp";
  Object.assign(link.style, {
    position: "fixed", right: "1rem", bottom: "calc(1rem + env(safe-area-inset-bottom))",
    zIndex: "150", display: "inline-flex", alignItems: "center", gap: ".55rem",
    padding: ".4rem .95rem .4rem .4rem", borderRadius: "999px", background: "#25D366",
    color: "#fff", textDecoration: "none", boxShadow: "0 .5rem 1.25rem rgba(15,23,42,.2)"
  });
  link.innerHTML = '<span class="whatsapp-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.198.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></span><span class="whatsapp-label">Get Access</span><span class="whatsapp-ripple whatsapp-ripple--one" aria-hidden="true"></span><span class="whatsapp-ripple whatsapp-ripple--two" aria-hidden="true"></span><span class="whatsapp-ripple whatsapp-ripple--three" aria-hidden="true"></span>';
  const whatsappIcon = link.querySelector(".whatsapp-icon");
  Object.assign(whatsappIcon.style, {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: "2.7rem", height: "2.7rem", flex: "0 0 2.7rem", borderRadius: "50%",
    background: "#fff", color: "#25D366"
  });
  Object.assign(whatsappIcon.querySelector("svg").style, { display: "block", width: "1.55rem", height: "1.55rem" });
  Object.assign(link.querySelector(".whatsapp-label").style, { color: "#fff", fontSize: ".9rem", fontWeight: "700" });
  document.body.appendChild(link);
}

function initFloatingTelegram() {
  if (document.querySelector(".telegram-float")) return;

  const link = document.createElement("a");
  link.className = "telegram-float";
  link.href = getTelegramUrl();
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", "Contact us on Telegram");
  link.title = "Contact us on Telegram";
  Object.assign(link.style, {
    position: "fixed", right: "1rem", bottom: "calc(5rem + env(safe-area-inset-bottom))",
    zIndex: "150", display: "inline-flex", alignItems: "center", gap: ".5rem",
    padding: ".75rem 1rem", borderRadius: "999px", background: "#229ED9",
    color: "#fff", fontWeight: "700", textDecoration: "none",
    boxShadow: "0 .5rem 1.25rem rgba(15,23,42,.2)",
    transition: "transform .2s ease, background-color .2s ease, box-shadow .2s ease"
  });
  link.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.05 2.15a1.5 1.5 0 0 0-1.53-.22L2.1 9.18a1.5 1.5 0 0 0 .1 2.82l4.7 1.57 1.76 5.26a1.5 1.5 0 0 0 2.63.43l2.6-3.27 4.52 3.4a1.5 1.5 0 0 0 2.36-.9l2.74-14.78a1.5 1.5 0 0 0-.56-1.56ZM9.05 13.1l8.64-6.48-6.98 8.08-.36 2.25-1.3-3.85Z"/></svg><span>Telegram</span>';
  Object.assign(link.querySelector("svg").style, {
    display: "block", width: "1.4rem", height: "1.4rem", flex: "0 0 1.4rem", fill: "currentColor"
  });
  const highlight = () => {
    link.style.backgroundColor = "#168AC4";
    link.style.transform = "translateY(-2px) scale(1.04)";
    link.style.boxShadow = "0 .75rem 1.5rem rgba(15,23,42,.25)";
  };
  const resetHighlight = () => {
    link.style.backgroundColor = "#229ED9";
    link.style.transform = "translateY(0) scale(1)";
    link.style.boxShadow = "0 .5rem 1.25rem rgba(15,23,42,.2)";
  };
  link.addEventListener("mouseenter", highlight);
  link.addEventListener("mouseleave", resetHighlight);
  link.addEventListener("focus", highlight);
  link.addEventListener("blur", resetHighlight);
  if (typeof link.animate === "function" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    link.animate(
      [
        { filter: "drop-shadow(0 0 0 rgba(34,158,217,0))" },
        { filter: "drop-shadow(0 0 10px rgba(34,158,217,.8))" },
        { filter: "drop-shadow(0 0 0 rgba(34,158,217,0))" }
      ],
      { duration: 2200, iterations: Infinity, easing: "ease-in-out" }
    );
  }
  document.body.appendChild(link);
}

function initUtilityNavigation() {
  document.querySelectorAll(".nav__menu").forEach((menu) => {
    const cta = menu.querySelector("[data-open-access]");
    if (!menu.querySelector('a[href="download.html"]')) {
      const download = document.createElement("a");
      download.className = "nav__link";
      download.href = "download.html";
      download.textContent = "Download";
      menu.insertBefore(download, cta || null);
    }
    const login = menu.querySelector('a[href="login.html"]') || menu.querySelector(".nav__link--login");
    if (login) {
      login.classList.add("nav__link--login");
      login.href = "https://imdweb.org/login";
      login.textContent = "iMD web";
    } else {
      const webLogin = document.createElement("a");
      webLogin.className = "nav__link nav__link--login";
      webLogin.href = "https://imdweb.org/login";
      webLogin.textContent = "iMD web";
      menu.insertBefore(webLogin, cta || null);
    }
    if (!menu.querySelector('[data-nav-contact]')) {
      const contact = document.createElement("a");
      contact.className = "nav__link nav__link--contact";
      contact.href = getWhatsAppUrl();
      contact.target = "_blank";
      contact.rel = "noopener noreferrer";
      contact.textContent = "Register/Extend";
      contact.setAttribute("data-nav-contact", "true");
      menu.insertBefore(contact, cta || null);
    }
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
  initFloatingWhatsApp();
  initFloatingTelegram();
  applyPrices();
  initThemeToggle();
  initUtilityNavigation();
  initMobileNav();
  initAccessModal();
  initFaq();
  initResources();
});
