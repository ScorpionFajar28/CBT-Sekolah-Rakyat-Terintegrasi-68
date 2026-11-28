-- ============================================================================
-- RESET DATA DUMMY TANPA MENGHAPUS STRUKTUR TABEL (MENYISAKAN AKUN ADMIN SAJA)
-- ============================================================================
TRUNCATE TABLE public.cbt_sessions, public.cbt_questions, public.cbt_classes RESTART IDENTITY CASCADE;

DELETE FROM public.cbt_users WHERE username <> 'admin' AND role <> 'Admin';

INSERT INTO public.cbt_users (id, username, password, name, role, kelas, id_kelas, sesi, ruang)
VALUES ('USR_ADMIN_1', 'admin', '123', 'Administrator Utama', 'Admin', 'Panitia Ujian', '-', '-', '-')
ON CONFLICT (username) DO NOTHING;

UPDATE public.cbt_settings
SET subject = '',
    subjects_list = '[]'::jsonb,
    active_subjects = '[]'::jsonb,
    subjects_meta = '{}'::jsonb,
    updated_at = NOW()
WHERE id = 1;
