# Anys Maniz Website

Website landing page statik untuk kedai kek `Anys Maniz @ Homebaker`.

## Apa Website Ini Buat

Website ini bantu pelanggan untuk:
- kenal brand dan servis Anys Maniz
- tengok menu kek ikut kategori
- semak slot tempahan awal
- isi borang tempahan ringkas
- terus tempah melalui WhatsApp

Website ini bantu owner untuk:
- update contact dan link sosial dari satu tempat
- update slot penuh/cepat penuh tanpa ubah HTML
- kemas kini teks/promo dengan cepat
- track tindakan penting pelanggan

## Ciri Utama

- Responsive UI (desktop, tablet, mobile)
- Sticky header + mobile hamburger menu
- Active nav state ikut section semasa scroll
- Scroll progress bar + back-to-top button
- Hero, About, Menu, Pakej, Tempahan, Slot, FAQ, Testimoni, Galeri, Contact
- Penapis kategori menu
- Borang tempahan auto bina mesej WhatsApp
- Slot tempahan auto-generate + status penuh/cepat penuh
- Slot section boleh collapse (buka/tutup)
- FAQ boleh collapse (buka/tutup) + search keyword
- Gallery lightbox
- CTA konsisten ke WhatsApp
- Event tracking conversion
- SEO asas (meta description, Open Graph, JSON-LD LocalBusiness)

## Latest UI Updates

Kemaskini terkini yang sudah dibuat:
- About section diperkemas (copy pendek, bullet jelas, CTA lebih tepat)
- Simbol rosak/encoding pada bullet dibetulkan
- FAQ toggle dipindah ke kanan dan kekal boleh klik bila FAQ ditutup
- Contact + mini CTA diperkemas (spacing, clickable contact, map balance)
- Desktop polish pass:
  - layout lebih padat dan konsisten
  - typography tuning untuk desktop
  - visual consistency (radius, shadow, border tone)
- Hero desktop conversion pass:
  - headline dipendekkan
  - CTA hierarchy ditingkatkan
  - trust badge ditambah
  - statistik dikurangkan (lebih clean)
  - promo bar disusun 2-part (copy + syarat + CTA)
- Header/nav desktop premium pass:
  - alignment logo-nav-cta lebih kemas
  - hover/active nav lebih jelas
  - sticky header nampak lebih premium
- Hero refinement lanjut:
  - CTA trust badge + statistik hero lebih clean
  - promo strip dengan urgency yang lebih jelas
- Fix contact "Jom singgah":
  - map overflow kanan dibetulkan
  - iframe map kini responsive (width 100%)
  - layout contact/map lebih seimbang pada desktop
- Order section conversion upgrade:
  - step card kini ada state aktif/siap ikut progress borang
  - tambah quick chips untuk `Jenis Majlis`
  - tambah field wajib `Saiz Kek`
  - tambah helper tarikh dinamik (tarikh paling awal)
  - tambah ringkasan tempahan live sebelum submit
  - validasi field kosong + auto scroll ke field error pertama
  - sticky submit CTA di mobile untuk kurangkan friction

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

## Semakan JavaScript (Syntax Check)

Guna command ini dalam root projek:

```powershell
node --check script.js
```

Jika `node` tidak dikesan pada sesetengah terminal, guna full path:

```powershell
& "C:\Program Files\nodejs\node.exe" --check script.js
```

## Owner Settings (Mudah Edit)

### 1) Contact dan sosial

Edit di atas `script.js`:

```js
const OWNER_CONTACT_SETTINGS = {
  whatsappNumber: "60123456789",
  whatsappDisplay: "+60 12-345 6789",
  instagramUrl: "https://instagram.com/anysmaniz.homebaker"
};
```

Kesan:
- semua link `wa.me` auto ikut nombor ini
- paparan nombor telefon ikut `whatsappDisplay`
- link Instagram auto ikut `instagramUrl`

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

Maksud:
- `totalDays`: bilangan hari dipaparkan
- `startAfterDays`: mula slot selepas berapa hari
- `fullDates`: tarikh penuh
- `limitedDates`: tarikh cepat penuh

Format tarikh wajib `YYYY-MM-DD`.

### 3) Google Analytics 4

Edit meta tag di `index.html`:

```html
<meta name="ga4-measurement-id" content="G-XXXXXXXXXX" />
```

Ganti kepada ID sebenar, contoh `G-ABC123XYZ9`.

### 4) Bahagian teks/content owner selalu ubah

Edit terus dalam `index.html`:
- header / nav
- hero (`#home`)
- tentang (`#about`)
- menu (`#menu`)
- pakej (`#bundle`)
- FAQ (`#faq`)
- contact (`#contact`)
- promo strip

Tip: selepas ubah, buat hard refresh (`Ctrl + F5`).

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
3. semak nombor WhatsApp dan link Instagram
4. semak desktop + mobile view
5. tambah testimoni/gambar baru jika ada

## Nota Maintenance

- Jika nampak simbol pelik, simpan fail sebagai UTF-8.
- Jangan ubah ID penting tanpa semak `script.js`:
  - `orderForm`, `faqToggle`, `faqContent`, `availabilityToggle`, `availabilityContent`
- Untuk prestasi lebih baik, guna imej WebP/AVIF yang lebih ringan.

## Pemilikan

Website ini disediakan untuk kegunaan perniagaan `Anys Maniz @ Homebaker`.
