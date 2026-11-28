# CBT SRT 68 Luwu Utara V.4.0 (Database Bersih — Admin Only)

Aplikasi Ujian Berbasis Komputer (Computer-Based Test) multi-peran dengan sinkronisasi cloud real-time (Vercel + Supabase PostgreSQL) untuk **Sekolah Rakyat Terintegrasi 68 Luwu Utara**.

## Pembaruan Utama Versi 4.0
1. **Aplikasi & Database 100% Bersih Tanpa Data Dummy**:
   - Menghapus seluruh data dummy siswa, guru, wali kelas, kelas, mata pelajaran, dan bank soal dari kode aplikasi (`shared-cbt.js`) maupun skema database (`supabase-schema.sql`).
   - Hanya menyisakan **1 akun Administrator Utama** (`username: admin`, `password: 123`).
   - Ukuran file `shared-cbt.js` dipangkas drastis dari 1,66 MB menjadi ~85 KB sehingga jauh lebih ringan dan cepat dimuat di perangkat siswa maupun server Vercel.
2. **Skrip SQL Database Baru Siap Jalankan (`supabase-schema.sql` & `reset-data-admin-only.sql`)**:
   - Jalankan `supabase-schema.sql` di **Supabase → SQL Editor** untuk membangun ulang seluruh tabel dari nol dalam kondisi bersih.
   - Atau jalankan `reset-data-admin-only.sql` jika hanya ingin mengosongkan isi tabel tanpa menghapus struktur tabel.
3. **Auto-Reset Cache Browser Lama (`CBT_SUPABASE_CACHE_V4_0`)**:
   - Saat pertama kali dibuka di browser, aplikasi otomatis membersihkan sisa cache versi lama (`V3.7` / `V3.9`) agar data dummy lama tidak tersinkronisasi ulang ke Supabase.

---

# CBT SRT 68 Luwu Utara V.3.3

Aplikasi Ujian Berbasis Komputer (Computer-Based Test) multi-peran dengan sinkronisasi cloud real-time (Vercel + Supabase PostgreSQL) untuk **Sekolah Rakyat Terintegrasi 68 Luwu Utara**.

## Pembaruan Utama Versi 3.3
1. **Database Bersih Tanpa Data Dummy**: Hanya menyisakan 1 akun default administrator (`username: admin`, `password: 123`) agar siap digunakan untuk input data riil sekolah.
2. **Indikator Ragu-Ragu & Navigasi Soal Presisi**: Status *Ragu-Ragu* otomatis hilang dan tombol nomor langsung berubah hijau saat peserta memilih/mengisi jawaban; tombol **Sebelumnya** tetap mempertahankan status hijau.
3. **Proteksi Keamanan Ketat (Maksimal 3x Pelanggaran)**: Pelanggaran dibatasi maksimal **3 kali**. Saat peringatan muncul, layar soal langsung terkunci sehingga peserta tidak dapat mengerjakan soal di balik layar peringatan.
4. **Token Buka Blokir Baru dari Proktor**: Akun peserta yang terblokir akibat 3x pelanggaran wajib memasukkan **6 digit Token Buka Blokir baru** yang dirilis Proktor pada menu Proctoring.
5. **Multi-Mata Pelajaran Aktif per Sesi Ujian**: Admin dapat mencentang beberapa mata pelajaran aktif pada satu sesi ujian sehingga peserta mengerjakan semua mata pelajaran sesi tersebut secara berurutan.
6. **Menu Panduan & Alur Program CBT (`8-panduan-alur.html`)**: Halaman dokumentasi alur kerja lengkap untuk Admin, Guru, Proktor, Wali Kelas, dan Peserta.

## Pembaruan Versi 3.3
- **Aktivasi Multi-Mata Pelajaran Ujian (`2a-mata-pelajaran.html`)**: Admin/Guru dapat mencentang dan mengaktifkan lebih dari satu mata pelajaran sekaligus sehingga setiap sesi ujian berlangsung untuk beberapa mata pelajaran secara berurutan.
- **Pencarian Peserta di Proctoring (`4-proctoring-pengawas.html`)**: Penambahan kolom pencarian cepat berdasarkan **Nama Peserta**, **Nomor Peserta**, atau **NIS** beserta filter status ujian.
- **Pencarian Peserta di Penilaian & Analisis (`5-penilaian-analisis.html`)**: Penambahan kolom pencarian peserta berdasarkan **Nama**, **Nomor Peserta**, atau **NIS** yang langsung menyaring daftar nilai, analisis butir soal, dan pembahasan peserta.

## Pembaruan Versi 3.3
- **Edit Jenjang & Kode Mata Pelajaran (`2a-mata-pelajaran.html`)**: Penambahan tombol **Edit** pada setiap baris **Daftar Mata Pelajaran Terdaftar** untuk mengubah **Nama Mata Pelajaran**, **Kode / Singkatan Mapel**, dan **Jenjang / Tingkat Sasaran** secara langsung beserta sinkronisasi otomatis ke Bank Soal dan akun Guru.

