# CBT SRT 68 Luwu Utara V.2.5

Aplikasi Ujian Berbasis Komputer (Computer-Based Test) multi-peran dengan sinkronisasi cloud real-time (Vercel + Supabase PostgreSQL) untuk **Sekolah Rakyat Terintegrasi 68 Luwu Utara**.

## Pembaruan Utama Versi 2.5
1. **Database Bersih Tanpa Data Dummy**: Hanya menyisakan 1 akun default administrator (`username: admin`, `password: 123`) agar siap digunakan untuk input data riil sekolah.
2. **Indikator Ragu-Ragu & Navigasi Soal Presisi**: Status *Ragu-Ragu* otomatis hilang dan tombol nomor langsung berubah hijau saat peserta memilih/mengisi jawaban; tombol **Sebelumnya** tetap mempertahankan status hijau.
3. **Proteksi Keamanan Ketat (Maksimal 3x Pelanggaran)**: Pelanggaran dibatasi maksimal **3 kali**. Saat peringatan muncul, layar soal langsung terkunci sehingga peserta tidak dapat mengerjakan soal di balik layar peringatan.
4. **Token Buka Blokir Baru dari Proktor**: Akun peserta yang terblokir akibat 3x pelanggaran wajib memasukkan **6 digit Token Buka Blokir baru** yang dirilis Proktor pada menu Proctoring.
5. **Multi-Mata Pelajaran Aktif per Sesi Ujian**: Admin dapat mencentang beberapa mata pelajaran aktif pada satu sesi ujian sehingga peserta mengerjakan semua mata pelajaran sesi tersebut secara berurutan.
6. **Menu Panduan & Alur Program CBT (`8-panduan-alur.html`)**: Halaman dokumentasi alur kerja lengkap untuk Admin, Guru, Proktor, Wali Kelas, dan Peserta.
