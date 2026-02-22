# Anys Maniz Website

Landing page statik untuk kedai kek `Anys Maniz @ Homebaker`.

## Tujuan Website

Website ini dibina untuk:
- perkenalkan brand dan produk
- mudahkan pelanggan pilih menu dan pakej
- percepat tempahan melalui WhatsApp
- tingkatkan conversion melalui CTA yang konsisten

## Ciri Utama

- Responsive layout (desktop, tablet, mobile)
- Sticky top navigation + mobile hamburger menu
- Active nav state ikut section semasa scroll
- Scroll progress bar + back-to-top button
- Penapis kategori menu
- Bundle section dengan butang tempah terus
- Availability slot owner-editable (tarikh penuh / cepat penuh)
- Borang tempahan ringkas + mesej auto ke WhatsApp
- Form submit feedback: "Membuka WhatsApp..."
- FAQ search + FAQ tambahan (delivery, urgent, perubahan saat akhir)
- Testimoni dengan auto-rotate di mobile + nav control
- Gallery lightbox
- Tracking event conversion (CTA, WhatsApp click, form submit, filter, slot, bundle, gallery)
- SEO asas:
  - meta description
  - Open Graph tags
  - LocalBusiness JSON-LD (`sameAs`, `areaServed`, `priceRange`)

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
`-- assets/
    `-- images/
```

## Cara Jalankan

1. Buka `index.html` dalam browser.
2. Atau guna local server (disyorkan):
   - VS Code Live Server
   - `python -m http.server 8080`

## Owner Settings (Mudah Edit)

### 1) Maklumat contact + link sosial

Edit di atas `script.js`:

```js
const OWNER_CONTACT_SETTINGS = {
  whatsappNumber: "60123456789",
  whatsappDisplay: "+60 12-345 6789",
  instagramUrl: "https://instagram.com/anysmaniz.homebaker"
};
```

Kesan:
- semua link `wa.me` di HTML auto guna nombor ini
- nombor display di contact section auto ikut `whatsappDisplay`
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

Format tarikh mesti `YYYY-MM-DD`.

### 3) Google Analytics 4

Edit meta ini di `index.html`:

```html
<meta name="ga4-measurement-id" content="G-XXXXXXXXXX" />
```

Tukar ke ID sebenar contoh `G-ABC123XYZ9`.

Bila valid ID dimasukkan:
- script akan auto load GA4
- event conversion akan dihantar

## Event Tracking Yang Disokong

- `whatsapp_click`
- `cta_to_order_click`
- `order_form_submit`
- `menu_filter_select`
- `slot_date_select`
- `bundle_order_click`
- `gallery_open`
- `testimonial_nav_click`

## Mobile UI Improvements (Dah Siap)

- Hero CTA jadi full-width di mobile
- Menu filter jadi horizontal scroll (lebih mudah tap)
- Form dan CTA section disusun single-column
- Card spacing dan radius dikecilkan untuk skrin kecil
- Availability/testimonial grid stabil di mobile
- Navigation panel mobile lebih kemas (scrollable jika panjang)

## Cadangan Operasi Seterusnya

- guna gambar WebP/AVIF yang lebih ringan untuk semua image > 300KB
- tambah testimoni sebenar bergambar setiap bulan
- update `fullDates`/`limitedDates` setiap minggu

## Pemilikan

Website ini disediakan untuk kegunaan perniagaan `Anys Maniz @ Homebaker`.

