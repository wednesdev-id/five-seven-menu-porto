# Five Seven — UI ordering meja

Status: brief disepakati untuk UI/prototipe; belum implementasi atau deploy.

## Scope
- React PWA dengan Motion; deploy frontend ke Cloudflare Pages.
- UI saja tahap awal: tidak membangun backend, DB, integrasi payment gateway, atau dashboard operasional kasir/dapur.
- Mobile-first, lalu tablet (interpretasi 'tab'); desktop tetap responsif.
- Tanpa login pelanggan atau kewajiban instal PWA.

## Referensi
Menu Book Five Seven.pdf (17 halaman): https://drive.google.com/file/d/1bb4cHtmf9xcsry50g2YGDm-pKf7FrDMF/view
- Charcoal, off-white, aksen mocha/taupe; tipografi tebal; foto produk dominan.
- Nama, varian, harga, dan foto mengacu PDF, bukan karangan. Ekstraksi seluruh menu masih perlu verifikasi; baru beberapa halaman diperiksa.

## Flow pelanggan
1. Scan QR di meja; buka URL menu dengan identitas meja, contoh /?table=07.
2. Pilih kategori/menu, varian yang tersedia, jumlah, dan catatan. Tambah ke keranjang.
3. Review nomor meja, item, jumlah, dan total; pilih QRIS atau bayar di kasir.
4. Tampilkan konfirmasi demo dan ringkasan pesanan.

## Batas prototipe
- Label jelas: Demo — pesanan tidak dikirim ke kasir/dapur dan pembayaran tidak diproses.
- Tidak menampilkan pembayaran berhasil sebagai transaksi nyata.
- QRIS belum diberikan: gunakan placeholder berlabel, bukan kode pembayaran nyata.
- Data keranjang boleh disimpan lokal; bukan pencatatan order operasional.
- Nomor meja hilang/tidak valid: minta scan ulang atau pilih meja untuk demo, jangan menganggap meja sah.
- Offline: menu yang telah tersimpan dapat ditampilkan; tidak mengklaim pesanan terkirim.

## Responsive dan interaksi
- Mobile satu kolom, kategori mudah dijangkau, tombol keranjang di bawah dengan safe-area.
- Tablet dua kolom menu bila ruang cukup; ringkasan pesanan bisa berdampingan.
- Target sentuh minimal 44 px; fokus keyboard, label aksesibel, kontras terbaca.
- Motion secukupnya pada detail produk dan keranjang; hormati prefers-reduced-motion.
- Verifikasi 320, 375, 414, 768 px dan tablet landscape; tanpa horizontal overflow.

## Tahap berikutnya
- Ekstraksi/verifikasi seluruh menu dan aset PDF.
- Implementasi UI, manifest/service worker PWA, pengujian flow dan responsive.
- Deploy Cloudflare Pages setelah memastikan akun/proyek/domain tujuan; gunakan pages.dev bila belum ada domain yang ditetapkan.
- Backend dan verifikasi QRIS baru ditambahkan jika diminta menjadi sistem operasional.
