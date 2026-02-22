const OWNER_CONTACT_SETTINGS = {
  whatsappNumber: "60123456789",
  whatsappDisplay: "+60 12-345 6789",
  instagramUrl: "https://instagram.com/anysmaniz.homebaker"
};

const OWNER_ANALYTICS_SETTINGS = {
  measurementId:
    document.querySelector('meta[name="ga4-measurement-id"]')?.getAttribute("content") ||
    "G-XXXXXXXXXX"
};

const WHATSAPP_NUMBER = OWNER_CONTACT_SETTINGS.whatsappNumber;

// OWNER ORDER SETTINGS
// Owner hanya perlu ubah leadDays untuk minimum hari tempahan.
const OWNER_ORDER_SETTINGS = {
  leadDays: 3
};

const formatDateValue = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const buildWhatsAppUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const buildWhatsAppBaseUrl = () => `https://wa.me/${WHATSAPP_NUMBER}`;

const isValidGa4Id = (id) => /^G-[A-Z0-9]+$/i.test(id) && id.toUpperCase() !== "G-XXXXXXXXXX";

const loadGa4 = () => {
  const measurementId = OWNER_ANALYTICS_SETTINGS.measurementId;
  if (!isValidGa4Id(measurementId)) return;
  if (window.gtag) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
};

const trackEvent = (eventName, params = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
};

loadGa4();

const orderForm = document.getElementById("orderForm");
const orderFormStatus = document.getElementById("orderFormStatus");
const orderProgressStage = document.getElementById("orderProgressStage");
const orderProgressLabel = document.getElementById("orderProgressLabel");
const orderProgressCount = document.getElementById("orderProgressCount");
const orderProgressBar = document.getElementById("orderProgressBar");
const orderStepCards = Array.from(document.querySelectorAll("#order .order-steps .step"));
const orderEventInput = document.getElementById("event");
const orderEventChips = Array.from(document.querySelectorAll(".event-chip"));
const earliestDateHint = document.getElementById("earliestDateHint");
const summaryName = document.getElementById("summaryName");
const summaryEvent = document.getElementById("summaryEvent");
const summarySize = document.getElementById("summarySize");
const summaryDate = document.getElementById("summaryDate");
const summaryBudget = document.getElementById("summaryBudget");
const ORDER_REQUIRED_SELECTOR = "input[required], select[required], textarea[required]";

const setOrderStepState = (activeStep) => {
  orderStepCards.forEach((stepCard, index) => {
    const stepIndex = index + 1;
    stepCard.classList.toggle("is-active", stepIndex === activeStep);
    stepCard.classList.toggle("is-complete", stepIndex < activeStep);
  });
};

