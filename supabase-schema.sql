-- ============================================================================
-- SKEMA DATABASE POSTGRESQL UNTUK SUPABASE (CBT ONLINE 80+ KOMPUTER SERENTAK)
-- Jalankan seluruh skrip ini di menu: Supabase -> SQL Editor -> New Query -> Run
-- ============================================================================

-- 1. Tabel Pengaturan Ujian (1 Baris Utama id = 1)
CREATE TABLE IF NOT EXISTS public.cbt_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  exam_title TEXT NOT NULL DEFAULT 'Portal Aplikasi Asesmen Sumatif Akhir Semester (ASAS)',
  subject TEXT NOT NULL DEFAULT 'Informatika & Literasi Digital',
  duration_minutes INTEGER NOT NULL DEFAULT 45,
  active_token TEXT NOT NULL DEFAULT 'CBT2026',
  shuffle_questions BOOLEAN NOT NULL DEFAULT TRUE,
  shuffle_options BOOLEAN NOT NULL DEFAULT TRUE,
  show_review_after_submit BOOLEAN NOT NULL DEFAULT TRUE,
  max_violations INTEGER NOT NULL DEFAULT 4,
  subjects_list JSONB NOT NULL DEFAULT '["Informatika & Literasi Digital", "Teknik Komputer dan Jaringan (TKJ)", "Koding dan Kecerdasan Artifisial (KKA)"]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.cbt_settings ADD COLUMN IF NOT EXISTS subjects_list JSONB NOT NULL DEFAULT '["Informatika & Literasi Digital", "Teknik Komputer dan Jaringan (TKJ)", "Koding dan Kecerdasan Artifisial (KKA)"]'::jsonb;


-- 2. Tabel Pengguna (Admin, Guru, Wali Kelas, Siswa, Proktor)
CREATE TABLE IF NOT EXISTS public.cbt_users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Admin', 'Guru', 'Wali Kelas', 'Siswa', 'Proktor')),
  kelas TEXT DEFAULT '-',
  id_kelas TEXT DEFAULT '-',
  sesi TEXT DEFAULT '-',
  ruang TEXT DEFAULT '-',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migrasi aman jika tabel cbt_users sudah dibuat sebelumnya
ALTER TABLE public.cbt_users ADD COLUMN IF NOT EXISTS id_kelas TEXT DEFAULT '-';
ALTER TABLE public.cbt_users ADD COLUMN IF NOT EXISTS photo_url TEXT DEFAULT '';
ALTER TABLE public.cbt_users DROP CONSTRAINT IF EXISTS cbt_users_role_check;
ALTER TABLE public.cbt_users ADD CONSTRAINT cbt_users_role_check CHECK (role IN ('Admin', 'Guru', 'Wali Kelas', 'Siswa', 'Proktor'));

