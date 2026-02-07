const WHATSAPP_NUMBER = "60123456789";

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

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });
}

const navLinks = document.querySelectorAll(".nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".nav").classList.remove("open");
  });
});

const topbar = document.querySelector(".topbar");
if (topbar) {
  const onScroll = () => {
    topbar.classList.toggle("scrolled", window.scrollY > 10);
  };
  window.addEventListener("scroll", onScroll);
  onScroll();
}

const dateInput = document.getElementById("date");
if (dateInput) {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 3);
  const yyyy = minDate.getFullYear();
  const mm = String(minDate.getMonth() + 1).padStart(2, "0");
  const dd = String(minDate.getDate()).padStart(2, "0");
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

const galleryItems = document.querySelectorAll(".gallery-item");
if (galleryItems.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Tutup">×</button>
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
      if (!src) return;
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightbox.classList.add("open");
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}
