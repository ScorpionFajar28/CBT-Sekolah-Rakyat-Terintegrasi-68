
// Otomatis input 90 soal dummy, 83 siswa dummy, 6 kelas SD/SMP, & 10 mapel ke Supabase Cloud jika belum ada
const DUMMY_SEED_SUBJECTS = ["Matematika", "Bahasa Indonesia", "Bahasa Inggris", "Pendidikan Pancasila", "PJOK", "IPAS", "IPA", "IPS", "Informatika", "Koding dan Kecerdasan Artifisial (KKA)"];
const DUMMY_SEED_CLASSES = [{"idKelas": "KLS-SD-4", "namaKelas": "Kelas 4 SD", "waliKelasUsername": "wali.sd4", "waliKelasName": "Nurhayati, S.Pd", "keterangan": "Jenjang Sekolah Dasar Kelas 4"}, {"idKelas": "KLS-SD-5", "namaKelas": "Kelas 5 SD", "waliKelasUsername": "wali.sd5", "waliKelasName": "Rahmawati, S.Pd", "keterangan": "Jenjang Sekolah Dasar Kelas 5"}, {"idKelas": "KLS-SD-6", "namaKelas": "Kelas 6 SD", "waliKelasUsername": "wali.sd6", "waliKelasName": "Hasnawati, S.Pd", "keterangan": "Jenjang Sekolah Dasar Kelas 6"}, {"idKelas": "KLS-SMP-7", "namaKelas": "Kelas 7 SMP", "waliKelasUsername": "wali.smp7", "waliKelasName": "Siti Aminah, S.Pd", "keterangan": "Jenjang Sekolah Menengah Pertama Kelas 7"}, {"idKelas": "KLS-SMP-8", "namaKelas": "Kelas 8 SMP", "waliKelasUsername": "wali.smp8", "waliKelasName": "Budi Santoso, S.Pd", "keterangan": "Jenjang Sekolah Menengah Pertama Kelas 8"}, {"idKelas": "KLS-SMP-9", "namaKelas": "Kelas 9 SMP", "waliKelasUsername": "wali.smp9", "waliKelasName": "Rudi Hartono, S.Pd", "keterangan": "Jenjang Sekolah Menengah Pertama Kelas 9"}];
const DUMMY_SEED_STUDENTS = [{"id": "DUM_SISWA_01", "username": "985617", "password": "123456", "name": "Ahmad Pratama", "role": "Siswa", "kelas": "Kelas 4 SD", "idKelas": "KLS-SD-4", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_02", "username": "109972", "password": "123456", "name": "Siti Azzahra", "role": "Siswa", "kelas": "Kelas 4 SD", "idKelas": "KLS-SD-4", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_03", "username": "430356", "password": "123456", "name": "Muhammad Fauzi", "role": "Siswa", "kelas": "Kelas 4 SD", "idKelas": "KLS-SD-4", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_04", "username": "574653", "password": "123456", "name": "Nur Wulandari", "role": "Siswa", "kelas": "Kelas 4 SD", "idKelas": "KLS-SD-4", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_05", "username": "687998", "password": "123456", "name": "Andi Nugroho", "role": "Siswa", "kelas": "Kelas 4 SD", "idKelas": "KLS-SD-4", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_06", "username": "356837", "password": "123456", "name": "Putri Permata", "role": "Siswa", "kelas": "Kelas 4 SD", "idKelas": "KLS-SD-4", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_07", "username": "138782", "password": "123456", "name": "Rizky Ramadhan", "role": "Siswa", "kelas": "Kelas 4 SD", "idKelas": "KLS-SD-4", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_08", "username": "646456", "password": "123456", "name": "Aisyah Bakri", "role": "Siswa", "kelas": "Kelas 5 SD", "idKelas": "KLS-SD-5", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_09", "username": "515983", "password": "123456", "name": "Fadli Latuconsina", "role": "Siswa", "kelas": "Kelas 5 SD", "idKelas": "KLS-SD-5", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_10", "username": "290379", "password": "123456", "name": "Fitri Taher", "role": "Siswa", "kelas": "Kelas 5 SD", "idKelas": "KLS-SD-5", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_11", "username": "801409", "password": "123456", "name": "Ilham Rahman", "role": "Siswa", "kelas": "Kelas 5 SD", "idKelas": "KLS-SD-5", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_12", "username": "603094", "password": "123456", "name": "Dewi Saputra", "role": "Siswa", "kelas": "Kelas 5 SD", "idKelas": "KLS-SD-5", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_13", "username": "901913", "password": "123456", "name": "Arif Ramadhani", "role": "Siswa", "kelas": "Kelas 5 SD", "idKelas": "KLS-SD-5", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_14", "username": "229439", "password": "123456", "name": "Nadia Setiawan", "role": "Siswa", "kelas": "Kelas 5 SD", "idKelas": "KLS-SD-5", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_15", "username": "411765", "password": "123456", "name": "Reza Nugroho", "role": "Siswa", "kelas": "Kelas 6 SD", "idKelas": "KLS-SD-6", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_16", "username": "754811", "password": "123456", "name": "Salsabila Permata", "role": "Siswa", "kelas": "Kelas 6 SD", "idKelas": "KLS-SD-6", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_17", "username": "574524", "password": "123456", "name": "Dimas Ramadhan", "role": "Siswa", "kelas": "Kelas 6 SD", "idKelas": "KLS-SD-6", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_18", "username": "983708", "password": "123456", "name": "Zahra Hasan", "role": "Siswa", "kelas": "Kelas 6 SD", "idKelas": "KLS-SD-6", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_19", "username": "887871", "password": "123456", "name": "Farhan Pattinama", "role": "Siswa", "kelas": "Kelas 6 SD", "idKelas": "KLS-SD-6", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_20", "username": "156682", "password": "123456", "name": "Annisa Kadir", "role": "Siswa", "kelas": "Kelas 6 SD", "idKelas": "KLS-SD-6", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_21", "username": "741122", "password": "123456", "name": "Bayu Mansyur", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_22", "username": "992683", "password": "123456", "name": "Rahma Saputra", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_23", "username": "765385", "password": "123456", "name": "Yoga Ramadhani", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_24", "username": "893294", "password": "123456", "name": "Indah Setiawan", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_25", "username": "426291", "password": "123456", "name": "Hendra Anggraini", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_26", "username": "769702", "password": "123456", "name": "Lestari Maulana", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_27", "username": "995734", "password": "123456", "name": "Iqbal Sari", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_28", "username": "878351", "password": "123456", "name": "Nabila Mulyadi", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_29", "username": "145555", "password": "123456", "name": "Rafi Pattinama", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_30", "username": "126436", "password": "123456", "name": "Intan Kadir", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_31", "username": "747580", "password": "123456", "name": "Galih Mansyur", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_32", "username": "398703", "password": "123456", "name": "Aulia Nurhaliza", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_33", "username": "860225", "password": "123456", "name": "Bagas Hidayat", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_34", "username": "787677", "password": "123456", "name": "Mutiara Puspitasari", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_35", "username": "693139", "password": "123456", "name": "Fajar Kurniawan", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_36", "username": "285431", "password": "123456", "name": "Kartika Maulana", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_37", "username": "750715", "password": "123456", "name": "Akbar Sari", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_38", "username": "186460", "password": "123456", "name": "Syifa Mulyadi", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_39", "username": "353261", "password": "123456", "name": "Dani Syamsuddin", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_40", "username": "390077", "password": "123456", "name": "Wulan Basri", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_41", "username": "556309", "password": "123456", "name": "Rian Salim", "role": "Siswa", "kelas": "Kelas 7 SMP", "idKelas": "KLS-SMP-7", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_42", "username": "799440", "password": "123456", "name": "Safira Pratama", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_43", "username": "442460", "password": "123456", "name": "Alif Hidayat", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_44", "username": "917206", "password": "123456", "name": "Melati Puspitasari", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_45", "username": "353524", "password": "123456", "name": "Zaki Kurniawan", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_46", "username": "488849", "password": "123456", "name": "Citra Handayani", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_47", "username": "489567", "password": "123456", "name": "Naufal Wijaya", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_48", "username": "831177", "password": "123456", "name": "Tiara Kusuma", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_49", "username": "380829", "password": "123456", "name": "Rama Bakri", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_50", "username": "889417", "password": "123456", "name": "Amalia Basri", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_51", "username": "719992", "password": "123456", "name": "Irfan Salim", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_52", "username": "924002", "password": "123456", "name": "Khairunnisa Pratama", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_53", "username": "443152", "password": "123456", "name": "Daffa Azzahra", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_54", "username": "120401", "password": "123456", "name": "Nisa Fauzi", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_55", "username": "950404", "password": "123456", "name": "Syahrul Wulandari", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_56", "username": "887910", "password": "123456", "name": "Ananda Nugroho", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_57", "username": "894371", "password": "123456", "name": "Aditya Wijaya", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_58", "username": "440384", "password": "123456", "name": "Suci Kusuma", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_59", "username": "770993", "password": "123456", "name": "Haikal Bakri", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_60", "username": "747098", "password": "123456", "name": "Rina Latuconsina", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_61", "username": "864906", "password": "123456", "name": "Gilang Taher", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_62", "username": "562147", "password": "123456", "name": "Yulia Rahman", "role": "Siswa", "kelas": "Kelas 8 SMP", "idKelas": "KLS-SMP-8", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_63", "username": "510627", "password": "123456", "name": "Kevin Saputra", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_64", "username": "585264", "password": "123456", "name": "Maya Fauzi", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_65", "username": "226436", "password": "123456", "name": "Wahyu Wulandari", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_66", "username": "838749", "password": "123456", "name": "Novi Nugroho", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_67", "username": "566113", "password": "123456", "name": "Arman Permata", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_68", "username": "257898", "password": "123456", "name": "Sari Ramadhan", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_69", "username": "338236", "password": "123456", "name": "Taufik Hasan", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_70", "username": "534197", "password": "123456", "name": "Dina Pattinama", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_71", "username": "559860", "password": "123456", "name": "Ridwan Taher", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_72", "username": "308080", "password": "123456", "name": "Eva Rahman", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_73", "username": "723006", "password": "123456", "name": "Hafiz Saputra", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_74", "username": "559102", "password": "123456", "name": "Mira Ramadhani", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_75", "username": "151897", "password": "123456", "name": "Aldi Setiawan", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_76", "username": "739346", "password": "123456", "name": "Rika Anggraini", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_77", "username": "873601", "password": "123456", "name": "Yusuf Maulana", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_78", "username": "776246", "password": "123456", "name": "Tari Ramadhan", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_79", "username": "308710", "password": "123456", "name": "Fikri Hasan", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_80", "username": "418261", "password": "123456", "name": "Selvi Pattinama", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_81", "username": "612542", "password": "123456", "name": "Eko Kadir", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 3 (13:00 - 15:00)", "ruang": "Lab Komputer 1"}, {"id": "DUM_SISWA_82", "username": "175769", "password": "123456", "name": "Lia Mansyur", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 1 (07:30 - 09:30)", "ruang": "Lab Komputer 2"}, {"id": "DUM_SISWA_83", "username": "230642", "password": "123456", "name": "Bima Nurhaliza", "role": "Siswa", "kelas": "Kelas 9 SMP", "idKelas": "KLS-SMP-9", "sesi": "Sesi 2 (10:00 - 12:00)", "ruang": "Lab Komputer 1"}];
const DUMMY_SEED_QUESTIONS = [{"id": "DUM_Q_01", "type": "PG", "subject": "Matematika", "text": "[Kelas 4 SD] Hasil dari 3.450 + 1.275 - 825 adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["3.800", "3.900", "4.000", "4.100"], "pairs": [], "answer": "3.900", "weight": 10, "explanation": "3.450 + 1.275 = 4.725; 4.725 - 825 = 3.900."}, {"id": "DUM_Q_02", "type": "PG", "subject": "Matematika", "text": "[Kelas 5 SD] Sebuah balok memiliki panjang 12 cm, lebar 8 cm, dan tinggi 5 cm. Volume balok tersebut adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["420 cm³", "460 cm³", "480 cm³", "520 cm³"], "pairs": [], "answer": "480 cm³", "weight": 10, "explanation": "Volume balok = p × l × t = 12 × 8 × 5 = 480 cm³."}, {"id": "DUM_Q_03", "type": "PG", "subject": "Matematika", "text": "[Kelas 5 SD] Bentuk pecahan paling sederhana dari 36/48 adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["2/3", "3/4", "4/5", "6/8"], "pairs": [], "answer": "3/4", "weight": 10, "explanation": "Pembilang dan penyebut dibagi FPB-nya yaitu 12: 36÷12 = 3 dan 48÷12 = 4."}, {"id": "DUM_Q_04", "type": "PG", "subject": "Matematika", "text": "[Kelas 6 SD] Sebuah lingkaran memiliki jari-jari 14 cm (π = 22/7). Luas lingkaran tersebut adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["154 cm²", "308 cm²", "616 cm²", "1.232 cm²"], "pairs": [], "answer": "616 cm²", "weight": 10, "explanation": "Luas = π × r² = (22/7) × 14 × 14 = 22 × 2 × 14 = 616 cm²."}, {"id": "DUM_Q_05", "type": "PG", "subject": "Matematika", "text": "[Kelas 7 SMP] Hasil dari -18 + 24 : (-4) × 3 adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["-36", "-18", "0", "18"], "pairs": [], "answer": "-36", "weight": 10, "explanation": "Kerjakan pembagian dan perkalian dulu: 24 : (-4) = -6; -6 × 3 = -18; -18 + (-18) = -36."}, {"id": "DUM_Q_06", "type": "PG", "subject": "Matematika", "text": "[Kelas 7 SMP] Jika 3x - 7 = 14, maka nilai dari 2x + 5 adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["12", "15", "19", "21"], "pairs": [], "answer": "19", "weight": 10, "explanation": "3x = 21 → x = 7. Maka 2(7) + 5 = 14 + 5 = 19."}, {"id": "DUM_Q_07", "type": "PG", "subject": "Matematika", "text": "[Kelas 8 SMP] Sebuah segitiga siku-siku memiliki panjang sisi siku-siku 9 cm dan 12 cm. Panjang sisi miring (hipotenusa) adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["13 cm", "15 cm", "17 cm", "21 cm"], "pairs": [], "answer": "15 cm", "weight": 10, "explanation": "Teorema Pythagoras: √(9² + 12²) = √(81 + 144) = √225 = 15 cm."}, {"id": "DUM_Q_08", "type": "PG", "subject": "Matematika", "text": "[Kelas 9 SMP] Akar-akar persamaan kuadrat x² - 5x + 6 = 0 adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["x = 1 atau x = 6", "x = 2 atau x = 3", "x = -2 atau x = -3", "x = -1 atau x = 6"], "pairs": [], "answer": "x = 2 atau x = 3", "weight": 10, "explanation": "Faktorkan (x - 2)(x - 3) = 0, sehingga x = 2 atau x = 3."}, {"id": "DUM_Q_09", "type": "PG", "subject": "Matematika", "text": "[Kelas 9 SMP] Hasil dari 2³ × 2⁴ : 2² adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["16", "32", "64", "128"], "pairs": [], "answer": "32", "weight": 10, "explanation": "Sifat eksponen: 2^(3 + 4 - 2) = 2⁵ = 32."}, {"id": "DUM_Q_10", "type": "PG", "subject": "Bahasa Indonesia", "text": "[Kelas 4 SD] Kalimat yang di dalamnya terdapat objek sehingga dapat diubah menjadi kalimat pasif disebut kalimat ...", "mediaType": "none", "mediaUrl": "", "options": ["Transitif", "Intransitif", "Majemuk", "Perintah"], "pairs": [], "answer": "Transitif", "weight": 10, "explanation": "Kalimat transitif memerlukan objek agar maknanya lengkap."}, {"id": "DUM_Q_11", "type": "PG", "subject": "Bahasa Indonesia", "text": "[Kelas 5 SD] Ide utama yang menjadi dasar pengembangan sebuah paragraf disebut ...", "mediaType": "none", "mediaUrl": "", "options": ["Kalimat penjelas", "Ide pokok", "Ringkasan", "Kesimpulan"], "pairs": [], "answer": "Ide pokok", "weight": 10, "explanation": "Ide pokok atau gagasan utama merupakan inti pembahasan dalam paragraf."}, {"id": "DUM_Q_12", "type": "PG", "subject": "Bahasa Indonesia", "text": "[Kelas 5 SD] Makna ungkapan 'banting tulang' dalam kalimat 'Ayah bekerja banting tulang demi keluarga' adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Bekerja keras", "Berolahraga", "Bermalas-malasan", "Berdiskusi"], "pairs": [], "answer": "Bekerja keras", "weight": 10, "explanation": "Ungkapan banting tulang bermakna bekerja sangat keras."}, {"id": "DUM_Q_13", "type": "PG", "subject": "Bahasa Indonesia", "text": "[Kelas 6 SD] Bagian pidato yang berisi ucapan puji syukur kepada Tuhan dan sapaan kepada hadirin adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Penutup pidato", "Isi pidato", "Pembuka pidato", "Kesimpulan pidato"], "pairs": [], "answer": "Pembuka pidato", "weight": 10, "explanation": "Pembuka pidato diawali salam, sapaan hormat, dan puji syukur."}, {"id": "DUM_Q_14", "type": "PG", "subject": "Bahasa Indonesia", "text": "[Kelas 7 SMP] Teks yang menggambarkan suatu objek, tempat, atau peristiwa secara rinci sehingga pembaca seolah-olah melihat dan merasakannya sendiri disebut teks ...", "mediaType": "none", "mediaUrl": "", "options": ["Narasi", "Deskripsi", "Prosedur", "Eksposisi"], "pairs": [], "answer": "Deskripsi", "weight": 10, "explanation": "Teks deskripsi melukiskan objek secara detail dan melibatkan pancaindra."}, {"id": "DUM_Q_15", "type": "PG", "subject": "Bahasa Indonesia", "text": "[Kelas 7 SMP] Kata baku yang tepat sesuai KBBI di bawah ini adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Apotik", "Aktifitas", "Praktik", "Nafas"], "pairs": [], "answer": "Praktik", "weight": 10, "explanation": "Bentuk baku menurut KBBI adalah praktik (bukan praktek), apotek, aktivitas, dan napas."}, {"id": "DUM_Q_16", "type": "PG", "subject": "Bahasa Indonesia", "text": "[Kelas 8 SMP] Struktur teks berita yang memuat inti pokok peristiwa (5W + 1H) pada paragraf pertama disebut ...", "mediaType": "none", "mediaUrl": "", "options": ["Kepala berita (lead)", "Tubuh berita", "Ekor berita", "Judul berita"], "pairs": [], "answer": "Kepala berita (lead)", "weight": 10, "explanation": "Kepala berita memuat unsur pokok peristiwa secara ringkas di awal berita."}, {"id": "DUM_Q_17", "type": "PG", "subject": "Bahasa Indonesia", "text": "[Kelas 9 SMP] Tujuan utama teks tanggapan kritis adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Menceritakan pengalaman masa lalu", "Memberikan penilaian objektif disertai alasan logis", "Menjelaskan langkah membuat sesuatu", "Menghibur pembaca dengan kisah fiksi"], "pairs": [], "answer": "Memberikan penilaian objektif disertai alasan logis", "weight": 10, "explanation": "Teks tanggapan berisi kritik atau pujian yang objektif dan argumentatif."}, {"id": "DUM_Q_18", "type": "PG", "subject": "Bahasa Indonesia", "text": "[Kelas 9 SMP] Majas yang membandingkan benda mati seolah-olah memiliki sifat seperti manusia disebut majas ...", "mediaType": "none", "mediaUrl": "", "options": ["Hiperbola", "Metafora", "Personifikasi", "Simile"], "pairs": [], "answer": "Personifikasi", "weight": 10, "explanation": "Personifikasi menginsankan benda mati, misalnya 'angin berbisik lembut'."}, {"id": "DUM_Q_19", "type": "PG", "subject": "Bahasa Inggris", "text": "[Kelas 4 SD] What is the English word for 'perpustakaan'?", "mediaType": "none", "mediaUrl": "", "options": ["Laboratory", "Library", "Canteen", "Classroom"], "pairs": [], "answer": "Library", "weight": 10, "explanation": "Library means perpustakaan in Indonesian."}, {"id": "DUM_Q_20", "type": "PG", "subject": "Bahasa Inggris", "text": "[Kelas 5 SD] Rina: 'What time is it?' Budi: 'It is 07:30.' In English, 07:30 is ...", "mediaType": "none", "mediaUrl": "", "options": ["Half past seven", "Half past eight", "A quarter to seven", "Seven o'clock"], "pairs": [], "answer": "Half past seven", "weight": 10, "explanation": "07:30 means 30 minutes past 7 (half past seven)."}, {"id": "DUM_Q_21", "type": "PG", "subject": "Bahasa Inggris", "text": "[Kelas 5 SD] My mother ... delicious fried rice every morning.", "mediaType": "none", "mediaUrl": "", "options": ["cook", "cooks", "cooking", "cooked"], "pairs": [], "answer": "cooks", "weight": 10, "explanation": "Simple Present Tense with singular subject 'My mother' uses verb + s (cooks)."}, {"id": "DUM_Q_22", "type": "PG", "subject": "Bahasa Inggris", "text": "[Kelas 6 SD] Yesterday, we ... to the museum with our teacher.", "mediaType": "none", "mediaUrl": "", "options": ["go", "goes", "went", "going"], "pairs": [], "answer": "went", "weight": 10, "explanation": "'Yesterday' indicates Simple Past Tense; the past form of 'go' is 'went'."}, {"id": "DUM_Q_23", "type": "PG", "subject": "Bahasa Inggris", "text": "[Kelas 7 SMP] Choose the correct pronoun: 'Dina has a new bicycle. ... bicycle is blue.'", "mediaType": "none", "mediaUrl": "", "options": ["She", "Her", "Hers", "Him"], "pairs": [], "answer": "Her", "weight": 10, "explanation": "Possessive adjective before a noun ('bicycle') for female singular is 'Her'."}, {"id": "DUM_Q_24", "type": "PG", "subject": "Bahasa Inggris", "text": "[Kelas 7 SMP] Read the notice: 'KEEP SILENT, EXAM IN PROGRESS.' Where do you usually find this notice?", "mediaType": "none", "mediaUrl": "", "options": ["In the school canteen", "In the examination room", "On the football field", "At the bus station"], "pairs": [], "answer": "In the examination room", "weight": 10, "explanation": "The notice reminds students to be quiet during an exam."}, {"id": "DUM_Q_25", "type": "PG", "subject": "Bahasa Inggris", "text": "[Kelas 8 SMP] A cheetah is ... than a horse.", "mediaType": "none", "mediaUrl": "", "options": ["fast", "faster", "fastest", "more fast"], "pairs": [], "answer": "faster", "weight": 10, "explanation": "Comparative degree for one-syllable adjective 'fast' is 'faster'."}, {"id": "DUM_Q_26", "type": "PG", "subject": "Bahasa Inggris", "text": "[Kelas 9 SMP] The passive voice of 'The students clean the classroom every day' is ...", "mediaType": "none", "mediaUrl": "", "options": ["The classroom is cleaned by the students every day", "The classroom was cleaned by the students every day", "The classroom cleans the students every day", "The classroom is cleaning every day"], "pairs": [], "answer": "The classroom is cleaned by the students every day", "weight": 10, "explanation": "Simple Present Passive formula: Object + is/am/are + V3 + by Subject."}, {"id": "DUM_Q_27", "type": "PG", "subject": "Bahasa Inggris", "text": "[Kelas 9 SMP] What is the social function of a Narrative Text?", "mediaType": "none", "mediaUrl": "", "options": ["To describe a specific place", "To entertain the readers with a story", "To explain how to operate a machine", "To report factual scientific data"], "pairs": [], "answer": "To entertain the readers with a story", "weight": 10, "explanation": "Narrative text aims to amuse or entertain readers with imaginative or moral stories."}, {"id": "DUM_Q_28", "type": "PG", "subject": "Pendidikan Pancasila", "text": "[Kelas 4 SD] Lambang sila keempat Pancasila yang berbunyi 'Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan' adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Bintang", "Rantai emas", "Pohon beringin", "Kepala banteng"], "pairs": [], "answer": "Kepala banteng", "weight": 10, "explanation": "Kepala banteng merupakan simbol sila keempat Pancasila."}, {"id": "DUM_Q_29", "type": "PG", "subject": "Pendidikan Pancasila", "text": "[Kelas 5 SD] Semboyan bangsa Indonesia yang tertulis pada pita burung Garuda Pancasila adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Tut Wuri Handayani", "Bhinneka Tunggal Ika", "Ing Ngarsa Sung Tuladha", "Merdeka atau Mati"], "pairs": [], "answer": "Bhinneka Tunggal Ika", "weight": 10, "explanation": "Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu jua."}, {"id": "DUM_Q_30", "type": "PG", "subject": "Pendidikan Pancasila", "text": "[Kelas 5 SD] Contoh penerapan nilai sila ketiga Pancasila di lingkungan sekolah adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Mengikuti upacara bendera dengan tertib", "Menyontek saat ulangan", "Memilih-milih teman berdasarkan suku", "Datang terlambat ke sekolah"], "pairs": [], "answer": "Mengikuti upacara bendera dengan tertib", "weight": 10, "explanation": "Upacara bendera menumbuhkan rasa cinta tanah air dan persatuan."}, {"id": "DUM_Q_31", "type": "PG", "subject": "Pendidikan Pancasila", "text": "[Kelas 6 SD] Keputusan bersama dalam musyawarah sebaiknya diambil melalui ...", "mediaType": "none", "mediaUrl": "", "options": ["Pemaksaan kehendak ketua", "Mufakat seluruh peserta", "Undian berhadiah", "Keputusan sepihak"], "pairs": [], "answer": "Mufakat seluruh peserta", "weight": 10, "explanation": "Musyawarah mengutamakan kesepakatan bersama (mufakat)."}, {"id": "DUM_Q_32", "type": "PG", "subject": "Pendidikan Pancasila", "text": "[Kelas 7 SMP] Sidang pertama BPUPKI yang membahas dasar negara Indonesia dilaksanakan pada tanggal ...", "mediaType": "none", "mediaUrl": "", "options": ["29 Mei – 1 Juni 1945", "10 – 17 Juli 1945", "17 Agustus 1945", "18 Agustus 1945"], "pairs": [], "answer": "29 Mei – 1 Juni 1945", "weight": 10, "explanation": "Sidang pertama BPUPKI berlangsung 29 Mei hingga 1 Juni 1945."}, {"id": "DUM_Q_33", "type": "PG", "subject": "Pendidikan Pancasila", "text": "[Kelas 7 SMP] Norma yang bersumber dari hati nurani manusia tentang baik dan buruk disebut norma ...", "mediaType": "none", "mediaUrl": "", "options": ["Agama", "Kesusilaan", "Kesopanan", "Hukum"], "pairs": [], "answer": "Kesusilaan", "weight": 10, "explanation": "Norma kesusilaan berasal dari suara hati nurani manusia."}, {"id": "DUM_Q_34", "type": "PG", "subject": "Pendidikan Pancasila", "text": "[Kelas 8 SMP] Kedudukan Pancasila sebagai dasar negara tercantum secara resmi dalam Pembukaan UUD NRI Tahun 1945 alinea ke-...", "mediaType": "none", "mediaUrl": "", "options": ["Pertama", "Kedua", "Ketiga", "Keempat"], "pairs": [], "answer": "Keempat", "weight": 10, "explanation": "Rumusan dasar negara Pancasila terdapat pada alinea keempat Pembukaan UUD 1945."}, {"id": "DUM_Q_35", "type": "PG", "subject": "Pendidikan Pancasila", "text": "[Kelas 9 SMP] Perwujudan nilai-nilai Pancasila dalam bidang ekonomi sesuai Pasal 33 UUD NRI Tahun 1945 disusun sebagai usaha bersama berdasar atas asas ...", "mediaType": "none", "mediaUrl": "", "options": ["Individualisme", "Kekeluargaan", "Monopoli bebas", "Liberalisme"], "pairs": [], "answer": "Kekeluargaan", "weight": 10, "explanation": "Pasal 33 ayat (1) UUD 1945 menegaskan perekonomian disusun atas asas kekeluargaan."}, {"id": "DUM_Q_36", "type": "PG", "subject": "Pendidikan Pancasila", "text": "[Kelas 9 SMP] Prinsip kedaulatan rakyat di Indonesia menegaskan bahwa kekuasaan tertinggi berada di tangan ...", "mediaType": "none", "mediaUrl": "", "options": ["Presiden", "Rakyat", "Menteri", "Mahkamah Agung"], "pairs": [], "answer": "Rakyat", "weight": 10, "explanation": "Pasal 1 ayat (2) UUD 1945: Kedaulatan berada di tangan rakyat dan dilaksanakan menurut UUD."}, {"id": "DUM_Q_37", "type": "PG", "subject": "PJOK", "text": "[Kelas 4 SD] Gerak dasar berpindah tempat seperti berjalan, berlari, dan melompat disebut gerak ...", "mediaType": "none", "mediaUrl": "", "options": ["Lokomotor", "Nonlokomotor", "Manipulatif", "Keseimbangan"], "pairs": [], "answer": "Lokomotor", "weight": 10, "explanation": "Gerak lokomotor adalah gerakan yang ditandai dengan perpindahan tempat."}, {"id": "DUM_Q_38", "type": "PG", "subject": "PJOK", "text": "[Kelas 5 SD] Jumlah pemain setiap regu dalam pertandingan sepak bola resmi adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["6 orang", "9 orang", "11 orang", "12 orang"], "pairs": [], "answer": "11 orang", "weight": 10, "explanation": "Setiap tim sepak bola terdiri atas 11 pemain termasuk penjaga gawang."}, {"id": "DUM_Q_39", "type": "PG", "subject": "PJOK", "text": "[Kelas 5 SD] Pukulan pertama untuk memulai permainan dalam cabang olahraga bola voli disebut ...", "mediaType": "none", "mediaUrl": "", "options": ["Smash", "Passing", "Servis", "Blocking"], "pairs": [], "answer": "Servis", "weight": 10, "explanation": "Servis merupakan pukulan pembuka permainan bola voli."}, {"id": "DUM_Q_40", "type": "PG", "subject": "PJOK", "text": "[Kelas 6 SD] Latihan lari bolak-balik (shuttle run) bertujuan untuk melatih komponen kebugaran jasmani berupa ...", "mediaType": "none", "mediaUrl": "", "options": ["Kelincahan", "Kelenturan", "Keseimbangan", "Daya tahan paru"], "pairs": [], "answer": "Kelincahan", "weight": 10, "explanation": "Shuttle run melatih kemampuan mengubah arah gerak secara cepat (kelincahan)."}, {"id": "DUM_Q_41", "type": "PG", "subject": "PJOK", "text": "[Kelas 7 SMP] Dalam permainan bola basket, teknik mengoper bola dengan cara memantulkannya ke lantai terlebih dahulu disebut ...", "mediaType": "none", "mediaUrl": "", "options": ["Chest pass", "Bounce pass", "Overhead pass", "Lay up"], "pairs": [], "answer": "Bounce pass", "weight": 10, "explanation": "Bounce pass adalah operan pantul ke lantai menuju rekan satu tim."}, {"id": "DUM_Q_42", "type": "PG", "subject": "PJOK", "text": "[Kelas 7 SMP] Start yang digunakan pada perlombaan lari jarak pendek (sprint) 100 meter adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Start berdiri", "Start melayang", "Start jongkok", "Start duduk"], "pairs": [], "answer": "Start jongkok", "weight": 10, "explanation": "Lari jarak pendek (100 m, 200 m, 400 m) wajib menggunakan start jongkok."}, {"id": "DUM_Q_43", "type": "PG", "subject": "PJOK", "text": "[Kelas 8 SMP] Teknik dasar pencak silat yang berfungsi untuk menahan atau membelokkan serangan lawan tanpa menyakiti lawan disebut ...", "mediaType": "none", "mediaUrl": "", "options": ["Pukulan", "Tendangan", "Tangkisan", "Kuda-kuda"], "pairs": [], "answer": "Tangkisan", "weight": 10, "explanation": "Tangkisan merupakan usaha pembelaan dengan mengadakan kontak langsung terhadap serangan lawan."}, {"id": "DUM_Q_44", "type": "PG", "subject": "PJOK", "text": "[Kelas 9 SMP] Aktivitas fisik secara teratur minimal 30 menit setiap hari memberikan manfaat utama bagi sistem peredaran darah, yaitu ...", "mediaType": "none", "mediaUrl": "", "options": ["Meningkatkan tekanan darah tinggi", "Memperkuat otot jantung dan melancarkan sirkulasi darah", "Mengurangi kapasitas paru-paru", "Memperlambat metabolisme tubuh"], "pairs": [], "answer": "Memperkuat otot jantung dan melancarkan sirkulasi darah", "weight": 10, "explanation": "Olahraga aerobik teratur menjaga kebugaran jantung dan pembuluh darah."}, {"id": "DUM_Q_45", "type": "PG", "subject": "PJOK", "text": "[Kelas 9 SMP] Dalam permainan bulu tangkis, pukulan keras dan menukik tajam ke arah lapangan lawan untuk mematikan lawan disebut ...", "mediaType": "none", "mediaUrl": "", "options": ["Lob", "Dropshot", "Smash", "Netting"], "pairs": [], "answer": "Smash", "weight": 10, "explanation": "Smash adalah pukulan menyerang dengan tenaga penuh dan arah menukik tajam."}, {"id": "DUM_Q_46", "type": "PG", "subject": "IPAS", "text": "[Kelas 4 SD] Bagian tumbuhan yang berfungsi menyerap air dan zat hara dari dalam tanah adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Daun", "Batang", "Akar", "Bunga"], "pairs": [], "answer": "Akar", "weight": 10, "explanation": "Akar menancap di tanah untuk menyerap air dan mineral serta menopang tumbuhan."}, {"id": "DUM_Q_47", "type": "PG", "subject": "IPAS", "text": "[Kelas 4 SD] Perubahan wujud benda dari cair menjadi gas akibat pemanasan disebut ...", "mediaType": "none", "mediaUrl": "", "options": ["Membeku", "Mencair", "Menguap", "Mengembun"], "pairs": [], "answer": "Menguap", "weight": 10, "explanation": "Menguap adalah perubahan wujud cair menjadi gas, misalnya air mendidih."}, {"id": "DUM_Q_48", "type": "PG", "subject": "IPAS", "text": "[Kelas 5 SD] Urutan rantai makanan yang tepat pada ekosistem sawah adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Padi → Tikus → Ular → Elang", "Tikus → Padi → Elang → Ular", "Elang → Ular → Tikus → Padi", "Padi → Elang → Tikus → Ular"], "pairs": [], "answer": "Padi → Tikus → Ular → Elang", "weight": 10, "explanation": "Padi sebagai produsen dimakan tikus (konsumen I), dimakan ular (konsumen II), lalu elang (konsumen III)."}, {"id": "DUM_Q_49", "type": "PG", "subject": "IPAS", "text": "[Kelas 5 SD] Kenampakan alam berupa daratan yang menjorok ke laut disebut ...", "mediaType": "none", "mediaUrl": "", "options": ["Teluk", "Tanjung", "Selat", "Palung"], "pairs": [], "answer": "Tanjung", "weight": 10, "explanation": "Tanjung adalah daratan yang menjorok ke laut, sedangkan laut yang menjorok ke darat adalah teluk."}, {"id": "DUM_Q_50", "type": "PG", "subject": "IPAS", "text": "[Kelas 6 SD] Planet terbesar dalam tata surya kita adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Mars", "Saturnus", "Jupiter", "Uranus"], "pairs": [], "answer": "Jupiter", "weight": 10, "explanation": "Jupiter merupakan planet dengan ukuran dan massa terbesar di tata surya."}, {"id": "DUM_Q_51", "type": "PG", "subject": "IPAS", "text": "[Kelas 6 SD] Kerja sama negara-negara di kawasan Asia Tenggara dalam bidang ekonomi, sosial, dan budaya tergabung dalam organisasi ...", "mediaType": "none", "mediaUrl": "", "options": ["PBB", "ASEAN", "OPEC", "APEC"], "pairs": [], "answer": "ASEAN", "weight": 10, "explanation": "ASEAN (Association of Southeast Asian Nations) adalah perhimpunan bangsa-bangsa Asia Tenggara."}, {"id": "DUM_Q_52", "type": "PG", "subject": "IPAS", "text": "[Kelas 6 SD] Sumber energi alternatif yang memanfaatkan panas dari dalam perut bumi disebut energi ...", "mediaType": "none", "mediaUrl": "", "options": ["Surya", "Angin", "Panas bumi (geotermal)", "Biomassa"], "pairs": [], "answer": "Panas bumi (geotermal)", "weight": 10, "explanation": "Energi geotermal berasal dari panas alami di bawah permukaan bumi."}, {"id": "DUM_Q_53", "type": "PG", "subject": "IPAS", "text": "[Kelas 5 SD] Gaya yang menyebabkan buah kelapa jatuh ke bawah menuju permukaan bumi adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Gaya magnet", "Gaya gravitasi", "Gaya gesek", "Gaya pegas"], "pairs": [], "answer": "Gaya gravitasi", "weight": 10, "explanation": "Gaya gravitasi bumi menarik benda menuju pusat bumi."}, {"id": "DUM_Q_54", "type": "PG", "subject": "IPAS", "text": "[Kelas 6 SD] Peristiwa berputarnya Bumi pada porosnya yang menyebabkan terjadinya siang dan malam disebut ...", "mediaType": "none", "mediaUrl": "", "options": ["Revolusi Bumi", "Rotasi Bumi", "Gerhana Bulan", "Pasang surut"], "pairs": [], "answer": "Rotasi Bumi", "weight": 10, "explanation": "Rotasi Bumi membutuhkan waktu sekitar 24 jam dan mengakibatkan pergantian siang serta malam."}, {"id": "DUM_Q_55", "type": "PG", "subject": "IPA", "text": "[Kelas 4 SD] Hewan yang mengalami metamorfosis sempurna berikut ini adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Belalang", "Kupu-kupu", "Kecoak", "Jangkrik"], "pairs": [], "answer": "Kupu-kupu", "weight": 10, "explanation": "Kupu-kupu mengalami tahap telur → larva (ulat) → pupa (kepompong) → imago."}, {"id": "DUM_Q_56", "type": "PG", "subject": "IPA", "text": "[Kelas 5 SD] Organ pernapasan utama pada manusia tempat terjadinya pertukaran oksigen dan karbon dioksida adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Trakea", "Bronkus", "Alveolus di paru-paru", "Rongga hidung"], "pairs": [], "answer": "Alveolus di paru-paru", "weight": 10, "explanation": "Alveolus merupakan gelembung halus di paru-paru tempat pertukaran O₂ dan CO₂."}, {"id": "DUM_Q_57", "type": "PG", "subject": "IPA", "text": "[Kelas 6 SD] Rangkaian listrik yang disusun berderet tanpa cabang sehingga jika satu lampu padam maka lampu lainnya ikut padam adalah rangkaian ...", "mediaType": "none", "mediaUrl": "", "options": ["Paralel", "Seri", "Campuran", "Terbuka"], "pairs": [], "answer": "Seri", "weight": 10, "explanation": "Pada rangkaian seri hanya terdapat satu jalur aliran arus listrik."}, {"id": "DUM_Q_58", "type": "PG", "subject": "IPA", "text": "[Kelas 7 SMP] Besaran pokok menurut Sistem Internasional (SI) beserta satuannya yang benar adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Kecepatan (m/s)", "Massa (kilogram)", "Luas (m²)", "Gaya (Newton)"], "pairs": [], "answer": "Massa (kilogram)", "weight": 10, "explanation": "Massa adalah besaran pokok dengan satuan SI kilogram (kg)."}, {"id": "DUM_Q_59", "type": "PG", "subject": "IPA", "text": "[Kelas 7 SMP] Larutan yang dapat mengubah kertas lakmus merah menjadi berwarna biru bersifat ...", "mediaType": "none", "mediaUrl": "", "options": ["Asam", "Basa", "Netral", "Garam"], "pairs": [], "answer": "Basa", "weight": 10, "explanation": "Larutan basa mengubah lakmus merah menjadi biru."}, {"id": "DUM_Q_60", "type": "PG", "subject": "IPA", "text": "[Kelas 8 SMP] Enzim amilase yang terdapat dalam air liur berfungsi untuk mengubah ...", "mediaType": "none", "mediaUrl": "", "options": ["Protein menjadi pepton", "Amilum (zat tepung) menjadi gula sederhana", "Lemak menjadi asam lemak", "Susu menjadi kasein"], "pairs": [], "answer": "Amilum (zat tepung) menjadi gula sederhana", "weight": 10, "explanation": "Enzim amilase/ptialin mencerna karbohidrat (amilum) menjadi maltosa."}, {"id": "DUM_Q_61", "type": "PG", "subject": "IPA", "text": "[Kelas 8 SMP] Sebuah benda bermassa 5 kg diberi gaya sebesar 20 N. Percepatan yang dialami benda tersebut adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["2 m/s²", "4 m/s²", "15 m/s²", "100 m/s²"], "pairs": [], "answer": "4 m/s²", "weight": 10, "explanation": "Hukum II Newton: a = F / m = 20 N / 5 kg = 4 m/s²."}, {"id": "DUM_Q_62", "type": "PG", "subject": "IPA", "text": "[Kelas 9 SMP] Persilangan antara tanaman berbunga merah dominan (MM) dengan tanaman berbunga putih resesif (mm) akan menghasilkan keturunan F1 dengan fenotipe ...", "mediaType": "none", "mediaUrl": "", "options": ["100% merah", "100% putih", "50% merah, 50% putih", "75% merah, 25% putih"], "pairs": [], "answer": "100% merah", "weight": 10, "explanation": "Genotipe F1 adalah 100% Mm, karena M dominan maka seluruhnya berwarna merah."}, {"id": "DUM_Q_63", "type": "PG", "subject": "IPA", "text": "[Kelas 9 SMP] Dua muatan listrik sejenis jika didekatkan akan saling ...", "mediaType": "none", "mediaUrl": "", "options": ["Tarik-menarik", "Tolak-menolak", "Diam tidak bergerak", "Menghilangkan muatan"], "pairs": [], "answer": "Tolak-menolak", "weight": 10, "explanation": "Muatan listrik sejenis (+ dengan + atau - dengan -) saling tolak-menolak."}, {"id": "DUM_Q_64", "type": "PG", "subject": "IPS", "text": "[Kelas 4 SD] Kegiatan menyalurkan barang hasil produksi dari produsen kepada konsumen disebut ...", "mediaType": "none", "mediaUrl": "", "options": ["Produksi", "Distribusi", "Konsumsi", "Investasi"], "pairs": [], "answer": "Distribusi", "weight": 10, "explanation": "Distribusi adalah kegiatan penyaluran barang dan jasa."}, {"id": "DUM_Q_65", "type": "PG", "subject": "IPS", "text": "[Kelas 5 SD] Kerajaan Hindu tertua di Indonesia yang terletak di Kalimantan Timur adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Majapahit", "Sriwijaya", "Kutai", "Tarumanegara"], "pairs": [], "answer": "Kutai", "weight": 10, "explanation": "Kerajaan Kutai berdiri sekitar abad ke-4 M di tepi Sungai Mahakam, Kalimantan Timur."}, {"id": "DUM_Q_66", "type": "PG", "subject": "IPS", "text": "[Kelas 6 SD] Garis khayal yang membelah Bumi menjadi belahan Bumi utara dan belahan Bumi selatan disebut garis ...", "mediaType": "none", "mediaUrl": "", "options": ["Bujur", "Khatulistiwa (Ekuator)", "Balik Utara", "Meridian"], "pairs": [], "answer": "Khatulistiwa (Ekuator)", "weight": 10, "explanation": "Garis khatulistiwa berada pada lintang 0°."}, {"id": "DUM_Q_67", "type": "PG", "subject": "IPS", "text": "[Kelas 7 SMP] Syarat utama terjadinya interaksi sosial antara dua orang atau lebih adalah adanya ...", "mediaType": "none", "mediaUrl": "", "options": ["Kontak sosial dan komunikasi", "Persaingan dan konflik", "Perbedaan bahasa", "Jarak geografis yang jauh"], "pairs": [], "answer": "Kontak sosial dan komunikasi", "weight": 10, "explanation": "Interaksi sosial terjadi apabila terpenuhi kontak sosial dan komunikasi."}, {"id": "DUM_Q_68", "type": "PG", "subject": "IPS", "text": "[Kelas 7 SMP] Perbandingan jarak pada peta dengan jarak sebenarnya di permukaan bumi disebut ...", "mediaType": "none", "mediaUrl": "", "options": ["Legenda", "Inset", "Skala peta", "Orientasi"], "pairs": [], "answer": "Skala peta", "weight": 10, "explanation": "Skala menunjukkan perbandingan jarak di peta terhadap jarak sesungguhnya."}, {"id": "DUM_Q_69", "type": "PG", "subject": "IPS", "text": "[Kelas 8 SMP] Faktor pendorong bangsa-bangsa Eropa melakukan penjelajahan samudra ke Nusantara dikenal dengan semboyan ...", "mediaType": "none", "mediaUrl": "", "options": ["3G (Gold, Glory, Gospel)", "Bhinneka Tunggal Ika", "Trias Politica", "Devide et Impera"], "pairs": [], "answer": "3G (Gold, Glory, Gospel)", "weight": 10, "explanation": "Gold (kekayaan), Glory (kejayaan), dan Gospel (penyebaran agama)."}, {"id": "DUM_Q_70", "type": "PG", "subject": "IPS", "text": "[Kelas 8 SMP] Perpindahan penduduk dari desa ke kota untuk mencari pekerjaan disebut ...", "mediaType": "none", "mediaUrl": "", "options": ["Transmigrasi", "Urbanisasi", "Imigrasi", "Emigrasi"], "pairs": [], "answer": "Urbanisasi", "weight": 10, "explanation": "Urbanisasi adalah perpindahan penduduk dari wilayah pedesaan menuju perkotaan."}, {"id": "DUM_Q_71", "type": "PG", "subject": "IPS", "text": "[Kelas 9 SMP] Perdagangan antarnegara yang dilakukan dengan cara menjual barang dari dalam negeri ke luar negeri disebut ...", "mediaType": "none", "mediaUrl": "", "options": ["Impor", "Ekspor", "Barter", "Retribusi"], "pairs": [], "answer": "Ekspor", "weight": 10, "explanation": "Ekspor merupakan kegiatan menjual produk ke luar negeri untuk memperoleh devisa."}, {"id": "DUM_Q_72", "type": "PG", "subject": "IPS", "text": "[Kelas 9 SMP] Dampak positif globalisasi di bidang teknologi informasi bagi pelajar adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Meningkatnya ketergantungan gawai", "Kemudahan mengakses sumber belajar digital dari seluruh dunia", "Lunturnya budaya gotong royong", "Maraknya berita bohong"], "pairs": [], "answer": "Kemudahan mengakses sumber belajar digital dari seluruh dunia", "weight": 10, "explanation": "Globalisasi memudahkan akses informasi dan literasi pendidikan secara luas."}, {"id": "DUM_Q_73", "type": "PG", "subject": "Informatika", "text": "[Kelas 4 SD] Perangkat keras komputer yang berfungsi menampilkan hasil pengolahan data secara visual ke layar adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Keyboard", "Monitor", "Mouse", "Scanner"], "pairs": [], "answer": "Monitor", "weight": 10, "explanation": "Monitor merupakan perangkat keluaran (output device) yang menampilkan gambar/teks."}, {"id": "DUM_Q_74", "type": "PG", "subject": "Informatika", "text": "[Kelas 5 SD] Perangkat lunak pengolah kata yang sering digunakan untuk mengetik dokumen surat atau laporan adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Microsoft Excel", "Microsoft Word", "Microsoft PowerPoint", "Paint"], "pairs": [], "answer": "Microsoft Word", "weight": 10, "explanation": "Microsoft Word adalah aplikasi pengolah kata (word processor)."}, {"id": "DUM_Q_75", "type": "PG", "subject": "Informatika", "text": "[Kelas 5 SD] Tombol kombinasi pada keyboard untuk menyalin (copy) teks yang dipilih adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Ctrl + V", "Ctrl + X", "Ctrl + C", "Ctrl + Z"], "pairs": [], "answer": "Ctrl + C", "weight": 10, "explanation": "Ctrl + C digunakan untuk menyalin (Copy), sedangkan Ctrl + V untuk menempel (Paste)."}, {"id": "DUM_Q_76", "type": "PG", "subject": "Informatika", "text": "[Kelas 6 SD] Tindakan menjaga data pribadi seperti kata sandi (password) dan PIN agar tidak dibagikan kepada orang asing di internet termasuk bagian dari ...", "mediaType": "none", "mediaUrl": "", "options": ["Keamanan digital", "Perundungan siber", "Pembajakan", "Spamming"], "pairs": [], "answer": "Keamanan digital", "weight": 10, "explanation": "Melindungi kredensial pribadi merupakan prinsip dasar keamanan digital."}, {"id": "DUM_Q_77", "type": "PG", "subject": "Informatika", "text": "[Kelas 7 SMP] Empat pilar utama dalam Berpikir Komputasional (Computational Thinking) meliputi dekomposisi, pengenalan pola, abstraksi, dan ...", "mediaType": "none", "mediaUrl": "", "options": ["Algoritma", "Instalasi", "Kompilasi", "Enkripsi"], "pairs": [], "answer": "Algoritma", "weight": 10, "explanation": "Empat fondasi berpikir komputasional: dekomposisi, pengenalan pola, abstraksi, dan algoritma."}, {"id": "DUM_Q_78", "type": "PG", "subject": "Informatika", "text": "[Kelas 7 SMP] Perangkat jaringan yang berfungsi menghubungkan dua atau lebih jaringan berbeda serta menentukan jalur terbaik pengiriman paket data adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Switch", "Router", "Access Point", "Modem"], "pairs": [], "answer": "Router", "weight": 10, "explanation": "Router melakukan routing paket data antarjaringan komputer."}, {"id": "DUM_Q_79", "type": "PG", "subject": "Informatika", "text": "[Kelas 8 SMP] Bilangan biner 1010 jika dikonversikan ke dalam bilangan desimal bernilai ...", "mediaType": "none", "mediaUrl": "", "options": ["8", "10", "12", "14"], "pairs": [], "answer": "10", "weight": 10, "explanation": "1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 8 + 0 + 2 + 0 = 10."}, {"id": "DUM_Q_80", "type": "PG", "subject": "Informatika", "text": "[Kelas 9 SMP] Layanan penyimpanan data secara daring melalui internet sehingga file dapat diakses dari berbagai perangkat disebut ...", "mediaType": "none", "mediaUrl": "", "options": ["Local Storage", "Cloud Storage", "Optical Disc", "Flash Drive"], "pairs": [], "answer": "Cloud Storage", "weight": 10, "explanation": "Cloud storage menyimpan data pada server jarak jauh yang diakses melalui internet."}, {"id": "DUM_Q_81", "type": "PG", "subject": "Informatika", "text": "[Kelas 9 SMP] Protokol keamanan pada situs web yang mengenkripsi pertukaran data antara browser pengguna dan server ditandai dengan awalan ...", "mediaType": "none", "mediaUrl": "", "options": ["HTTP://", "HTTPS://", "FTP://", "SMTP://"], "pairs": [], "answer": "HTTPS://", "weight": 10, "explanation": "HTTPS (Hypertext Transfer Protocol Secure) menggunakan enkripsi SSL/TLS."}, {"id": "DUM_Q_82", "type": "PG", "subject": "Koding dan Kecerdasan Artifisial (KKA)", "text": "[Kelas 4 SD] Urutan langkah-langkah logis dan sistematis untuk menyelesaikan suatu masalah disebut ...", "mediaType": "none", "mediaUrl": "", "options": ["Algoritma", "Animasi", "Aplikasi", "Antivirus"], "pairs": [], "answer": "Algoritma", "weight": 10, "explanation": "Algoritma adalah rangkaian instruksi terurut untuk mencapai tujuan."}, {"id": "DUM_Q_83", "type": "PG", "subject": "Koding dan Kecerdasan Artifisial (KKA)", "text": "[Kelas 5 SD] Pada pemrograman visual berbasis blok seperti Scratch, blok 'forever' (selamanya) berfungsi untuk membuat perintah berjalan secara ...", "mediaType": "none", "mediaUrl": "", "options": ["Berulang terus-menerus", "Hanya satu kali", "Berhenti total", "Mundur ke belakang"], "pairs": [], "answer": "Berulang terus-menerus", "weight": 10, "explanation": "Blok forever merupakan struktur perulangan (loop) tanpa henti selama program berjalan."}, {"id": "DUM_Q_84", "type": "PG", "subject": "Koding dan Kecerdasan Artifisial (KKA)", "text": "[Kelas 5 SD] Kesalahan dalam penulisan kode program yang menyebabkan program tidak berjalan sesuai harapan disebut ...", "mediaType": "none", "mediaUrl": "", "options": ["Bug", "Fitur", "Browser", "Pixel"], "pairs": [], "answer": "Bug", "weight": 10, "explanation": "Bug adalah galat/kesalahan dalam kode, dan proses memperbaikinya disebut debugging."}, {"id": "DUM_Q_85", "type": "PG", "subject": "Koding dan Kecerdasan Artifisial (KKA)", "text": "[Kelas 6 SD] Contoh penerapan Kecerdasan Artifisial (AI) yang membantu pengguna menemukan rute tercepat di jalan raya adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Aplikasi peta navigasi pintar", "Kalkulator saku biasa", "Jam dinding analog", "Buku tulis cetak"], "pairs": [], "answer": "Aplikasi peta navigasi pintar", "weight": 10, "explanation": "Peta navigasi menganalisis data lalu lintas real-time menggunakan AI untuk merekomendasikan rute."}, {"id": "DUM_Q_86", "type": "PG", "subject": "Koding dan Kecerdasan Artifisial (KKA)", "text": "[Kelas 7 SMP] Dalam pemrograman, struktur percabangan yang menjalankan perintah tertentu hanya jika suatu kondisi terpenuhi adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["IF - ELSE", "PRINT", "INPUT", "VARIABLE"], "pairs": [], "answer": "IF - ELSE", "weight": 10, "explanation": "Percabangan IF-ELSE mengevaluasi kondisi logika (benar/salah) sebelum mengeksekusi aksi."}, {"id": "DUM_Q_87", "type": "PG", "subject": "Koding dan Kecerdasan Artifisial (KKA)", "text": "[Kelas 7 SMP] Wadah bernama di dalam memori program yang digunakan untuk menyimpan nilai data yang dapat berubah-ubah disebut ...", "mediaType": "none", "mediaUrl": "", "options": ["Variabel", "Komentar", "Operator", "Konstanta"], "pairs": [], "answer": "Variabel", "weight": 10, "explanation": "Variabel menyimpan nilai data seperti angka atau teks selama program berjalan."}, {"id": "DUM_Q_88", "type": "PG", "subject": "Koding dan Kecerdasan Artifisial (KKA)", "text": "[Kelas 8 SMP] Cabang Kecerdasan Artifisial yang memungkinkan komputer belajar mengenali pola dari kumpulan data latih tanpa diprogram secara eksplisit untuk setiap aturan disebut ...", "mediaType": "none", "mediaUrl": "", "options": ["Machine Learning", "Word Processing", "Disk Defragmenter", "Screen Mirroring"], "pairs": [], "answer": "Machine Learning", "weight": 10, "explanation": "Machine Learning melatih model menggunakan data agar mampu memprediksi atau mengklasifikasi."}, {"id": "DUM_Q_89", "type": "PG", "subject": "Koding dan Kecerdasan Artifisial (KKA)", "text": "[Kelas 9 SMP] Dalam etika pemanfaatan Kecerdasan Artifisial generatif, hal yang wajib dilakukan pelajar saat menggunakan bantuan AI untuk tugas sekolah adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["Menyalin seluruh jawaban tanpa memeriksa kebenarannya", "Memverifikasi fakta, menjaga kejujuran akademik, dan tidak melanggar hak cipta", "Mengunggah data pribadi rahasia ke chatbot publik", "Mengakui karya AI sepenuhnya tanpa pemahaman"], "pairs": [], "answer": "Memverifikasi fakta, menjaga kejujuran akademik, dan tidak melanggar hak cipta", "weight": 10, "explanation": "Penggunaan AI harus bertanggung jawab, kritis, dan menjunjung integritas akademik."}, {"id": "DUM_Q_90", "type": "PG", "subject": "Koding dan Kecerdasan Artifisial (KKA)", "text": "[Kelas 9 SMP] Perhatikan potongan kode Python: `nilai = 85; print('Lulus' if nilai >= 75 else 'Remedial')`. Output yang ditampilkan adalah ...", "mediaType": "none", "mediaUrl": "", "options": ["85", "75", "Lulus", "Remedial"], "pairs": [], "answer": "Lulus", "weight": 10, "explanation": "Karena nilai (85) >= 75 bernilai True, program mencetak 'Lulus'."}];

let _dummyCloudSeedInProgress = false;
async function ensureDummySeedInCloud(usrRows, queRows) {
  if (!IS_CONFIGURED || _dummyCloudSeedInProgress) return false;
  if (localStorage.getItem('CBT_DUMMY_SEEDED_V23') === '1') return false;

  const hasDummyQ = Array.isArray(queRows) && queRows.some(q => q.id === 'DUM_Q_01');
  const hasDummyS = Array.isArray(usrRows) && usrRows.some(u => u.id === 'DUM_SISWA_01');
  if (hasDummyQ && hasDummyS) {
    localStorage.setItem('CBT_DUMMY_SEEDED_V23', '1');
    return false;
  }

  _dummyCloudSeedInProgress = true;
  try {
    // 1. Upsert 10 Mata Pelajaran ke cbt_settings
    const mergedSubj = Array.from(new Set([...DUMMY_SEED_SUBJECTS, ...(DB_CACHE.settings?.subjectsList || [])]));
    await sbUpsert('cbt_settings', {
      id: 1,
      exam_title: DB_CACHE.settings?.examTitle || 'Portal Aplikasi Asesmen Sumatif Akhir Semester (ASAS)',
      subject: 'Matematika',
      duration_minutes: DB_CACHE.settings?.durationMinutes || 45,
      active_token: DB_CACHE.settings?.activeToken || 'CBT2026',
      shuffle_questions: true,
      shuffle_options: true,
      show_review_after_submit: true,
      max_violations: 4,
      subjects_list: mergedSubj,
      updated_at: new Date().toISOString()
    });
    localStorage.setItem('CBT_MAPEL_LIST_V1', JSON.stringify(mergedSubj));

    // 2. Upsert 6 Kelas Master SD 4-6 & SMP 7-9 ke cbt_classes
    await sbUpsert('cbt_classes', DUMMY_SEED_CLASSES.map(c => ({
      id_kelas: c.idKelas,
      nama_kelas: c.namaKelas,
      wali_kelas_username: c.waliKelasUsername,
      wali_kelas_name: c.waliKelasName,
      keterangan: c.keterangan
    })));

    // 3. Upsert 83 Siswa Dummy ke cbt_users
    await sbUpsert('cbt_users', DUMMY_SEED_STUDENTS.map(s => ({
      id: s.id,
      username: s.username,
      password: s.password,
      name: s.name,
      role: 'Siswa',
      kelas: s.kelas,
      id_kelas: s.idKelas,
      sesi: s.sesi,
      ruang: s.ruang
    })));

    // 4. Upsert 83 Sesi Ujian Siswa ke cbt_sessions
    await sbUpsert('cbt_sessions', DUMMY_SEED_STUDENTS.map(s => ({
      student_id: s.username,
      name: s.name,
      kelas: s.kelas,
      id_kelas: s.idKelas,
      ruang: s.ruang,
      status: 'Siap Ujian',
      progress: 0,
      violations: 0,
      violation_logs: [],
      extra_minutes: 0,
      broadcast_msg: '',
      answers: {},
      essay_scores: {},
      auto_score: 0,
      essay_score: 0,
      final_score: 0,
      submitted_at: null,
      subject_results: {}
    })));

    // 5. Upsert 90 Soal Dummy ke cbt_questions
    await sbUpsert('cbt_questions', DUMMY_SEED_QUESTIONS.map(q => ({
      id: q.id,
      type: q.type,
      subject: q.subject,
      text: q.text,
      media_type: q.mediaType || 'none',
      media_url: q.mediaUrl || '',
      options: q.options || [],
      pairs: q.pairs || [],
      answer: q.answer,
      weight: q.weight || 10,
      explanation: q.explanation || ''
    })));

    localStorage.setItem('CBT_DUMMY_SEEDED_V23', '1');
    return true;
  } catch (e) {
    console.warn('Auto-seed dummy ke cloud tertunda:', e);
    return false;
  } finally {
    _dummyCloudSeedInProgress = false;
  }
}

// ============================================================================
// shared-cbt.js - Koneksi Cloud Real-Time Vercel <-> Supabase PostgreSQL
// ============================================================================
// ISI KREDENSIAL SUPABASE ANDA DI BAWAH INI (Dari Supabase: Project Settings -> API)
const SUPABASE_URL = 'https://agyhebafhrctmkgwsuku.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFneWhlYmFmaHJjdG1rZ3dzdWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU0MDI1MDMsImV4cCI6MjExMDk3ODUwM30.3SohuyrPNXhHldMwCT3jBZEKhwuu1YUNla-nrfL5QpI';

const CACHE_KEY = 'CBT_SUPABASE_CACHE_V1';
const CLASSES_META_KEY = 'CBT_CLASSES_META_V1';
const IS_CONFIGURED = SUPABASE_URL.startsWith('https://') && !SUPABASE_URL.includes('GANTI-DENGAN');

const DEFAULT_CLASSES_LIST = [
  {
    "idKelas": "KLS-XII-TKJ-1",
    "namaKelas": "XII-TKJ-1",
    "waliKelasUsername": "wali.tkj1",
    "waliKelasName": "Siti Aminah, S.Pd",
    "keterangan": "Teknik Komputer dan Jaringan"
  },
  {
    "idKelas": "KLS-SD-4",
    "namaKelas": "Kelas 4 SD",
    "waliKelasUsername": "wali.sd4",
    "waliKelasName": "Nurhayati, S.Pd",
    "keterangan": "Jenjang Sekolah Dasar Kelas 4"
  },
  {
    "idKelas": "KLS-SD-5",
    "namaKelas": "Kelas 5 SD",
    "waliKelasUsername": "wali.sd5",
    "waliKelasName": "Rahmawati, S.Pd",
    "keterangan": "Jenjang Sekolah Dasar Kelas 5"
  },
  {
    "idKelas": "KLS-SD-6",
    "namaKelas": "Kelas 6 SD",
    "waliKelasUsername": "wali.sd6",
    "waliKelasName": "Hasnawati, S.Pd",
    "keterangan": "Jenjang Sekolah Dasar Kelas 6"
  },
  {
    "idKelas": "KLS-SMP-7",
    "namaKelas": "Kelas 7 SMP",
    "waliKelasUsername": "wali.smp7",
    "waliKelasName": "Siti Aminah, S.Pd",
    "keterangan": "Jenjang Sekolah Menengah Pertama Kelas 7"
  },
  {
    "idKelas": "KLS-SMP-8",
    "namaKelas": "Kelas 8 SMP",
    "waliKelasUsername": "wali.smp8",
    "waliKelasName": "Budi Santoso, S.Pd",
    "keterangan": "Jenjang Sekolah Menengah Pertama Kelas 8"
  },
  {
    "idKelas": "KLS-SMP-9",
    "namaKelas": "Kelas 9 SMP",
    "waliKelasUsername": "wali.smp9",
    "waliKelasName": "Rudi Hartono, S.Pd",
    "keterangan": "Jenjang Sekolah Menengah Pertama Kelas 9"
  }
];

function loadSavedClassesMeta() {
  try {
    const rawStr = localStorage.getItem(CLASSES_META_KEY);
    if (rawStr !== null) {
      const raw = JSON.parse(rawStr);
      if (Array.isArray(raw)) return raw;
    }
  } catch (e) {}
  return JSON.parse(JSON.stringify(DEFAULT_CLASSES_LIST));
}

let DB_CACHE = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null') || {
  settings: {
    examTitle: 'Portal Aplikasi Asesmen Sumatif Akhir Semester (ASAS)',
    subject: 'Informatika & Literasi Digital',
    durationMinutes: 45,
    activeToken: 'CBT2026',
    shuffleQuestions: true,
    shuffleOptions: true,
    showReviewAfterSubmit: true,
    maxViolations: 4,
    subjectsList: [
      "Matematika",
      "Bahasa Indonesia",
      "Bahasa Inggris",
      "Pendidikan Pancasila",
      "PJOK",
      "IPAS",
      "IPA",
      "IPS",
      "Informatika",
      "Koding dan Kecerdasan Artifisial (KKA)"
]
  },
  classesList: loadSavedClassesMeta(),
  users: [
  {
    "id": "USR_ADMIN_FAJAR",
    "username": "Fajar",
    "password": "123",
    "name": "Fajar Jamal, S.Kom",
    "role": "Admin",
    "kelas": "Administrator & Guru TIK",
    "idKelas": "-",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "USR_ADMIN_1",
    "username": "admin",
    "password": "123",
    "name": "Administrator Utama",
    "role": "Admin",
    "kelas": "Panitia Ujian",
    "idKelas": "-",
    "sesi": "-",
    "ruang": "-"
  },
  {
    "id": "USR_GURU_1",
    "username": "guru.rudi",
    "password": "123",
    "name": "Rudi Hartono, S.Pd",
    "role": "Guru",
    "kelas": "Matematika, Bahasa Indonesia, Bahasa Inggris, Pendidikan Pancasila, PJOK, IPAS, IPA, IPS, Informatika, Koding dan Kecerdasan Artifisial (KKA)",
    "idKelas": "SD Tinggi, SMP",
    "sesi": "-",
    "ruang": "-"
  },
  {
    "id": "USR_WALI_1",
    "username": "wali.tkj1",
    "password": "123",
    "name": "Siti Aminah, S.Pd",
    "role": "Wali Kelas",
    "kelas": "XII-TKJ-1",
    "idKelas": "KLS-XII-TKJ-1",
    "sesi": "-",
    "ruang": "-"
  },
  {
    "id": "DUM_SISWA_01",
    "username": "985617",
    "password": "123456",
    "name": "Ahmad Pratama",
    "role": "Siswa",
    "kelas": "Kelas 4 SD",
    "idKelas": "KLS-SD-4",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_02",
    "username": "109972",
    "password": "123456",
    "name": "Siti Azzahra",
    "role": "Siswa",
    "kelas": "Kelas 4 SD",
    "idKelas": "KLS-SD-4",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_03",
    "username": "430356",
    "password": "123456",
    "name": "Muhammad Fauzi",
    "role": "Siswa",
    "kelas": "Kelas 4 SD",
    "idKelas": "KLS-SD-4",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_04",
    "username": "574653",
    "password": "123456",
    "name": "Nur Wulandari",
    "role": "Siswa",
    "kelas": "Kelas 4 SD",
    "idKelas": "KLS-SD-4",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_05",
    "username": "687998",
    "password": "123456",
    "name": "Andi Nugroho",
    "role": "Siswa",
    "kelas": "Kelas 4 SD",
    "idKelas": "KLS-SD-4",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_06",
    "username": "356837",
    "password": "123456",
    "name": "Putri Permata",
    "role": "Siswa",
    "kelas": "Kelas 4 SD",
    "idKelas": "KLS-SD-4",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_07",
    "username": "138782",
    "password": "123456",
    "name": "Rizky Ramadhan",
    "role": "Siswa",
    "kelas": "Kelas 4 SD",
    "idKelas": "KLS-SD-4",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_08",
    "username": "646456",
    "password": "123456",
    "name": "Aisyah Bakri",
    "role": "Siswa",
    "kelas": "Kelas 5 SD",
    "idKelas": "KLS-SD-5",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_09",
    "username": "515983",
    "password": "123456",
    "name": "Fadli Latuconsina",
    "role": "Siswa",
    "kelas": "Kelas 5 SD",
    "idKelas": "KLS-SD-5",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_10",
    "username": "290379",
    "password": "123456",
    "name": "Fitri Taher",
    "role": "Siswa",
    "kelas": "Kelas 5 SD",
    "idKelas": "KLS-SD-5",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_11",
    "username": "801409",
    "password": "123456",
    "name": "Ilham Rahman",
    "role": "Siswa",
    "kelas": "Kelas 5 SD",
    "idKelas": "KLS-SD-5",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_12",
    "username": "603094",
    "password": "123456",
    "name": "Dewi Saputra",
    "role": "Siswa",
    "kelas": "Kelas 5 SD",
    "idKelas": "KLS-SD-5",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_13",
    "username": "901913",
    "password": "123456",
    "name": "Arif Ramadhani",
    "role": "Siswa",
    "kelas": "Kelas 5 SD",
    "idKelas": "KLS-SD-5",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_14",
    "username": "229439",
    "password": "123456",
    "name": "Nadia Setiawan",
    "role": "Siswa",
    "kelas": "Kelas 5 SD",
    "idKelas": "KLS-SD-5",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_15",
    "username": "411765",
    "password": "123456",
    "name": "Reza Nugroho",
    "role": "Siswa",
    "kelas": "Kelas 6 SD",
    "idKelas": "KLS-SD-6",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_16",
    "username": "754811",
    "password": "123456",
    "name": "Salsabila Permata",
    "role": "Siswa",
    "kelas": "Kelas 6 SD",
    "idKelas": "KLS-SD-6",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_17",
    "username": "574524",
    "password": "123456",
    "name": "Dimas Ramadhan",
    "role": "Siswa",
    "kelas": "Kelas 6 SD",
    "idKelas": "KLS-SD-6",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_18",
    "username": "983708",
    "password": "123456",
    "name": "Zahra Hasan",
    "role": "Siswa",
    "kelas": "Kelas 6 SD",
    "idKelas": "KLS-SD-6",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_19",
    "username": "887871",
    "password": "123456",
    "name": "Farhan Pattinama",
    "role": "Siswa",
    "kelas": "Kelas 6 SD",
    "idKelas": "KLS-SD-6",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_20",
    "username": "156682",
    "password": "123456",
    "name": "Annisa Kadir",
    "role": "Siswa",
    "kelas": "Kelas 6 SD",
    "idKelas": "KLS-SD-6",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_21",
    "username": "741122",
    "password": "123456",
    "name": "Bayu Mansyur",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_22",
    "username": "992683",
    "password": "123456",
    "name": "Rahma Saputra",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_23",
    "username": "765385",
    "password": "123456",
    "name": "Yoga Ramadhani",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_24",
    "username": "893294",
    "password": "123456",
    "name": "Indah Setiawan",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_25",
    "username": "426291",
    "password": "123456",
    "name": "Hendra Anggraini",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_26",
    "username": "769702",
    "password": "123456",
    "name": "Lestari Maulana",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_27",
    "username": "995734",
    "password": "123456",
    "name": "Iqbal Sari",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_28",
    "username": "878351",
    "password": "123456",
    "name": "Nabila Mulyadi",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_29",
    "username": "145555",
    "password": "123456",
    "name": "Rafi Pattinama",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_30",
    "username": "126436",
    "password": "123456",
    "name": "Intan Kadir",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_31",
    "username": "747580",
    "password": "123456",
    "name": "Galih Mansyur",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_32",
    "username": "398703",
    "password": "123456",
    "name": "Aulia Nurhaliza",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_33",
    "username": "860225",
    "password": "123456",
    "name": "Bagas Hidayat",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_34",
    "username": "787677",
    "password": "123456",
    "name": "Mutiara Puspitasari",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_35",
    "username": "693139",
    "password": "123456",
    "name": "Fajar Kurniawan",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_36",
    "username": "285431",
    "password": "123456",
    "name": "Kartika Maulana",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_37",
    "username": "750715",
    "password": "123456",
    "name": "Akbar Sari",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_38",
    "username": "186460",
    "password": "123456",
    "name": "Syifa Mulyadi",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_39",
    "username": "353261",
    "password": "123456",
    "name": "Dani Syamsuddin",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_40",
    "username": "390077",
    "password": "123456",
    "name": "Wulan Basri",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_41",
    "username": "556309",
    "password": "123456",
    "name": "Rian Salim",
    "role": "Siswa",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_42",
    "username": "799440",
    "password": "123456",
    "name": "Safira Pratama",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_43",
    "username": "442460",
    "password": "123456",
    "name": "Alif Hidayat",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_44",
    "username": "917206",
    "password": "123456",
    "name": "Melati Puspitasari",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_45",
    "username": "353524",
    "password": "123456",
    "name": "Zaki Kurniawan",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_46",
    "username": "488849",
    "password": "123456",
    "name": "Citra Handayani",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_47",
    "username": "489567",
    "password": "123456",
    "name": "Naufal Wijaya",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_48",
    "username": "831177",
    "password": "123456",
    "name": "Tiara Kusuma",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_49",
    "username": "380829",
    "password": "123456",
    "name": "Rama Bakri",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_50",
    "username": "889417",
    "password": "123456",
    "name": "Amalia Basri",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_51",
    "username": "719992",
    "password": "123456",
    "name": "Irfan Salim",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_52",
    "username": "924002",
    "password": "123456",
    "name": "Khairunnisa Pratama",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_53",
    "username": "443152",
    "password": "123456",
    "name": "Daffa Azzahra",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_54",
    "username": "120401",
    "password": "123456",
    "name": "Nisa Fauzi",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_55",
    "username": "950404",
    "password": "123456",
    "name": "Syahrul Wulandari",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_56",
    "username": "887910",
    "password": "123456",
    "name": "Ananda Nugroho",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_57",
    "username": "894371",
    "password": "123456",
    "name": "Aditya Wijaya",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_58",
    "username": "440384",
    "password": "123456",
    "name": "Suci Kusuma",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_59",
    "username": "770993",
    "password": "123456",
    "name": "Haikal Bakri",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_60",
    "username": "747098",
    "password": "123456",
    "name": "Rina Latuconsina",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_61",
    "username": "864906",
    "password": "123456",
    "name": "Gilang Taher",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_62",
    "username": "562147",
    "password": "123456",
    "name": "Yulia Rahman",
    "role": "Siswa",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_63",
    "username": "510627",
    "password": "123456",
    "name": "Kevin Saputra",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_64",
    "username": "585264",
    "password": "123456",
    "name": "Maya Fauzi",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_65",
    "username": "226436",
    "password": "123456",
    "name": "Wahyu Wulandari",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_66",
    "username": "838749",
    "password": "123456",
    "name": "Novi Nugroho",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_67",
    "username": "566113",
    "password": "123456",
    "name": "Arman Permata",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_68",
    "username": "257898",
    "password": "123456",
    "name": "Sari Ramadhan",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_69",
    "username": "338236",
    "password": "123456",
    "name": "Taufik Hasan",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_70",
    "username": "534197",
    "password": "123456",
    "name": "Dina Pattinama",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_71",
    "username": "559860",
    "password": "123456",
    "name": "Ridwan Taher",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_72",
    "username": "308080",
    "password": "123456",
    "name": "Eva Rahman",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_73",
    "username": "723006",
    "password": "123456",
    "name": "Hafiz Saputra",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_74",
    "username": "559102",
    "password": "123456",
    "name": "Mira Ramadhani",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_75",
    "username": "151897",
    "password": "123456",
    "name": "Aldi Setiawan",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_76",
    "username": "739346",
    "password": "123456",
    "name": "Rika Anggraini",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_77",
    "username": "873601",
    "password": "123456",
    "name": "Yusuf Maulana",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_78",
    "username": "776246",
    "password": "123456",
    "name": "Tari Ramadhan",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_79",
    "username": "308710",
    "password": "123456",
    "name": "Fikri Hasan",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_80",
    "username": "418261",
    "password": "123456",
    "name": "Selvi Pattinama",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_81",
    "username": "612542",
    "password": "123456",
    "name": "Eko Kadir",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 3 (13:00 - 15:00)",
    "ruang": "Lab Komputer 1"
  },
  {
    "id": "DUM_SISWA_82",
    "username": "175769",
    "password": "123456",
    "name": "Lia Mansyur",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 1 (07:30 - 09:30)",
    "ruang": "Lab Komputer 2"
  },
  {
    "id": "DUM_SISWA_83",
    "username": "230642",
    "password": "123456",
    "name": "Bima Nurhaliza",
    "role": "Siswa",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "sesi": "Sesi 2 (10:00 - 12:00)",
    "ruang": "Lab Komputer 1"
  }
],
  questions: [
  {
    "id": "DUM_Q_01",
    "type": "PG",
    "subject": "Matematika",
    "text": "[Kelas 4 SD] Hasil dari 3.450 + 1.275 - 825 adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "3.800",
      "3.900",
      "4.000",
      "4.100"
    ],
    "pairs": [],
    "answer": "3.900",
    "weight": 10,
    "explanation": "3.450 + 1.275 = 4.725; 4.725 - 825 = 3.900."
  },
  {
    "id": "DUM_Q_02",
    "type": "PG",
    "subject": "Matematika",
    "text": "[Kelas 5 SD] Sebuah balok memiliki panjang 12 cm, lebar 8 cm, dan tinggi 5 cm. Volume balok tersebut adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "420 cm³",
      "460 cm³",
      "480 cm³",
      "520 cm³"
    ],
    "pairs": [],
    "answer": "480 cm³",
    "weight": 10,
    "explanation": "Volume balok = p × l × t = 12 × 8 × 5 = 480 cm³."
  },
  {
    "id": "DUM_Q_03",
    "type": "PG",
    "subject": "Matematika",
    "text": "[Kelas 5 SD] Bentuk pecahan paling sederhana dari 36/48 adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "2/3",
      "3/4",
      "4/5",
      "6/8"
    ],
    "pairs": [],
    "answer": "3/4",
    "weight": 10,
    "explanation": "Pembilang dan penyebut dibagi FPB-nya yaitu 12: 36÷12 = 3 dan 48÷12 = 4."
  },
  {
    "id": "DUM_Q_04",
    "type": "PG",
    "subject": "Matematika",
    "text": "[Kelas 6 SD] Sebuah lingkaran memiliki jari-jari 14 cm (π = 22/7). Luas lingkaran tersebut adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "154 cm²",
      "308 cm²",
      "616 cm²",
      "1.232 cm²"
    ],
    "pairs": [],
    "answer": "616 cm²",
    "weight": 10,
    "explanation": "Luas = π × r² = (22/7) × 14 × 14 = 22 × 2 × 14 = 616 cm²."
  },
  {
    "id": "DUM_Q_05",
    "type": "PG",
    "subject": "Matematika",
    "text": "[Kelas 7 SMP] Hasil dari -18 + 24 : (-4) × 3 adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "-36",
      "-18",
      "0",
      "18"
    ],
    "pairs": [],
    "answer": "-36",
    "weight": 10,
    "explanation": "Kerjakan pembagian dan perkalian dulu: 24 : (-4) = -6; -6 × 3 = -18; -18 + (-18) = -36."
  },
  {
    "id": "DUM_Q_06",
    "type": "PG",
    "subject": "Matematika",
    "text": "[Kelas 7 SMP] Jika 3x - 7 = 14, maka nilai dari 2x + 5 adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "12",
      "15",
      "19",
      "21"
    ],
    "pairs": [],
    "answer": "19",
    "weight": 10,
    "explanation": "3x = 21 → x = 7. Maka 2(7) + 5 = 14 + 5 = 19."
  },
  {
    "id": "DUM_Q_07",
    "type": "PG",
    "subject": "Matematika",
    "text": "[Kelas 8 SMP] Sebuah segitiga siku-siku memiliki panjang sisi siku-siku 9 cm dan 12 cm. Panjang sisi miring (hipotenusa) adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "13 cm",
      "15 cm",
      "17 cm",
      "21 cm"
    ],
    "pairs": [],
    "answer": "15 cm",
    "weight": 10,
    "explanation": "Teorema Pythagoras: √(9² + 12²) = √(81 + 144) = √225 = 15 cm."
  },
  {
    "id": "DUM_Q_08",
    "type": "PG",
    "subject": "Matematika",
    "text": "[Kelas 9 SMP] Akar-akar persamaan kuadrat x² - 5x + 6 = 0 adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "x = 1 atau x = 6",
      "x = 2 atau x = 3",
      "x = -2 atau x = -3",
      "x = -1 atau x = 6"
    ],
    "pairs": [],
    "answer": "x = 2 atau x = 3",
    "weight": 10,
    "explanation": "Faktorkan (x - 2)(x - 3) = 0, sehingga x = 2 atau x = 3."
  },
  {
    "id": "DUM_Q_09",
    "type": "PG",
    "subject": "Matematika",
    "text": "[Kelas 9 SMP] Hasil dari 2³ × 2⁴ : 2² adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "16",
      "32",
      "64",
      "128"
    ],
    "pairs": [],
    "answer": "32",
    "weight": 10,
    "explanation": "Sifat eksponen: 2^(3 + 4 - 2) = 2⁵ = 32."
  },
  {
    "id": "DUM_Q_10",
    "type": "PG",
    "subject": "Bahasa Indonesia",
    "text": "[Kelas 4 SD] Kalimat yang di dalamnya terdapat objek sehingga dapat diubah menjadi kalimat pasif disebut kalimat ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Transitif",
      "Intransitif",
      "Majemuk",
      "Perintah"
    ],
    "pairs": [],
    "answer": "Transitif",
    "weight": 10,
    "explanation": "Kalimat transitif memerlukan objek agar maknanya lengkap."
  },
  {
    "id": "DUM_Q_11",
    "type": "PG",
    "subject": "Bahasa Indonesia",
    "text": "[Kelas 5 SD] Ide utama yang menjadi dasar pengembangan sebuah paragraf disebut ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Kalimat penjelas",
      "Ide pokok",
      "Ringkasan",
      "Kesimpulan"
    ],
    "pairs": [],
    "answer": "Ide pokok",
    "weight": 10,
    "explanation": "Ide pokok atau gagasan utama merupakan inti pembahasan dalam paragraf."
  },
  {
    "id": "DUM_Q_12",
    "type": "PG",
    "subject": "Bahasa Indonesia",
    "text": "[Kelas 5 SD] Makna ungkapan 'banting tulang' dalam kalimat 'Ayah bekerja banting tulang demi keluarga' adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Bekerja keras",
      "Berolahraga",
      "Bermalas-malasan",
      "Berdiskusi"
    ],
    "pairs": [],
    "answer": "Bekerja keras",
    "weight": 10,
    "explanation": "Ungkapan banting tulang bermakna bekerja sangat keras."
  },
  {
    "id": "DUM_Q_13",
    "type": "PG",
    "subject": "Bahasa Indonesia",
    "text": "[Kelas 6 SD] Bagian pidato yang berisi ucapan puji syukur kepada Tuhan dan sapaan kepada hadirin adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Penutup pidato",
      "Isi pidato",
      "Pembuka pidato",
      "Kesimpulan pidato"
    ],
    "pairs": [],
    "answer": "Pembuka pidato",
    "weight": 10,
    "explanation": "Pembuka pidato diawali salam, sapaan hormat, dan puji syukur."
  },
  {
    "id": "DUM_Q_14",
    "type": "PG",
    "subject": "Bahasa Indonesia",
    "text": "[Kelas 7 SMP] Teks yang menggambarkan suatu objek, tempat, atau peristiwa secara rinci sehingga pembaca seolah-olah melihat dan merasakannya sendiri disebut teks ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Narasi",
      "Deskripsi",
      "Prosedur",
      "Eksposisi"
    ],
    "pairs": [],
    "answer": "Deskripsi",
    "weight": 10,
    "explanation": "Teks deskripsi melukiskan objek secara detail dan melibatkan pancaindra."
  },
  {
    "id": "DUM_Q_15",
    "type": "PG",
    "subject": "Bahasa Indonesia",
    "text": "[Kelas 7 SMP] Kata baku yang tepat sesuai KBBI di bawah ini adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Apotik",
      "Aktifitas",
      "Praktik",
      "Nafas"
    ],
    "pairs": [],
    "answer": "Praktik",
    "weight": 10,
    "explanation": "Bentuk baku menurut KBBI adalah praktik (bukan praktek), apotek, aktivitas, dan napas."
  },
  {
    "id": "DUM_Q_16",
    "type": "PG",
    "subject": "Bahasa Indonesia",
    "text": "[Kelas 8 SMP] Struktur teks berita yang memuat inti pokok peristiwa (5W + 1H) pada paragraf pertama disebut ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Kepala berita (lead)",
      "Tubuh berita",
      "Ekor berita",
      "Judul berita"
    ],
    "pairs": [],
    "answer": "Kepala berita (lead)",
    "weight": 10,
    "explanation": "Kepala berita memuat unsur pokok peristiwa secara ringkas di awal berita."
  },
  {
    "id": "DUM_Q_17",
    "type": "PG",
    "subject": "Bahasa Indonesia",
    "text": "[Kelas 9 SMP] Tujuan utama teks tanggapan kritis adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Menceritakan pengalaman masa lalu",
      "Memberikan penilaian objektif disertai alasan logis",
      "Menjelaskan langkah membuat sesuatu",
      "Menghibur pembaca dengan kisah fiksi"
    ],
    "pairs": [],
    "answer": "Memberikan penilaian objektif disertai alasan logis",
    "weight": 10,
    "explanation": "Teks tanggapan berisi kritik atau pujian yang objektif dan argumentatif."
  },
  {
    "id": "DUM_Q_18",
    "type": "PG",
    "subject": "Bahasa Indonesia",
    "text": "[Kelas 9 SMP] Majas yang membandingkan benda mati seolah-olah memiliki sifat seperti manusia disebut majas ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Hiperbola",
      "Metafora",
      "Personifikasi",
      "Simile"
    ],
    "pairs": [],
    "answer": "Personifikasi",
    "weight": 10,
    "explanation": "Personifikasi menginsankan benda mati, misalnya 'angin berbisik lembut'."
  },
  {
    "id": "DUM_Q_19",
    "type": "PG",
    "subject": "Bahasa Inggris",
    "text": "[Kelas 4 SD] What is the English word for 'perpustakaan'?",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Laboratory",
      "Library",
      "Canteen",
      "Classroom"
    ],
    "pairs": [],
    "answer": "Library",
    "weight": 10,
    "explanation": "Library means perpustakaan in Indonesian."
  },
  {
    "id": "DUM_Q_20",
    "type": "PG",
    "subject": "Bahasa Inggris",
    "text": "[Kelas 5 SD] Rina: 'What time is it?' Budi: 'It is 07:30.' In English, 07:30 is ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Half past seven",
      "Half past eight",
      "A quarter to seven",
      "Seven o'clock"
    ],
    "pairs": [],
    "answer": "Half past seven",
    "weight": 10,
    "explanation": "07:30 means 30 minutes past 7 (half past seven)."
  },
  {
    "id": "DUM_Q_21",
    "type": "PG",
    "subject": "Bahasa Inggris",
    "text": "[Kelas 5 SD] My mother ... delicious fried rice every morning.",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "cook",
      "cooks",
      "cooking",
      "cooked"
    ],
    "pairs": [],
    "answer": "cooks",
    "weight": 10,
    "explanation": "Simple Present Tense with singular subject 'My mother' uses verb + s (cooks)."
  },
  {
    "id": "DUM_Q_22",
    "type": "PG",
    "subject": "Bahasa Inggris",
    "text": "[Kelas 6 SD] Yesterday, we ... to the museum with our teacher.",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "go",
      "goes",
      "went",
      "going"
    ],
    "pairs": [],
    "answer": "went",
    "weight": 10,
    "explanation": "'Yesterday' indicates Simple Past Tense; the past form of 'go' is 'went'."
  },
  {
    "id": "DUM_Q_23",
    "type": "PG",
    "subject": "Bahasa Inggris",
    "text": "[Kelas 7 SMP] Choose the correct pronoun: 'Dina has a new bicycle. ... bicycle is blue.'",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "She",
      "Her",
      "Hers",
      "Him"
    ],
    "pairs": [],
    "answer": "Her",
    "weight": 10,
    "explanation": "Possessive adjective before a noun ('bicycle') for female singular is 'Her'."
  },
  {
    "id": "DUM_Q_24",
    "type": "PG",
    "subject": "Bahasa Inggris",
    "text": "[Kelas 7 SMP] Read the notice: 'KEEP SILENT, EXAM IN PROGRESS.' Where do you usually find this notice?",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "In the school canteen",
      "In the examination room",
      "On the football field",
      "At the bus station"
    ],
    "pairs": [],
    "answer": "In the examination room",
    "weight": 10,
    "explanation": "The notice reminds students to be quiet during an exam."
  },
  {
    "id": "DUM_Q_25",
    "type": "PG",
    "subject": "Bahasa Inggris",
    "text": "[Kelas 8 SMP] A cheetah is ... than a horse.",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "fast",
      "faster",
      "fastest",
      "more fast"
    ],
    "pairs": [],
    "answer": "faster",
    "weight": 10,
    "explanation": "Comparative degree for one-syllable adjective 'fast' is 'faster'."
  },
  {
    "id": "DUM_Q_26",
    "type": "PG",
    "subject": "Bahasa Inggris",
    "text": "[Kelas 9 SMP] The passive voice of 'The students clean the classroom every day' is ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "The classroom is cleaned by the students every day",
      "The classroom was cleaned by the students every day",
      "The classroom cleans the students every day",
      "The classroom is cleaning every day"
    ],
    "pairs": [],
    "answer": "The classroom is cleaned by the students every day",
    "weight": 10,
    "explanation": "Simple Present Passive formula: Object + is/am/are + V3 + by Subject."
  },
  {
    "id": "DUM_Q_27",
    "type": "PG",
    "subject": "Bahasa Inggris",
    "text": "[Kelas 9 SMP] What is the social function of a Narrative Text?",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "To describe a specific place",
      "To entertain the readers with a story",
      "To explain how to operate a machine",
      "To report factual scientific data"
    ],
    "pairs": [],
    "answer": "To entertain the readers with a story",
    "weight": 10,
    "explanation": "Narrative text aims to amuse or entertain readers with imaginative or moral stories."
  },
  {
    "id": "DUM_Q_28",
    "type": "PG",
    "subject": "Pendidikan Pancasila",
    "text": "[Kelas 4 SD] Lambang sila keempat Pancasila yang berbunyi 'Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan' adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Bintang",
      "Rantai emas",
      "Pohon beringin",
      "Kepala banteng"
    ],
    "pairs": [],
    "answer": "Kepala banteng",
    "weight": 10,
    "explanation": "Kepala banteng merupakan simbol sila keempat Pancasila."
  },
  {
    "id": "DUM_Q_29",
    "type": "PG",
    "subject": "Pendidikan Pancasila",
    "text": "[Kelas 5 SD] Semboyan bangsa Indonesia yang tertulis pada pita burung Garuda Pancasila adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Tut Wuri Handayani",
      "Bhinneka Tunggal Ika",
      "Ing Ngarsa Sung Tuladha",
      "Merdeka atau Mati"
    ],
    "pairs": [],
    "answer": "Bhinneka Tunggal Ika",
    "weight": 10,
    "explanation": "Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu jua."
  },
  {
    "id": "DUM_Q_30",
    "type": "PG",
    "subject": "Pendidikan Pancasila",
    "text": "[Kelas 5 SD] Contoh penerapan nilai sila ketiga Pancasila di lingkungan sekolah adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Mengikuti upacara bendera dengan tertib",
      "Menyontek saat ulangan",
      "Memilih-milih teman berdasarkan suku",
      "Datang terlambat ke sekolah"
    ],
    "pairs": [],
    "answer": "Mengikuti upacara bendera dengan tertib",
    "weight": 10,
    "explanation": "Upacara bendera menumbuhkan rasa cinta tanah air dan persatuan."
  },
  {
    "id": "DUM_Q_31",
    "type": "PG",
    "subject": "Pendidikan Pancasila",
    "text": "[Kelas 6 SD] Keputusan bersama dalam musyawarah sebaiknya diambil melalui ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Pemaksaan kehendak ketua",
      "Mufakat seluruh peserta",
      "Undian berhadiah",
      "Keputusan sepihak"
    ],
    "pairs": [],
    "answer": "Mufakat seluruh peserta",
    "weight": 10,
    "explanation": "Musyawarah mengutamakan kesepakatan bersama (mufakat)."
  },
  {
    "id": "DUM_Q_32",
    "type": "PG",
    "subject": "Pendidikan Pancasila",
    "text": "[Kelas 7 SMP] Sidang pertama BPUPKI yang membahas dasar negara Indonesia dilaksanakan pada tanggal ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "29 Mei – 1 Juni 1945",
      "10 – 17 Juli 1945",
      "17 Agustus 1945",
      "18 Agustus 1945"
    ],
    "pairs": [],
    "answer": "29 Mei – 1 Juni 1945",
    "weight": 10,
    "explanation": "Sidang pertama BPUPKI berlangsung 29 Mei hingga 1 Juni 1945."
  },
  {
    "id": "DUM_Q_33",
    "type": "PG",
    "subject": "Pendidikan Pancasila",
    "text": "[Kelas 7 SMP] Norma yang bersumber dari hati nurani manusia tentang baik dan buruk disebut norma ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Agama",
      "Kesusilaan",
      "Kesopanan",
      "Hukum"
    ],
    "pairs": [],
    "answer": "Kesusilaan",
    "weight": 10,
    "explanation": "Norma kesusilaan berasal dari suara hati nurani manusia."
  },
  {
    "id": "DUM_Q_34",
    "type": "PG",
    "subject": "Pendidikan Pancasila",
    "text": "[Kelas 8 SMP] Kedudukan Pancasila sebagai dasar negara tercantum secara resmi dalam Pembukaan UUD NRI Tahun 1945 alinea ke-...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Pertama",
      "Kedua",
      "Ketiga",
      "Keempat"
    ],
    "pairs": [],
    "answer": "Keempat",
    "weight": 10,
    "explanation": "Rumusan dasar negara Pancasila terdapat pada alinea keempat Pembukaan UUD 1945."
  },
  {
    "id": "DUM_Q_35",
    "type": "PG",
    "subject": "Pendidikan Pancasila",
    "text": "[Kelas 9 SMP] Perwujudan nilai-nilai Pancasila dalam bidang ekonomi sesuai Pasal 33 UUD NRI Tahun 1945 disusun sebagai usaha bersama berdasar atas asas ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Individualisme",
      "Kekeluargaan",
      "Monopoli bebas",
      "Liberalisme"
    ],
    "pairs": [],
    "answer": "Kekeluargaan",
    "weight": 10,
    "explanation": "Pasal 33 ayat (1) UUD 1945 menegaskan perekonomian disusun atas asas kekeluargaan."
  },
  {
    "id": "DUM_Q_36",
    "type": "PG",
    "subject": "Pendidikan Pancasila",
    "text": "[Kelas 9 SMP] Prinsip kedaulatan rakyat di Indonesia menegaskan bahwa kekuasaan tertinggi berada di tangan ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Presiden",
      "Rakyat",
      "Menteri",
      "Mahkamah Agung"
    ],
    "pairs": [],
    "answer": "Rakyat",
    "weight": 10,
    "explanation": "Pasal 1 ayat (2) UUD 1945: Kedaulatan berada di tangan rakyat dan dilaksanakan menurut UUD."
  },
  {
    "id": "DUM_Q_37",
    "type": "PG",
    "subject": "PJOK",
    "text": "[Kelas 4 SD] Gerak dasar berpindah tempat seperti berjalan, berlari, dan melompat disebut gerak ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Lokomotor",
      "Nonlokomotor",
      "Manipulatif",
      "Keseimbangan"
    ],
    "pairs": [],
    "answer": "Lokomotor",
    "weight": 10,
    "explanation": "Gerak lokomotor adalah gerakan yang ditandai dengan perpindahan tempat."
  },
  {
    "id": "DUM_Q_38",
    "type": "PG",
    "subject": "PJOK",
    "text": "[Kelas 5 SD] Jumlah pemain setiap regu dalam pertandingan sepak bola resmi adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "6 orang",
      "9 orang",
      "11 orang",
      "12 orang"
    ],
    "pairs": [],
    "answer": "11 orang",
    "weight": 10,
    "explanation": "Setiap tim sepak bola terdiri atas 11 pemain termasuk penjaga gawang."
  },
  {
    "id": "DUM_Q_39",
    "type": "PG",
    "subject": "PJOK",
    "text": "[Kelas 5 SD] Pukulan pertama untuk memulai permainan dalam cabang olahraga bola voli disebut ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Smash",
      "Passing",
      "Servis",
      "Blocking"
    ],
    "pairs": [],
    "answer": "Servis",
    "weight": 10,
    "explanation": "Servis merupakan pukulan pembuka permainan bola voli."
  },
  {
    "id": "DUM_Q_40",
    "type": "PG",
    "subject": "PJOK",
    "text": "[Kelas 6 SD] Latihan lari bolak-balik (shuttle run) bertujuan untuk melatih komponen kebugaran jasmani berupa ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Kelincahan",
      "Kelenturan",
      "Keseimbangan",
      "Daya tahan paru"
    ],
    "pairs": [],
    "answer": "Kelincahan",
    "weight": 10,
    "explanation": "Shuttle run melatih kemampuan mengubah arah gerak secara cepat (kelincahan)."
  },
  {
    "id": "DUM_Q_41",
    "type": "PG",
    "subject": "PJOK",
    "text": "[Kelas 7 SMP] Dalam permainan bola basket, teknik mengoper bola dengan cara memantulkannya ke lantai terlebih dahulu disebut ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Chest pass",
      "Bounce pass",
      "Overhead pass",
      "Lay up"
    ],
    "pairs": [],
    "answer": "Bounce pass",
    "weight": 10,
    "explanation": "Bounce pass adalah operan pantul ke lantai menuju rekan satu tim."
  },
  {
    "id": "DUM_Q_42",
    "type": "PG",
    "subject": "PJOK",
    "text": "[Kelas 7 SMP] Start yang digunakan pada perlombaan lari jarak pendek (sprint) 100 meter adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Start berdiri",
      "Start melayang",
      "Start jongkok",
      "Start duduk"
    ],
    "pairs": [],
    "answer": "Start jongkok",
    "weight": 10,
    "explanation": "Lari jarak pendek (100 m, 200 m, 400 m) wajib menggunakan start jongkok."
  },
  {
    "id": "DUM_Q_43",
    "type": "PG",
    "subject": "PJOK",
    "text": "[Kelas 8 SMP] Teknik dasar pencak silat yang berfungsi untuk menahan atau membelokkan serangan lawan tanpa menyakiti lawan disebut ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Pukulan",
      "Tendangan",
      "Tangkisan",
      "Kuda-kuda"
    ],
    "pairs": [],
    "answer": "Tangkisan",
    "weight": 10,
    "explanation": "Tangkisan merupakan usaha pembelaan dengan mengadakan kontak langsung terhadap serangan lawan."
  },
  {
    "id": "DUM_Q_44",
    "type": "PG",
    "subject": "PJOK",
    "text": "[Kelas 9 SMP] Aktivitas fisik secara teratur minimal 30 menit setiap hari memberikan manfaat utama bagi sistem peredaran darah, yaitu ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Meningkatkan tekanan darah tinggi",
      "Memperkuat otot jantung dan melancarkan sirkulasi darah",
      "Mengurangi kapasitas paru-paru",
      "Memperlambat metabolisme tubuh"
    ],
    "pairs": [],
    "answer": "Memperkuat otot jantung dan melancarkan sirkulasi darah",
    "weight": 10,
    "explanation": "Olahraga aerobik teratur menjaga kebugaran jantung dan pembuluh darah."
  },
  {
    "id": "DUM_Q_45",
    "type": "PG",
    "subject": "PJOK",
    "text": "[Kelas 9 SMP] Dalam permainan bulu tangkis, pukulan keras dan menukik tajam ke arah lapangan lawan untuk mematikan lawan disebut ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Lob",
      "Dropshot",
      "Smash",
      "Netting"
    ],
    "pairs": [],
    "answer": "Smash",
    "weight": 10,
    "explanation": "Smash adalah pukulan menyerang dengan tenaga penuh dan arah menukik tajam."
  },
  {
    "id": "DUM_Q_46",
    "type": "PG",
    "subject": "IPAS",
    "text": "[Kelas 4 SD] Bagian tumbuhan yang berfungsi menyerap air dan zat hara dari dalam tanah adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Daun",
      "Batang",
      "Akar",
      "Bunga"
    ],
    "pairs": [],
    "answer": "Akar",
    "weight": 10,
    "explanation": "Akar menancap di tanah untuk menyerap air dan mineral serta menopang tumbuhan."
  },
  {
    "id": "DUM_Q_47",
    "type": "PG",
    "subject": "IPAS",
    "text": "[Kelas 4 SD] Perubahan wujud benda dari cair menjadi gas akibat pemanasan disebut ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Membeku",
      "Mencair",
      "Menguap",
      "Mengembun"
    ],
    "pairs": [],
    "answer": "Menguap",
    "weight": 10,
    "explanation": "Menguap adalah perubahan wujud cair menjadi gas, misalnya air mendidih."
  },
  {
    "id": "DUM_Q_48",
    "type": "PG",
    "subject": "IPAS",
    "text": "[Kelas 5 SD] Urutan rantai makanan yang tepat pada ekosistem sawah adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Padi → Tikus → Ular → Elang",
      "Tikus → Padi → Elang → Ular",
      "Elang → Ular → Tikus → Padi",
      "Padi → Elang → Tikus → Ular"
    ],
    "pairs": [],
    "answer": "Padi → Tikus → Ular → Elang",
    "weight": 10,
    "explanation": "Padi sebagai produsen dimakan tikus (konsumen I), dimakan ular (konsumen II), lalu elang (konsumen III)."
  },
  {
    "id": "DUM_Q_49",
    "type": "PG",
    "subject": "IPAS",
    "text": "[Kelas 5 SD] Kenampakan alam berupa daratan yang menjorok ke laut disebut ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Teluk",
      "Tanjung",
      "Selat",
      "Palung"
    ],
    "pairs": [],
    "answer": "Tanjung",
    "weight": 10,
    "explanation": "Tanjung adalah daratan yang menjorok ke laut, sedangkan laut yang menjorok ke darat adalah teluk."
  },
  {
    "id": "DUM_Q_50",
    "type": "PG",
    "subject": "IPAS",
    "text": "[Kelas 6 SD] Planet terbesar dalam tata surya kita adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Mars",
      "Saturnus",
      "Jupiter",
      "Uranus"
    ],
    "pairs": [],
    "answer": "Jupiter",
    "weight": 10,
    "explanation": "Jupiter merupakan planet dengan ukuran dan massa terbesar di tata surya."
  },
  {
    "id": "DUM_Q_51",
    "type": "PG",
    "subject": "IPAS",
    "text": "[Kelas 6 SD] Kerja sama negara-negara di kawasan Asia Tenggara dalam bidang ekonomi, sosial, dan budaya tergabung dalam organisasi ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "PBB",
      "ASEAN",
      "OPEC",
      "APEC"
    ],
    "pairs": [],
    "answer": "ASEAN",
    "weight": 10,
    "explanation": "ASEAN (Association of Southeast Asian Nations) adalah perhimpunan bangsa-bangsa Asia Tenggara."
  },
  {
    "id": "DUM_Q_52",
    "type": "PG",
    "subject": "IPAS",
    "text": "[Kelas 6 SD] Sumber energi alternatif yang memanfaatkan panas dari dalam perut bumi disebut energi ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Surya",
      "Angin",
      "Panas bumi (geotermal)",
      "Biomassa"
    ],
    "pairs": [],
    "answer": "Panas bumi (geotermal)",
    "weight": 10,
    "explanation": "Energi geotermal berasal dari panas alami di bawah permukaan bumi."
  },
  {
    "id": "DUM_Q_53",
    "type": "PG",
    "subject": "IPAS",
    "text": "[Kelas 5 SD] Gaya yang menyebabkan buah kelapa jatuh ke bawah menuju permukaan bumi adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Gaya magnet",
      "Gaya gravitasi",
      "Gaya gesek",
      "Gaya pegas"
    ],
    "pairs": [],
    "answer": "Gaya gravitasi",
    "weight": 10,
    "explanation": "Gaya gravitasi bumi menarik benda menuju pusat bumi."
  },
  {
    "id": "DUM_Q_54",
    "type": "PG",
    "subject": "IPAS",
    "text": "[Kelas 6 SD] Peristiwa berputarnya Bumi pada porosnya yang menyebabkan terjadinya siang dan malam disebut ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Revolusi Bumi",
      "Rotasi Bumi",
      "Gerhana Bulan",
      "Pasang surut"
    ],
    "pairs": [],
    "answer": "Rotasi Bumi",
    "weight": 10,
    "explanation": "Rotasi Bumi membutuhkan waktu sekitar 24 jam dan mengakibatkan pergantian siang serta malam."
  },
  {
    "id": "DUM_Q_55",
    "type": "PG",
    "subject": "IPA",
    "text": "[Kelas 4 SD] Hewan yang mengalami metamorfosis sempurna berikut ini adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Belalang",
      "Kupu-kupu",
      "Kecoak",
      "Jangkrik"
    ],
    "pairs": [],
    "answer": "Kupu-kupu",
    "weight": 10,
    "explanation": "Kupu-kupu mengalami tahap telur → larva (ulat) → pupa (kepompong) → imago."
  },
  {
    "id": "DUM_Q_56",
    "type": "PG",
    "subject": "IPA",
    "text": "[Kelas 5 SD] Organ pernapasan utama pada manusia tempat terjadinya pertukaran oksigen dan karbon dioksida adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Trakea",
      "Bronkus",
      "Alveolus di paru-paru",
      "Rongga hidung"
    ],
    "pairs": [],
    "answer": "Alveolus di paru-paru",
    "weight": 10,
    "explanation": "Alveolus merupakan gelembung halus di paru-paru tempat pertukaran O₂ dan CO₂."
  },
  {
    "id": "DUM_Q_57",
    "type": "PG",
    "subject": "IPA",
    "text": "[Kelas 6 SD] Rangkaian listrik yang disusun berderet tanpa cabang sehingga jika satu lampu padam maka lampu lainnya ikut padam adalah rangkaian ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Paralel",
      "Seri",
      "Campuran",
      "Terbuka"
    ],
    "pairs": [],
    "answer": "Seri",
    "weight": 10,
    "explanation": "Pada rangkaian seri hanya terdapat satu jalur aliran arus listrik."
  },
  {
    "id": "DUM_Q_58",
    "type": "PG",
    "subject": "IPA",
    "text": "[Kelas 7 SMP] Besaran pokok menurut Sistem Internasional (SI) beserta satuannya yang benar adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Kecepatan (m/s)",
      "Massa (kilogram)",
      "Luas (m²)",
      "Gaya (Newton)"
    ],
    "pairs": [],
    "answer": "Massa (kilogram)",
    "weight": 10,
    "explanation": "Massa adalah besaran pokok dengan satuan SI kilogram (kg)."
  },
  {
    "id": "DUM_Q_59",
    "type": "PG",
    "subject": "IPA",
    "text": "[Kelas 7 SMP] Larutan yang dapat mengubah kertas lakmus merah menjadi berwarna biru bersifat ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Asam",
      "Basa",
      "Netral",
      "Garam"
    ],
    "pairs": [],
    "answer": "Basa",
    "weight": 10,
    "explanation": "Larutan basa mengubah lakmus merah menjadi biru."
  },
  {
    "id": "DUM_Q_60",
    "type": "PG",
    "subject": "IPA",
    "text": "[Kelas 8 SMP] Enzim amilase yang terdapat dalam air liur berfungsi untuk mengubah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Protein menjadi pepton",
      "Amilum (zat tepung) menjadi gula sederhana",
      "Lemak menjadi asam lemak",
      "Susu menjadi kasein"
    ],
    "pairs": [],
    "answer": "Amilum (zat tepung) menjadi gula sederhana",
    "weight": 10,
    "explanation": "Enzim amilase/ptialin mencerna karbohidrat (amilum) menjadi maltosa."
  },
  {
    "id": "DUM_Q_61",
    "type": "PG",
    "subject": "IPA",
    "text": "[Kelas 8 SMP] Sebuah benda bermassa 5 kg diberi gaya sebesar 20 N. Percepatan yang dialami benda tersebut adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "2 m/s²",
      "4 m/s²",
      "15 m/s²",
      "100 m/s²"
    ],
    "pairs": [],
    "answer": "4 m/s²",
    "weight": 10,
    "explanation": "Hukum II Newton: a = F / m = 20 N / 5 kg = 4 m/s²."
  },
  {
    "id": "DUM_Q_62",
    "type": "PG",
    "subject": "IPA",
    "text": "[Kelas 9 SMP] Persilangan antara tanaman berbunga merah dominan (MM) dengan tanaman berbunga putih resesif (mm) akan menghasilkan keturunan F1 dengan fenotipe ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "100% merah",
      "100% putih",
      "50% merah, 50% putih",
      "75% merah, 25% putih"
    ],
    "pairs": [],
    "answer": "100% merah",
    "weight": 10,
    "explanation": "Genotipe F1 adalah 100% Mm, karena M dominan maka seluruhnya berwarna merah."
  },
  {
    "id": "DUM_Q_63",
    "type": "PG",
    "subject": "IPA",
    "text": "[Kelas 9 SMP] Dua muatan listrik sejenis jika didekatkan akan saling ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Tarik-menarik",
      "Tolak-menolak",
      "Diam tidak bergerak",
      "Menghilangkan muatan"
    ],
    "pairs": [],
    "answer": "Tolak-menolak",
    "weight": 10,
    "explanation": "Muatan listrik sejenis (+ dengan + atau - dengan -) saling tolak-menolak."
  },
  {
    "id": "DUM_Q_64",
    "type": "PG",
    "subject": "IPS",
    "text": "[Kelas 4 SD] Kegiatan menyalurkan barang hasil produksi dari produsen kepada konsumen disebut ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Produksi",
      "Distribusi",
      "Konsumsi",
      "Investasi"
    ],
    "pairs": [],
    "answer": "Distribusi",
    "weight": 10,
    "explanation": "Distribusi adalah kegiatan penyaluran barang dan jasa."
  },
  {
    "id": "DUM_Q_65",
    "type": "PG",
    "subject": "IPS",
    "text": "[Kelas 5 SD] Kerajaan Hindu tertua di Indonesia yang terletak di Kalimantan Timur adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Majapahit",
      "Sriwijaya",
      "Kutai",
      "Tarumanegara"
    ],
    "pairs": [],
    "answer": "Kutai",
    "weight": 10,
    "explanation": "Kerajaan Kutai berdiri sekitar abad ke-4 M di tepi Sungai Mahakam, Kalimantan Timur."
  },
  {
    "id": "DUM_Q_66",
    "type": "PG",
    "subject": "IPS",
    "text": "[Kelas 6 SD] Garis khayal yang membelah Bumi menjadi belahan Bumi utara dan belahan Bumi selatan disebut garis ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Bujur",
      "Khatulistiwa (Ekuator)",
      "Balik Utara",
      "Meridian"
    ],
    "pairs": [],
    "answer": "Khatulistiwa (Ekuator)",
    "weight": 10,
    "explanation": "Garis khatulistiwa berada pada lintang 0°."
  },
  {
    "id": "DUM_Q_67",
    "type": "PG",
    "subject": "IPS",
    "text": "[Kelas 7 SMP] Syarat utama terjadinya interaksi sosial antara dua orang atau lebih adalah adanya ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Kontak sosial dan komunikasi",
      "Persaingan dan konflik",
      "Perbedaan bahasa",
      "Jarak geografis yang jauh"
    ],
    "pairs": [],
    "answer": "Kontak sosial dan komunikasi",
    "weight": 10,
    "explanation": "Interaksi sosial terjadi apabila terpenuhi kontak sosial dan komunikasi."
  },
  {
    "id": "DUM_Q_68",
    "type": "PG",
    "subject": "IPS",
    "text": "[Kelas 7 SMP] Perbandingan jarak pada peta dengan jarak sebenarnya di permukaan bumi disebut ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Legenda",
      "Inset",
      "Skala peta",
      "Orientasi"
    ],
    "pairs": [],
    "answer": "Skala peta",
    "weight": 10,
    "explanation": "Skala menunjukkan perbandingan jarak di peta terhadap jarak sesungguhnya."
  },
  {
    "id": "DUM_Q_69",
    "type": "PG",
    "subject": "IPS",
    "text": "[Kelas 8 SMP] Faktor pendorong bangsa-bangsa Eropa melakukan penjelajahan samudra ke Nusantara dikenal dengan semboyan ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "3G (Gold, Glory, Gospel)",
      "Bhinneka Tunggal Ika",
      "Trias Politica",
      "Devide et Impera"
    ],
    "pairs": [],
    "answer": "3G (Gold, Glory, Gospel)",
    "weight": 10,
    "explanation": "Gold (kekayaan), Glory (kejayaan), dan Gospel (penyebaran agama)."
  },
  {
    "id": "DUM_Q_70",
    "type": "PG",
    "subject": "IPS",
    "text": "[Kelas 8 SMP] Perpindahan penduduk dari desa ke kota untuk mencari pekerjaan disebut ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Transmigrasi",
      "Urbanisasi",
      "Imigrasi",
      "Emigrasi"
    ],
    "pairs": [],
    "answer": "Urbanisasi",
    "weight": 10,
    "explanation": "Urbanisasi adalah perpindahan penduduk dari wilayah pedesaan menuju perkotaan."
  },
  {
    "id": "DUM_Q_71",
    "type": "PG",
    "subject": "IPS",
    "text": "[Kelas 9 SMP] Perdagangan antarnegara yang dilakukan dengan cara menjual barang dari dalam negeri ke luar negeri disebut ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Impor",
      "Ekspor",
      "Barter",
      "Retribusi"
    ],
    "pairs": [],
    "answer": "Ekspor",
    "weight": 10,
    "explanation": "Ekspor merupakan kegiatan menjual produk ke luar negeri untuk memperoleh devisa."
  },
  {
    "id": "DUM_Q_72",
    "type": "PG",
    "subject": "IPS",
    "text": "[Kelas 9 SMP] Dampak positif globalisasi di bidang teknologi informasi bagi pelajar adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Meningkatnya ketergantungan gawai",
      "Kemudahan mengakses sumber belajar digital dari seluruh dunia",
      "Lunturnya budaya gotong royong",
      "Maraknya berita bohong"
    ],
    "pairs": [],
    "answer": "Kemudahan mengakses sumber belajar digital dari seluruh dunia",
    "weight": 10,
    "explanation": "Globalisasi memudahkan akses informasi dan literasi pendidikan secara luas."
  },
  {
    "id": "DUM_Q_73",
    "type": "PG",
    "subject": "Informatika",
    "text": "[Kelas 4 SD] Perangkat keras komputer yang berfungsi menampilkan hasil pengolahan data secara visual ke layar adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Keyboard",
      "Monitor",
      "Mouse",
      "Scanner"
    ],
    "pairs": [],
    "answer": "Monitor",
    "weight": 10,
    "explanation": "Monitor merupakan perangkat keluaran (output device) yang menampilkan gambar/teks."
  },
  {
    "id": "DUM_Q_74",
    "type": "PG",
    "subject": "Informatika",
    "text": "[Kelas 5 SD] Perangkat lunak pengolah kata yang sering digunakan untuk mengetik dokumen surat atau laporan adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Microsoft Excel",
      "Microsoft Word",
      "Microsoft PowerPoint",
      "Paint"
    ],
    "pairs": [],
    "answer": "Microsoft Word",
    "weight": 10,
    "explanation": "Microsoft Word adalah aplikasi pengolah kata (word processor)."
  },
  {
    "id": "DUM_Q_75",
    "type": "PG",
    "subject": "Informatika",
    "text": "[Kelas 5 SD] Tombol kombinasi pada keyboard untuk menyalin (copy) teks yang dipilih adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Ctrl + V",
      "Ctrl + X",
      "Ctrl + C",
      "Ctrl + Z"
    ],
    "pairs": [],
    "answer": "Ctrl + C",
    "weight": 10,
    "explanation": "Ctrl + C digunakan untuk menyalin (Copy), sedangkan Ctrl + V untuk menempel (Paste)."
  },
  {
    "id": "DUM_Q_76",
    "type": "PG",
    "subject": "Informatika",
    "text": "[Kelas 6 SD] Tindakan menjaga data pribadi seperti kata sandi (password) dan PIN agar tidak dibagikan kepada orang asing di internet termasuk bagian dari ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Keamanan digital",
      "Perundungan siber",
      "Pembajakan",
      "Spamming"
    ],
    "pairs": [],
    "answer": "Keamanan digital",
    "weight": 10,
    "explanation": "Melindungi kredensial pribadi merupakan prinsip dasar keamanan digital."
  },
  {
    "id": "DUM_Q_77",
    "type": "PG",
    "subject": "Informatika",
    "text": "[Kelas 7 SMP] Empat pilar utama dalam Berpikir Komputasional (Computational Thinking) meliputi dekomposisi, pengenalan pola, abstraksi, dan ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Algoritma",
      "Instalasi",
      "Kompilasi",
      "Enkripsi"
    ],
    "pairs": [],
    "answer": "Algoritma",
    "weight": 10,
    "explanation": "Empat fondasi berpikir komputasional: dekomposisi, pengenalan pola, abstraksi, dan algoritma."
  },
  {
    "id": "DUM_Q_78",
    "type": "PG",
    "subject": "Informatika",
    "text": "[Kelas 7 SMP] Perangkat jaringan yang berfungsi menghubungkan dua atau lebih jaringan berbeda serta menentukan jalur terbaik pengiriman paket data adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Switch",
      "Router",
      "Access Point",
      "Modem"
    ],
    "pairs": [],
    "answer": "Router",
    "weight": 10,
    "explanation": "Router melakukan routing paket data antarjaringan komputer."
  },
  {
    "id": "DUM_Q_79",
    "type": "PG",
    "subject": "Informatika",
    "text": "[Kelas 8 SMP] Bilangan biner 1010 jika dikonversikan ke dalam bilangan desimal bernilai ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "8",
      "10",
      "12",
      "14"
    ],
    "pairs": [],
    "answer": "10",
    "weight": 10,
    "explanation": "1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 8 + 0 + 2 + 0 = 10."
  },
  {
    "id": "DUM_Q_80",
    "type": "PG",
    "subject": "Informatika",
    "text": "[Kelas 9 SMP] Layanan penyimpanan data secara daring melalui internet sehingga file dapat diakses dari berbagai perangkat disebut ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Local Storage",
      "Cloud Storage",
      "Optical Disc",
      "Flash Drive"
    ],
    "pairs": [],
    "answer": "Cloud Storage",
    "weight": 10,
    "explanation": "Cloud storage menyimpan data pada server jarak jauh yang diakses melalui internet."
  },
  {
    "id": "DUM_Q_81",
    "type": "PG",
    "subject": "Informatika",
    "text": "[Kelas 9 SMP] Protokol keamanan pada situs web yang mengenkripsi pertukaran data antara browser pengguna dan server ditandai dengan awalan ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "HTTP://",
      "HTTPS://",
      "FTP://",
      "SMTP://"
    ],
    "pairs": [],
    "answer": "HTTPS://",
    "weight": 10,
    "explanation": "HTTPS (Hypertext Transfer Protocol Secure) menggunakan enkripsi SSL/TLS."
  },
  {
    "id": "DUM_Q_82",
    "type": "PG",
    "subject": "Koding dan Kecerdasan Artifisial (KKA)",
    "text": "[Kelas 4 SD] Urutan langkah-langkah logis dan sistematis untuk menyelesaikan suatu masalah disebut ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Algoritma",
      "Animasi",
      "Aplikasi",
      "Antivirus"
    ],
    "pairs": [],
    "answer": "Algoritma",
    "weight": 10,
    "explanation": "Algoritma adalah rangkaian instruksi terurut untuk mencapai tujuan."
  },
  {
    "id": "DUM_Q_83",
    "type": "PG",
    "subject": "Koding dan Kecerdasan Artifisial (KKA)",
    "text": "[Kelas 5 SD] Pada pemrograman visual berbasis blok seperti Scratch, blok 'forever' (selamanya) berfungsi untuk membuat perintah berjalan secara ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Berulang terus-menerus",
      "Hanya satu kali",
      "Berhenti total",
      "Mundur ke belakang"
    ],
    "pairs": [],
    "answer": "Berulang terus-menerus",
    "weight": 10,
    "explanation": "Blok forever merupakan struktur perulangan (loop) tanpa henti selama program berjalan."
  },
  {
    "id": "DUM_Q_84",
    "type": "PG",
    "subject": "Koding dan Kecerdasan Artifisial (KKA)",
    "text": "[Kelas 5 SD] Kesalahan dalam penulisan kode program yang menyebabkan program tidak berjalan sesuai harapan disebut ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Bug",
      "Fitur",
      "Browser",
      "Pixel"
    ],
    "pairs": [],
    "answer": "Bug",
    "weight": 10,
    "explanation": "Bug adalah galat/kesalahan dalam kode, dan proses memperbaikinya disebut debugging."
  },
  {
    "id": "DUM_Q_85",
    "type": "PG",
    "subject": "Koding dan Kecerdasan Artifisial (KKA)",
    "text": "[Kelas 6 SD] Contoh penerapan Kecerdasan Artifisial (AI) yang membantu pengguna menemukan rute tercepat di jalan raya adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Aplikasi peta navigasi pintar",
      "Kalkulator saku biasa",
      "Jam dinding analog",
      "Buku tulis cetak"
    ],
    "pairs": [],
    "answer": "Aplikasi peta navigasi pintar",
    "weight": 10,
    "explanation": "Peta navigasi menganalisis data lalu lintas real-time menggunakan AI untuk merekomendasikan rute."
  },
  {
    "id": "DUM_Q_86",
    "type": "PG",
    "subject": "Koding dan Kecerdasan Artifisial (KKA)",
    "text": "[Kelas 7 SMP] Dalam pemrograman, struktur percabangan yang menjalankan perintah tertentu hanya jika suatu kondisi terpenuhi adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "IF - ELSE",
      "PRINT",
      "INPUT",
      "VARIABLE"
    ],
    "pairs": [],
    "answer": "IF - ELSE",
    "weight": 10,
    "explanation": "Percabangan IF-ELSE mengevaluasi kondisi logika (benar/salah) sebelum mengeksekusi aksi."
  },
  {
    "id": "DUM_Q_87",
    "type": "PG",
    "subject": "Koding dan Kecerdasan Artifisial (KKA)",
    "text": "[Kelas 7 SMP] Wadah bernama di dalam memori program yang digunakan untuk menyimpan nilai data yang dapat berubah-ubah disebut ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Variabel",
      "Komentar",
      "Operator",
      "Konstanta"
    ],
    "pairs": [],
    "answer": "Variabel",
    "weight": 10,
    "explanation": "Variabel menyimpan nilai data seperti angka atau teks selama program berjalan."
  },
  {
    "id": "DUM_Q_88",
    "type": "PG",
    "subject": "Koding dan Kecerdasan Artifisial (KKA)",
    "text": "[Kelas 8 SMP] Cabang Kecerdasan Artifisial yang memungkinkan komputer belajar mengenali pola dari kumpulan data latih tanpa diprogram secara eksplisit untuk setiap aturan disebut ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Machine Learning",
      "Word Processing",
      "Disk Defragmenter",
      "Screen Mirroring"
    ],
    "pairs": [],
    "answer": "Machine Learning",
    "weight": 10,
    "explanation": "Machine Learning melatih model menggunakan data agar mampu memprediksi atau mengklasifikasi."
  },
  {
    "id": "DUM_Q_89",
    "type": "PG",
    "subject": "Koding dan Kecerdasan Artifisial (KKA)",
    "text": "[Kelas 9 SMP] Dalam etika pemanfaatan Kecerdasan Artifisial generatif, hal yang wajib dilakukan pelajar saat menggunakan bantuan AI untuk tugas sekolah adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "Menyalin seluruh jawaban tanpa memeriksa kebenarannya",
      "Memverifikasi fakta, menjaga kejujuran akademik, dan tidak melanggar hak cipta",
      "Mengunggah data pribadi rahasia ke chatbot publik",
      "Mengakui karya AI sepenuhnya tanpa pemahaman"
    ],
    "pairs": [],
    "answer": "Memverifikasi fakta, menjaga kejujuran akademik, dan tidak melanggar hak cipta",
    "weight": 10,
    "explanation": "Penggunaan AI harus bertanggung jawab, kritis, dan menjunjung integritas akademik."
  },
  {
    "id": "DUM_Q_90",
    "type": "PG",
    "subject": "Koding dan Kecerdasan Artifisial (KKA)",
    "text": "[Kelas 9 SMP] Perhatikan potongan kode Python: `nilai = 85; print('Lulus' if nilai >= 75 else 'Remedial')`. Output yang ditampilkan adalah ...",
    "mediaType": "none",
    "mediaUrl": "",
    "options": [
      "85",
      "75",
      "Lulus",
      "Remedial"
    ],
    "pairs": [],
    "answer": "Lulus",
    "weight": 10,
    "explanation": "Karena nilai (85) >= 75 bernilai True, program mencetak 'Lulus'."
  }
],
  sessionsList: [
    { id: 'S1', name: 'Sesi 1', start: '07:30', end: '09:30', kelasAkses: 'ALL' },
    { id: 'S2', name: 'Sesi 2', start: '10:00', end: '12:00', kelasAkses: 'ALL' },
    { id: 'S3', name: 'Sesi 3', start: '13:00', end: '15:00', kelasAkses: 'ALL' }
  ],
  roomsList: [
    { id: 'R1', name: 'Lab Komputer 1', capacity: 36, note: 'Gedung Utama Lt. 1', kelasAkses: 'ALL' },
    { id: 'R2', name: 'Lab Komputer 2', capacity: 36, note: 'Gedung Utama Lt. 2', kelasAkses: 'ALL' }
  ],
  sessions: {
  "Fajar": {
    "studentId": "Fajar",
    "name": "Fajar (Akun Dummy)",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "985617": {
    "studentId": "985617",
    "name": "Ahmad Pratama",
    "kelas": "Kelas 4 SD",
    "idKelas": "KLS-SD-4",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "109972": {
    "studentId": "109972",
    "name": "Siti Azzahra",
    "kelas": "Kelas 4 SD",
    "idKelas": "KLS-SD-4",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "430356": {
    "studentId": "430356",
    "name": "Muhammad Fauzi",
    "kelas": "Kelas 4 SD",
    "idKelas": "KLS-SD-4",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "574653": {
    "studentId": "574653",
    "name": "Nur Wulandari",
    "kelas": "Kelas 4 SD",
    "idKelas": "KLS-SD-4",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "687998": {
    "studentId": "687998",
    "name": "Andi Nugroho",
    "kelas": "Kelas 4 SD",
    "idKelas": "KLS-SD-4",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "356837": {
    "studentId": "356837",
    "name": "Putri Permata",
    "kelas": "Kelas 4 SD",
    "idKelas": "KLS-SD-4",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "138782": {
    "studentId": "138782",
    "name": "Rizky Ramadhan",
    "kelas": "Kelas 4 SD",
    "idKelas": "KLS-SD-4",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "646456": {
    "studentId": "646456",
    "name": "Aisyah Bakri",
    "kelas": "Kelas 5 SD",
    "idKelas": "KLS-SD-5",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "515983": {
    "studentId": "515983",
    "name": "Fadli Latuconsina",
    "kelas": "Kelas 5 SD",
    "idKelas": "KLS-SD-5",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "290379": {
    "studentId": "290379",
    "name": "Fitri Taher",
    "kelas": "Kelas 5 SD",
    "idKelas": "KLS-SD-5",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "801409": {
    "studentId": "801409",
    "name": "Ilham Rahman",
    "kelas": "Kelas 5 SD",
    "idKelas": "KLS-SD-5",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "603094": {
    "studentId": "603094",
    "name": "Dewi Saputra",
    "kelas": "Kelas 5 SD",
    "idKelas": "KLS-SD-5",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "901913": {
    "studentId": "901913",
    "name": "Arif Ramadhani",
    "kelas": "Kelas 5 SD",
    "idKelas": "KLS-SD-5",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "229439": {
    "studentId": "229439",
    "name": "Nadia Setiawan",
    "kelas": "Kelas 5 SD",
    "idKelas": "KLS-SD-5",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "411765": {
    "studentId": "411765",
    "name": "Reza Nugroho",
    "kelas": "Kelas 6 SD",
    "idKelas": "KLS-SD-6",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "754811": {
    "studentId": "754811",
    "name": "Salsabila Permata",
    "kelas": "Kelas 6 SD",
    "idKelas": "KLS-SD-6",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "574524": {
    "studentId": "574524",
    "name": "Dimas Ramadhan",
    "kelas": "Kelas 6 SD",
    "idKelas": "KLS-SD-6",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "983708": {
    "studentId": "983708",
    "name": "Zahra Hasan",
    "kelas": "Kelas 6 SD",
    "idKelas": "KLS-SD-6",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "887871": {
    "studentId": "887871",
    "name": "Farhan Pattinama",
    "kelas": "Kelas 6 SD",
    "idKelas": "KLS-SD-6",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "156682": {
    "studentId": "156682",
    "name": "Annisa Kadir",
    "kelas": "Kelas 6 SD",
    "idKelas": "KLS-SD-6",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "741122": {
    "studentId": "741122",
    "name": "Bayu Mansyur",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "992683": {
    "studentId": "992683",
    "name": "Rahma Saputra",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "765385": {
    "studentId": "765385",
    "name": "Yoga Ramadhani",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "893294": {
    "studentId": "893294",
    "name": "Indah Setiawan",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "426291": {
    "studentId": "426291",
    "name": "Hendra Anggraini",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "769702": {
    "studentId": "769702",
    "name": "Lestari Maulana",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "995734": {
    "studentId": "995734",
    "name": "Iqbal Sari",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "878351": {
    "studentId": "878351",
    "name": "Nabila Mulyadi",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "145555": {
    "studentId": "145555",
    "name": "Rafi Pattinama",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "126436": {
    "studentId": "126436",
    "name": "Intan Kadir",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "747580": {
    "studentId": "747580",
    "name": "Galih Mansyur",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "398703": {
    "studentId": "398703",
    "name": "Aulia Nurhaliza",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "860225": {
    "studentId": "860225",
    "name": "Bagas Hidayat",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "787677": {
    "studentId": "787677",
    "name": "Mutiara Puspitasari",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "693139": {
    "studentId": "693139",
    "name": "Fajar Kurniawan",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "285431": {
    "studentId": "285431",
    "name": "Kartika Maulana",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "750715": {
    "studentId": "750715",
    "name": "Akbar Sari",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "186460": {
    "studentId": "186460",
    "name": "Syifa Mulyadi",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "353261": {
    "studentId": "353261",
    "name": "Dani Syamsuddin",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "390077": {
    "studentId": "390077",
    "name": "Wulan Basri",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "556309": {
    "studentId": "556309",
    "name": "Rian Salim",
    "kelas": "Kelas 7 SMP",
    "idKelas": "KLS-SMP-7",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "799440": {
    "studentId": "799440",
    "name": "Safira Pratama",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "442460": {
    "studentId": "442460",
    "name": "Alif Hidayat",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "917206": {
    "studentId": "917206",
    "name": "Melati Puspitasari",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "353524": {
    "studentId": "353524",
    "name": "Zaki Kurniawan",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "488849": {
    "studentId": "488849",
    "name": "Citra Handayani",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "489567": {
    "studentId": "489567",
    "name": "Naufal Wijaya",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "831177": {
    "studentId": "831177",
    "name": "Tiara Kusuma",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "380829": {
    "studentId": "380829",
    "name": "Rama Bakri",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "889417": {
    "studentId": "889417",
    "name": "Amalia Basri",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "719992": {
    "studentId": "719992",
    "name": "Irfan Salim",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "924002": {
    "studentId": "924002",
    "name": "Khairunnisa Pratama",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "443152": {
    "studentId": "443152",
    "name": "Daffa Azzahra",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "120401": {
    "studentId": "120401",
    "name": "Nisa Fauzi",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "950404": {
    "studentId": "950404",
    "name": "Syahrul Wulandari",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "887910": {
    "studentId": "887910",
    "name": "Ananda Nugroho",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "894371": {
    "studentId": "894371",
    "name": "Aditya Wijaya",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "440384": {
    "studentId": "440384",
    "name": "Suci Kusuma",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "770993": {
    "studentId": "770993",
    "name": "Haikal Bakri",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "747098": {
    "studentId": "747098",
    "name": "Rina Latuconsina",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "864906": {
    "studentId": "864906",
    "name": "Gilang Taher",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "562147": {
    "studentId": "562147",
    "name": "Yulia Rahman",
    "kelas": "Kelas 8 SMP",
    "idKelas": "KLS-SMP-8",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "510627": {
    "studentId": "510627",
    "name": "Kevin Saputra",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "585264": {
    "studentId": "585264",
    "name": "Maya Fauzi",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "226436": {
    "studentId": "226436",
    "name": "Wahyu Wulandari",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "838749": {
    "studentId": "838749",
    "name": "Novi Nugroho",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "566113": {
    "studentId": "566113",
    "name": "Arman Permata",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "257898": {
    "studentId": "257898",
    "name": "Sari Ramadhan",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "338236": {
    "studentId": "338236",
    "name": "Taufik Hasan",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "534197": {
    "studentId": "534197",
    "name": "Dina Pattinama",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "559860": {
    "studentId": "559860",
    "name": "Ridwan Taher",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "308080": {
    "studentId": "308080",
    "name": "Eva Rahman",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "723006": {
    "studentId": "723006",
    "name": "Hafiz Saputra",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "559102": {
    "studentId": "559102",
    "name": "Mira Ramadhani",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "151897": {
    "studentId": "151897",
    "name": "Aldi Setiawan",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "739346": {
    "studentId": "739346",
    "name": "Rika Anggraini",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "873601": {
    "studentId": "873601",
    "name": "Yusuf Maulana",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "776246": {
    "studentId": "776246",
    "name": "Tari Ramadhan",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "308710": {
    "studentId": "308710",
    "name": "Fikri Hasan",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "418261": {
    "studentId": "418261",
    "name": "Selvi Pattinama",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "612542": {
    "studentId": "612542",
    "name": "Eko Kadir",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "175769": {
    "studentId": "175769",
    "name": "Lia Mansyur",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 2",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  },
  "230642": {
    "studentId": "230642",
    "name": "Bima Nurhaliza",
    "kelas": "Kelas 9 SMP",
    "idKelas": "KLS-SMP-9",
    "ruang": "Lab Komputer 1",
    "status": "Siap Ujian",
    "progress": 0,
    "violations": 0,
    "violationLogs": [],
    "extraMinutes": 0,
    "broadcastMsg": "",
    "answers": {},
    "essayScores": {},
    "autoScore": 0,
    "essayScore": 0,
    "finalScore": 0,
    "submittedAt": null,
    "subjectResults": {}
  }
}
};

if (!Array.isArray(DB_CACHE.classesList)) {
  DB_CACHE.classesList = loadSavedClassesMeta();
}

// Pastikan akun Administrator bawaan (admin / 123 & Fajar / 123) selalu tersedia
if (DB_CACHE && Array.isArray(DB_CACHE.users)) {
  if (!DB_CACHE.users.some(u => u.username === 'admin')) {
    DB_CACHE.users.unshift({
      id: 'USR_ADMIN_1',
      username: 'admin',
      password: '123',
      name: 'Administrator Utama',
      role: 'Admin',
      kelas: 'Panitia Ujian',
      idKelas: '-',
      sesi: '-',
      ruang: '-'
    });
  }
}

function sbHeaders(extra = {}) {
  return {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    ...extra
  };
}

// Sinkronisasi seluruh data dari Supabase PostgreSQL ke memori browser
async function syncFromMySQL(callback) {
  if (!IS_CONFIGURED) {
    console.warn('Supabase belum dikonfigurasi di shared-cbt.js. Berjalan dalam mode lokal sementara.');
    if (typeof callback === 'function') callback(DB_CACHE);
    return;
  }

  if (_cloudSaveTimer !== null) return;

  try {
    const [resSet, resUsr, resQue, resSes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/cbt_settings?id=eq.1&select=*`, { headers: sbHeaders() }),
      fetch(`${SUPABASE_URL}/rest/v1/cbt_users?select=*&order=created_at.asc`, { headers: sbHeaders() }),
      fetch(`${SUPABASE_URL}/rest/v1/cbt_questions?select=*&order=created_at.asc`, { headers: sbHeaders() }),
      fetch(`${SUPABASE_URL}/rest/v1/cbt_sessions?select=*`, { headers: sbHeaders() })
    ]);

    if (!resSet.ok || !resUsr.ok || !resQue.ok || !resSes.ok) return;

    const [setRows, usrRows, queRows, sesRows] = await Promise.all([
      resSet.json(), resUsr.json(), resQue.json(), resSes.json()
    ]);

    // Ambil cbt_classes jika tabel tersedia
    let classesList = loadSavedClassesMeta();
    try {
      const resCls = await fetch(`${SUPABASE_URL}/rest/v1/cbt_classes?select=*&order=created_at.asc`, { headers: sbHeaders() });
      if (resCls.ok) {
        const clsRows = await resCls.json();
        if (Array.isArray(clsRows)) {
          classesList = clsRows.map(c => ({
            idKelas: c.id_kelas,
            namaKelas: c.nama_kelas,
            waliKelasUsername: c.wali_kelas_username || '-',
            waliKelasName: c.wali_kelas_name || '-',
            keterangan: c.keterangan || '-'
          }));
          localStorage.setItem(CLASSES_META_KEY, JSON.stringify(classesList));
        }
      }
    } catch (e) {}

    // Ambil cbt_exam_spaces (Sesi & Ruang Ujian)
    const savedMeta = JSON.parse(localStorage.getItem('CBT_SESI_RUANG_META_V1') || 'null');
    let sessionsList = (savedMeta && Array.isArray(savedMeta.sessionsList))
      ? savedMeta.sessionsList.map(s => ({ ...s, kelasAkses: s.kelasAkses || 'ALL' }))
      : DB_CACHE.sessionsList;
    let roomsList = (savedMeta && Array.isArray(savedMeta.roomsList))
      ? savedMeta.roomsList.map(r => ({ ...r, kelasAkses: r.kelasAkses || 'ALL' }))
      : DB_CACHE.roomsList;

    try {
      const resSpc = await fetch(`${SUPABASE_URL}/rest/v1/cbt_exam_spaces?select=*&order=created_at.asc`, { headers: sbHeaders() });
      if (resSpc.ok) {
        const spcRows = await resSpc.json();
        if (Array.isArray(spcRows) && spcRows.length > 0) {
          const dbSessions = spcRows.filter(x => x.category === 'SESSION').map(x => ({
            id: x.id,
            name: x.name,
            start: x.start_time || '07:30',
            end: x.end_time || '09:30',
            kelasAkses: x.kelas_akses || 'ALL'
          }));
          const dbRooms = spcRows.filter(x => x.category === 'ROOM').map(x => ({
            id: x.id,
            name: x.name,
            capacity: Number(x.capacity || 36),
            note: x.note || '-',
            kelasAkses: x.kelas_akses || 'ALL'
          }));
          if (dbSessions.length > 0) sessionsList = dbSessions;
          if (dbRooms.length > 0) roomsList = dbRooms;
          localStorage.setItem('CBT_SESI_RUANG_META_V1', JSON.stringify({ sessionsList, roomsList }));
        }
      }
    } catch (e) {}

    const sRow = setRows[0] || {};
    if (!setRows || setRows.length === 0) {
      sbUpsert('cbt_settings', {
        id: 1,
        exam_title: DB_CACHE.settings.examTitle,
        subject: DB_CACHE.settings.subject,
        duration_minutes: DB_CACHE.settings.durationMinutes,
        active_token: DB_CACHE.settings.activeToken,
        shuffle_questions: DB_CACHE.settings.shuffleQuestions,
        shuffle_options: DB_CACHE.settings.shuffleOptions,
        show_review_after_submit: DB_CACHE.settings.showReviewAfterSubmit,
        max_violations: DB_CACHE.settings.maxViolations,
        subjects_list: getAllSubjectsList(DB_CACHE),
        updated_at: new Date().toISOString()
      });
    }
    const parsedDbSubjects = Array.isArray(sRow.subjects_list)
      ? sRow.subjects_list
      : (typeof sRow.subjects_list === 'string' ? (() => { try { return JSON.parse(sRow.subjects_list); } catch(e) { return []; } })() : []);
    const localSavedMapel = JSON.parse(localStorage.getItem('CBT_MAPEL_LIST_V1') || '[]');
    const mergedMapelSet = new Set([
      ...parsedDbSubjects,
      ...(Array.isArray(localSavedMapel) ? localSavedMapel : []),
      ...(sRow.subject ? [sRow.subject] : [])
    ]);
    const mergedMapelList = Array.from(mergedMapelSet).filter(Boolean);
    if (mergedMapelList.length > 0) {
      localStorage.setItem('CBT_MAPEL_LIST_V1', JSON.stringify(mergedMapelList));
    }

    const sessionsMap = {};
    (sesRows || []).forEach(r => {
      sessionsMap[r.student_id] = {
        studentId: r.student_id,
        name: r.name,
        kelas: r.kelas,
        idKelas: r.id_kelas || resolveIdKelasFromName(r.kelas, classesList),
        ruang: r.ruang,
        status: r.status,
        progress: Number(r.progress || 0),
        violations: Number(r.violations || 0),
        violationLogs: r.violation_logs || [],
        extraMinutes: Number(r.extra_minutes || 0),
        broadcastMsg: r.broadcast_msg || '',
        answers: r.answers || {},
        essayScores: r.essay_scores || {},
        autoScore: Number(r.auto_score || 0),
        essayScore: Number(r.essay_score || 0),
        finalScore: Number(r.final_score || 0),
        submittedAt: r.submitted_at || null,
        subjectResults: r.subject_results || {}
      };
    });

    DB_CACHE = {
      settings: {
        examTitle: sRow.exam_title || DB_CACHE.settings.examTitle,
        subject: sRow.subject || DB_CACHE.settings.subject,
        durationMinutes: Number(sRow.duration_minutes || 45),
        activeToken: sRow.active_token || 'CBT2026',
        shuffleQuestions: sRow.shuffle_questions !== false,
        shuffleOptions: sRow.shuffle_options !== false,
        showReviewAfterSubmit: sRow.show_review_after_submit !== false,
        maxViolations: Number(sRow.max_violations || 4),
        subjectsList: mergedMapelList.length > 0 ? mergedMapelList : getAllSubjectsList(DB_CACHE)
      },
      classesList,
      users: (usrRows || []).map(u => {
        const localUser = (DB_CACHE.users || []).find(x => x.id === u.id || x.username === u.username);
        const savedPhotos = getSavedUserPhotosMap();
        const resolvedPhoto = u.photo_url || savedPhotos[u.username] || (localUser && localUser.photoUrl) || '';
        return {
          id: u.id, username: u.username, password: u.password,
          name: u.name, role: u.role, kelas: u.kelas,
          idKelas: u.role === 'Guru'
            ? (u.id_kelas || '-')
            : (u.id_kelas || resolveIdKelasFromName(u.kelas, classesList)),
          sesi: u.sesi, ruang: u.ruang,
          photoUrl: resolvedPhoto
        };
      }),
      questions: (queRows || []).map(q => ({
        id: q.id, type: q.type, subject: q.subject, text: q.text,
        mediaType: q.media_type || 'none', mediaUrl: q.media_url || '',
        options: q.options || [], pairs: q.pairs || [],
        answer: q.answer, weight: Number(q.weight || 10), explanation: q.explanation || ''
      })),
      sessionsList,
      roomsList,
      sessions: sessionsMap
    };

    DB_LAST_SYNCED_SNAPSHOT = JSON.parse(JSON.stringify(DB_CACHE));
    localStorage.setItem(CACHE_KEY, JSON.stringify(DB_CACHE));
    if (typeof callback === 'function') callback(DB_CACHE);

    // Jalankan auto-input 90 soal & 83 siswa ke Supabase Cloud bila belum terisi
    ensureDummySeedInCloud(usrRows, queRows).then(didSeed => {
      if (didSeed) {
        syncFromMySQL(callback);
      }
    });
  } catch (err) {
    console.warn('Sinkronisasi Supabase tertunda:', err);
  }
}

// Sinkronisasi ringan khusus 1 sesi siswa (hemat bandwidth untuk 100+ peserta)
async function syncSessionOnly(studentId, callback) {
  if (!IS_CONFIGURED || !studentId) {
    if (typeof callback === 'function') callback(DB_CACHE.sessions[studentId] || null);
    return;
  }
  if (_cloudSaveTimer !== null) return;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/cbt_sessions?student_id=eq.${encodeURIComponent(studentId)}&select=*`, { headers: sbHeaders() });
    if (!res.ok) return;
    const rows = await res.json();
    if (Array.isArray(rows) && rows.length > 0) {
      const r = rows[0];
      const existing = DB_CACHE.sessions[studentId] || {};
      const merged = {
        ...existing,
        studentId: r.student_id,
        name: r.name,
        kelas: r.kelas,
        idKelas: r.id_kelas || existing.idKelas || '-',
        ruang: r.ruang,
        status: r.status,
        extraMinutes: Number(r.extra_minutes || 0),
        broadcastMsg: r.broadcast_msg || '',
        violations: Math.max(Number(r.violations || 0), Number(existing.violations || 0))
      };
      DB_CACHE.sessions[studentId] = merged;
      DB_LAST_SYNCED_SNAPSHOT.sessions = DB_LAST_SYNCED_SNAPSHOT.sessions || {};
      DB_LAST_SYNCED_SNAPSHOT.sessions[studentId] = JSON.parse(JSON.stringify(merged));
      localStorage.setItem(CACHE_KEY, JSON.stringify(DB_CACHE));
      if (typeof callback === 'function') callback(merged);
    }
  } catch (err) {
    console.warn('Polling sesi siswa tertunda:', err);
  }
}

// Sinkronisasi ringan seluruh sesi ujian + token untuk layar Proktor
async function syncSessionsForProctor(callback) {
  if (!IS_CONFIGURED) {
    if (typeof callback === 'function') callback(DB_CACHE);
    return;
  }
  if (_cloudSaveTimer !== null) return;
  try {
    const [resSet, resSes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/cbt_settings?id=eq.1&select=active_token,duration_minutes,max_violations`, { headers: sbHeaders() }),
      fetch(`${SUPABASE_URL}/rest/v1/cbt_sessions?select=*`, { headers: sbHeaders() })
    ]);
    if (!resSet.ok || !resSes.ok) return;
    const [setRows, sesRows] = await Promise.all([resSet.json(), resSes.json()]);
    if (setRows && setRows[0]) {
      DB_CACHE.settings.activeToken = setRows[0].active_token || DB_CACHE.settings.activeToken;
      DB_CACHE.settings.durationMinutes = Number(setRows[0].duration_minutes || DB_CACHE.settings.durationMinutes);
      DB_CACHE.settings.maxViolations = Number(setRows[0].max_violations || DB_CACHE.settings.maxViolations);
    }
    const classesList = getClassesList(DB_CACHE);
    const sessionsMap = {};
    (sesRows || []).forEach(r => {
      sessionsMap[r.student_id] = {
        studentId: r.student_id,
        name: r.name,
        kelas: r.kelas,
        idKelas: r.id_kelas || resolveIdKelasFromName(r.kelas, classesList),
        ruang: r.ruang,
        status: r.status,
        progress: Number(r.progress || 0),
        violations: Number(r.violations || 0),
        violationLogs: r.violation_logs || [],
        extraMinutes: Number(r.extra_minutes || 0),
        broadcastMsg: r.broadcast_msg || '',
        answers: r.answers || {},
        essayScores: r.essay_scores || {},
        autoScore: Number(r.auto_score || 0),
        essayScore: Number(r.essay_score || 0),
        finalScore: Number(r.final_score || 0),
        submittedAt: r.submitted_at || null,
        subjectResults: r.subject_results || {}
      };
    });
    DB_CACHE.sessions = sessionsMap;
    DB_LAST_SYNCED_SNAPSHOT = JSON.parse(JSON.stringify(DB_CACHE));
    localStorage.setItem(CACHE_KEY, JSON.stringify(DB_CACHE));
    if (typeof callback === 'function') callback(DB_CACHE);
  } catch (err) {
    console.warn('Polling proktor tertunda:', err);
  }
}

let DB_LAST_SYNCED_SNAPSHOT = JSON.parse(JSON.stringify(DB_CACHE));
let _cloudSaveTimer = null;

function getDB() {
  return DB_CACHE;
}

function getSavedUserPhotosMap() {
  try {
    return JSON.parse(localStorage.getItem('CBT_USER_PHOTOS_V1') || '{}');
  } catch (e) {
    return {};
  }
}

function setSavedUserPhoto(username, photoUrl) {
  if (!username) return;
  const map = getSavedUserPhotosMap();
  if (photoUrl) {
    map[username] = photoUrl;
  } else {
    delete map[username];
  }
  localStorage.setItem('CBT_USER_PHOTOS_V1', JSON.stringify(map));
}

async function sbUpsert(table, payload, keepalive = false) {
  if (!IS_CONFIGURED) return;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: sbHeaders({ 'Prefer': 'resolution=merge-duplicates,return=minimal' }),
      body: JSON.stringify(payload),
      keepalive
    });
    if (!res.ok && table === 'cbt_users' && payload && Object.prototype.hasOwnProperty.call(payload, 'photo_url')) {
      const fallbackPayload = { ...payload };
      delete fallbackPayload.photo_url;
      await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
        method: 'POST',
        headers: sbHeaders({ 'Prefer': 'resolution=merge-duplicates,return=minimal' }),
        body: JSON.stringify(fallbackPayload),
        keepalive
      });
    }
    if (!res.ok && table === 'cbt_settings' && payload && Object.prototype.hasOwnProperty.call(payload, 'subjects_list')) {
      const fallbackSettings = { ...payload };
      delete fallbackSettings.subjects_list;
      await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
        method: 'POST',
        headers: sbHeaders({ 'Prefer': 'resolution=merge-duplicates,return=minimal' }),
        body: JSON.stringify(fallbackSettings),
        keepalive
      });
    }
  } catch (e) {
    console.error(`Gagal menyimpan ke Supabase (${table}):`, e);
  }
}

async function sbDelete(table, filterQuery) {
  if (!IS_CONFIGURED) return;
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filterQuery}`, {
      method: 'DELETE',
      headers: sbHeaders()
    });
  } catch (e) {
    console.error(`Gagal menghapus dari Supabase (${table}):`, e);
  }
}

function flushCloudSave(keepalive = false) {
  if (_cloudSaveTimer !== null) {
    clearTimeout(_cloudSaveTimer);
    _cloudSaveTimer = null;
  }
  if (!IS_CONFIGURED) return;

  const db = DB_CACHE;
  const prev = DB_LAST_SYNCED_SNAPSHOT || {};

  // 1. Settings (termasuk subjects_list)
  const currentSubjectsList = Array.isArray(db.settings.subjectsList) ? db.settings.subjectsList : getAllSubjectsList(db);
  if (JSON.stringify(prev.settings) !== JSON.stringify(db.settings) || JSON.stringify(prev.settings?.subjectsList) !== JSON.stringify(currentSubjectsList)) {
    sbUpsert('cbt_settings', {
      id: 1,
      exam_title: db.settings.examTitle,
      subject: db.settings.subject,
      duration_minutes: db.settings.durationMinutes,
      active_token: db.settings.activeToken,
      shuffle_questions: db.settings.shuffleQuestions,
      shuffle_options: db.settings.shuffleOptions,
      show_review_after_submit: db.settings.showReviewAfterSubmit,
      max_violations: db.settings.maxViolations,
      subjects_list: currentSubjectsList,
      updated_at: new Date().toISOString()
    }, keepalive);
  }

  // 2. Users
  const prevUserIds = new Set((prev.users || []).map(u => u.id));
  const currUserIds = new Set((db.users || []).map(u => u.id));
  (db.users || []).forEach(u => {
    const oldU = (prev.users || []).find(x => x.id === u.id);
    if (!oldU || JSON.stringify(oldU) !== JSON.stringify(u)) {
      sbUpsert('cbt_users', {
        id: u.id,
        username: u.username,
        password: u.password,
        name: u.name,
        role: u.role,
        kelas: u.kelas || '-',
        id_kelas: u.idKelas || '-',
        sesi: u.sesi || '-',
        ruang: u.ruang || '-',
        photo_url: u.photoUrl || ''
      }, keepalive);
    }
  });
  prevUserIds.forEach(id => {
    if (!currUserIds.has(id)) sbDelete('cbt_users', `id=eq.${encodeURIComponent(id)}`);
  });

  // 3. Questions
  const prevQIds = new Set((prev.questions || []).map(q => q.id));
  const currQIds = new Set((db.questions || []).map(q => q.id));
  (db.questions || []).forEach(q => {
    const oldQ = (prev.questions || []).find(x => x.id === q.id);
    if (!oldQ || JSON.stringify(oldQ) !== JSON.stringify(q)) {
      sbUpsert('cbt_questions', {
        id: q.id,
        type: q.type,
        subject: q.subject || db.settings.subject,
        text: q.text,
        media_type: q.mediaType || 'none',
        media_url: q.mediaUrl || '',
        options: q.options || [],
        pairs: q.pairs || [],
        answer: q.answer,
        weight: q.weight || 10,
        explanation: q.explanation || ''
      }, keepalive);
    }
  });
  prevQIds.forEach(id => {
    if (!currQIds.has(id)) sbDelete('cbt_questions', `id=eq.${encodeURIComponent(id)}`);
  });

  // 4. Sessions (hanya baris siswa yang berubah dibanding snapshot terakhir)
  Object.keys(db.sessions || {}).forEach(sid => {
    const oldS = (prev.sessions || {})[sid];
    const newS = db.sessions[sid];
    if (!oldS || JSON.stringify(oldS) !== JSON.stringify(newS)) {
      sbUpsert('cbt_sessions', {
        student_id: newS.studentId,
        name: newS.name,
        kelas: newS.kelas || '-',
        id_kelas: newS.idKelas || '-',
        ruang: newS.ruang || '-',
        status: newS.status || 'Siap Ujian',
        progress: newS.progress || 0,
        violations: newS.violations || 0,
        violation_logs: newS.violationLogs || [],
        extra_minutes: newS.extraMinutes || 0,
        broadcast_msg: newS.broadcastMsg || '',
        answers: newS.answers || {},
        essay_scores: newS.essayScores || {},
        auto_score: newS.autoScore || 0,
        essay_score: newS.essayScore || 0,
        final_score: newS.finalScore || 0,
        submitted_at: newS.submittedAt || null,
        subject_results: newS.subjectResults || {},
        updated_at: new Date().toISOString()
      }, keepalive);
    }
  });

  // 5. Classes (cbt_classes)
  if (Array.isArray(db.classesList)) {
    const prevClsIds = new Set((prev.classesList || []).map(c => c.idKelas));
    const currClsIds = new Set(db.classesList.map(c => c.idKelas));
    db.classesList.forEach(c => {
      const oldC = (prev.classesList || []).find(x => x.idKelas === c.idKelas);
      if (!oldC || JSON.stringify(oldC) !== JSON.stringify(c)) {
        sbUpsert('cbt_classes', {
          id_kelas: c.idKelas,
          nama_kelas: c.namaKelas,
          wali_kelas_username: c.waliKelasUsername || '-',
          wali_kelas_name: c.waliKelasName || '-',
          keterangan: c.keterangan || '-'
        }, keepalive);
      }
    });
    prevClsIds.forEach(idK => {
      if (!currClsIds.has(idK)) sbDelete('cbt_classes', `id_kelas=eq.${encodeURIComponent(idK)}`);
    });
  }

  // 6. Exam Spaces (cbt_exam_spaces: Sesi & Ruang)
  if (Array.isArray(db.sessionsList) || Array.isArray(db.roomsList)) {
    const prevSpaceIds = new Set([
      ...(prev.sessionsList || []).map(s => s.id),
      ...(prev.roomsList || []).map(r => r.id)
    ]);
    const currSpaceIds = new Set([
      ...(db.sessionsList || []).map(s => s.id),
      ...(db.roomsList || []).map(r => r.id)
    ]);

    (db.sessionsList || []).forEach(s => {
      const oldS = (prev.sessionsList || []).find(x => x.id === s.id);
      if (!oldS || JSON.stringify(oldS) !== JSON.stringify(s)) {
        sbUpsert('cbt_exam_spaces', {
          id: s.id,
          category: 'SESSION',
          name: s.name,
          start_time: s.start,
          end_time: s.end,
          capacity: 0,
          note: '-',
          kelas_akses: s.kelasAkses || 'ALL'
        }, keepalive);
      }
    });

    (db.roomsList || []).forEach(r => {
      const oldR = (prev.roomsList || []).find(x => x.id === r.id);
      if (!oldR || JSON.stringify(oldR) !== JSON.stringify(r)) {
        sbUpsert('cbt_exam_spaces', {
          id: r.id,
          category: 'ROOM',
          name: r.name,
          start_time: null,
          end_time: null,
          capacity: Number(r.capacity || 36),
          note: r.note || '-',
          kelas_akses: r.kelasAkses || 'ALL'
        }, keepalive);
      }
    });

    prevSpaceIds.forEach(idSpc => {
      if (!currSpaceIds.has(idSpc)) sbDelete('cbt_exam_spaces', `id=eq.${encodeURIComponent(idSpc)}`);
    });
  }

  DB_LAST_SYNCED_SNAPSHOT = JSON.parse(JSON.stringify(db));
}

function saveDB(db, options = {}) {
  DB_CACHE = db;
  if (Array.isArray(db.classesList)) {
    localStorage.setItem(CLASSES_META_KEY, JSON.stringify(db.classesList));
  }
  localStorage.setItem(CACHE_KEY, JSON.stringify(db));
  if (!IS_CONFIGURED) return;

  const debounceMs = Number(options.debounceMs || 0);
  if (debounceMs > 0) {
    if (_cloudSaveTimer !== null) clearTimeout(_cloudSaveTimer);
    _cloudSaveTimer = setTimeout(() => {
      _cloudSaveTimer = null;
      flushCloudSave(false);
    }, debounceMs);
  } else {
    flushCloudSave(false);
  }
}

// Pastikan perubahan tertunda langsung terkirim saat tab ditutup/berpindah
if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', () => flushCloudSave(true));
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushCloudSave(true);
  });
}

// ============================================================================
// HELPER MASTER KELAS, ID KELAS & WALI KELAS
// ============================================================================
function getClassesList(db = getDB()) {
  if (Array.isArray(db.classesList)) return db.classesList;
  return loadSavedClassesMeta();
}

function resolveIdKelasFromName(namaKelas, classesList = getClassesList()) {
  if (!namaKelas || namaKelas === '-') return '-';
  const found = classesList.find(c => c.namaKelas.toLowerCase() === String(namaKelas).trim().toLowerCase());
  return found ? found.idKelas : '-';
}

function parseSubjectsString(rawStr) {
  if (!rawStr || rawStr === '-') return [];
  if (Array.isArray(rawStr)) {
    return rawStr.map(s => String(s || '').trim()).filter(s => s && s !== '-');
  }
  return String(rawStr)
    .split(/[,;|]+/)
    .map(s => s.trim())
    .filter(s => s && s !== '-');
}

function getAllSubjectsList(db = getDB()) {
  const saved = JSON.parse(localStorage.getItem('CBT_MAPEL_LIST_V1') || 'null');
  const set = new Set(saved || [
    'Informatika & Literasi Digital',
    'Teknik Komputer dan Jaringan (TKJ)',
    'Koding dan Kecerdasan Artifisial (KKA)'
  ]);
  if (db.settings && db.settings.subject) set.add(db.settings.subject);
  if (Array.isArray(db.settings?.subjectsList)) {
    db.settings.subjectsList.forEach(m => { if (m) set.add(m); });
  }
  (db.questions || []).forEach(q => { if (q.subject) set.add(q.subject); });
  (db.users || []).forEach(u => {
    if (u.role === 'Guru' && u.kelas && u.kelas !== '-') {
      parseSubjectsString(u.kelas).forEach(m => set.add(m));
    }
  });
  Object.values(db.sessions || {}).forEach(s => {
    if (s.subjectResults) {
      Object.keys(s.subjectResults).forEach(m => set.add(m));
    }
  });
  return Array.from(set);
}

function getStudentsByClassId(idKelas, db = getDB()) {
  const classes = getClassesList(db);
  const clsObj = classes.find(c => c.idKelas === idKelas);
  const targetNamaKelas = clsObj ? clsObj.namaKelas.toLowerCase() : '';

  const siswaUsers = (db.users || []).filter(u => {
    if (u.role !== 'Siswa') return false;
    if (u.idKelas && u.idKelas === idKelas) return true;
    if (targetNamaKelas && u.kelas && u.kelas.toLowerCase() === targetNamaKelas) return true;
    return false;
  });

  const seenIds = new Set();
  const result = [];

  siswaUsers.forEach(u => {
    seenIds.add(u.username);
    const sess = (db.sessions || {})[u.username] || {
      studentId: u.username,
      name: u.name,
      kelas: u.kelas,
      idKelas: u.idKelas || idKelas,
      ruang: u.ruang || '-',
      status: 'Belum Ujian',
      answers: {},
      essayScores: {},
      subjectResults: {}
    };
    result.push({
      studentId: u.username,
      name: u.name,
      kelas: u.kelas || (clsObj ? clsObj.namaKelas : '-'),
      idKelas: u.idKelas || idKelas,
      session: sess
    });
  });

  Object.values(db.sessions || {}).forEach(s => {
    if (seenIds.has(s.studentId)) return;
    const matchById = s.idKelas && s.idKelas === idKelas;
    const matchByName = targetNamaKelas && s.kelas && s.kelas.toLowerCase() === targetNamaKelas;
    if (matchById || matchByName) {
      seenIds.add(s.studentId);
      result.push({
        studentId: s.studentId,
        name: s.name,
        kelas: s.kelas,
        idKelas: s.idKelas || idKelas,
        session: s
      });
    }
  });

  return result;
}

// Helper: Hitung & Ambil Rekap Nilai per Mata Pelajaran untuk setiap peserta
function getStudentSubjectMetrics(session, subjectName, db = getDB()) {
  const defaultSubj = db.settings?.subject || 'Informatika & Literasi Digital';
  const subjQuestions = (db.questions || []).filter(q => (q.subject || defaultSubj) === subjectName);

  const savedRes = (session.subjectResults && session.subjectResults[subjectName]) || null;
  const answers = session.answers || {};
  const essayScores = session.essayScores || {};

  let autoScore = 0;
  let essayScore = 0;
  let answeredCount = 0;

  subjQuestions.forEach(q => {
    const ans = (answers[q.id] || '').trim();
    if (ans) answeredCount++;
    if (q.type === 'ESAI') {
      essayScore += Number(essayScores[q.id] || 0);
    } else if (ans) {
      if (q.type === 'ISIAN') {
        if (stripHtmlToPlainText(ans).toLowerCase() === stripHtmlToPlainText(q.answer || '').toLowerCase()) autoScore += Number(q.weight || 0);
      } else {
        if (normalizeAnswerValue(ans) === normalizeAnswerValue(q.answer)) autoScore += Number(q.weight || 0);
      }
    }
  });

  if (subjQuestions.length > 0 && (answeredCount > 0 || essayScore > 0)) {
    const isCurrentActiveSubj = (db.settings?.subject === subjectName);
    const status = savedRes?.status || (isCurrentActiveSubj ? session.status : 'Selesai');
    const submittedAt = savedRes?.submittedAt || (isCurrentActiveSubj ? session.submittedAt : null);
    return {
      subject: subjectName,
      questionCount: subjQuestions.length,
      answeredCount,
      autoScore,
      essayScore,
      finalScore: autoScore + essayScore,
      status,
      submittedAt
    };
  }

  if (savedRes) {
    return {
      subject: subjectName,
      questionCount: subjQuestions.length,
      answeredCount: savedRes.answeredCount || 0,
      autoScore: Number(savedRes.autoScore || 0),
      essayScore: Number(savedRes.essayScore || 0),
      finalScore: Number(savedRes.finalScore || 0),
      status: savedRes.status || 'Selesai',
      submittedAt: savedRes.submittedAt || null
    };
  }

  const isCurrentActiveSubj = (db.settings?.subject === subjectName);
  return {
    subject: subjectName,
    questionCount: subjQuestions.length,
    answeredCount: 0,
    autoScore: 0,
    essayScore: 0,
    finalScore: 0,
    status: isCurrentActiveSubj ? (session.status || 'Siap Ujian') : 'Belum Ujian',
    submittedAt: null
  };
}

function downloadCSV(filename, rows) {
  const csvContent = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// Helper Navigasi Dinamis Berdasarkan Peran Login (Admin / Guru / Wali Kelas / Proktor)
function getStaffAuth() {
  try {
    return JSON.parse(sessionStorage.getItem('CBT_STAFF_AUTH') || 'null');
  } catch (e) {
    return null;
  }
}

function logoutStaff() {
  const auth = getStaffAuth();
  const nama = auth ? auth.name : 'Pengguna';
  showCBTConfirm({
    type: 'warning',
    title: 'Konfirmasi Keluar (Logout)',
    message: `Apakah Anda yakin ingin keluar dari sesi akun "${nama}"?`,
    confirmText: 'Ya, Keluar Sekarang',
    cancelText: 'Batal'
  }).then(ok => {
    if (!ok) return;
    sessionStorage.removeItem('CBT_STAFF_AUTH');
    showCBTNotification('info', 'Berhasil Keluar', 'Sesi Anda telah diakhiri. Mengalihkan ke Portal Login...', 2000);
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 900);
  });
}

function applyRoleNavigation(activeFile) {
  const navEl = document.querySelector('.top-nav');
  const navLinksEl = document.querySelector('.top-nav .nav-links');
  if (!navEl || !navLinksEl) return;

  document.body.classList.add('has-sidebar');
  const auth = getStaffAuth();

  if (auth && auth.role === 'Guru') {
    const dbNow = getDB();
    const liveUser = (dbNow.users || []).find(u => u.id === auth.id || u.username === auth.username);
    const savedPhotos = getSavedUserPhotosMap();
    const photoSrc = (liveUser && liveUser.photoUrl) || auth.photoUrl || savedPhotos[auth.username] || '';
    const initials = (auth.name || 'GR')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(w => w[0].toUpperCase())
      .join('');
    const avatarHtml = photoSrc
      ? `<img src="${photoSrc}" alt="Foto ${auth.name}" class="sidebar-avatar">`
      : `<div class="sidebar-avatar">${initials || '<i class="fa-solid fa-user-tie"></i>'}</div>`;

    const guruMapels = parseSubjectsString((liveUser && liveUser.kelas) || auth.subject);
    const guruJenjang = parseSubjectsString((liveUser && liveUser.idKelas) || auth.idKelas);
    const mapelDisplay = guruMapels.length > 0
      ? guruMapels.map(m => `<div style="margin-top:2px;">• <strong style="color:#fff;">${m}</strong></div>`).join('')
      : '';
    const jenjangDisplay = guruJenjang.length > 0
      ? `<div style="margin-top:0.4rem; padding-top:0.35rem; border-top:1px dashed rgba(255,255,255,0.28);"><i class="fa-solid fa-layer-group" style="margin-right:5px;"></i>Kelas Mengajar:<br><strong style="color:#fde047;">${guruJenjang.join(', ')}</strong></div>`
      : '';
    const profileCard = `
      <div class="sidebar-profile-card">
        <div class="sidebar-profile-top">
          ${avatarHtml}
          <div style="min-width:0; flex:1;">
            <div style="font-weight:700; color:#fff; font-size:0.8rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${auth.name}</div>
            <div style="font-size:0.69rem; color:#fbcfe8;">NIP/User: ${auth.username}</div>
          </div>
        </div>
        ${guruMapels.length > 0 ? `<div><i class="fa-solid fa-book-bookmark" style="margin-right:5px;"></i>Mapel Guru (${guruMapels.length}):${mapelDisplay}</div>` : ''}
        ${jenjangDisplay}
      </div>
    `;
    navLinksEl.innerHTML = `
      ${profileCard}
      <a href="2a-mata-pelajaran.html" class="${activeFile === '2a-mata-pelajaran.html' ? 'active' : ''}"><i class="fa-solid fa-book-bookmark"></i><span>Input Mata Pelajaran</span></a>
      <a href="2-bank-soal.html" class="${activeFile === '2-bank-soal.html' ? 'active' : ''}"><i class="fa-solid fa-file-circle-question"></i><span>Buat Soal & Bank Soal</span></a>
      <a href="5-penilaian-analisis.html" class="${activeFile === '5-penilaian-analisis.html' ? 'active' : ''}"><i class="fa-solid fa-chart-column"></i><span>Penilaian & Rekap Nilai</span></a>
      <a href="7-pengaturan-guru.html" class="${activeFile === '7-pengaturan-guru.html' ? 'active' : ''}"><i class="fa-solid fa-user-gear"></i><span>Pengaturan Guru</span></a>
      <a href="#" class="logout-link" onclick="logoutStaff(); return false;"><i class="fa-solid fa-right-from-bracket"></i><span>Keluar (${auth.name})</span></a>
    `;
  } else if (auth && auth.role === 'Wali Kelas') {
    const idKls = auth.idKelas || '-';
    const nmKls = auth.kelas || auth.subject || '-';
    const waliInfo = `<div style="font-size:0.74rem; color:#fbcfe8; padding:0.5rem 0.75rem; background:rgba(219,39,119,0.38); border-radius:8px; margin-bottom:0.45rem;"><i class="fa-solid fa-id-badge" style="margin-right:6px;"></i>Wali Kelas:<br><strong style="color:#fff;">${nmKls}</strong><br><span style="font-size:0.7rem; color:#fde047;">ID Kelas: ${idKls}</span></div>`;
    navLinksEl.innerHTML = `
      ${waliInfo}
      <a href="6-rekap-wali-kelas.html" class="${activeFile === '6-rekap-wali-kelas.html' ? 'active' : ''}"><i class="fa-solid fa-chalkboard-user"></i><span>Rekap Mapel Wali Kelas</span></a>
      <a href="#" class="logout-link" onclick="logoutStaff(); return false;"><i class="fa-solid fa-right-from-bracket"></i><span>Keluar (${auth.name})</span></a>
    `;
  } else {
    const labelOut = auth ? `Keluar (${auth.name})` : 'Portal Login';
    navLinksEl.innerHTML = `
      <a href="1-manajemen-data-pengguna.html" class="${activeFile === '1-manajemen-data-pengguna.html' ? 'active' : ''}"><i class="fa-solid fa-users-gear"></i><span>Data, Kelas & Pengguna</span></a>
      <a href="2a-mata-pelajaran.html" class="${activeFile === '2a-mata-pelajaran.html' ? 'active' : ''}"><i class="fa-solid fa-book-bookmark"></i><span>Input Mata Pelajaran</span></a>
      <a href="2-bank-soal.html" class="${activeFile === '2-bank-soal.html' ? 'active' : ''}"><i class="fa-solid fa-file-circle-question"></i><span>Buat Soal & Bank Soal</span></a>
      <a href="3-ujian-peserta.html" class="${activeFile === '3-ujian-peserta.html' ? 'active' : ''}"><i class="fa-solid fa-laptop-file"></i><span>Ujian Peserta</span></a>
      <a href="4-proctoring-pengawas.html" class="${activeFile === '4-proctoring-pengawas.html' ? 'active' : ''}"><i class="fa-solid fa-shield-halved"></i><span>Proctoring</span></a>
      <a href="5-penilaian-analisis.html" class="${activeFile === '5-penilaian-analisis.html' ? 'active' : ''}"><i class="fa-solid fa-chart-column"></i><span>Penilaian & Analisis</span></a>
      <a href="6-rekap-wali-kelas.html" class="${activeFile === '6-rekap-wali-kelas.html' ? 'active' : ''}"><i class="fa-solid fa-chalkboard-user"></i><span>Rekap Wali Kelas</span></a>
      <a href="#" class="logout-link" onclick="logoutStaff(); return false;"><i class="fa-solid fa-right-from-bracket"></i><span>${labelOut}</span></a>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const refreshAllViews = () => {
    if (typeof renderUsers === 'function') renderUsers();
    if (typeof renderClassesTable === 'function') renderClassesTable();
    if (typeof populateSesiAndRoomSelects === 'function') populateSesiAndRoomSelects();
    if (typeof renderSesiAndRooms === 'function') renderSesiAndRooms();
    const activeElId = document.activeElement ? document.activeElement.id : '';
    const isEditingCfg = ['cfgTitle', 'cfgDuration', 'cfgShuffleQ', 'cfgShuffleOpt'].includes(activeElId);
    if (typeof loadConfig === 'function' && !isEditingCfg) loadConfig();
    if (typeof populateMapelDropdowns === 'function') populateMapelDropdowns(true);
    if (typeof renderMapelTable === 'function') renderMapelTable();
    if (typeof renderQuestions === 'function') renderQuestions();
    if (typeof renderProctoring === 'function') renderProctoring();
    if (typeof renderGrades === 'function') renderGrades();
    if (typeof renderItemAnalysis === 'function') renderItemAnalysis();
    if (typeof renderWaliKelasRekap === 'function') renderWaliKelasRekap();
  };
  syncFromMySQL(refreshAllViews);
  setInterval(() => syncFromMySQL(refreshAllViews), 3000);
});

// ============================================================================
// HAK AKSES ADMIN & AKSES SEMUA KELAS UNTUK RUANG UJIAN & SESI UJIAN
// ============================================================================
function isCurrentUserAdmin() {
  const auth = getStaffAuth();
  return !!(auth && auth.role === 'Admin');
}

function getAllAvailableClasses(db = getDB()) {
  const classSet = new Set();
  getClassesList(db).forEach(c => {
    if (c.namaKelas && c.namaKelas !== '-') classSet.add(c.namaKelas.trim());
  });
  (db.users || []).forEach(u => {
    if (u.role === 'Siswa' && u.kelas && u.kelas !== '-') classSet.add(u.kelas.trim());
  });
  Object.values(db.sessions || {}).forEach(s => {
    if (s.kelas && s.kelas !== '-') classSet.add(s.kelas.trim());
  });
  return Array.from(classSet).sort();
}

function canClassAccessRoomOrSession(item, studentKelas) {
  if (!item) return true;
  const akses = item.kelasAkses || 'ALL';
  if (akses === 'ALL' || akses === 'Semua Kelas') return true;
  if (Array.isArray(akses)) return akses.includes('ALL') || akses.includes(studentKelas);
  return String(akses).split(',').map(x => x.trim()).includes(studentKelas);
}


// ============================================================================
// SISTEM NOTIFIKASI TOAST MODERN (OTOMATIS MENGGANTIKAN ALERT STANDAR)
// ============================================================================
function showCBTNotification(type = 'info', title = 'Informasi', message = '', duration = 4200) {
  const renderToast = () => {
    let container = document.getElementById('cbt-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'cbt-toast-container';
      document.body.appendChild(container);
    }

    const icons = {
      success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
      warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
      error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
      info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
    };

    const toast = document.createElement('div');
    toast.className = `cbt-toast ${type}`;
    toast.style.setProperty('--duration', `${duration}ms`);

    toast.innerHTML = `
      <div class="cbt-toast-icon">${icons[type] || icons.info}</div>
      <div class="cbt-toast-body">
        <div class="cbt-toast-title">${title}</div>
        ${message ? `<div class="cbt-toast-msg">${message}</div>` : ''}
      </div>
      <button class="cbt-toast-close" aria-label="Tutup">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="cbt-toast-progress"></div>
    `;

    const removeToast = () => {
      if (toast.classList.contains('closing')) return;
      toast.classList.add('closing');
      setTimeout(() => toast.remove(), 350);
    };

    toast.querySelector('.cbt-toast-close').addEventListener('click', removeToast);

    let remaining = duration;
    let start = Date.now();
    let timer = setTimeout(removeToast, remaining);

    toast.addEventListener('mouseenter', () => {
      clearTimeout(timer);
      remaining -= Date.now() - start;
    });

    toast.addEventListener('mouseleave', () => {
      start = Date.now();
      timer = setTimeout(removeToast, remaining);
    });

    container.appendChild(toast);
  };

  if (document.body) {
    renderToast();
  } else {
    window.addEventListener('DOMContentLoaded', renderToast, { once: true });
  }
}

window.alert = function(rawMessage) {
  const msg = String(rawMessage || '');
  const lower = msg.toLowerCase();

  let type = 'info';
  let title = 'Informasi Sistem';

  if (
    lower.includes('diblokir') ||
    lower.includes('ditolak') ||
    lower.includes('salah') ||
    lower.includes('tidak valid') ||
    lower.includes('tidak sesuai') ||
    lower.includes('tidak dibuka') ||
    lower.includes('kosong') ||
    lower.includes('gagal')
  ) {
    type = 'error';
    title = 'Akses / Validasi Gagal';
  } else if (
    lower.includes('peringatan') ||
    lower.includes('minimal harus') ||
    lower.includes('harus lebih') ||
    lower.includes('sudah terdaftar') ||
    lower.includes('sudah digunakan') ||
    lower.includes('tuliskan isi') ||
    lower.includes('waktu ujian telah habis')
  ) {
    type = 'warning';
    title = 'Perhatian';
  } else if (
    lower.includes('berhasil') ||
    lower.includes('diperbarui') ||
    lower.includes('ditambahkan') ||
    lower.includes('disimpan') ||
    lower.includes('terkirim') ||
    lower.includes('dirilis') ||
    lower.includes('dibuka') ||
    lower.includes('selesai') ||
    lower.includes('dikonfirmasi')
  ) {
    type = 'success';
    title = 'Berhasil';
  }

  const duration = (type === 'error' || type === 'warning') ? 5200 : 4000;
  showCBTNotification(type, title, msg, duration);
};


// ============================================================================
// DIALOG KONFIRMASI MODERN
// ============================================================================
function showCBTConfirm({
  type = 'danger',
  title = 'Konfirmasi Tindakan',
  message = 'Apakah Anda yakin ingin melanjutkan?',
  confirmText = 'Ya, Lanjutkan',
  cancelText = 'Batal'
} = {}) {
  return new Promise((resolve) => {
    const icons = {
      danger: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`,
      warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`,
      info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
    };

    const backdrop = document.createElement('div');
    backdrop.className = 'cbt-modal-backdrop';
    backdrop.innerHTML = `
      <div class="cbt-modal-box" role="dialog" aria-modal="true">
        <div class="cbt-modal-icon ${type}">${icons[type] || icons.info}</div>
        <div class="cbt-modal-title">${title}</div>
        <div class="cbt-modal-msg">${message}</div>
        <div class="cbt-modal-actions">
          <button type="button" class="cbt-modal-btn cancel" id="cbtModalCancel">${cancelText}</button>
          <button type="button" class="cbt-modal-btn ${type}" id="cbtModalConfirm">${confirmText}</button>
        </div>
      </div>
    `;

    const closeModal = (result) => {
      document.removeEventListener('keydown', onKeyDown);
      backdrop.classList.add('closing');
      setTimeout(() => {
        backdrop.remove();
        resolve(result);
      }, 190);
    };

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal(false);
    };

    backdrop.querySelector('#cbtModalCancel').addEventListener('click', () => closeModal(false));
    backdrop.querySelector('#cbtModalConfirm').addEventListener('click', () => closeModal(true));
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal(false);
    });
    document.addEventListener('keydown', onKeyDown);

    document.body.appendChild(backdrop);
    backdrop.querySelector('#cbtModalConfirm').focus();
  });
}


// ============================================================================
// UTILITAS IMPOR & TEMPLAT MICROSOFT WORD (.DOCX) TANPA DEPENDENSI EKSTERNAL
// ============================================================================
function _cbtCrc32(bytes) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < bytes.length; i++) {
    crc ^= bytes[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc & 1) ? ((crc >>> 1) ^ 0xEDB88320) : (crc >>> 1);
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function _cbtXmlEscape(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Membuat & mengunduh file Microsoft Word (.docx) valid berisi tabel terformat
 */
function downloadDOCX(filename, docTitle, docSubtitle, headers, rows) {
  const enc = new TextEncoder();

  const headerCellsXml = headers.map(h => `
    <w:tc>
      <w:tcPr>
        <w:shd w:val="clear" w:color="auto" w:fill="831843"/>
        <w:tcMar>
          <w:top w:w="100" w:type="dxa"/><w:bottom w:w="100" w:type="dxa"/>
          <w:left w:w="120" w:type="dxa"/><w:right w:w="120" w:type="dxa"/>
        </w:tcMar>
      </w:tcPr>
      <w:p><w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/><w:sz w:val="20"/></w:rPr><w:t xml:space="preserve">${_cbtXmlEscape(h)}</w:t></w:r></w:p>
    </w:tc>`).join('');

  const dataRowsXml = rows.map(r => {
    const cellsXml = headers.map((_, idx) => {
      const val = r[idx] !== undefined ? r[idx] : '';
      return `
      <w:tc>
        <w:tcPr>
          <w:tcMar>
            <w:top w:w="80" w:type="dxa"/><w:bottom w:w="80" w:type="dxa"/>
            <w:left w:w="120" w:type="dxa"/><w:right w:w="120" w:type="dxa"/>
          </w:tcMar>
        </w:tcPr>
        <w:p><w:r><w:rPr><w:sz w:val="20"/></w:rPr><w:t xml:space="preserve">${_cbtXmlEscape(val)}</w:t></w:r></w:p>
      </w:tc>`;
    }).join('');
    return `<w:tr>${cellsXml}</w:tr>`;
  }).join('');

  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:r>
        <w:rPr><w:b/><w:color w:val="831843"/><w:sz w:val="28"/></w:rPr>
        <w:t>${_cbtXmlEscape(docTitle)}</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:rPr><w:i/><w:color w:val="475569"/><w:sz w:val="19"/></w:rPr>
        <w:t>${_cbtXmlEscape(docSubtitle)}</w:t>
      </w:r>
    </w:p>
    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="5000" w:type="pct"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
          <w:left w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
          <w:bottom w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
          <w:right w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>
        </w:tblBorders>
      </w:tblPr>
      <w:tr>${headerCellsXml}</w:tr>
      ${dataRowsXml}
    </w:tbl>
    <w:p/>
    <w:sectPr>
      <w:pgSz w:w="16838" w:h="11906" w:orient="landscape"/>
      <w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720"/>
    </w:sectPr>
  </w:body>
</w:document>`;

  const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

  const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

  const files = [
    { name: '[Content_Types].xml', data: enc.encode(contentTypesXml) },
    { name: '_rels/.rels', data: enc.encode(relsXml) },
    { name: 'word/document.xml', data: enc.encode(documentXml) }
  ];

  const blob = _cbtBuildZipBlob(files, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename.endsWith('.docx') ? filename : filename + '.docx';
  link.click();
}

function _cbtBuildZipBlob(files, mimeType) {
  const enc = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  files.forEach(f => {
    const nameBytes = enc.encode(f.name);
    const crc = _cbtCrc32(f.data);
    const size = f.data.length;

    const lfh = new Uint8Array(30 + nameBytes.length);
    const lv = new DataView(lfh.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(6, 0x0800, true);
    lv.setUint16(8, 0, true);
    lv.setUint16(10, 0, true);
    lv.setUint16(12, 0, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, size, true);
    lv.setUint32(22, size, true);
    lv.setUint16(26, nameBytes.length, true);
    lv.setUint16(28, 0, true);
    lfh.set(nameBytes, 30);

    localParts.push(lfh, f.data);

    const cdh = new Uint8Array(46 + nameBytes.length);
    const cv = new DataView(cdh.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(8, 0x0800, true);
    cv.setUint16(10, 0, true);
    cv.setUint16(12, 0, true);
    cv.setUint16(14, 0, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, size, true);
    cv.setUint32(24, size, true);
    cv.setUint16(28, nameBytes.length, true);
    cv.setUint16(30, 0, true);
    cv.setUint16(32, 0, true);
    cv.setUint16(34, 0, true);
    cv.setUint16(36, 0, true);
    cv.setUint32(38, 0, true);
    cv.setUint32(42, offset, true);
    cdh.set(nameBytes, 46);

    centralParts.push(cdh);
    offset += lfh.length + size;
  });

  const cdOffset = offset;
  const cdSize = centralParts.reduce((acc, b) => acc + b.length, 0);
  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(4, 0, true);
  ev.setUint16(6, 0, true);
  ev.setUint16(8, files.length, true);
  ev.setUint16(10, files.length, true);
  ev.setUint32(12, cdSize, true);
  ev.setUint32(16, cdOffset, true);
  ev.setUint16(20, 0, true);

  return new Blob([...localParts, ...centralParts, eocd], { type: mimeType });
}

function _cbtExcelColName(colIdxZeroBased) {
  let n = colIdxZeroBased + 1;
  let name = '';
  while (n > 0) {
    const rem = (n - 1) % 26;
    name = String.fromCharCode(65 + rem) + name;
    n = Math.floor((n - 1) / 26);
  }
  return name;
}

/**
 * Membuat & mengunduh file Microsoft Excel (.xlsx) valid tanpa dependensi eksternal
 */
function downloadXLSX(filename, sheetName, headers, rows) {
  const enc = new TextEncoder();
  const safeSheetName = String(sheetName || 'Data')
    .replace(/[\\/?*\[\]:]/g, ' ')
    .trim()
    .slice(0, 31) || 'Data';

  const colWidths = headers.map((h, cIdx) => {
    let maxLen = String(h || '').length;
    rows.forEach(r => {
      const val = r[cIdx] !== undefined && r[cIdx] !== null ? String(r[cIdx]) : '';
      if (val.length > maxLen) maxLen = val.length;
    });
    return Math.min(48, Math.max(12, maxLen + 4));
  });

  const colsXml = colWidths.map((w, idx) =>
    `<col min="${idx + 1}" max="${idx + 1}" width="${w}" customWidth="1"/>`
  ).join('');

  const headerCellsXml = headers.map((h, cIdx) => {
    const ref = `${_cbtExcelColName(cIdx)}1`;
    return `<c r="${ref}" t="inlineStr" s="1"><is><t>${_cbtXmlEscape(h)}</t></is></c>`;
  }).join('');

  const dataRowsXml = rows.map((r, rIdx) => {
    const rowNum = rIdx + 2;
    const styleIdx = (rIdx % 2 === 1) ? '3' : '2';
    const cellsXml = headers.map((_, cIdx) => {
      const ref = `${_cbtExcelColName(cIdx)}${rowNum}`;
      const rawVal = r[cIdx];
      if (typeof rawVal === 'number' && Number.isFinite(rawVal)) {
        return `<c r="${ref}" s="${styleIdx}"><v>${rawVal}</v></c>`;
      }
      const strVal = rawVal !== undefined && rawVal !== null ? String(rawVal) : '';
      return `<c r="${ref}" t="inlineStr" s="${styleIdx}"><is><t xml:space="preserve">${_cbtXmlEscape(strVal)}</t></is></c>`;
    }).join('');
    return `<row r="${rowNum}" ht="20" customHeight="1">${cellsXml}</row>`;
  }).join('');

  const lastColRef = _cbtExcelColName(Math.max(0, headers.length - 1));
  const lastRowNum = Math.max(1, rows.length + 1);
  const dimensionRef = `A1:${lastColRef}${lastRowNum}`;

  const sheetXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <dimension ref="${dimensionRef}"/>
  <sheetViews>
    <sheetView workbookViewId="0">
      <pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/>
    </sheetView>
  </sheetViews>
  <sheetFormatPr defaultRowHeight="20"/>
  <cols>${colsXml}</cols>
  <sheetData>
    <row r="1" ht="24" customHeight="1">${headerCellsXml}</row>
    ${dataRowsXml}
  </sheetData>
  <autoFilter ref="${dimensionRef}"/>
</worksheet>`;

  const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="2">
    <font><sz val="11"/><name val="Calibri"/><color rgb="FF1E293B"/></font>
    <font><b/><sz val="11"/><name val="Calibri"/><color rgb="FFFFFFFF"/></font>
  </fonts>
  <fills count="4">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF831843"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFDF2F8"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border>
      <left style="thin"><color rgb="FFCBD5E1"/></left>
      <right style="thin"><color rgb="FFCBD5E1"/></right>
      <top style="thin"><color rgb="FFCBD5E1"/></top>
      <bottom style="thin"><color rgb="FFCBD5E1"/></bottom>
      <diagonal/>
    </border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="4">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1">
      <alignment horizontal="center" vertical="center" wrapText="1"/>
    </xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1">
      <alignment vertical="center"/>
    </xf>
    <xf numFmtId="0" fontId="0" fillId="3" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1">
      <alignment vertical="center"/>
    </xf>
  </cellXfs>
</styleSheet>`;

  const workbookXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="${_cbtXmlEscape(safeSheetName)}" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>`;

  const workbookRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;

  const rootRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`;

  const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`;

  const files = [
    { name: '[Content_Types].xml', data: enc.encode(contentTypesXml) },
    { name: '_rels/.rels', data: enc.encode(rootRelsXml) },
    { name: 'xl/workbook.xml', data: enc.encode(workbookXml) },
    { name: 'xl/_rels/workbook.xml.rels', data: enc.encode(workbookRelsXml) },
    { name: 'xl/styles.xml', data: enc.encode(stylesXml) },
    { name: 'xl/worksheets/sheet1.xml', data: enc.encode(sheetXml) }
  ];

  const blob = _cbtBuildZipBlob(files, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename.endsWith('.xlsx') ? filename : filename + '.xlsx';
  link.click();
}

/**
 * Membaca file .docx di browser (mendukung tabel Word maupun paragraf teks)
 */
async function parseDocxFile(file) {
  if (!file || !file.name.toLowerCase().endsWith('.docx')) {
    throw new Error('Format file harus berupa dokumen Microsoft Word (.docx).');
  }
  const buf = await file.arrayBuffer();
  const bytes = new Uint8Array(buf);
  const view = new DataView(buf);

  // Cari End of Central Directory (0x06054b50) dari belakang
  let eocdPos = -1;
  const minPos = Math.max(0, bytes.length - 65557);
  for (let i = bytes.length - 22; i >= minPos; i--) {
    if (view.getUint32(i, true) === 0x06054b50) {
      eocdPos = i;
      break;
    }
  }
  if (eocdPos < 0) {
    throw new Error('File .docx tidak valid atau rusak (struktur ZIP tidak ditemukan).');
  }

  const totalEntries = view.getUint16(eocdPos + 10, true);
  let cdPos = view.getUint32(eocdPos + 16, true);
  const dec = new TextDecoder('utf-8');
  let docXmlBytes = null;
  let compressionMethod = 0;

  for (let i = 0; i < totalEntries; i++) {
    if (cdPos + 46 > bytes.length || view.getUint32(cdPos, true) !== 0x02014b50) break;
    const method = view.getUint16(cdPos + 10, true);
    const compSize = view.getUint32(cdPos + 20, true);
    const nameLen = view.getUint16(cdPos + 28, true);
    const extraLen = view.getUint16(cdPos + 30, true);
    const commentLen = view.getUint16(cdPos + 32, true);
    const lfhOffset = view.getUint32(cdPos + 42, true);

    const entryName = dec.decode(bytes.subarray(cdPos + 46, cdPos + 46 + nameLen));
    if (entryName === 'word/document.xml') {
      const lfhNameLen = view.getUint16(lfhOffset + 26, true);
      const lfhExtraLen = view.getUint16(lfhOffset + 28, true);
      const dataStart = lfhOffset + 30 + lfhNameLen + lfhExtraLen;
      docXmlBytes = bytes.subarray(dataStart, dataStart + compSize);
      compressionMethod = method;
      break;
    }
    cdPos += 46 + nameLen + extraLen + commentLen;
  }

  if (!docXmlBytes) {
    throw new Error('Konten dokumen (word/document.xml) tidak ditemukan di dalam file .docx.');
  }

  let xmlText = '';
  if (compressionMethod === 0) {
    xmlText = dec.decode(docXmlBytes);
  } else if (compressionMethod === 8) {
    const ds = new DecompressionStream('deflate-raw');
    const writer = ds.writable.getWriter();
    writer.write(docXmlBytes);
    writer.close();
    const decompressedBuf = await new Response(ds.readable).arrayBuffer();
    xmlText = dec.decode(decompressedBuf);
  } else {
    throw new Error('Metode kompresi ZIP pada file .docx tidak didukung.');
  }

  const xmlDoc = new DOMParser().parseFromString(xmlText, 'application/xml');
  const getParaText = (pNode) => {
    const texts = [];
    const walker = xmlDoc.createTreeWalker(pNode, NodeFilter.SHOW_ELEMENT, null);
    let node = walker.nextNode();
    while (node) {
      const ln = node.localName;
      if (ln === 't') texts.push(node.textContent || '');
      else if (ln === 'tab') texts.push('\t');
      else if (ln === 'br' || ln === 'cr') texts.push('\n');
      node = walker.nextNode();
    }
    return texts.join('').trim();
  };

  // Ekstrak seluruh tabel (<w:tbl>)
  const tables = [];
  const tblNodes = Array.from(xmlDoc.getElementsByTagName('*')).filter(n => n.localName === 'tbl');
  tblNodes.forEach(tbl => {
    const rows = [];
    const trNodes = Array.from(tbl.childNodes).filter(n => n.localName === 'tr');
    trNodes.forEach(tr => {
      const cells = [];
      const tcNodes = Array.from(tr.childNodes).filter(n => n.localName === 'tc');
      tcNodes.forEach(tc => {
        const pNodes = Array.from(tc.childNodes).filter(n => n.localName === 'p');
        const cellText = pNodes.map(getParaText).filter(Boolean).join('\n').trim();
        cells.push(cellText);
      });
      if (cells.some(c => c !== '')) rows.push(cells);
    });
    if (rows.length > 0) tables.push(rows);
  });

  // Ekstrak paragraf di luar tabel (<w:body> > <w:p>)
  const bodyNode = Array.from(xmlDoc.getElementsByTagName('*')).find(n => n.localName === 'body');
  const paragraphs = [];
  if (bodyNode) {
    Array.from(bodyNode.childNodes).forEach(n => {
      if (n.localName === 'p') {
        const txt = getParaText(n);
        if (txt) paragraphs.push(txt);
      }
    });
  }

  return { tables, paragraphs };
}

/**
 * Toggle tampilkan / sembunyikan password pada kolom input
 */
function togglePasswordVisibility(inputId, btnEl) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  if (btnEl) {
    btnEl.setAttribute('aria-label', isHidden ? 'Sembunyikan password' : 'Lihat password');
    btnEl.setAttribute('title', isHidden ? 'Sembunyikan password' : 'Lihat password');
    const icon = btnEl.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-eye', !isHidden);
      icon.classList.toggle('fa-eye-slash', isHidden);
    }
  }
}


// ============================================================================
// HELPER KONTEN KAYA (EDITOR WORD, RUMUS MATEMATIKA & KOMPRESI GAMBAR)
// ============================================================================
function sanitizeCbtRichHtml(rawHtml) {
  if (rawHtml === null || rawHtml === undefined) return '';
  const str = String(rawHtml);
  // Jika teks biasa tanpa tag HTML, pertahankan baris baru
  if (!/<[a-z][\s\S]*>/i.test(str)) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');
  }
  const tpl = document.createElement('template');
  tpl.innerHTML = str;

  // Hapus elemen berbahaya
  tpl.content.querySelectorAll('script, style, iframe, object, embed, form, input, button, link, meta').forEach(el => el.remove());

  // Bersihkan atribut event handler (onclick, onerror, onload, dll.)
  tpl.content.querySelectorAll('*').forEach(el => {
    Array.from(el.attributes).forEach(attr => {
      const name = attr.name.toLowerCase();
      const val = (attr.value || '').trim().toLowerCase();
      if (name.startsWith('on') || val.startsWith('javascript:')) {
        el.removeAttribute(attr.name);
      }
    });
    if (el.tagName === 'IMG') {
      el.classList.add('cbt-img-zoomable');
    }
  });

  return tpl.innerHTML;
}

function stripHtmlToPlainText(htmlStr) {
  if (!htmlStr) return '';
  const div = document.createElement('div');
  div.innerHTML = String(htmlStr);
  return (div.textContent || div.innerText || '').replace(/\s+/g, ' ').trim();
}

function normalizeAnswerValue(val) {
  if (!val) return '';
  return String(val)
    .replace(/contenteditable="true"/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function compressImageFileToDataUrl(file, maxWidth = 900, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type || !file.type.startsWith('image/')) {
      return reject(new Error('File harus berupa gambar (JPG, PNG, WebP, GIF, atau SVG).'));
    }
    // SVG langsung baca sebagai Data URL tanpa rasterisasi
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Gagal membaca file SVG.'));
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxWidth) {
          h = Math.round((h * maxWidth) / w);
          w = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);

        const outType = (file.type === 'image/png' && file.size < 180000) ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(outType, quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('File gambar tidak dapat diproses.'));
      img.src = ev.target.result;
    };
    reader.onerror = () => reject(new Error('Gagal membaca file gambar.'));
    reader.readAsDataURL(file);
  });
}

function openCbtImageZoom(src) {
  if (!src) return;
  let lb = document.getElementById('cbtGlobalLightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'cbtGlobalLightbox';
    lb.className = 'cbt-lightbox';
    lb.innerHTML = '<img id="cbtGlobalLightboxImg" src="" alt="Perbesar Gambar">';
    lb.onclick = () => { lb.style.display = 'none'; };
    document.body.appendChild(lb);
  }
  document.getElementById('cbtGlobalLightboxImg').src = src;
  lb.style.display = 'flex';
}
