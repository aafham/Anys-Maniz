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
const OWNER_WHATSAPP_SETTINGS = {
  // Pilihan: "consultative" atau "direct"
  tonePreset: "consultative"
};

const WA_TONE_PRESETS = {
  consultative: {
    topbar_main:
      "Hai Anys Maniz, saya berminat nak tempah kek.\nBoleh semak slot terdekat dan anggaran harga?",
    hero_main:
      "Hai Anys Maniz, saya nampak website dan nak tempah kek.\nBoleh cadangkan pilihan bestseller ikut bajet saya?",
    menu_section:
      "Hai Anys Maniz, saya baru tengok menu kek.\nBoleh bantu cadangkan yang sesuai ikut bajet dan saiz?",
    order_sidebar:
      "Hai Anys Maniz, saya nak semak slot tempahan.\nTarikh saya fleksibel, boleh cadangkan slot paling dekat?",
    testimonials_section:
      "Hai Anys Maniz, saya tertarik dengan review pelanggan.\nBoleh bagi sebut harga awal untuk kek custom?",
    mini_cta:
      "Hai Anys Maniz, saya ready untuk tempah kek.\nSaya kongsi detail ringkas di bawah:",
    footer_icon:
      "Hai Anys Maniz, saya jumpa WhatsApp dari website.\nNak tanya tempahan kek untuk majlis.",
    footer_contact:
      "Hai Anys Maniz, boleh bantu saya dengan detail tempahan?\nSaya nak semak harga, saiz, dan tarikh sesuai.",
    mobile_sticky:
      "Hai Anys Maniz, saya nak tempah kek secepat mungkin.\nBoleh semak slot available paling awal?"
  },
  direct: {
    topbar_main:
      "Hai Anys Maniz, saya nak tempah kek.\nBoleh confirm slot paling awal dan anggaran harga?",
    hero_main:
      "Hai Anys Maniz, saya nak order kek hari ini.\nBoleh suggest pilihan paling popular ikut bajet?",
    menu_section:
      "Hai Anys Maniz, saya dah tengok menu.\nSaya nak terus pilih kek ikut bajet, boleh bantu?",
    order_sidebar:
      "Hai Anys Maniz, saya nak lock slot tempahan.\nBoleh semak tarikh terdekat yang available?",
    testimonials_section:
      "Hai Anys Maniz, saya nak sebut harga awal untuk kek custom.\nBoleh terus share range harga?",
    mini_cta:
      "Hai Anys Maniz, saya nak tempah sekarang.\nDetail saya seperti di bawah:",
    footer_icon:
      "Hai Anys Maniz, saya nak tanya tempahan kek untuk majlis saya.",
    footer_contact:
      "Hai Anys Maniz, saya perlukan detail harga, saiz, dan tarikh tempahan.",
    mobile_sticky:
      "Hai Anys Maniz, saya perlukan slot tempahan paling cepat.\nBoleh bantu semak sekarang?"
  }
};

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

const getActiveWhatsAppTonePreset = () =>
  OWNER_WHATSAPP_SETTINGS.tonePreset in WA_TONE_PRESETS
    ? OWNER_WHATSAPP_SETTINGS.tonePreset
    : "consultative";

const getContextWhatsAppMessage = (context) => {
  if (!context) return "";
  const presetKey = getActiveWhatsAppTonePreset();
  const preset = WA_TONE_PRESETS[presetKey];
  const coreMessage = preset?.[context] || WA_TONE_PRESETS.consultative[context] || "";
  if (!coreMessage) return "";
  if (context === "mini_cta" || context === "mobile_sticky") {
    return `${coreMessage}\n- Tarikh majlis:\n- Jenis majlis:\n- Saiz kek:\n- Bajet:`;
  }
  return coreMessage;
};