const formatSummaryDate = (value) => {
  if (!value) return "-";
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("ms-MY", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

const updateOrderSummary = () => {
  if (!orderForm) return;
  const data = new FormData(orderForm);
  if (summaryName) summaryName.textContent = String(data.get("name") || "-");
  if (summaryEvent) summaryEvent.textContent = String(data.get("event") || "-");
  if (summarySize) summarySize.textContent = String(data.get("size") || "-");
  if (summaryDate) summaryDate.textContent = formatSummaryDate(String(data.get("date") || ""));
  if (summaryBudget) summaryBudget.textContent = String(data.get("budget") || "-");
};

const updateOrderProgress = () => {
  if (!orderForm) return;
  const requiredFields = Array.from(orderForm.querySelectorAll(ORDER_REQUIRED_SELECTOR));
  if (!requiredFields.length) return;

  const filledCount = requiredFields.filter((field) => String(field.value || "").trim() !== "").length;
  const totalCount = requiredFields.length;
  const ratio = Math.round((filledCount / totalCount) * 100);

  if (orderProgressCount) {
    orderProgressCount.textContent = `${filledCount}/${totalCount} lengkap`;
  }

  if (orderProgressBar) {
    orderProgressBar.style.width = `${ratio}%`;
  }

  if (orderProgressLabel) {
    const done = filledCount >= totalCount;
    orderProgressLabel.textContent = done
      ? "Langkah 2/2: Semak dan tekan Tempah di WhatsApp"
      : "Langkah 1/2: Isi maklumat wajib";
  }

  if (orderProgressStage) {
    const done = filledCount >= totalCount;
    orderProgressStage.textContent = done ? "2/2" : "1/2";
    orderProgressStage.classList.toggle("done", done);
  }

  let flowStage = 1;
  if (filledCount >= 1) flowStage = 2;
  if (filledCount >= 3) flowStage = 3;
  if (filledCount >= totalCount) flowStage = 4;
  setOrderStepState(flowStage);
};

if (orderForm) {
  const requiredFields = orderForm.querySelectorAll(ORDER_REQUIRED_SELECTOR);

  orderEventChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      if (!orderEventInput) return;
      const eventField = orderEventInput.closest(".field");
      const isCustom = chip.getAttribute("data-event-custom") === "true";
      if (isCustom) {
        orderEventInput.value = "";
        if (eventField) eventField.classList.remove("event-chip-locked");
        orderEventInput.focus();
      } else {
        const eventValue = chip.getAttribute("data-event-value") || "";
        orderEventInput.value = eventValue;
        if (eventField) eventField.classList.add("event-chip-locked");
      }

      orderEventInput.dispatchEvent(new Event("input", { bubbles: true }));
      orderEventChips.forEach((item) => {
        item.classList.toggle("is-active", item === chip);
      });
    });
  });

  if (orderEventInput) {
    orderEventInput.addEventListener("input", () => {
      const eventField = orderEventInput.closest(".field");
      const current = orderEventInput.value.trim().toLowerCase();
      const customChip = orderEventChips.find((chip) => chip.getAttribute("data-event-custom") === "true");
      orderEventChips.forEach((chip) => {
        const value = (chip.getAttribute("data-event-value") || "").toLowerCase();
        const isCustomChip = chip.getAttribute("data-event-custom") === "true";
        if (isCustomChip) return;
        chip.classList.toggle("is-active", current !== "" && current === value);
      });
      const hasKnownChip = orderEventChips.some((chip) => {
        if (chip.getAttribute("data-event-custom") === "true") return false;
        return chip.classList.contains("is-active");
      });
      if (!hasKnownChip && eventField) {
        eventField.classList.remove("event-chip-locked");
      }
      if (customChip) {
        customChip.classList.toggle("is-active", current !== "" && !hasKnownChip);
      }
    });
  }

  requiredFields.forEach((field) => {
    field.addEventListener("input", () => {
      field.classList.remove("field-error");
      if (orderFormStatus) orderFormStatus.classList.remove("show", "error");
      updateOrderSummary();
      updateOrderProgress();
    });
    field.addEventListener("change", () => {
      field.classList.remove("field-error");
      if (orderFormStatus) orderFormStatus.classList.remove("show", "error");
      updateOrderSummary();
      updateOrderProgress();
    });
  });

  updateOrderSummary();
  updateOrderProgress();

  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let hasError = false;
    let firstErrorField = null;
    requiredFields.forEach((field) => {
      const isEmpty = String(field.value || "").trim() === "";
      field.classList.toggle("field-error", isEmpty);
      if (isEmpty) {
        hasError = true;
        if (!firstErrorField) firstErrorField = field;
      }
    });

    if (hasError) {
      if (orderFormStatus) {
        orderFormStatus.textContent = "Sila lengkapkan maklumat wajib dulu.";
        orderFormStatus.classList.add("show", "error");
        orderFormStatus.classList.remove("success");
      }
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
        firstErrorField.focus({ preventScroll: true });
      }
      updateOrderProgress();
      return;
    }

    const data = new FormData(orderForm);
    const name = data.get("name");
    const eventType = data.get("event");
    const size = data.get("size");
    const date = data.get("date");
    const budget = data.get("budget");
    const notes = data.get("notes");

    const message =
      `Hai Anys Maniz! Saya ${name}.` +
      `\nJenis majlis: ${eventType}` +
      `\nSaiz kek: ${size}` +
      `\nTarikh: ${date}` +
      `\nBajet: ${budget}` +
      (notes ? `\nNota: ${notes}` : "");

    if (orderFormStatus) {
      orderFormStatus.textContent = "Berjaya! Kami buka WhatsApp sekarang...";
      orderFormStatus.classList.add("show", "success");
      orderFormStatus.classList.remove("error");
    }

    trackEvent("order_form_submit", {
      event_type: String(eventType || ""),
      budget: String(budget || ""),
      size: String(size || "")
    });
    setOrderStepState(5);

    const waUrl = buildWhatsAppUrl(message);
    const pendingWindow = window.open("about:blank", "_blank");
    window.setTimeout(() => {
      if (pendingWindow && !pendingWindow.closed) {
        pendingWindow.location.href = waUrl;
      } else {
        window.open(waUrl, "_blank");
      }

      if (orderFormStatus) {
        orderFormStatus.classList.remove("show");
      }
    }, 550);
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

