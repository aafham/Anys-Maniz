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
  - tajuk borang: `Buat Tempahan Sekarang`
  - wizard `2-step` (isi maklumat -> semak + hantar)
  - progress `1/2` -> `2/2` + hint dinamik field belum lengkap
  - quick chips untuk `Jenis Majlis`
  - chip `Lain-lain` sebagai pilihan custom
  - field wajib `Saiz Kek`
  - helper tarikh minimum automatik (`leadDays`)
  - validasi kosong + auto scroll ke field error pertama
  - ringkasan tempahan live
  - mesej auto-generate ke WhatsApp
  - link WhatsApp kontekstual ikut lokasi CTA
  - polish UI desktop/mobile (spacing, hierarchy, readability)
  - kemasan accessibility visual (focus ring dan kontras teks/border)
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

### 4) Copy mesej WhatsApp ikut section + tone

Tetapkan gaya ayat di atas `script.js`:

```js
const OWNER_WHATSAPP_SETTINGS = {
  tonePreset: "consultative" // atau "direct"
};
```

Edit di atas `script.js`:

```js
const WA_TONE_PRESETS = {
  consultative: { ... },
  direct: { ... }
};
```

Maksud:
- setiap CTA WhatsApp guna ayat pembuka berbeza ikut lokasi butang
- owner boleh tukar tone keseluruhan tanpa ubah setiap CTA satu persatu
- `mini_cta` dan `mobile_sticky` auto tambah template ringkas:
  - Tarikh majlis
  - Jenis majlis
  - Saiz kek
  - Bajet

## Perubahan Terkini (UI Tempahan)

- Borang ditukar kepada `Buat Tempahan Sekarang`.
- Layout `step 1` di desktop dioptimumkan untuk elak ruang kosong.
- Progress bar tambah hint dinamik (`Lengkapkan: ...`).
- `Nota Penting` dibersihkan (ikon close dibuang).
- Hierarki chip + helper text dikemas untuk kebolehbacaan.
- Kontras elemen borang dipertingkat (AA-oriented visual pass).
- Mobile overlap issue dikurangkan dengan pelarasan topbar/scroll offset.

## Event Tracking Yang Direkod

- `whatsapp_click`
  - parameter tambahan: `tone_preset`, `wa_context`, `location`, `label`
- `cta_to_order_click`
- `order_form_submit`
- `menu_filter_select`
- `faq_toggle`
- `bundle_order_click`
- `gallery_open`
- `testimonial_nav_click`

## Setup Report GA4 (A/B Tone WhatsApp)

Gunakan langkah ini dalam GA4 untuk banding prestasi `consultative` vs `direct`.

### 1) Daftar custom dimensions (Event scope)

Pergi ke:
`Admin > Data display > Custom definitions > Create custom dimensions`

Buat dimensi berikut:
1. `tone_preset` (Event parameter: `tone_preset`)
2. `wa_context` (Event parameter: `wa_context`)
3. `location` (Event parameter: `location`)

Nota:
- Tunggu sehingga 24 jam untuk data baru muncul dalam report standard.
- Event lama sebelum dimensi didaftarkan tidak akan diisi semula.

### 2) Bina Exploration report

Pergi ke:
`Explore > Free form`

Tambah dimensions:
1. `tone_preset`
2. `wa_context`
3. `Event name`

Tambah metrics:
1. `Event count`
2. `Total users`

Letak filters:
1. `Event name exactly matches whatsapp_click`
2. (Opsyenal) `wa_context does not exactly match unspecified`

Susun table:
1. Rows: `tone_preset`, `wa_context`
2. Values: `Event count`, `Total users`

### 3) Bina Funnel ringkas (klik ke submit)

Pergi ke:
`Explore > Funnel exploration`

Buat steps:
1. `Event name = whatsapp_click`
2. `Event name = order_form_submit`

Tambah breakdown:
1. `tone_preset`

Tujuan:
- nampak tone mana lebih banyak klik
- nampak tone mana lebih ramai user bergerak ke submit borang

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
