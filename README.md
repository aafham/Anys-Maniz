# Anys Maniz Website

Website landing page statik untuk kedai kek `Anys Maniz @ Homebaker`.

## Apa Website Ini Buat

Website ini bantu pelanggan untuk:
- kenal brand dan servis Anys Maniz
- tengok menu kek ikut kategori
- semak slot tempahan awal
- isi borang tempahan ringkas
- terus tempah melalui WhatsApp

Website ini juga bantu owner untuk:
- update nombor WhatsApp dan Instagram dari satu tempat
- update slot penuh/cepat penuh tanpa ubah HTML
- track tindakan penting pelanggan (CTA, form, slot, gallery)

## Ciri Utama

- Responsive UI untuk desktop, tablet, mobile
- Sticky header + mobile hamburger menu
- Active nav highlight ikut section semasa scroll
- Scroll progress bar + back-to-top button
- Hero, About, Menu, Pakej, Tempahan, Slot, FAQ, Testimoni, Galeri, Contact
- Penapis kategori menu
- Borang tempahan auto bina mesej WhatsApp
- Slot tempahan auto-generate berdasarkan setting owner
- Slot section boleh collapse (buka/tutup)
- FAQ boleh collapse (buka/tutup) + carian kata kunci
- Testimoni dengan controls
- Gallery lightbox
- CTA konsisten ke WhatsApp
- Tracking event untuk conversion
- SEO asas (meta description, Open Graph, JSON-LD LocalBusiness)

## Teknologi

- HTML5 (`index.html`)
- CSS3 (`style.css`)
- Vanilla JavaScript (`script.js`)
- Tiada framework, tiada build step

## Struktur Projek

```text
Anys-Maniz/
|-- index.html
|-- style.css
|-- script.js
|-- README.md
`-- assets/
    `-- images/
```

## Cara Jalankan

1. Buka `index.html` terus di browser.
2. Atau guna local server (disyorkan):
- VS Code Live Server
- `python -m http.server 8080`

## Panduan Owner: Bahagian Yang Selalu Diedit

### 1) Contact dan sosial

Edit di bahagian atas `script.js`:

```js
const OWNER_CONTACT_SETTINGS = {
  whatsappNumber: "60123456789",
  whatsappDisplay: "+60 12-345 6789",
  instagramUrl: "https://instagram.com/anysmaniz.homebaker"
};
```

Kesan perubahan:
- semua link `wa.me` automatik ikut nombor baru
- paparan nombor telefon ikut `whatsappDisplay`
- link Instagram automatik ikut `instagramUrl`

### 2) Slot tempahan

Edit di `script.js`:

```js
const OWNER_SLOT_SETTINGS = {
  totalDays: 12,
  startAfterDays: 3,
  fullDates: [
    // "2026-03-05"
  ],
  limitedDates: [
    // "2026-03-03"
  ]
};
```

Maksud field:
- `totalDays`: berapa hari nak dipaparkan pada kad slot
- `startAfterDays`: mula slot selepas berapa hari dari hari semasa
- `fullDates`: tarikh penuh
- `limitedDates`: tarikh cepat penuh

Format tarikh wajib `YYYY-MM-DD`.

### 3) Google Analytics 4

Edit meta tag di `index.html`:

```html
<meta name="ga4-measurement-id" content="G-XXXXXXXXXX" />
```

Tukar ke ID sebenar, contoh `G-ABC123XYZ9`.

### 4) Content teks (owner boleh edit terus)

Edit dalam `index.html` untuk bahagian:
- hero (`#home`)
- tentang (`#about`)
- menu (`#menu`)
- pakej (`#bundle`)
- FAQ (`#faq`)
- contact (`#contact`)

Tip: selepas ubah teks, buat hard refresh browser (`Ctrl + F5`) untuk pastikan CSS/JS cache lama tidak ganggu.

## Event Tracking Yang Direkod

- `whatsapp_click`
- `cta_to_order_click`
- `order_form_submit`
- `menu_filter_select`
- `slot_date_select`
- `availability_toggle`
- `faq_toggle`
- `bundle_order_click`
- `gallery_open`
- `testimonial_nav_click`

## Rutin Update Mingguan (Disyorkan)

1. update `fullDates` dan `limitedDates`
2. semak harga/promo dalam `index.html`
3. semak link WhatsApp dan Instagram masih betul
4. semak paparan mobile (hero, CTA, FAQ, contact)
5. tambah 1-2 gambar/testimoni baru jika ada

## Nota Maintenance

- Jika nampak simbol pelik, pastikan fail disimpan sebagai UTF-8.
- Jangan ubah ID penting tanpa semak `script.js`:
  - `orderForm`, `faqToggle`, `faqContent`, `availabilityToggle`, `availabilityContent`
- Untuk prestasi lebih baik, guna imej WebP/AVIF dengan saiz ringan.

## Pemilikan

Website ini dibina untuk kegunaan perniagaan `Anys Maniz @ Homebaker`.