document.querySelectorAll('a[href*="wa.me"], [data-wa-link]').forEach((link) => {
  if (!(link instanceof HTMLAnchorElement)) return;
  link.href = buildWhatsAppBaseUrl();
});

document.querySelectorAll('a[href*="instagram.com"], [data-instagram-link]').forEach((link) => {
  if (!(link instanceof HTMLAnchorElement)) return;
  link.href = OWNER_CONTACT_SETTINGS.instagramUrl;
});

document.querySelectorAll("[data-phone-display]").forEach((item) => {
  item.textContent = OWNER_CONTACT_SETTINGS.whatsappDisplay;
});

document.querySelectorAll('a[href*="wa.me"], a[href="#order"]').forEach((link) => {
  if (!(link instanceof HTMLAnchorElement)) return;
  link.addEventListener("click", () => {
    const sectionId = link.closest("section[id]")?.getAttribute("id") || "global";
    const eventName = link.href.includes("wa.me") ? "whatsapp_click" : "cta_to_order_click";
    trackEvent(eventName, {
      location: sectionId,
      label: (link.textContent || "").trim()
    });
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
  minDate.setDate(minDate.getDate() + OWNER_ORDER_SETTINGS.leadDays);
  dateInput.min = formatDateValue(minDate);
  if (earliestDateHint) {
    earliestDateHint.textContent = `Tarikh paling awal: ${formatSummaryDate(formatDateValue(minDate))}`;
  }
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
      trackEvent("gallery_open", { image: alt });
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

document.querySelectorAll("[data-track]").forEach((item) => {
  item.addEventListener("click", () => {
    const eventName = item.getAttribute("data-track");
    if (!eventName) return;
    trackEvent(eventName, {
      label: item.getAttribute("data-track-label") || "",
      location: item.getAttribute("data-track-location") || ""
    });
  });
});

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

      trackEvent("menu_filter_select", { filter });
    });
  });
}

const faqSection = document.getElementById("faq");
const faqToggle = document.getElementById("faqToggle");
const faqContent = document.getElementById("faqContent");

const updateFaqHeight = () => {
  if (!faqSection || !faqContent) return;
  if (faqSection.classList.contains("is-collapsed")) return;
  faqContent.style.maxHeight = `${faqContent.scrollHeight}px`;
};

if (faqSection && faqToggle && faqContent) {
  const setFaqState = (collapsed) => {
    faqSection.classList.toggle("is-collapsed", collapsed);
    faqToggle.setAttribute("aria-expanded", String(!collapsed));
    faqToggle.textContent = collapsed ? "Buka FAQ" : "Tutup FAQ";
    faqContent.style.maxHeight = collapsed ? "0px" : `${faqContent.scrollHeight}px`;
  };

  setFaqState(false);

  faqToggle.addEventListener("click", () => {
    const collapsed = !faqSection.classList.contains("is-collapsed");
    setFaqState(collapsed);
    trackEvent("faq_toggle", { state: collapsed ? "collapsed" : "expanded" });
  });

  faqSection.addEventListener("toggle", () => {
    window.setTimeout(updateFaqHeight, 10);
  }, true);

  window.addEventListener("resize", updateFaqHeight);
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
    updateFaqHeight();
  });
}

