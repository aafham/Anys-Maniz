# Anys Maniz Website

Landing page statik untuk kedai kek `Anys Maniz @ Homebaker`.

Website ini dibina untuk:
- perkenalkan brand dan produk
- mudahkan pelanggan tengok menu
- percepat proses tempahan melalui WhatsApp

## Apa Website Ini Buat

Website ini fokus pada conversion (pelawat jadi pelanggan) dengan flow yang ringkas:

1. Pelawat lihat hero, trust signal, promo, dan produk.
2. Pelawat boleh tapis kategori menu kek.
3. Pelawat boleh pilih kek atau pakej bundle.
4. Pelawat boleh isi borang ringkas atau terus klik WhatsApp.
5. Mesej tempahan auto dijana ke WhatsApp.

## Ciri Utama

- Responsive layout (desktop, tablet, mobile)
- Sticky top navigation + mobile hamburger menu
- Active nav state ikut section semasa scroll
- Scroll progress bar + back-to-top button
- Quick action bar di mobile
- Galeri dengan lightbox
- Penapis kategori menu
- Sticky quick order bar (papar item dipilih)
- Bundle section dengan butang tempah terus
- Availability slot (slot tempahan) dan auto isi tarikh borang
- FAQ search + empty state message
- Testimoni dengan auto-rotate di mobile + control button
- SEO asas:
  - meta description
  - Open Graph tags
  - LocalBusiness JSON-LD schema

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

Ini projek statik, jadi boleh jalan terus:

1. Buka `index.html` dalam browser.
2. Atau guna local server (disyorkan), contoh:
   - VS Code Live Server
   - `python -m http.server 8080`

## Konfigurasi Penting

### 1) Nombor WhatsApp

Tukar constant ini dalam `script.js`:

```js
const WHATSAPP_NUMBER = "60123456789";
```

### 2) Link WhatsApp/Instagram dalam HTML

Semak dan tukar semua link di `index.html`:
- `https://wa.me/...`
- `https://instagram.com/...`

### 3) Alamat dan waktu operasi

Ubah section contact dalam `index.html`:
- alamat
- waktu operasi
- embed Google Maps

### 4) Produk, harga, pakej, slot

Ubah data terus dalam `index.html` dan logic ringkas di `script.js`:
- kad menu
- harga
- pakej bundle
- status slot availability

## Fokus UX Projek Ini

- Design lembut dan bersih untuk brand bakery
- Call-to-action yang konsisten (`Tempah di WhatsApp`)
- Interaksi cepat tanpa form yang panjang
- Komponen animation ringan supaya tidak ganggu usability

## Cadangan Next Step

- compress imej (WebP lebih agresif) untuk loading lebih laju
- tambah testimoni sebenar (gambar + tarikh)
- sambung analytics event (klik WhatsApp, submit form, pilih menu)
- tambah mode CMS ringan jika mahu senang update content tanpa sentuh kod

## Pemilikan

Website ini disediakan untuk kegunaan perniagaan `Anys Maniz @ Homebaker`.