const buildOrderWhatsAppMessage = ({ name, eventType, size, date, budget, notes }) => {
  const summaryDate = formatSummaryDate(String(date || ""));
  return [
    "Hai Anys Maniz! Saya nak tempah kek.",
    `Nama: ${name || "-"}`,
    `Jenis majlis: ${eventType || "-"}`,
    `Saiz kek: ${size || "-"}`,
    `Tarikh diperlukan: ${summaryDate}`,
    `Bajet: ${budget || "-"}`,
    notes ? `Nota: ${notes}` : ""
  ]
    .filter(Boolean)
    .join("\n");
};

loadGa4();

const orderForm = document.getElementById("orderForm");
const orderFormStatus = document.getElementById("orderFormStatus");
const orderProgressStage = document.getElementById("orderProgressStage");
const orderProgressLabel = document.getElementById("orderProgressLabel");
const orderProgressCount = document.getElementById("orderProgressCount");
const orderProgressBar = document.getElementById("orderProgressBar");
const orderProgressHint = document.getElementById("orderProgressHint");
const orderStepCards = Array.from(document.querySelectorAll("#order .order-steps .step"));
const orderEventInput = document.getElementById("event");
const orderEventChips = Array.from(document.querySelectorAll(".event-chip"));
const earliestDateHint = document.getElementById("earliestDateHint");
const summaryName = document.getElementById("summaryName");
const summaryEvent = document.getElementById("summaryEvent");
const summarySize = document.getElementById("summarySize");
const summaryDate = document.getElementById("summaryDate");
const summaryBudget = document.getElementById("summaryBudget");
const orderNextBtn = document.getElementById("orderNextBtn");
const orderBackBtn = document.getElementById("orderBackBtn");
const orderStepPanels = Array.from(document.querySelectorAll("[data-form-step]"));
const orderFormLayout = document.querySelector("#order .order-form-layout");
const ORDER_REQUIRED_SELECTOR = "input[required], select[required], textarea[required]";
let orderFormStep = 1;

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
  const done = filledCount >= totalCount;

  if (orderProgressCount) {
    orderProgressCount.textContent = `${filledCount}/${totalCount} lengkap`;
  }

  if (orderProgressBar) {
    orderProgressBar.style.width = `${ratio}%`;
  }

  const missingLabels = requiredFields
    .filter((field) => String(field.value || "").trim() === "")
    .map((field) => {
      const label = field.closest(".field")?.querySelector("label");
      return (label?.textContent || "").trim();
    })
    .filter((label) => label !== "");

  if (orderProgressLabel) {
    orderProgressLabel.textContent = orderFormStep === 2
      ? "Langkah 2/2: Semak ringkasan dan tekan Tempah di WhatsApp"
      : done
      ? "Langkah 2/2: Semak dan tekan Tempah di WhatsApp"
      : "Langkah 1/2: Isi maklumat wajib";
  }

  if (orderProgressHint) {
    if (orderFormStep === 2) {
      orderProgressHint.textContent = "Semak detail ringkasan sebelum hantar tempahan.";
    } else if (!missingLabels.length) {
      orderProgressHint.textContent = "Semua maklumat wajib lengkap. Tekan Teruskan ke semakan.";
    } else {
      orderProgressHint.textContent = `Lengkapkan: ${missingLabels.slice(0, 3).join(", ")}`;
    }
  }

  if (orderProgressStage) {
    orderProgressStage.textContent = orderFormStep === 2 ? "2/2" : "1/2";
    orderProgressStage.classList.toggle("done", done || orderFormStep === 2);
  }

  let flowStage = 1;
  if (filledCount >= 1) flowStage = 2;
  if (filledCount >= 3) flowStage = 3;
  if (filledCount >= totalCount) flowStage = 4;
  if (orderFormStep === 2) flowStage = 5;
  setOrderStepState(flowStage);

  if (orderNextBtn) {
    orderNextBtn.disabled = !done;
  }
};