const testiCards = Array.from(document.querySelectorAll(".testi-grid .testi-card"));
const testiPrev = document.querySelector(".testi-nav.prev");
const testiNext = document.querySelector(".testi-nav.next");
const testiDotsWrap = document.querySelector(".testi-dots");
const testiCount = document.querySelector(".testi-count");
const testiProgress = document.querySelector(".testi-progress");
let testiIndex = 0;
let testiTimer;
let testiPaused = false;

const isTestiMobile = () => window.matchMedia("(max-width: 900px)").matches;

const restartTestiProgress = () => {
  if (!testiProgress) return;
  if (!isTestiMobile() || testiPaused) {
    testiProgress.classList.remove("running");
    return;
  }
  testiProgress.classList.remove("running");
  window.requestAnimationFrame(() => {
    testiProgress.classList.add("running");
  });
};

const renderTestiUI = () => {
  if (testiCount) {
    testiCount.textContent = `${testiIndex + 1} / ${testiCards.length}`;
  }
  if (testiDotsWrap) {
    const dots = Array.from(testiDotsWrap.querySelectorAll(".testi-dot"));
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === testiIndex);
      dot.setAttribute("aria-current", index === testiIndex ? "true" : "false");
    });
  }
  restartTestiProgress();
};

const renderTesti = () => {
  if (!testiCards.length) return;
  const mobile = isTestiMobile();
  testiCards.forEach((card, index) => {
    if (!mobile) {
      card.classList.remove("hidden");
      return;
    }
    card.classList.toggle("hidden", index !== testiIndex);
  });
  renderTestiUI();
};

const startTestiAuto = () => {
  if (!testiCards.length) return;
  clearInterval(testiTimer);
  testiTimer = setInterval(() => {
    if (testiPaused) return;
    if (document.hidden) return;
    if (!isTestiMobile()) return;
    testiIndex = (testiIndex + 1) % testiCards.length;
    renderTesti();
  }, 4500);
};

if (testiCards.length) {
  if (testiDotsWrap && !testiDotsWrap.children.length) {
    testiCards.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "testi-dot";
      dot.setAttribute("aria-label", `Pergi ke testimoni ${index + 1}`);
      dot.addEventListener("click", () => {
        testiIndex = index;
        renderTesti();
        startTestiAuto();
        trackEvent("testimonial_nav_click", { direction: "dot", index: String(index + 1) });
      });
      testiDotsWrap.appendChild(dot);
    });
  }

  renderTesti();
  startTestiAuto();
  window.addEventListener("resize", renderTesti);

  const testiSection = document.getElementById("testi");
  if (testiSection) {
    testiSection.addEventListener("mouseenter", () => {
      testiPaused = true;
      restartTestiProgress();
    });
    testiSection.addEventListener("mouseleave", () => {
      testiPaused = false;
      restartTestiProgress();
    });
    testiSection.addEventListener("focusin", () => {
      testiPaused = true;
      restartTestiProgress();
    });
    testiSection.addEventListener("focusout", () => {
      testiPaused = false;
      restartTestiProgress();
    });
    testiSection.addEventListener(
      "touchstart",
      () => {
        testiPaused = true;
        restartTestiProgress();
      },
      { passive: true }
    );
    testiSection.addEventListener(
      "touchend",
      () => {
        testiPaused = false;
        restartTestiProgress();
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
    trackEvent("testimonial_nav_click", { direction: "prev" });
  });
}

if (testiNext && testiCards.length) {
  testiNext.addEventListener("click", () => {
    testiIndex = (testiIndex + 1) % testiCards.length;
    renderTesti();
    startTestiAuto();
    trackEvent("testimonial_nav_click", { direction: "next" });
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
      trackEvent("bundle_order_click", {
        bundle_name: bundleName,
        bundle_price: bundlePrice
      });
      window.open(buildWhatsAppUrl(message), "_blank");
    });
  });
}