-- 3. Tabel Bank Soal Digital
CREATE TABLE IF NOT EXISTS public.cbt_questions (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  subject TEXT NOT NULL,
  text TEXT NOT NULL,
  media_type TEXT DEFAULT 'none',
  media_url TEXT DEFAULT '',
  options JSONB DEFAULT '[]'::jsonb,
  pairs JSONB DEFAULT '[]'::jsonb,
  answer TEXT NOT NULL,
  weight INTEGER NOT NULL DEFAULT 10,
  explanation TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabel Sesi Ujian, Jawaban, Proctoring & Nilai Akhir
CREATE TABLE IF NOT EXISTS public.cbt_sessions (
  student_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  kelas TEXT DEFAULT '-',
  id_kelas TEXT DEFAULT '-',
  ruang TEXT DEFAULT '-',
  status TEXT DEFAULT 'Siap Ujian',
  progress INTEGER DEFAULT 0,
  violations INTEGER DEFAULT 0,
  violation_logs JSONB DEFAULT '[]'::jsonb,
  extra_minutes INTEGER DEFAULT 0,
  broadcast_msg TEXT DEFAULT '',
  answers JSONB DEFAULT '{}'::jsonb,
  essay_scores JSONB DEFAULT '{}'::jsonb,
  auto_score NUMERIC(6,2) DEFAULT 0,
  essay_score NUMERIC(6,2) DEFAULT 0,
  final_score NUMERIC(6,2) DEFAULT 0,
  submitted_at TEXT DEFAULT NULL,
  subject_results JSONB DEFAULT '{}'::jsonb,
  subjects_list JSONB NOT NULL DEFAULT '["Informatika & Literasi Digital", "Teknik Komputer dan Jaringan (TKJ)", "Koding dan Kecerdasan Artifisial (KKA)"]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.cbt_settings ADD COLUMN IF NOT EXISTS subjects_list JSONB NOT NULL DEFAULT '["Informatika & Literasi Digital", "Teknik Komputer dan Jaringan (TKJ)", "Koding dan Kecerdasan Artifisial (KKA)"]'::jsonb;


ALTER TABLE public.cbt_sessions ADD COLUMN IF NOT EXISTS id_kelas TEXT DEFAULT '-';
ALTER TABLE public.cbt_sessions ADD COLUMN IF NOT EXISTS subject_results JSONB DEFAULT '{}'::jsonb;

-- 5. Tabel Master Ruang Ujian & Sesi Ujian
CREATE TABLE IF NOT EXISTS public.cbt_exam_spaces (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('SESSION', 'ROOM')),
  name TEXT NOT NULL,
  start_time TEXT DEFAULT NULL,
  end_time TEXT DEFAULT NULL,
  capacity INTEGER DEFAULT 36,
  note TEXT DEFAULT '-',
  kelas_akses TEXT NOT NULL DEFAULT 'ALL',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Tabel Master Kelas, ID Kelas & Wali Kelas
CREATE TABLE IF NOT EXISTS public.cbt_classes (
  id_kelas TEXT PRIMARY KEY,
  nama_kelas TEXT NOT NULL,
  wali_kelas_username TEXT DEFAULT '-',
  wali_kelas_name TEXT DEFAULT '-',
  keterangan TEXT DEFAULT '-',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indeks untuk mempercepat query rekap nilai dan monitoring 80+ komputer serentak
CREATE INDEX IF NOT EXISTS idx_cbt_users_role ON public.cbt_users(role);
CREATE INDEX IF NOT EXISTS idx_cbt_users_id_kelas ON public.cbt_users(id_kelas);
CREATE INDEX IF NOT EXISTS idx_cbt_questions_subject ON public.cbt_questions(subject);
CREATE INDEX IF NOT EXISTS idx_cbt_sessions_status ON public.cbt_sessions(status);
CREATE INDEX IF NOT EXISTS idx_cbt_sessions_id_kelas ON public.cbt_sessions(id_kelas);

-- Nonaktifkan RLS agar REST API langsung dapat diakses oleh aplikasi frontend CBT
ALTER TABLE public.cbt_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbt_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbt_questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbt_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbt_exam_spaces DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbt_classes DISABLE ROW LEVEL SECURITY;

-- Data Awal Bawaan
INSERT INTO public.cbt_settings (id, exam_title, subject, duration_minutes, active_token)
VALUES (1, 'Portal Aplikasi Asesmen Sumatif Akhir Semester (ASAS)', 'Informatika & Literasi Digital', 45, 'CBT2026')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.cbt_classes (id_kelas, nama_kelas, wali_kelas_username, wali_kelas_name, keterangan) VALUES
  ('KLS-XII-TKJ-1', 'XII-TKJ-1', 'wali.tkj1', 'Siti Aminah, S.Pd', 'Teknik Komputer dan Jaringan')
ON CONFLICT (id_kelas) DO NOTHING;

INSERT INTO public.cbt_users (id, username, password, name, role, kelas, id_kelas, sesi, ruang) VALUES
  ('USR_ADMIN_FAJAR', 'Fajar', '123', 'Fajar Jamal, S.Kom', 'Admin', 'Administrator & Guru TIK', '-', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 1'),
  ('USR_ADMIN_1', 'admin', '123', 'Administrator Utama', 'Admin', 'Panitia Ujian', '-', '-', '-'),
  ('USR_GURU_1', 'guru.rudi', '123', 'Rudi Hartono, S.Pd', 'Guru', 'Informatika & Literasi Digital', '-', '-', '-'),
  ('USR_WALI_1', 'wali.tkj1', '123', 'Siti Aminah, S.Pd', 'Wali Kelas', 'XII-TKJ-1', 'KLS-XII-TKJ-1', '-', '-'),
  ('USR_PROK_1', 'proktor1', '123', 'Pengawas Lab 1', 'Proktor', 'Pengawas Ruang', '-', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 1'),
  ('USR_SISWA_1', '2026001', '123', 'Ahmad Fauzi', 'Siswa', 'XII-TKJ-1', 'KLS-XII-TKJ-1', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 1'),
  ('USR_SISWA_2', '2026002', '123', 'Siti Nurhaliza', 'Siswa', 'XII-TKJ-1', 'KLS-XII-TKJ-1', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 1')
ON CONFLICT (username) DO NOTHING;

INSERT INTO public.cbt_questions (id, type, subject, text, options, answer, weight, explanation) VALUES
  ('Q1_INIT', 'PG', 'Informatika & Literasi Digital', 'Protokol yang digunakan untuk menerjemahkan nama domain menjadi alamat IP adalah...', '["DHCP", "DNS", "FTP", "SMTP"]'::jsonb, 'DNS', 10, 'DNS (Domain Name System) menerjemahkan nama domain menjadi alamat IP.'),
  ('Q2_INIT', 'BS', 'Informatika & Literasi Digital', 'Alamat IP 192.168.1.1 termasuk dalam kategori alamat IP Privat (RFC 1918).', '["Benar", "Salah"]'::jsonb, 'Benar', 10, 'Blok 192.168.0.0/16 merupakan alamat IP privat untuk jaringan lokal.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.cbt_sessions (student_id, name, kelas, id_kelas, ruang, status) VALUES
  ('2026001', 'Ahmad Fauzi', 'XII-TKJ-1', 'KLS-XII-TKJ-1', 'Lab Komputer 1', 'Siap Ujian'),
  ('2026002', 'Siti Nurhaliza', 'XII-TKJ-1', 'KLS-XII-TKJ-1', 'Lab Komputer 1', 'Siap Ujian')
ON CONFLICT (student_id) DO NOTHING;

INSERT INTO public.cbt_exam_spaces (id, category, name, start_time, end_time, capacity, note, kelas_akses) VALUES
  ('S1', 'SESSION', 'Sesi 1', '07:30', '09:30', 0, 'Sesi Pagi', 'ALL'),
  ('S2', 'SESSION', 'Sesi 2', '10:00', '12:00', 0, 'Sesi Siang', 'ALL'),
  ('S3', 'SESSION', 'Sesi 3', '13:00', '15:00', 0, 'Sesi Sore', 'ALL'),
  ('R1', 'ROOM', 'Lab Komputer 1', NULL, NULL, 36, 'Gedung Utama Lt. 1', 'ALL'),
  ('R2', 'ROOM', 'Lab Komputer 2', NULL, NULL, 36, 'Gedung Utama Lt. 2', 'ALL')
ON CONFLICT (id) DO NOTHING;


-- ============================================================================
-- SEED DATA DUMMY: 10 MATA PELAJARAN, 6 KELAS (SD 4-6 & SMP 7-9),
-- 83 SISWA DUMMY (20 SD, 63 SMP - NIS RANDOM 6 DIGIT, PASSWORD: 123456),
-- DAN 90 BUTIR SOAL DUMMY (9 SOAL PER MAPEL CAMPUR SD 4-6 & SMP 7-9)
-- ============================================================================

-- 1. Update 10 Mata Pelajaran di cbt_settings
UPDATE public.cbt_settings SET subjects_list = '["Matematika", "Bahasa Indonesia", "Bahasa Inggris", "Pendidikan Pancasila", "PJOK", "IPAS", "IPA", "IPS", "Informatika", "Koding dan Kecerdasan Artifisial (KKA)"]'::jsonb, updated_at = NOW() WHERE id = 1;

-- 2. Insert 6 Master Kelas SD 4-6 & SMP 7-9
INSERT INTO public.cbt_classes (id_kelas, nama_kelas, wali_kelas_username, wali_kelas_name, keterangan) VALUES
  ('KLS-SD-4', 'Kelas 4 SD', 'wali.sd4', 'Nurhayati, S.Pd', 'Jenjang Sekolah Dasar Kelas 4'),
  ('KLS-SD-5', 'Kelas 5 SD', 'wali.sd5', 'Rahmawati, S.Pd', 'Jenjang Sekolah Dasar Kelas 5'),
  ('KLS-SD-6', 'Kelas 6 SD', 'wali.sd6', 'Hasnawati, S.Pd', 'Jenjang Sekolah Dasar Kelas 6'),
  ('KLS-SMP-7', 'Kelas 7 SMP', 'wali.smp7', 'Siti Aminah, S.Pd', 'Jenjang Sekolah Menengah Pertama Kelas 7'),
  ('KLS-SMP-8', 'Kelas 8 SMP', 'wali.smp8', 'Budi Santoso, S.Pd', 'Jenjang Sekolah Menengah Pertama Kelas 8'),
  ('KLS-SMP-9', 'Kelas 9 SMP', 'wali.smp9', 'Rudi Hartono, S.Pd', 'Jenjang Sekolah Menengah Pertama Kelas 9')
ON CONFLICT (id_kelas) DO NOTHING;

-- 3. Insert 83 Siswa Dummy (20 SD, 63 SMP | NIS Random 6 Digit | Password: 123456)
INSERT INTO public.cbt_users (id, username, password, name, role, kelas, id_kelas, sesi, ruang) VALUES
  ('DUM_SISWA_01', '985617', '123456', 'Ahmad Pratama', 'Siswa', 'Kelas 4 SD', 'KLS-SD-4', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 1'),
  ('DUM_SISWA_02', '109972', '123456', 'Siti Azzahra', 'Siswa', 'Kelas 4 SD', 'KLS-SD-4', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_03', '430356', '123456', 'Muhammad Fauzi', 'Siswa', 'Kelas 4 SD', 'KLS-SD-4', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_04', '574653', '123456', 'Nur Wulandari', 'Siswa', 'Kelas 4 SD', 'KLS-SD-4', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 2'),
  ('DUM_SISWA_05', '687998', '123456', 'Andi Nugroho', 'Siswa', 'Kelas 4 SD', 'KLS-SD-4', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_06', '356837', '123456', 'Putri Permata', 'Siswa', 'Kelas 4 SD', 'KLS-SD-4', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_07', '138782', '123456', 'Rizky Ramadhan', 'Siswa', 'Kelas 4 SD', 'KLS-SD-4', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 1'),
  ('DUM_SISWA_08', '646456', '123456', 'Aisyah Bakri', 'Siswa', 'Kelas 5 SD', 'KLS-SD-5', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_09', '515983', '123456', 'Fadli Latuconsina', 'Siswa', 'Kelas 5 SD', 'KLS-SD-5', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_10', '290379', '123456', 'Fitri Taher', 'Siswa', 'Kelas 5 SD', 'KLS-SD-5', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 2'),
  ('DUM_SISWA_11', '801409', '123456', 'Ilham Rahman', 'Siswa', 'Kelas 5 SD', 'KLS-SD-5', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_12', '603094', '123456', 'Dewi Saputra', 'Siswa', 'Kelas 5 SD', 'KLS-SD-5', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_13', '901913', '123456', 'Arif Ramadhani', 'Siswa', 'Kelas 5 SD', 'KLS-SD-5', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 1'),
  ('DUM_SISWA_14', '229439', '123456', 'Nadia Setiawan', 'Siswa', 'Kelas 5 SD', 'KLS-SD-5', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_15', '411765', '123456', 'Reza Nugroho', 'Siswa', 'Kelas 6 SD', 'KLS-SD-6', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_16', '754811', '123456', 'Salsabila Permata', 'Siswa', 'Kelas 6 SD', 'KLS-SD-6', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 2'),
  ('DUM_SISWA_17', '574524', '123456', 'Dimas Ramadhan', 'Siswa', 'Kelas 6 SD', 'KLS-SD-6', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_18', '983708', '123456', 'Zahra Hasan', 'Siswa', 'Kelas 6 SD', 'KLS-SD-6', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_19', '887871', '123456', 'Farhan Pattinama', 'Siswa', 'Kelas 6 SD', 'KLS-SD-6', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 1'),
  ('DUM_SISWA_20', '156682', '123456', 'Annisa Kadir', 'Siswa', 'Kelas 6 SD', 'KLS-SD-6', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_21', '741122', '123456', 'Bayu Mansyur', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_22', '992683', '123456', 'Rahma Saputra', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 2'),
  ('DUM_SISWA_23', '765385', '123456', 'Yoga Ramadhani', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_24', '893294', '123456', 'Indah Setiawan', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_25', '426291', '123456', 'Hendra Anggraini', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 1'),
  ('DUM_SISWA_26', '769702', '123456', 'Lestari Maulana', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_27', '995734', '123456', 'Iqbal Sari', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_28', '878351', '123456', 'Nabila Mulyadi', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 2'),
  ('DUM_SISWA_29', '145555', '123456', 'Rafi Pattinama', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_30', '126436', '123456', 'Intan Kadir', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_31', '747580', '123456', 'Galih Mansyur', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 1'),
  ('DUM_SISWA_32', '398703', '123456', 'Aulia Nurhaliza', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_33', '860225', '123456', 'Bagas Hidayat', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_34', '787677', '123456', 'Mutiara Puspitasari', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 2'),
  ('DUM_SISWA_35', '693139', '123456', 'Fajar Kurniawan', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_36', '285431', '123456', 'Kartika Maulana', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_37', '750715', '123456', 'Akbar Sari', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 1'),
  ('DUM_SISWA_38', '186460', '123456', 'Syifa Mulyadi', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_39', '353261', '123456', 'Dani Syamsuddin', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_40', '390077', '123456', 'Wulan Basri', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 2'),
  ('DUM_SISWA_41', '556309', '123456', 'Rian Salim', 'Siswa', 'Kelas 7 SMP', 'KLS-SMP-7', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_42', '799440', '123456', 'Safira Pratama', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_43', '442460', '123456', 'Alif Hidayat', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 1'),
  ('DUM_SISWA_44', '917206', '123456', 'Melati Puspitasari', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_45', '353524', '123456', 'Zaki Kurniawan', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_46', '488849', '123456', 'Citra Handayani', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 2'),
  ('DUM_SISWA_47', '489567', '123456', 'Naufal Wijaya', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_48', '831177', '123456', 'Tiara Kusuma', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_49', '380829', '123456', 'Rama Bakri', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 1'),
  ('DUM_SISWA_50', '889417', '123456', 'Amalia Basri', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_51', '719992', '123456', 'Irfan Salim', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_52', '924002', '123456', 'Khairunnisa Pratama', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 2'),
  ('DUM_SISWA_53', '443152', '123456', 'Daffa Azzahra', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_54', '120401', '123456', 'Nisa Fauzi', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_55', '950404', '123456', 'Syahrul Wulandari', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 1'),
  ('DUM_SISWA_56', '887910', '123456', 'Ananda Nugroho', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_57', '894371', '123456', 'Aditya Wijaya', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_58', '440384', '123456', 'Suci Kusuma', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 2'),
  ('DUM_SISWA_59', '770993', '123456', 'Haikal Bakri', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_60', '747098', '123456', 'Rina Latuconsina', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_61', '864906', '123456', 'Gilang Taher', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 1'),
  ('DUM_SISWA_62', '562147', '123456', 'Yulia Rahman', 'Siswa', 'Kelas 8 SMP', 'KLS-SMP-8', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_63', '510627', '123456', 'Kevin Saputra', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_64', '585264', '123456', 'Maya Fauzi', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 2'),
  ('DUM_SISWA_65', '226436', '123456', 'Wahyu Wulandari', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_66', '838749', '123456', 'Novi Nugroho', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_67', '566113', '123456', 'Arman Permata', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 1'),
  ('DUM_SISWA_68', '257898', '123456', 'Sari Ramadhan', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_69', '338236', '123456', 'Taufik Hasan', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_70', '534197', '123456', 'Dina Pattinama', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 2'),
  ('DUM_SISWA_71', '559860', '123456', 'Ridwan Taher', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_72', '308080', '123456', 'Eva Rahman', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_73', '723006', '123456', 'Hafiz Saputra', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 1'),
  ('DUM_SISWA_74', '559102', '123456', 'Mira Ramadhani', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_75', '151897', '123456', 'Aldi Setiawan', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_76', '739346', '123456', 'Rika Anggraini', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 2'),
  ('DUM_SISWA_77', '873601', '123456', 'Yusuf Maulana', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_78', '776246', '123456', 'Tari Ramadhan', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_79', '308710', '123456', 'Fikri Hasan', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 1'),
  ('DUM_SISWA_80', '418261', '123456', 'Selvi Pattinama', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 2'),
  ('DUM_SISWA_81', '612542', '123456', 'Eko Kadir', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 3 (13:00 - 15:00)', 'Lab Komputer 1'),
  ('DUM_SISWA_82', '175769', '123456', 'Lia Mansyur', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 1 (07:30 - 09:30)', 'Lab Komputer 2'),
  ('DUM_SISWA_83', '230642', '123456', 'Bima Nurhaliza', 'Siswa', 'Kelas 9 SMP', 'KLS-SMP-9', 'Sesi 2 (10:00 - 12:00)', 'Lab Komputer 1')
ON CONFLICT (username) DO NOTHING;

-- 4. Insert 83 Sesi Ujian Siswa Dummy
INSERT INTO public.cbt_sessions (student_id, name, kelas, id_kelas, ruang, status) VALUES
  ('985617', 'Ahmad Pratama', 'Kelas 4 SD', 'KLS-SD-4', 'Lab Komputer 1', 'Siap Ujian'),
  ('109972', 'Siti Azzahra', 'Kelas 4 SD', 'KLS-SD-4', 'Lab Komputer 2', 'Siap Ujian'),
  ('430356', 'Muhammad Fauzi', 'Kelas 4 SD', 'KLS-SD-4', 'Lab Komputer 1', 'Siap Ujian'),
  ('574653', 'Nur Wulandari', 'Kelas 4 SD', 'KLS-SD-4', 'Lab Komputer 2', 'Siap Ujian'),
  ('687998', 'Andi Nugroho', 'Kelas 4 SD', 'KLS-SD-4', 'Lab Komputer 1', 'Siap Ujian'),
  ('356837', 'Putri Permata', 'Kelas 4 SD', 'KLS-SD-4', 'Lab Komputer 2', 'Siap Ujian'),
  ('138782', 'Rizky Ramadhan', 'Kelas 4 SD', 'KLS-SD-4', 'Lab Komputer 1', 'Siap Ujian'),
  ('646456', 'Aisyah Bakri', 'Kelas 5 SD', 'KLS-SD-5', 'Lab Komputer 2', 'Siap Ujian'),
  ('515983', 'Fadli Latuconsina', 'Kelas 5 SD', 'KLS-SD-5', 'Lab Komputer 1', 'Siap Ujian'),
  ('290379', 'Fitri Taher', 'Kelas 5 SD', 'KLS-SD-5', 'Lab Komputer 2', 'Siap Ujian'),
  ('801409', 'Ilham Rahman', 'Kelas 5 SD', 'KLS-SD-5', 'Lab Komputer 1', 'Siap Ujian'),
  ('603094', 'Dewi Saputra', 'Kelas 5 SD', 'KLS-SD-5', 'Lab Komputer 2', 'Siap Ujian'),
  ('901913', 'Arif Ramadhani', 'Kelas 5 SD', 'KLS-SD-5', 'Lab Komputer 1', 'Siap Ujian'),
  ('229439', 'Nadia Setiawan', 'Kelas 5 SD', 'KLS-SD-5', 'Lab Komputer 2', 'Siap Ujian'),
  ('411765', 'Reza Nugroho', 'Kelas 6 SD', 'KLS-SD-6', 'Lab Komputer 1', 'Siap Ujian'),
  ('754811', 'Salsabila Permata', 'Kelas 6 SD', 'KLS-SD-6', 'Lab Komputer 2', 'Siap Ujian'),
  ('574524', 'Dimas Ramadhan', 'Kelas 6 SD', 'KLS-SD-6', 'Lab Komputer 1', 'Siap Ujian'),
  ('983708', 'Zahra Hasan', 'Kelas 6 SD', 'KLS-SD-6', 'Lab Komputer 2', 'Siap Ujian'),
  ('887871', 'Farhan Pattinama', 'Kelas 6 SD', 'KLS-SD-6', 'Lab Komputer 1', 'Siap Ujian'),
  ('156682', 'Annisa Kadir', 'Kelas 6 SD', 'KLS-SD-6', 'Lab Komputer 2', 'Siap Ujian'),
  ('741122', 'Bayu Mansyur', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 1', 'Siap Ujian'),
  ('992683', 'Rahma Saputra', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 2', 'Siap Ujian'),
  ('765385', 'Yoga Ramadhani', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 1', 'Siap Ujian'),
  ('893294', 'Indah Setiawan', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 2', 'Siap Ujian'),
  ('426291', 'Hendra Anggraini', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 1', 'Siap Ujian'),
  ('769702', 'Lestari Maulana', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 2', 'Siap Ujian'),
  ('995734', 'Iqbal Sari', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 1', 'Siap Ujian'),
  ('878351', 'Nabila Mulyadi', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 2', 'Siap Ujian'),
  ('145555', 'Rafi Pattinama', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 1', 'Siap Ujian'),
  ('126436', 'Intan Kadir', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 2', 'Siap Ujian'),
  ('747580', 'Galih Mansyur', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 1', 'Siap Ujian'),
  ('398703', 'Aulia Nurhaliza', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 2', 'Siap Ujian'),
  ('860225', 'Bagas Hidayat', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 1', 'Siap Ujian'),
  ('787677', 'Mutiara Puspitasari', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 2', 'Siap Ujian'),
  ('693139', 'Fajar Kurniawan', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 1', 'Siap Ujian'),
  ('285431', 'Kartika Maulana', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 2', 'Siap Ujian'),
  ('750715', 'Akbar Sari', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 1', 'Siap Ujian'),
  ('186460', 'Syifa Mulyadi', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 2', 'Siap Ujian'),
  ('353261', 'Dani Syamsuddin', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 1', 'Siap Ujian'),
  ('390077', 'Wulan Basri', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 2', 'Siap Ujian'),
  ('556309', 'Rian Salim', 'Kelas 7 SMP', 'KLS-SMP-7', 'Lab Komputer 1', 'Siap Ujian'),
  ('799440', 'Safira Pratama', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 2', 'Siap Ujian'),
  ('442460', 'Alif Hidayat', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 1', 'Siap Ujian'),
  ('917206', 'Melati Puspitasari', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 2', 'Siap Ujian'),
  ('353524', 'Zaki Kurniawan', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 1', 'Siap Ujian'),
  ('488849', 'Citra Handayani', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 2', 'Siap Ujian'),
  ('489567', 'Naufal Wijaya', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 1', 'Siap Ujian'),
  ('831177', 'Tiara Kusuma', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 2', 'Siap Ujian'),
  ('380829', 'Rama Bakri', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 1', 'Siap Ujian'),
  ('889417', 'Amalia Basri', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 2', 'Siap Ujian'),
  ('719992', 'Irfan Salim', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 1', 'Siap Ujian'),
  ('924002', 'Khairunnisa Pratama', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 2', 'Siap Ujian'),
  ('443152', 'Daffa Azzahra', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 1', 'Siap Ujian'),
  ('120401', 'Nisa Fauzi', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 2', 'Siap Ujian'),
  ('950404', 'Syahrul Wulandari', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 1', 'Siap Ujian'),
  ('887910', 'Ananda Nugroho', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 2', 'Siap Ujian'),
  ('894371', 'Aditya Wijaya', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 1', 'Siap Ujian'),
  ('440384', 'Suci Kusuma', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 2', 'Siap Ujian'),
  ('770993', 'Haikal Bakri', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 1', 'Siap Ujian'),
  ('747098', 'Rina Latuconsina', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 2', 'Siap Ujian'),
  ('864906', 'Gilang Taher', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 1', 'Siap Ujian'),
  ('562147', 'Yulia Rahman', 'Kelas 8 SMP', 'KLS-SMP-8', 'Lab Komputer 2', 'Siap Ujian'),
  ('510627', 'Kevin Saputra', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 1', 'Siap Ujian'),
  ('585264', 'Maya Fauzi', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 2', 'Siap Ujian'),
  ('226436', 'Wahyu Wulandari', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 1', 'Siap Ujian'),
  ('838749', 'Novi Nugroho', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 2', 'Siap Ujian'),
  ('566113', 'Arman Permata', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 1', 'Siap Ujian'),
  ('257898', 'Sari Ramadhan', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 2', 'Siap Ujian'),
  ('338236', 'Taufik Hasan', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 1', 'Siap Ujian'),
  ('534197', 'Dina Pattinama', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 2', 'Siap Ujian'),
  ('559860', 'Ridwan Taher', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 1', 'Siap Ujian'),
  ('308080', 'Eva Rahman', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 2', 'Siap Ujian'),
  ('723006', 'Hafiz Saputra', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 1', 'Siap Ujian'),
  ('559102', 'Mira Ramadhani', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 2', 'Siap Ujian'),
  ('151897', 'Aldi Setiawan', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 1', 'Siap Ujian'),
  ('739346', 'Rika Anggraini', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 2', 'Siap Ujian'),
  ('873601', 'Yusuf Maulana', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 1', 'Siap Ujian'),
  ('776246', 'Tari Ramadhan', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 2', 'Siap Ujian'),
  ('308710', 'Fikri Hasan', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 1', 'Siap Ujian'),
  ('418261', 'Selvi Pattinama', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 2', 'Siap Ujian'),
  ('612542', 'Eko Kadir', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 1', 'Siap Ujian'),
  ('175769', 'Lia Mansyur', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 2', 'Siap Ujian'),
  ('230642', 'Bima Nurhaliza', 'Kelas 9 SMP', 'KLS-SMP-9', 'Lab Komputer 1', 'Siap Ujian')
ON CONFLICT (student_id) DO NOTHING;

-- 5. Insert 90 Soal Dummy (9 Soal per Mata Pelajaran, Campur SD 4-6 & SMP 7-9)
INSERT INTO public.cbt_questions (id, type, subject, text, options, answer, weight, explanation) VALUES
  ('DUM_Q_01', 'PG', 'Matematika', '[Kelas 4 SD] Hasil dari 3.450 + 1.275 - 825 adalah ...', '["3.800", "3.900", "4.000", "4.100"]'::jsonb, '3.900', 10, '3.450 + 1.275 = 4.725; 4.725 - 825 = 3.900.'),
  ('DUM_Q_02', 'PG', 'Matematika', '[Kelas 5 SD] Sebuah balok memiliki panjang 12 cm, lebar 8 cm, dan tinggi 5 cm. Volume balok tersebut adalah ...', '["420 cm³", "460 cm³", "480 cm³", "520 cm³"]'::jsonb, '480 cm³', 10, 'Volume balok = p × l × t = 12 × 8 × 5 = 480 cm³.'),
  ('DUM_Q_03', 'PG', 'Matematika', '[Kelas 5 SD] Bentuk pecahan paling sederhana dari 36/48 adalah ...', '["2/3", "3/4", "4/5", "6/8"]'::jsonb, '3/4', 10, 'Pembilang dan penyebut dibagi FPB-nya yaitu 12: 36÷12 = 3 dan 48÷12 = 4.'),
  ('DUM_Q_04', 'PG', 'Matematika', '[Kelas 6 SD] Sebuah lingkaran memiliki jari-jari 14 cm (π = 22/7). Luas lingkaran tersebut adalah ...', '["154 cm²", "308 cm²", "616 cm²", "1.232 cm²"]'::jsonb, '616 cm²', 10, 'Luas = π × r² = (22/7) × 14 × 14 = 22 × 2 × 14 = 616 cm².'),
  ('DUM_Q_05', 'PG', 'Matematika', '[Kelas 7 SMP] Hasil dari -18 + 24 : (-4) × 3 adalah ...', '["-36", "-18", "0", "18"]'::jsonb, '-36', 10, 'Kerjakan pembagian dan perkalian dulu: 24 : (-4) = -6; -6 × 3 = -18; -18 + (-18) = -36.'),
  ('DUM_Q_06', 'PG', 'Matematika', '[Kelas 7 SMP] Jika 3x - 7 = 14, maka nilai dari 2x + 5 adalah ...', '["12", "15", "19", "21"]'::jsonb, '19', 10, '3x = 21 → x = 7. Maka 2(7) + 5 = 14 + 5 = 19.'),
  ('DUM_Q_07', 'PG', 'Matematika', '[Kelas 8 SMP] Sebuah segitiga siku-siku memiliki panjang sisi siku-siku 9 cm dan 12 cm. Panjang sisi miring (hipotenusa) adalah ...', '["13 cm", "15 cm", "17 cm", "21 cm"]'::jsonb, '15 cm', 10, 'Teorema Pythagoras: √(9² + 12²) = √(81 + 144) = √225 = 15 cm.'),
  ('DUM_Q_08', 'PG', 'Matematika', '[Kelas 9 SMP] Akar-akar persamaan kuadrat x² - 5x + 6 = 0 adalah ...', '["x = 1 atau x = 6", "x = 2 atau x = 3", "x = -2 atau x = -3", "x = -1 atau x = 6"]'::jsonb, 'x = 2 atau x = 3', 10, 'Faktorkan (x - 2)(x - 3) = 0, sehingga x = 2 atau x = 3.'),
  ('DUM_Q_09', 'PG', 'Matematika', '[Kelas 9 SMP] Hasil dari 2³ × 2⁴ : 2² adalah ...', '["16", "32", "64", "128"]'::jsonb, '32', 10, 'Sifat eksponen: 2^(3 + 4 - 2) = 2⁵ = 32.'),
  ('DUM_Q_10', 'PG', 'Bahasa Indonesia', '[Kelas 4 SD] Kalimat yang di dalamnya terdapat objek sehingga dapat diubah menjadi kalimat pasif disebut kalimat ...', '["Transitif", "Intransitif", "Majemuk", "Perintah"]'::jsonb, 'Transitif', 10, 'Kalimat transitif memerlukan objek agar maknanya lengkap.'),
  ('DUM_Q_11', 'PG', 'Bahasa Indonesia', '[Kelas 5 SD] Ide utama yang menjadi dasar pengembangan sebuah paragraf disebut ...', '["Kalimat penjelas", "Ide pokok", "Ringkasan", "Kesimpulan"]'::jsonb, 'Ide pokok', 10, 'Ide pokok atau gagasan utama merupakan inti pembahasan dalam paragraf.'),
  ('DUM_Q_12', 'PG', 'Bahasa Indonesia', '[Kelas 5 SD] Makna ungkapan ''banting tulang'' dalam kalimat ''Ayah bekerja banting tulang demi keluarga'' adalah ...', '["Bekerja keras", "Berolahraga", "Bermalas-malasan", "Berdiskusi"]'::jsonb, 'Bekerja keras', 10, 'Ungkapan banting tulang bermakna bekerja sangat keras.'),
  ('DUM_Q_13', 'PG', 'Bahasa Indonesia', '[Kelas 6 SD] Bagian pidato yang berisi ucapan puji syukur kepada Tuhan dan sapaan kepada hadirin adalah ...', '["Penutup pidato", "Isi pidato", "Pembuka pidato", "Kesimpulan pidato"]'::jsonb, 'Pembuka pidato', 10, 'Pembuka pidato diawali salam, sapaan hormat, dan puji syukur.'),
  ('DUM_Q_14', 'PG', 'Bahasa Indonesia', '[Kelas 7 SMP] Teks yang menggambarkan suatu objek, tempat, atau peristiwa secara rinci sehingga pembaca seolah-olah melihat dan merasakannya sendiri disebut teks ...', '["Narasi", "Deskripsi", "Prosedur", "Eksposisi"]'::jsonb, 'Deskripsi', 10, 'Teks deskripsi melukiskan objek secara detail dan melibatkan pancaindra.'),
  ('DUM_Q_15', 'PG', 'Bahasa Indonesia', '[Kelas 7 SMP] Kata baku yang tepat sesuai KBBI di bawah ini adalah ...', '["Apotik", "Aktifitas", "Praktik", "Nafas"]'::jsonb, 'Praktik', 10, 'Bentuk baku menurut KBBI adalah praktik (bukan praktek), apotek, aktivitas, dan napas.'),
  ('DUM_Q_16', 'PG', 'Bahasa Indonesia', '[Kelas 8 SMP] Struktur teks berita yang memuat inti pokok peristiwa (5W + 1H) pada paragraf pertama disebut ...', '["Kepala berita (lead)", "Tubuh berita", "Ekor berita", "Judul berita"]'::jsonb, 'Kepala berita (lead)', 10, 'Kepala berita memuat unsur pokok peristiwa secara ringkas di awal berita.'),
  ('DUM_Q_17', 'PG', 'Bahasa Indonesia', '[Kelas 9 SMP] Tujuan utama teks tanggapan kritis adalah ...', '["Menceritakan pengalaman masa lalu", "Memberikan penilaian objektif disertai alasan logis", "Menjelaskan langkah membuat sesuatu", "Menghibur pembaca dengan kisah fiksi"]'::jsonb, 'Memberikan penilaian objektif disertai alasan logis', 10, 'Teks tanggapan berisi kritik atau pujian yang objektif dan argumentatif.'),
  ('DUM_Q_18', 'PG', 'Bahasa Indonesia', '[Kelas 9 SMP] Majas yang membandingkan benda mati seolah-olah memiliki sifat seperti manusia disebut majas ...', '["Hiperbola", "Metafora", "Personifikasi", "Simile"]'::jsonb, 'Personifikasi', 10, 'Personifikasi menginsankan benda mati, misalnya ''angin berbisik lembut''.'),
  ('DUM_Q_19', 'PG', 'Bahasa Inggris', '[Kelas 4 SD] What is the English word for ''perpustakaan''?', '["Laboratory", "Library", "Canteen", "Classroom"]'::jsonb, 'Library', 10, 'Library means perpustakaan in Indonesian.'),
  ('DUM_Q_20', 'PG', 'Bahasa Inggris', '[Kelas 5 SD] Rina: ''What time is it?'' Budi: ''It is 07:30.'' In English, 07:30 is ...', '["Half past seven", "Half past eight", "A quarter to seven", "Seven o''clock"]'::jsonb, 'Half past seven', 10, '07:30 means 30 minutes past 7 (half past seven).'),
  ('DUM_Q_21', 'PG', 'Bahasa Inggris', '[Kelas 5 SD] My mother ... delicious fried rice every morning.', '["cook", "cooks", "cooking", "cooked"]'::jsonb, 'cooks', 10, 'Simple Present Tense with singular subject ''My mother'' uses verb + s (cooks).'),
  ('DUM_Q_22', 'PG', 'Bahasa Inggris', '[Kelas 6 SD] Yesterday, we ... to the museum with our teacher.', '["go", "goes", "went", "going"]'::jsonb, 'went', 10, '''Yesterday'' indicates Simple Past Tense; the past form of ''go'' is ''went''.'),
  ('DUM_Q_23', 'PG', 'Bahasa Inggris', '[Kelas 7 SMP] Choose the correct pronoun: ''Dina has a new bicycle. ... bicycle is blue.''', '["She", "Her", "Hers", "Him"]'::jsonb, 'Her', 10, 'Possessive adjective before a noun (''bicycle'') for female singular is ''Her''.'),
  ('DUM_Q_24', 'PG', 'Bahasa Inggris', '[Kelas 7 SMP] Read the notice: ''KEEP SILENT, EXAM IN PROGRESS.'' Where do you usually find this notice?', '["In the school canteen", "In the examination room", "On the football field", "At the bus station"]'::jsonb, 'In the examination room', 10, 'The notice reminds students to be quiet during an exam.'),
  ('DUM_Q_25', 'PG', 'Bahasa Inggris', '[Kelas 8 SMP] A cheetah is ... than a horse.', '["fast", "faster", "fastest", "more fast"]'::jsonb, 'faster', 10, 'Comparative degree for one-syllable adjective ''fast'' is ''faster''.'),
  ('DUM_Q_26', 'PG', 'Bahasa Inggris', '[Kelas 9 SMP] The passive voice of ''The students clean the classroom every day'' is ...', '["The classroom is cleaned by the students every day", "The classroom was cleaned by the students every day", "The classroom cleans the students every day", "The classroom is cleaning every day"]'::jsonb, 'The classroom is cleaned by the students every day', 10, 'Simple Present Passive formula: Object + is/am/are + V3 + by Subject.'),
  ('DUM_Q_27', 'PG', 'Bahasa Inggris', '[Kelas 9 SMP] What is the social function of a Narrative Text?', '["To describe a specific place", "To entertain the readers with a story", "To explain how to operate a machine", "To report factual scientific data"]'::jsonb, 'To entertain the readers with a story', 10, 'Narrative text aims to amuse or entertain readers with imaginative or moral stories.'),
  ('DUM_Q_28', 'PG', 'Pendidikan Pancasila', '[Kelas 4 SD] Lambang sila keempat Pancasila yang berbunyi ''Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan'' adalah ...', '["Bintang", "Rantai emas", "Pohon beringin", "Kepala banteng"]'::jsonb, 'Kepala banteng', 10, 'Kepala banteng merupakan simbol sila keempat Pancasila.'),
  ('DUM_Q_29', 'PG', 'Pendidikan Pancasila', '[Kelas 5 SD] Semboyan bangsa Indonesia yang tertulis pada pita burung Garuda Pancasila adalah ...', '["Tut Wuri Handayani", "Bhinneka Tunggal Ika", "Ing Ngarsa Sung Tuladha", "Merdeka atau Mati"]'::jsonb, 'Bhinneka Tunggal Ika', 10, 'Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu jua.'),
  ('DUM_Q_30', 'PG', 'Pendidikan Pancasila', '[Kelas 5 SD] Contoh penerapan nilai sila ketiga Pancasila di lingkungan sekolah adalah ...', '["Mengikuti upacara bendera dengan tertib", "Menyontek saat ulangan", "Memilih-milih teman berdasarkan suku", "Datang terlambat ke sekolah"]'::jsonb, 'Mengikuti upacara bendera dengan tertib', 10, 'Upacara bendera menumbuhkan rasa cinta tanah air dan persatuan.'),
  ('DUM_Q_31', 'PG', 'Pendidikan Pancasila', '[Kelas 6 SD] Keputusan bersama dalam musyawarah sebaiknya diambil melalui ...', '["Pemaksaan kehendak ketua", "Mufakat seluruh peserta", "Undian berhadiah", "Keputusan sepihak"]'::jsonb, 'Mufakat seluruh peserta', 10, 'Musyawarah mengutamakan kesepakatan bersama (mufakat).'),
  ('DUM_Q_32', 'PG', 'Pendidikan Pancasila', '[Kelas 7 SMP] Sidang pertama BPUPKI yang membahas dasar negara Indonesia dilaksanakan pada tanggal ...', '["29 Mei – 1 Juni 1945", "10 – 17 Juli 1945", "17 Agustus 1945", "18 Agustus 1945"]'::jsonb, '29 Mei – 1 Juni 1945', 10, 'Sidang pertama BPUPKI berlangsung 29 Mei hingga 1 Juni 1945.'),
  ('DUM_Q_33', 'PG', 'Pendidikan Pancasila', '[Kelas 7 SMP] Norma yang bersumber dari hati nurani manusia tentang baik dan buruk disebut norma ...', '["Agama", "Kesusilaan", "Kesopanan", "Hukum"]'::jsonb, 'Kesusilaan', 10, 'Norma kesusilaan berasal dari suara hati nurani manusia.'),
  ('DUM_Q_34', 'PG', 'Pendidikan Pancasila', '[Kelas 8 SMP] Kedudukan Pancasila sebagai dasar negara tercantum secara resmi dalam Pembukaan UUD NRI Tahun 1945 alinea ke-...', '["Pertama", "Kedua", "Ketiga", "Keempat"]'::jsonb, 'Keempat', 10, 'Rumusan dasar negara Pancasila terdapat pada alinea keempat Pembukaan UUD 1945.'),
  ('DUM_Q_35', 'PG', 'Pendidikan Pancasila', '[Kelas 9 SMP] Perwujudan nilai-nilai Pancasila dalam bidang ekonomi sesuai Pasal 33 UUD NRI Tahun 1945 disusun sebagai usaha bersama berdasar atas asas ...', '["Individualisme", "Kekeluargaan", "Monopoli bebas", "Liberalisme"]'::jsonb, 'Kekeluargaan', 10, 'Pasal 33 ayat (1) UUD 1945 menegaskan perekonomian disusun atas asas kekeluargaan.'),
  ('DUM_Q_36', 'PG', 'Pendidikan Pancasila', '[Kelas 9 SMP] Prinsip kedaulatan rakyat di Indonesia menegaskan bahwa kekuasaan tertinggi berada di tangan ...', '["Presiden", "Rakyat", "Menteri", "Mahkamah Agung"]'::jsonb, 'Rakyat', 10, 'Pasal 1 ayat (2) UUD 1945: Kedaulatan berada di tangan rakyat dan dilaksanakan menurut UUD.'),
  ('DUM_Q_37', 'PG', 'PJOK', '[Kelas 4 SD] Gerak dasar berpindah tempat seperti berjalan, berlari, dan melompat disebut gerak ...', '["Lokomotor", "Nonlokomotor", "Manipulatif", "Keseimbangan"]'::jsonb, 'Lokomotor', 10, 'Gerak lokomotor adalah gerakan yang ditandai dengan perpindahan tempat.'),
  ('DUM_Q_38', 'PG', 'PJOK', '[Kelas 5 SD] Jumlah pemain setiap regu dalam pertandingan sepak bola resmi adalah ...', '["6 orang", "9 orang", "11 orang", "12 orang"]'::jsonb, '11 orang', 10, 'Setiap tim sepak bola terdiri atas 11 pemain termasuk penjaga gawang.'),
  ('DUM_Q_39', 'PG', 'PJOK', '[Kelas 5 SD] Pukulan pertama untuk memulai permainan dalam cabang olahraga bola voli disebut ...', '["Smash", "Passing", "Servis", "Blocking"]'::jsonb, 'Servis', 10, 'Servis merupakan pukulan pembuka permainan bola voli.'),
  ('DUM_Q_40', 'PG', 'PJOK', '[Kelas 6 SD] Latihan lari bolak-balik (shuttle run) bertujuan untuk melatih komponen kebugaran jasmani berupa ...', '["Kelincahan", "Kelenturan", "Keseimbangan", "Daya tahan paru"]'::jsonb, 'Kelincahan', 10, 'Shuttle run melatih kemampuan mengubah arah gerak secara cepat (kelincahan).'),
  ('DUM_Q_41', 'PG', 'PJOK', '[Kelas 7 SMP] Dalam permainan bola basket, teknik mengoper bola dengan cara memantulkannya ke lantai terlebih dahulu disebut ...', '["Chest pass", "Bounce pass", "Overhead pass", "Lay up"]'::jsonb, 'Bounce pass', 10, 'Bounce pass adalah operan pantul ke lantai menuju rekan satu tim.'),
  ('DUM_Q_42', 'PG', 'PJOK', '[Kelas 7 SMP] Start yang digunakan pada perlombaan lari jarak pendek (sprint) 100 meter adalah ...', '["Start berdiri", "Start melayang", "Start jongkok", "Start duduk"]'::jsonb, 'Start jongkok', 10, 'Lari jarak pendek (100 m, 200 m, 400 m) wajib menggunakan start jongkok.'),
  ('DUM_Q_43', 'PG', 'PJOK', '[Kelas 8 SMP] Teknik dasar pencak silat yang berfungsi untuk menahan atau membelokkan serangan lawan tanpa menyakiti lawan disebut ...', '["Pukulan", "Tendangan", "Tangkisan", "Kuda-kuda"]'::jsonb, 'Tangkisan', 10, 'Tangkisan merupakan usaha pembelaan dengan mengadakan kontak langsung terhadap serangan lawan.'),
  ('DUM_Q_44', 'PG', 'PJOK', '[Kelas 9 SMP] Aktivitas fisik secara teratur minimal 30 menit setiap hari memberikan manfaat utama bagi sistem peredaran darah, yaitu ...', '["Meningkatkan tekanan darah tinggi", "Memperkuat otot jantung dan melancarkan sirkulasi darah", "Mengurangi kapasitas paru-paru", "Memperlambat metabolisme tubuh"]'::jsonb, 'Memperkuat otot jantung dan melancarkan sirkulasi darah', 10, 'Olahraga aerobik teratur menjaga kebugaran jantung dan pembuluh darah.'),
  ('DUM_Q_45', 'PG', 'PJOK', '[Kelas 9 SMP] Dalam permainan bulu tangkis, pukulan keras dan menukik tajam ke arah lapangan lawan untuk mematikan lawan disebut ...', '["Lob", "Dropshot", "Smash", "Netting"]'::jsonb, 'Smash', 10, 'Smash adalah pukulan menyerang dengan tenaga penuh dan arah menukik tajam.'),
  ('DUM_Q_46', 'PG', 'IPAS', '[Kelas 4 SD] Bagian tumbuhan yang berfungsi menyerap air dan zat hara dari dalam tanah adalah ...', '["Daun", "Batang", "Akar", "Bunga"]'::jsonb, 'Akar', 10, 'Akar menancap di tanah untuk menyerap air dan mineral serta menopang tumbuhan.'),
  ('DUM_Q_47', 'PG', 'IPAS', '[Kelas 4 SD] Perubahan wujud benda dari cair menjadi gas akibat pemanasan disebut ...', '["Membeku", "Mencair", "Menguap", "Mengembun"]'::jsonb, 'Menguap', 10, 'Menguap adalah perubahan wujud cair menjadi gas, misalnya air mendidih.'),
  ('DUM_Q_48', 'PG', 'IPAS', '[Kelas 5 SD] Urutan rantai makanan yang tepat pada ekosistem sawah adalah ...', '["Padi → Tikus → Ular → Elang", "Tikus → Padi → Elang → Ular", "Elang → Ular → Tikus → Padi", "Padi → Elang → Tikus → Ular"]'::jsonb, 'Padi → Tikus → Ular → Elang', 10, 'Padi sebagai produsen dimakan tikus (konsumen I), dimakan ular (konsumen II), lalu elang (konsumen III).'),
  ('DUM_Q_49', 'PG', 'IPAS', '[Kelas 5 SD] Kenampakan alam berupa daratan yang menjorok ke laut disebut ...', '["Teluk", "Tanjung", "Selat", "Palung"]'::jsonb, 'Tanjung', 10, 'Tanjung adalah daratan yang menjorok ke laut, sedangkan laut yang menjorok ke darat adalah teluk.'),
  ('DUM_Q_50', 'PG', 'IPAS', '[Kelas 6 SD] Planet terbesar dalam tata surya kita adalah ...', '["Mars", "Saturnus", "Jupiter", "Uranus"]'::jsonb, 'Jupiter', 10, 'Jupiter merupakan planet dengan ukuran dan massa terbesar di tata surya.'),
  ('DUM_Q_51', 'PG', 'IPAS', '[Kelas 6 SD] Kerja sama negara-negara di kawasan Asia Tenggara dalam bidang ekonomi, sosial, dan budaya tergabung dalam organisasi ...', '["PBB", "ASEAN", "OPEC", "APEC"]'::jsonb, 'ASEAN', 10, 'ASEAN (Association of Southeast Asian Nations) adalah perhimpunan bangsa-bangsa Asia Tenggara.'),
  ('DUM_Q_52', 'PG', 'IPAS', '[Kelas 6 SD] Sumber energi alternatif yang memanfaatkan panas dari dalam perut bumi disebut energi ...', '["Surya", "Angin", "Panas bumi (geotermal)", "Biomassa"]'::jsonb, 'Panas bumi (geotermal)', 10, 'Energi geotermal berasal dari panas alami di bawah permukaan bumi.'),
  ('DUM_Q_53', 'PG', 'IPAS', '[Kelas 5 SD] Gaya yang menyebabkan buah kelapa jatuh ke bawah menuju permukaan bumi adalah ...', '["Gaya magnet", "Gaya gravitasi", "Gaya gesek", "Gaya pegas"]'::jsonb, 'Gaya gravitasi', 10, 'Gaya gravitasi bumi menarik benda menuju pusat bumi.'),
  ('DUM_Q_54', 'PG', 'IPAS', '[Kelas 6 SD] Peristiwa berputarnya Bumi pada porosnya yang menyebabkan terjadinya siang dan malam disebut ...', '["Revolusi Bumi", "Rotasi Bumi", "Gerhana Bulan", "Pasang surut"]'::jsonb, 'Rotasi Bumi', 10, 'Rotasi Bumi membutuhkan waktu sekitar 24 jam dan mengakibatkan pergantian siang serta malam.'),
  ('DUM_Q_55', 'PG', 'IPA', '[Kelas 4 SD] Hewan yang mengalami metamorfosis sempurna berikut ini adalah ...', '["Belalang", "Kupu-kupu", "Kecoak", "Jangkrik"]'::jsonb, 'Kupu-kupu', 10, 'Kupu-kupu mengalami tahap telur → larva (ulat) → pupa (kepompong) → imago.'),
  ('DUM_Q_56', 'PG', 'IPA', '[Kelas 5 SD] Organ pernapasan utama pada manusia tempat terjadinya pertukaran oksigen dan karbon dioksida adalah ...', '["Trakea", "Bronkus", "Alveolus di paru-paru", "Rongga hidung"]'::jsonb, 'Alveolus di paru-paru', 10, 'Alveolus merupakan gelembung halus di paru-paru tempat pertukaran O₂ dan CO₂.'),
  ('DUM_Q_57', 'PG', 'IPA', '[Kelas 6 SD] Rangkaian listrik yang disusun berderet tanpa cabang sehingga jika satu lampu padam maka lampu lainnya ikut padam adalah rangkaian ...', '["Paralel", "Seri", "Campuran", "Terbuka"]'::jsonb, 'Seri', 10, 'Pada rangkaian seri hanya terdapat satu jalur aliran arus listrik.'),
  ('DUM_Q_58', 'PG', 'IPA', '[Kelas 7 SMP] Besaran pokok menurut Sistem Internasional (SI) beserta satuannya yang benar adalah ...', '["Kecepatan (m/s)", "Massa (kilogram)", "Luas (m²)", "Gaya (Newton)"]'::jsonb, 'Massa (kilogram)', 10, 'Massa adalah besaran pokok dengan satuan SI kilogram (kg).'),
  ('DUM_Q_59', 'PG', 'IPA', '[Kelas 7 SMP] Larutan yang dapat mengubah kertas lakmus merah menjadi berwarna biru bersifat ...', '["Asam", "Basa", "Netral", "Garam"]'::jsonb, 'Basa', 10, 'Larutan basa mengubah lakmus merah menjadi biru.'),
  ('DUM_Q_60', 'PG', 'IPA', '[Kelas 8 SMP] Enzim amilase yang terdapat dalam air liur berfungsi untuk mengubah ...', '["Protein menjadi pepton", "Amilum (zat tepung) menjadi gula sederhana", "Lemak menjadi asam lemak", "Susu menjadi kasein"]'::jsonb, 'Amilum (zat tepung) menjadi gula sederhana', 10, 'Enzim amilase/ptialin mencerna karbohidrat (amilum) menjadi maltosa.'),
  ('DUM_Q_61', 'PG', 'IPA', '[Kelas 8 SMP] Sebuah benda bermassa 5 kg diberi gaya sebesar 20 N. Percepatan yang dialami benda tersebut adalah ...', '["2 m/s²", "4 m/s²", "15 m/s²", "100 m/s²"]'::jsonb, '4 m/s²', 10, 'Hukum II Newton: a = F / m = 20 N / 5 kg = 4 m/s².'),
  ('DUM_Q_62', 'PG', 'IPA', '[Kelas 9 SMP] Persilangan antara tanaman berbunga merah dominan (MM) dengan tanaman berbunga putih resesif (mm) akan menghasilkan keturunan F1 dengan fenotipe ...', '["100% merah", "100% putih", "50% merah, 50% putih", "75% merah, 25% putih"]'::jsonb, '100% merah', 10, 'Genotipe F1 adalah 100% Mm, karena M dominan maka seluruhnya berwarna merah.'),
  ('DUM_Q_63', 'PG', 'IPA', '[Kelas 9 SMP] Dua muatan listrik sejenis jika didekatkan akan saling ...', '["Tarik-menarik", "Tolak-menolak", "Diam tidak bergerak", "Menghilangkan muatan"]'::jsonb, 'Tolak-menolak', 10, 'Muatan listrik sejenis (+ dengan + atau - dengan -) saling tolak-menolak.'),
  ('DUM_Q_64', 'PG', 'IPS', '[Kelas 4 SD] Kegiatan menyalurkan barang hasil produksi dari produsen kepada konsumen disebut ...', '["Produksi", "Distribusi", "Konsumsi", "Investasi"]'::jsonb, 'Distribusi', 10, 'Distribusi adalah kegiatan penyaluran barang dan jasa.'),
  ('DUM_Q_65', 'PG', 'IPS', '[Kelas 5 SD] Kerajaan Hindu tertua di Indonesia yang terletak di Kalimantan Timur adalah ...', '["Majapahit", "Sriwijaya", "Kutai", "Tarumanegara"]'::jsonb, 'Kutai', 10, 'Kerajaan Kutai berdiri sekitar abad ke-4 M di tepi Sungai Mahakam, Kalimantan Timur.'),
  ('DUM_Q_66', 'PG', 'IPS', '[Kelas 6 SD] Garis khayal yang membelah Bumi menjadi belahan Bumi utara dan belahan Bumi selatan disebut garis ...', '["Bujur", "Khatulistiwa (Ekuator)", "Balik Utara", "Meridian"]'::jsonb, 'Khatulistiwa (Ekuator)', 10, 'Garis khatulistiwa berada pada lintang 0°.'),
  ('DUM_Q_67', 'PG', 'IPS', '[Kelas 7 SMP] Syarat utama terjadinya interaksi sosial antara dua orang atau lebih adalah adanya ...', '["Kontak sosial dan komunikasi", "Persaingan dan konflik", "Perbedaan bahasa", "Jarak geografis yang jauh"]'::jsonb, 'Kontak sosial dan komunikasi', 10, 'Interaksi sosial terjadi apabila terpenuhi kontak sosial dan komunikasi.'),
  ('DUM_Q_68', 'PG', 'IPS', '[Kelas 7 SMP] Perbandingan jarak pada peta dengan jarak sebenarnya di permukaan bumi disebut ...', '["Legenda", "Inset", "Skala peta", "Orientasi"]'::jsonb, 'Skala peta', 10, 'Skala menunjukkan perbandingan jarak di peta terhadap jarak sesungguhnya.'),
  ('DUM_Q_69', 'PG', 'IPS', '[Kelas 8 SMP] Faktor pendorong bangsa-bangsa Eropa melakukan penjelajahan samudra ke Nusantara dikenal dengan semboyan ...', '["3G (Gold, Glory, Gospel)", "Bhinneka Tunggal Ika", "Trias Politica", "Devide et Impera"]'::jsonb, '3G (Gold, Glory, Gospel)', 10, 'Gold (kekayaan), Glory (kejayaan), dan Gospel (penyebaran agama).'),
  ('DUM_Q_70', 'PG', 'IPS', '[Kelas 8 SMP] Perpindahan penduduk dari desa ke kota untuk mencari pekerjaan disebut ...', '["Transmigrasi", "Urbanisasi", "Imigrasi", "Emigrasi"]'::jsonb, 'Urbanisasi', 10, 'Urbanisasi adalah perpindahan penduduk dari wilayah pedesaan menuju perkotaan.'),
  ('DUM_Q_71', 'PG', 'IPS', '[Kelas 9 SMP] Perdagangan antarnegara yang dilakukan dengan cara menjual barang dari dalam negeri ke luar negeri disebut ...', '["Impor", "Ekspor", "Barter", "Retribusi"]'::jsonb, 'Ekspor', 10, 'Ekspor merupakan kegiatan menjual produk ke luar negeri untuk memperoleh devisa.'),
  ('DUM_Q_72', 'PG', 'IPS', '[Kelas 9 SMP] Dampak positif globalisasi di bidang teknologi informasi bagi pelajar adalah ...', '["Meningkatnya ketergantungan gawai", "Kemudahan mengakses sumber belajar digital dari seluruh dunia", "Lunturnya budaya gotong royong", "Maraknya berita bohong"]'::jsonb, 'Kemudahan mengakses sumber belajar digital dari seluruh dunia', 10, 'Globalisasi memudahkan akses informasi dan literasi pendidikan secara luas.'),
  ('DUM_Q_73', 'PG', 'Informatika', '[Kelas 4 SD] Perangkat keras komputer yang berfungsi menampilkan hasil pengolahan data secara visual ke layar adalah ...', '["Keyboard", "Monitor", "Mouse", "Scanner"]'::jsonb, 'Monitor', 10, 'Monitor merupakan perangkat keluaran (output device) yang menampilkan gambar/teks.'),
  ('DUM_Q_74', 'PG', 'Informatika', '[Kelas 5 SD] Perangkat lunak pengolah kata yang sering digunakan untuk mengetik dokumen surat atau laporan adalah ...', '["Microsoft Excel", "Microsoft Word", "Microsoft PowerPoint", "Paint"]'::jsonb, 'Microsoft Word', 10, 'Microsoft Word adalah aplikasi pengolah kata (word processor).'),
  ('DUM_Q_75', 'PG', 'Informatika', '[Kelas 5 SD] Tombol kombinasi pada keyboard untuk menyalin (copy) teks yang dipilih adalah ...', '["Ctrl + V", "Ctrl + X", "Ctrl + C", "Ctrl + Z"]'::jsonb, 'Ctrl + C', 10, 'Ctrl + C digunakan untuk menyalin (Copy), sedangkan Ctrl + V untuk menempel (Paste).'),
  ('DUM_Q_76', 'PG', 'Informatika', '[Kelas 6 SD] Tindakan menjaga data pribadi seperti kata sandi (password) dan PIN agar tidak dibagikan kepada orang asing di internet termasuk bagian dari ...', '["Keamanan digital", "Perundungan siber", "Pembajakan", "Spamming"]'::jsonb, 'Keamanan digital', 10, 'Melindungi kredensial pribadi merupakan prinsip dasar keamanan digital.'),
  ('DUM_Q_77', 'PG', 'Informatika', '[Kelas 7 SMP] Empat pilar utama dalam Berpikir Komputasional (Computational Thinking) meliputi dekomposisi, pengenalan pola, abstraksi, dan ...', '["Algoritma", "Instalasi", "Kompilasi", "Enkripsi"]'::jsonb, 'Algoritma', 10, 'Empat fondasi berpikir komputasional: dekomposisi, pengenalan pola, abstraksi, dan algoritma.'),
  ('DUM_Q_78', 'PG', 'Informatika', '[Kelas 7 SMP] Perangkat jaringan yang berfungsi menghubungkan dua atau lebih jaringan berbeda serta menentukan jalur terbaik pengiriman paket data adalah ...', '["Switch", "Router", "Access Point", "Modem"]'::jsonb, 'Router', 10, 'Router melakukan routing paket data antarjaringan komputer.'),
  ('DUM_Q_79', 'PG', 'Informatika', '[Kelas 8 SMP] Bilangan biner 1010 jika dikonversikan ke dalam bilangan desimal bernilai ...', '["8", "10", "12", "14"]'::jsonb, '10', 10, '1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 8 + 0 + 2 + 0 = 10.'),
  ('DUM_Q_80', 'PG', 'Informatika', '[Kelas 9 SMP] Layanan penyimpanan data secara daring melalui internet sehingga file dapat diakses dari berbagai perangkat disebut ...', '["Local Storage", "Cloud Storage", "Optical Disc", "Flash Drive"]'::jsonb, 'Cloud Storage', 10, 'Cloud storage menyimpan data pada server jarak jauh yang diakses melalui internet.'),
  ('DUM_Q_81', 'PG', 'Informatika', '[Kelas 9 SMP] Protokol keamanan pada situs web yang mengenkripsi pertukaran data antara browser pengguna dan server ditandai dengan awalan ...', '["HTTP://", "HTTPS://", "FTP://", "SMTP://"]'::jsonb, 'HTTPS://', 10, 'HTTPS (Hypertext Transfer Protocol Secure) menggunakan enkripsi SSL/TLS.'),
  ('DUM_Q_82', 'PG', 'Koding dan Kecerdasan Artifisial (KKA)', '[Kelas 4 SD] Urutan langkah-langkah logis dan sistematis untuk menyelesaikan suatu masalah disebut ...', '["Algoritma", "Animasi", "Aplikasi", "Antivirus"]'::jsonb, 'Algoritma', 10, 'Algoritma adalah rangkaian instruksi terurut untuk mencapai tujuan.'),
  ('DUM_Q_83', 'PG', 'Koding dan Kecerdasan Artifisial (KKA)', '[Kelas 5 SD] Pada pemrograman visual berbasis blok seperti Scratch, blok ''forever'' (selamanya) berfungsi untuk membuat perintah berjalan secara ...', '["Berulang terus-menerus", "Hanya satu kali", "Berhenti total", "Mundur ke belakang"]'::jsonb, 'Berulang terus-menerus', 10, 'Blok forever merupakan struktur perulangan (loop) tanpa henti selama program berjalan.'),
  ('DUM_Q_84', 'PG', 'Koding dan Kecerdasan Artifisial (KKA)', '[Kelas 5 SD] Kesalahan dalam penulisan kode program yang menyebabkan program tidak berjalan sesuai harapan disebut ...', '["Bug", "Fitur", "Browser", "Pixel"]'::jsonb, 'Bug', 10, 'Bug adalah galat/kesalahan dalam kode, dan proses memperbaikinya disebut debugging.'),
  ('DUM_Q_85', 'PG', 'Koding dan Kecerdasan Artifisial (KKA)', '[Kelas 6 SD] Contoh penerapan Kecerdasan Artifisial (AI) yang membantu pengguna menemukan rute tercepat di jalan raya adalah ...', '["Aplikasi peta navigasi pintar", "Kalkulator saku biasa", "Jam dinding analog", "Buku tulis cetak"]'::jsonb, 'Aplikasi peta navigasi pintar', 10, 'Peta navigasi menganalisis data lalu lintas real-time menggunakan AI untuk merekomendasikan rute.'),
  ('DUM_Q_86', 'PG', 'Koding dan Kecerdasan Artifisial (KKA)', '[Kelas 7 SMP] Dalam pemrograman, struktur percabangan yang menjalankan perintah tertentu hanya jika suatu kondisi terpenuhi adalah ...', '["IF - ELSE", "PRINT", "INPUT", "VARIABLE"]'::jsonb, 'IF - ELSE', 10, 'Percabangan IF-ELSE mengevaluasi kondisi logika (benar/salah) sebelum mengeksekusi aksi.'),
  ('DUM_Q_87', 'PG', 'Koding dan Kecerdasan Artifisial (KKA)', '[Kelas 7 SMP] Wadah bernama di dalam memori program yang digunakan untuk menyimpan nilai data yang dapat berubah-ubah disebut ...', '["Variabel", "Komentar", "Operator", "Konstanta"]'::jsonb, 'Variabel', 10, 'Variabel menyimpan nilai data seperti angka atau teks selama program berjalan.'),
  ('DUM_Q_88', 'PG', 'Koding dan Kecerdasan Artifisial (KKA)', '[Kelas 8 SMP] Cabang Kecerdasan Artifisial yang memungkinkan komputer belajar mengenali pola dari kumpulan data latih tanpa diprogram secara eksplisit untuk setiap aturan disebut ...', '["Machine Learning", "Word Processing", "Disk Defragmenter", "Screen Mirroring"]'::jsonb, 'Machine Learning', 10, 'Machine Learning melatih model menggunakan data agar mampu memprediksi atau mengklasifikasi.'),
  ('DUM_Q_89', 'PG', 'Koding dan Kecerdasan Artifisial (KKA)', '[Kelas 9 SMP] Dalam etika pemanfaatan Kecerdasan Artifisial generatif, hal yang wajib dilakukan pelajar saat menggunakan bantuan AI untuk tugas sekolah adalah ...', '["Menyalin seluruh jawaban tanpa memeriksa kebenarannya", "Memverifikasi fakta, menjaga kejujuran akademik, dan tidak melanggar hak cipta", "Mengunggah data pribadi rahasia ke chatbot publik", "Mengakui karya AI sepenuhnya tanpa pemahaman"]'::jsonb, 'Memverifikasi fakta, menjaga kejujuran akademik, dan tidak melanggar hak cipta', 10, 'Penggunaan AI harus bertanggung jawab, kritis, dan menjunjung integritas akademik.'),
  ('DUM_Q_90', 'PG', 'Koding dan Kecerdasan Artifisial (KKA)', '[Kelas 9 SMP] Perhatikan potongan kode Python: `nilai = 85; print(''Lulus'' if nilai >= 75 else ''Remedial'')`. Output yang ditampilkan adalah ...', '["85", "75", "Lulus", "Remedial"]'::jsonb, 'Lulus', 10, 'Karena nilai (85) >= 75 bernilai True, program mencetak ''Lulus''.')
ON CONFLICT (id) DO NOTHING;