const setOrderFormStep = (step) => {
  orderFormStep = step;
  orderStepPanels.forEach((panel) => {
    const panelStep = Number(panel.getAttribute("data-form-step"));
    panel.classList.toggle("is-step-hidden", panelStep !== step);
  });
  if (orderFormLayout) {
    orderFormLayout.classList.toggle("is-review-step", step === 2);
  }
  updateOrderProgress();
};

const validateOrderRequiredFields = (requiredFields) => {
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
  }

  return !hasError;
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

  if (orderNextBtn) {
    orderNextBtn.addEventListener("click", () => {
      if (!validateOrderRequiredFields(requiredFields)) {
        updateOrderProgress();
        return;
      }
      if (orderFormStatus) orderFormStatus.classList.remove("show", "error", "success");
      setOrderFormStep(2);
      window.setTimeout(() => {
        summaryName?.focus?.();
      }, 50);
    });
  }

  if (orderBackBtn) {
    orderBackBtn.addEventListener("click", () => {
      setOrderFormStep(1);
      if (orderFormStatus) orderFormStatus.classList.remove("show", "error", "success");
    });
  }

  setOrderFormStep(1);
  updateOrderSummary();
  updateOrderProgress();

  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateOrderRequiredFields(requiredFields)) {
      setOrderFormStep(1);
      updateOrderProgress();
      return;
    }

    setOrderFormStep(2);

    const data = new FormData(orderForm);
    const name = data.get("name");
    const eventType = data.get("event");
    const size = data.get("size");
    const date = data.get("date");
    const budget = data.get("budget");
    const notes = data.get("notes");

    const message = buildOrderWhatsAppMessage({
      name: String(name || ""),
      eventType: String(eventType || ""),
      size: String(size || ""),
      date: String(date || ""),
      budget: String(budget || ""),
      notes: String(notes || "")
    });

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
  const context = link.getAttribute("data-wa-context") || "";
  const message = getContextWhatsAppMessage(context);
  link.href = message ? buildWhatsAppUrl(message) : buildWhatsAppBaseUrl();
  link.target = "_blank";
  link.rel = "noopener noreferrer";
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
    const isWhatsAppClick = link.href.includes("wa.me");
    const eventName = isWhatsAppClick ? "whatsapp_click" : "cta_to_order_click";
    const eventParams = {
      location: sectionId,
      label: (link.textContent || "").trim()
    };
    if (isWhatsAppClick) {
      eventParams.tone_preset = getActiveWhatsAppTonePreset();
      eventParams.wa_context = link.getAttribute("data-wa-context") || "unspecified";
    }
    trackEvent(eventName, eventParams);
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
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.setAttribute("aria-label", "Paparan imej galeri");
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Tutup">&times;</button>
    <img src="" alt="" />
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  let lastFocusedElement = null;

  const getLightboxFocusables = () =>
    Array.from(lightbox.querySelectorAll("button, [href], [tabindex]:not([tabindex='-1'])")).filter(
      (item) => item instanceof HTMLElement && !item.hasAttribute("disabled")
    );

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const src = item.getAttribute("data-src");
      const alt = item.getAttribute("data-alt") || "Galeri kek";
      if (!src || !lightboxImg) return;
      lastFocusedElement = item instanceof HTMLElement ? item : null;
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      if (closeBtn instanceof HTMLElement) closeBtn.focus();
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
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") {
      closeLightbox();
      return;
    }
    if (event.key !== "Tab") return;

    const focusables = getLightboxFocusables();
    if (!focusables.length) {
      event.preventDefault();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (!(first instanceof HTMLElement) || !(last instanceof HTMLElement)) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
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
        `\nBoleh cadangkan tarikh terdekat yang sesuai?`;
      trackEvent("bundle_order_click", {
        bundle_name: bundleName,
        bundle_price: bundlePrice
      });
      window.open(buildWhatsAppUrl(message), "_blank");
    });
  });
}

