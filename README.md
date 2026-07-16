# Resep Ku — Koleksi Resep Masakan & Kopi Pribadi

Website statis sederhana untuk menyimpan resep masakan dan kopi pribadi.
Dibangun dengan HTML + CSS + Vanilla JS, tanpa backend, tanpa build step.

## Struktur Folder

```
resep-app/
├── index.html          # Halaman utama
├── css/
│   └── style.css       # Semua styling
├── js/
│   └── app.js           # Logic search, filter, dan modal detail resep
├── data/
│   └── recipes.json     # Semua data resep (edit file ini untuk nambah resep)
└── images/               # (opsional) simpan foto resep di sini
```

## Cara Menambah Resep Baru

Buka `data/recipes.json`, lalu tambahkan object baru dengan format:

```json
{
  "id": 3,
  "title": "Nama Resep",
  "category": "makanan",   // atau "kopi"
  "image": "",
  "time": "15 menit",
  "servings": "2 porsi",
  "difficulty": "Mudah",
  "tags": ["kata kunci pencarian"],
  "ingredients": ["bahan 1", "bahan 2"],
  "steps": ["langkah 1", "langkah 2"],
  "notes": "Catatan tambahan (opsional)"
}
```

`id` harus unik dan urut. Kategori saat ini hanya `makanan` dan `kopi` —
kalau mau tambah kategori baru, edit juga tombol filter di `index.html`
(bagian `#filterTabs`) dan `categoryIcon` di `js/app.js`.

## Menjalankan Secara Lokal

Karena `fetch()` butuh server (bukan buka file langsung di browser),
jalankan local server sederhana dulu:

```bash
# Python
python3 -m http.server 8000

# atau Node (kalau sudah install npx)
npx serve .
```

Lalu buka `http://localhost:8000`.

## Deploy ke Vercel

1. Push folder ini ke repo GitHub.
2. Buka [vercel.com](https://vercel.com) → New Project → Import repo.
3. Framework Preset: pilih **Other** (karena ini static site biasa).
4. Build Command: kosongkan. Output Directory: kosongkan (root).
5. Deploy.

Atau lewat CLI:

```bash
npm i -g vercel
cd resep-app
vercel
```

## Ide Pengembangan Selanjutnya

- Tambah foto resep asli (isi field `image` dengan path di folder `images/`)
- Tambah fitur rating/favorit pribadi (simpan di `localStorage`)
- Tambah dark mode toggle
- Kalau jumlah resep sudah banyak, bisa migrasi ke Astro/Eleventy supaya
  tiap resep jadi file Markdown terpisah (lebih rapi untuk dikelola)
