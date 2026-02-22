const WHATSAPP_NUMBER = "60123456789";

const formatDateValue = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const buildWhatsAppUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const orderForm = document.getElementById("orderForm");

if (orderForm) {
  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(orderForm);
    const name = data.get("name");
    const eventType = data.get("event");
    const date = data.get("date");
    const budget = data.get("budget");
    const notes = data.get("notes");

    const message =
      `Hai Anys Maniz! Saya ${name}.` +
      `\nJenis majlis: ${eventType}` +
      `\nTarikh: ${date}` +
      `\nBajet: ${budget}` +
      (notes ? `\nNota: ${notes}` : "");

    window.open(buildWhatsAppUrl(message), "_blank");
  });
}

const navLinks = document.querySelectorAll(".nav a");
const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");

const closeNav = () => {
  if (!nav || !navToggle) return;
  nav.classList.remove("open");
  navToggle.classList.remove("active");
  navToggle.setAttribute("aria-expanded", "false");
};

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!nav.contains(target) && !navToggle.contains(target)) {
      closeNav();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeNav();
  });
});

const topbar = document.querySelector(".topbar");
const backToTopButton = document.querySelector(".back-to-top");
const progressBar = document.querySelector(".scroll-progress span");

if (topbar) {
  const onScroll = () => {
    topbar.classList.toggle("scrolled", window.scrollY > 10);
    if (backToTopButton) {
      backToTopButton.classList.toggle("show", window.scrollY > 380);
    }
    if (progressBar) {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = total > 0 ? (window.scrollY / total) * 100 : 0;
      progressBar.style.width = `${Math.min(Math.max(ratio, 0), 100)}%`;
    }
  };

  window.addEventListener("scroll", onScroll);
  onScroll();
}

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const dateInput = document.getElementById("date");
if (dateInput) {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 3);
  dateInput.min = formatDateValue(minDate);
}

const galleryItems = document.querySelectorAll(".gallery-item");
if (galleryItems.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Tutup">x</button>
    <img src="" alt="" />
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  const closeLightbox = () => lightbox.classList.remove("open");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const src = item.getAttribute("data-src");
      const alt = item.getAttribute("data-alt") || "Galeri kek";
      if (!src || !lightboxImg) return;
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightbox.classList.add("open");
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}

const sections = document.querySelectorAll("main section[id]");
if (sections.length && navLinks.length) {
  const navLinkMap = new Map();
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      navLinkMap.set(href.slice(1), link);
    }
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        if (!id) return;
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = navLinkMap.get(id);
        if (activeLink) activeLink.classList.add("active");
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const revealTargets = document.querySelectorAll(
  ".section, .menu-card, .testi-card, .gallery-item, .order-cta, .order-form"
);

if (revealTargets.length) {
  revealTargets.forEach((item) => item.classList.add("reveal"));
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((item) => revealObserver.observe(item));
}

const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

if (filterButtons.length && menuCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");
      if (!filter) return;

      filterButtons.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      menuCards.forEach((card) => {
        const category = card.getAttribute("data-category") || "";
        const visible = filter === "all" || category.includes(filter);
        card.classList.toggle("hidden", !visible);
      });
    });
  });
}

const faqSearch = document.getElementById("faqSearch");
const faqItems = document.querySelectorAll(".faq-item");
const faqEmptyState = document.getElementById("faqEmptyState");

if (faqSearch && faqItems.length) {
  faqSearch.addEventListener("input", () => {
    const query = faqSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    faqItems.forEach((item) => {
      const text = item.textContent ? item.textContent.toLowerCase() : "";
      const match = !query || text.includes(query);
      item.classList.toggle("hidden", !match);
      if (match) visibleCount += 1;
      if (match && query) item.setAttribute("open", "");
      if (!query) item.removeAttribute("open");
    });

    if (faqEmptyState) faqEmptyState.hidden = visibleCount !== 0;
  });
}

const testiCards = Array.from(document.querySelectorAll(".testi-grid .testi-card"));
const testiPrev = document.querySelector(".testi-nav.prev");
const testiNext = document.querySelector(".testi-nav.next");
let testiIndex = 0;
let testiTimer;
let testiPaused = false;

