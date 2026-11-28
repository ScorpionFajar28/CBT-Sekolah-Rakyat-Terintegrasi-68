-- ============================================================================
-- SKEMA DATABASE BARU SUPABASE V4.0 (CBT SRT 68 LUWU UTARA - BERSIH ADMIN ONLY)
-- Jalankan seluruh skrip ini di: Supabase -> SQL Editor -> New Query -> Run
-- ============================================================================

-- 0. Reset Total Tabel Lama (Menghapus seluruh data dummy siswa, guru, soal, kelas)
DROP TABLE IF EXISTS public.cbt_sessions CASCADE;
DROP TABLE IF EXISTS public.cbt_questions CASCADE;
DROP TABLE IF EXISTS public.cbt_users CASCADE;
DROP TABLE IF EXISTS public.cbt_classes CASCADE;
DROP TABLE IF EXISTS public.cbt_exam_spaces CASCADE;
DROP TABLE IF EXISTS public.cbt_settings CASCADE;

-- 1. Tabel Pengaturan Ujian (1 Baris Utama id = 1)
CREATE TABLE public.cbt_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  exam_title TEXT NOT NULL DEFAULT 'Portal Aplikasi Asesmen Sumatif Akhir Semester (ASAS)',
  subject TEXT NOT NULL DEFAULT '',
  duration_minutes INTEGER NOT NULL DEFAULT 45,
  active_token TEXT NOT NULL DEFAULT 'CBT2026',
  shuffle_questions BOOLEAN NOT NULL DEFAULT TRUE,
  shuffle_options BOOLEAN NOT NULL DEFAULT TRUE,
  show_review_after_submit BOOLEAN NOT NULL DEFAULT TRUE,
  max_violations INTEGER NOT NULL DEFAULT 3,
  subjects_list JSONB NOT NULL DEFAULT '[]'::jsonb,
  active_subjects JSONB NOT NULL DEFAULT '[]'::jsonb,
  subjects_meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Pengguna (Admin, Guru, Wali Kelas, Siswa, Proktor)
CREATE TABLE public.cbt_users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Admin', 'Guru', 'Wali Kelas', 'Siswa', 'Proktor')),
  kelas TEXT DEFAULT '-',
  id_kelas TEXT DEFAULT '-',
  sesi TEXT DEFAULT '-',
  ruang TEXT DEFAULT '-',
  photo_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabel Bank Soal Digital
CREATE TABLE public.cbt_questions (
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
CREATE TABLE public.cbt_sessions (
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
  unblock_token TEXT DEFAULT '',
  answers JSONB DEFAULT '{}'::jsonb,
  essay_scores JSONB DEFAULT '{}'::jsonb,
  auto_score NUMERIC(6,2) DEFAULT 0,
  essay_score NUMERIC(6,2) DEFAULT 0,
  final_score NUMERIC(6,2) DEFAULT 0,
  submitted_at TEXT DEFAULT NULL,
  subject_results JSONB DEFAULT '{}'::jsonb,
  subjects_list JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tabel Master Ruang Ujian & Sesi Ujian
CREATE TABLE public.cbt_exam_spaces (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('SESSION', 'ROOM')),
  name TEXT NOT NULL,
  exam_date TEXT DEFAULT NULL,
  exam_day TEXT DEFAULT NULL,
  start_time TEXT DEFAULT NULL,
  end_time TEXT DEFAULT NULL,
  capacity INTEGER DEFAULT 36,
  note TEXT DEFAULT '-',
  kelas_akses TEXT NOT NULL DEFAULT 'ALL',
  active_subjects JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Tabel Master Kelas, ID Kelas & Wali Kelas
CREATE TABLE public.cbt_classes (
  id_kelas TEXT PRIMARY KEY,
  nama_kelas TEXT NOT NULL,
  wali_kelas_username TEXT DEFAULT '-',
  wali_kelas_name TEXT DEFAULT '-',
  keterangan TEXT DEFAULT '-',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indeks performa untuk 80+ komputer serentak
CREATE INDEX idx_cbt_users_role ON public.cbt_users(role);
CREATE INDEX idx_cbt_users_id_kelas ON public.cbt_users(id_kelas);
CREATE INDEX idx_cbt_questions_subject ON public.cbt_questions(subject);
CREATE INDEX idx_cbt_sessions_status ON public.cbt_sessions(status);
CREATE INDEX idx_cbt_sessions_id_kelas ON public.cbt_sessions(id_kelas);

-- Nonaktifkan RLS agar REST API langsung dapat diakses oleh aplikasi frontend CBT
ALTER TABLE public.cbt_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbt_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbt_questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbt_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbt_exam_spaces DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbt_classes DISABLE ROW LEVEL SECURITY;

-- ============================================================================
-- DATA AWAL BERSIH (HANYA 1 AKUN ADMIN & PENGATURAN DEFAULT)
-- ============================================================================
INSERT INTO public.cbt_settings (id, exam_title, subject, duration_minutes, active_token, max_violations, subjects_list, active_subjects, subjects_meta)
VALUES (1, 'Portal Aplikasi Asesmen Sumatif Akhir Semester (ASAS)', '', 45, 'CBT2026', 3, '[]'::jsonb, '[]'::jsonb, '{}'::jsonb);

INSERT INTO public.cbt_users (id, username, password, name, role, kelas, id_kelas, sesi, ruang)
VALUES ('USR_ADMIN_1', 'admin', '123', 'Administrator Utama', 'Admin', 'Panitia Ujian', '-', '-', '-');

INSERT INTO public.cbt_exam_spaces (id, category, name, start_time, end_time, capacity, note, kelas_akses) VALUES
  ('S1', 'SESSION', 'Sesi 1', '07:30', '09:30', 0, 'Sesi Pagi', 'ALL'),
  ('S2', 'SESSION', 'Sesi 2', '10:00', '12:00', 0, 'Sesi Siang', 'ALL'),
  ('S3', 'SESSION', 'Sesi 3', '13:00', '15:00', 0, 'Sesi Sore', 'ALL'),
  ('R1', 'ROOM', 'Lab Komputer 1', NULL, NULL, 36, 'Gedung Utama Lt. 1', 'ALL'),
  ('R2', 'ROOM', 'Lab Komputer 2', NULL, NULL, 36, 'Gedung Utama Lt. 2', 'ALL');