## Pembaruan Versi 3.3
- **Ujian Serentak Lintas Jenjang & Kelas (`2a-mata-pelajaran.html`, `3-ujian-peserta.html`, `shared-cbt.js`)**:
  - Penambahan pilihan jenjang spesifik pada Input & Edit Mata Pelajaran: **SD (Semua Kelas 1-6)**, **SD Rendah (Kelas 1-3)**, **SD Tinggi (Kelas 4-6)**, **SMP (Semua Kelas 7-9)**, **SMP Kelas 7**, **SMP Kelas 8**, **SMP Kelas 9**, **SMK / Kejuruan**, dan **Semua Jenjang**.
  - Saat siswa SD dan SMP (Kelas 7, 8, dan 9) login bersamaan dalam satu sesi yang sama, sistem otomatis memfilter antrean mata pelajaran aktif sesuai jenjang/kelas masing-masing peserta dan mencegah soal dari jenjang/mapel lain muncul.
  - Sinkronisasi metadata jenjang/kode mata pelajaran (`subjects_meta`) ke cloud agar terbaca otomatis oleh seluruh perangkat peserta.

## Pembaruan Versi 3.3
- **Pencarian Lengkap di Daftar Mata Pelajaran (`2a-mata-pelajaran.html`)**: Kolom pencarian pada *Daftar Mata Pelajaran Terdaftar* kini dapat mencari berdasarkan **Nama Mata Pelajaran**, **Jenjang**, **Kode Mapel**, maupun **Nama Guru Pengampu**.
- **Tanda Jenjang SD / SMP & Filter pada Daftar Butir Soal (`2-bank-soal.html`)**: Setiap butir soal pada *Daftar Butir Soal* serta pilihan dropdown mata pelajaran kini menampilkan tanda/badge jenjang (**SD**, **SMP Kelas 7/8/9**, **SMK**, atau **Semua Jenjang**) beserta kode mapel, dilengkapi filter cepat berdasarkan jenjang (**SD / SMP / SMK**).

## Pembaruan Versi 3.3
- **Mode Editor Adaptif Matematika vs Mata Pelajaran Biasa (`2-bank-soal.html`)**:
  - Fitur lengkap **Editor Word & Matematika** (tombol pecahan, akar, pangkat/indeks, sigma, integral, limit, palet simbol matematika/sains, dan rumus pada opsi PG) tampil khusus saat mata pelajaran **Matematika** dipilih.
  - Saat mata pelajaran selain Matematika dipilih, form otomatis beralih ke **Editor Teks Standar (Tampilan Biasa)** yang ringkas dan bersih.
- **Filter Bertingkat Jenjang ke Dropdown Mata Pelajaran (`2-bank-soal.html`)**:
  - Pada bagian **Daftar Butir Soal**, memilih filter **Jenjang SD**, **Jenjang SMP**, atau **Jenjang SMK** otomatis menyaring isi dropdown **Mata Pelajaran** di sebelahnya agar hanya menampilkan mata pelajaran dari jenjang tersebut.

## Pembaruan Versi 3.3
- **Sisipkan Gambar Lengkap pada Editor Teks Standar (`2-bank-soal.html`)**:
  - Pada mode **Editor Teks Standar** (semua mata pelajaran non-Matematika), pengguna dapat menyisipkan gambar langsung di dalam naskah soal melalui tombol **Sisipkan Gambar** (upload dari komputer/HP dengan kompresi otomatis), **Gambar URL**, **seret & lepas (Drag & Drop)** langsung ke kotak naskah soal, maupun **tempel langsung (`Ctrl+V`)** dari clipboard.

## Pembaruan Versi 3.3
- **Penempatan Gambar Tepat di Tengah / Posisi Kursor Soal (`2-bank-soal.html`, `shared-cbt.css`)**:
  - Mempertahankan posisi kursor terakhir (`savedEditorRange`) saat membuka dialog unggah file atau URL sehingga gambar langsung disisipkan tepat di bagian soal yang diinginkan (awal, tengah kalimat, antar paragraf, atau akhir).
  - Menambahkan toolbar pengaturan cepat saat gambar di dalam soal diklik untuk mengatur perataan (**Sebaris Teks**, **Tengah**, **Kiri**, **Kanan**), ukuran (**Kecil**, **Sedang**, **Besar**, **Penuh**), maupun menghapus gambar, serta mendukung seret langsung ke titik teks yang diinginkan.

## Pembaruan Versi 3.3
- **Sinkronisasi Jenjang & Mata Pelajaran pada Data Kelas, Wali Kelas, dan Menu Rekap Wali Kelas (`1-manajemen-data-pengguna.html`, `6-rekap-wali-kelas.html`, `shared-cbt.js`)**:
  - Penambahan pilihan **Jenjang / Tingkat Kelas** (`SD Rendah`, `SD Tinggi`, `SMP Kelas 7/8/9`, `SMK`) serta checklist **Mata Pelajaran Kelas** & **Mapel Dipegang Wali Kelas** pada form **Data Kelas & Wali Kelas** maupun **Manajemen Pengguna (Wali Kelas)**.
  - Menu **Rekap Wali Kelas (`6-rekap-wali-kelas.html`)** kini otomatis hanya menarik daftar mata pelajaran yang sesuai dengan **jenjang kelas tersebut** (tidak lagi mencampur mapel SD dan SMP), menandai mata pelajaran yang dipegang langsung oleh Wali Kelas, dan menyediakan filter tampilan antara *Semua Mapel Jenjang Kelas* dan *Khusus Mapel Dipegang Wali Kelas*.
