# Anys Maniz Website

Landing page statik untuk `Anys Maniz @ Homebaker` (kedai kek homemade).

## Ringkasan Website

Website ini fokus untuk:
- tarik pelanggan baru melalui paparan brand + menu + testimoni
- mudahkan pelanggan terus tempah di WhatsApp
- bantu owner update maklumat penting dengan cepat tanpa backend

## Fungsi Utama (Versi Semasa)

- Responsive UI (desktop, tablet, mobile)
- Sticky header + active nav semasa scroll
- Hero, About, Menu, Pakej, Tempahan, FAQ, Testimoni, Galeri, Contact
- Penapis kategori menu kek
- Borang tempahan pintar:
  - progress `1/2` -> `2/2`
  - quick chips untuk `Jenis Majlis`
  - field wajib `Saiz Kek`
  - helper tarikh minimum automatik (`leadDays`)
  - validasi kosong + auto scroll ke field error pertama
  - ringkasan tempahan live
  - mesej auto-generate ke WhatsApp
- FAQ:
  - buka/tutup (collapse)
  - carian soalan (search keyword)
- Testimoni:
  - nav seterus/sebelum
  - dots indicator + auto rotate (mobile)
- Galeri lightbox
- CTA konsisten ke WhatsApp
- Event tracking (GA4-ready)
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

## Cara Guna Website

### A) Untuk Pelanggan

1. Buka website dan lihat menu/pakej.
2. Pergi ke bahagian `Tempahan`.
3. Isi borang ringkas (nama, jenis majlis, saiz, tarikh, bajet).
4. Semak `Ringkasan Tempahan`.
5. Tekan `Tempah di WhatsApp` untuk hantar detail terus.

### B) Untuk Owner

1. Update nombor WhatsApp / Instagram di `script.js`.
2. Update minimum hari tempahan (`leadDays`) di `script.js`.
3. Update teks, harga, pakej, promo dalam `index.html`.
4. Simpan fail, refresh browser (`Ctrl + F5`).
5. Semak view desktop + mobile sebelum publish.

## Cara Jalankan

1. Buka `index.html` terus di browser.
2. Atau guna local server (disyorkan):
- VS Code Live Server
- `python -m http.server 8080`

## Semakan JavaScript

Dalam root projek:

```powershell
node --check script.js
```

Jika `node` tidak dikesan:

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
- semua link `wa.me` ikut `whatsappNumber`
- paparan nombor ikut `whatsappDisplay`
- semua link Instagram ikut `instagramUrl`

### 2) Tetapan minimum hari tempahan

Edit di `script.js`:

```js
const OWNER_ORDER_SETTINGS = {
  leadDays: 3
};
```

Maksud:
- `leadDays`: minimum jarak hari antara hari ini dan tarikh tempahan.

### 3) Google Analytics 4

Edit meta tag di `index.html`:

```html
<meta name="ga4-measurement-id" content="G-XXXXXXXXXX" />
```

Ganti dengan ID sebenar, contoh `G-ABC123XYZ9`.

## Event Tracking Yang Direkod

- `whatsapp_click`
- `cta_to_order_click`
- `order_form_submit`
- `menu_filter_select`
- `faq_toggle`
- `bundle_order_click`
- `gallery_open`
- `testimonial_nav_click`

## Rutin Update Mingguan (Disyorkan)

1. Semak `leadDays` dan polisi tempahan.
2. Semak harga/promo/pakej dalam `index.html`.
3. Semak nombor WhatsApp dan link Instagram.
4. Test borang tempahan hingga buka WhatsApp.
5. Semak desktop + mobile view.
6. Tambah testimoni/gambar baru jika ada.

## Nota Maintenance

- Simpan fail sebagai UTF-8 jika nampak simbol pelik.
- ID penting yang jangan ditukar tanpa update `script.js`:
  - `orderForm`, `faqToggle`, `faqContent`
- Untuk prestasi, guna imej WebP/AVIF dan saiz imej yang sesuai.

## Pemilikan

Website ini disediakan untuk kegunaan perniagaan `Anys Maniz @ Homebaker`.