const renderTesti = () => {
  if (!testiCards.length) return;
  const isMobile = window.matchMedia("(max-width: 900px)").matches;
  testiCards.forEach((card, index) => {
    if (!isMobile) {
      card.classList.remove("hidden");
      return;
    }
    card.classList.toggle("hidden", index !== testiIndex);
  });
};

const startTestiAuto = () => {
  if (!testiCards.length) return;
  clearInterval(testiTimer);
  testiTimer = setInterval(() => {
    if (testiPaused) return;
    if (document.hidden) return;
    if (!window.matchMedia("(max-width: 900px)").matches) return;
    testiIndex = (testiIndex + 1) % testiCards.length;
    renderTesti();
  }, 4500);
};

if (testiCards.length) {
  renderTesti();
  startTestiAuto();
  window.addEventListener("resize", renderTesti);

  const testiSection = document.getElementById("testi");
  if (testiSection) {
    testiSection.addEventListener("mouseenter", () => {
      testiPaused = true;
    });
    testiSection.addEventListener("mouseleave", () => {
      testiPaused = false;
    });
    testiSection.addEventListener("focusin", () => {
      testiPaused = true;
    });
    testiSection.addEventListener("focusout", () => {
      testiPaused = false;
    });
    testiSection.addEventListener(
      "touchstart",
      () => {
        testiPaused = true;
      },
      { passive: true }
    );
    testiSection.addEventListener(
      "touchend",
      () => {
        testiPaused = false;
      },
      { passive: true }
    );
  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) renderTesti();
  });
}

if (testiPrev && testiCards.length) {
  testiPrev.addEventListener("click", () => {
    testiIndex = (testiIndex - 1 + testiCards.length) % testiCards.length;
    renderTesti();
    startTestiAuto();
  });
}

if (testiNext && testiCards.length) {
  testiNext.addEventListener("click", () => {
    testiIndex = (testiIndex + 1) % testiCards.length;
    renderTesti();
    startTestiAuto();
  });
}

const availabilitySlots = document.getElementById("availabilitySlots");
if (availabilitySlots) {
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + 3);

  for (let i = 0; i < 12; i += 1) {
    const slotDate = new Date(baseDate);
    slotDate.setDate(baseDate.getDate() + i);
    const value = formatDateValue(slotDate);
    const label = slotDate.toLocaleDateString("ms-MY", {
      weekday: "short",
      day: "2-digit",
      month: "short"
    });

    let status = "available";
    let text = "Slot Ada";
    if (i % 6 === 0) {
      status = "limited";
      text = "Cepat Penuh";
    }
    if (i % 8 === 0) {
      status = "full";
      text = "Penuh";
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = `slot-btn ${status}`;
    button.setAttribute("data-date", value);
    button.setAttribute("aria-disabled", String(status === "full"));
    button.innerHTML = `
      <strong>${label}</strong>
      <span>${value}</span>
      <span class="slot-badge">${text}</span>
    `;

    if (status === "full") button.disabled = true;
    availabilitySlots.appendChild(button);
  }

  availabilitySlots.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest(".slot-btn");
    if (!button || button.classList.contains("full")) return;
    const value = button.getAttribute("data-date");
    if (!value) return;

    availabilitySlots
      .querySelectorAll(".slot-btn")
      .forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");

    if (dateInput) {
      dateInput.value = value;
      dateInput.dispatchEvent(new Event("input", { bubbles: true }));
      dateInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

const bundleButtons = document.querySelectorAll(".bundle-order-btn");
if (bundleButtons.length) {
  bundleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const bundleName = button.getAttribute("data-name") || "Pakej";
      const bundlePrice = button.getAttribute("data-price") || "";

      const message =
        `Hai Anys Maniz! Saya berminat dengan pakej ${bundleName}.` +
        (bundlePrice ? `\nHarga: ${bundlePrice}` : "") +
        `\nBoleh semak slot terdekat?`;
      window.open(buildWhatsAppUrl(message), "_blank");
    });
  });
}
