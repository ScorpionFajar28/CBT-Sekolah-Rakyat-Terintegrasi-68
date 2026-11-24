// ============================================================================
// shared-cbt.js - Koneksi Cloud Real-Time Vercel <-> Supabase PostgreSQL
// ============================================================================
// ISI KREDENSIAL SUPABASE ANDA DI BAWAH INI (Dari Supabase: Project Settings -> API)
// ============================================================================
// shared-cbt.js - Koneksi Cloud Real-Time Vercel <-> Supabase PostgreSQL
// ============================================================================
const SUPABASE_URL = 'https://agyhebafhrctmkgwsuku.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFneWhlYmFmaHJjdG1rZ3dzdWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU0MDI1MDMsImV4cCI6MjExMDk3ODUwM30.3SohuyrPNXhHldMwCT3jBZEKhwuu1YUNla-nrfL5QpI';

const CACHE_KEY = 'CBT_SUPABASE_CACHE_V1';
const CLASSES_META_KEY = 'CBT_CLASSES_META_V1';
const IS_CONFIGURED = SUPABASE_URL.startsWith('https://') && !SUPABASE_URL.includes('GANTI-DENGAN');

const DEFAULT_CLASSES_LIST = [];

function loadSavedClassesMeta() {
  try {
    const rawStr = localStorage.getItem(CLASSES_META_KEY);
    if (rawStr !== null) {
      const raw = JSON.parse(rawStr);
      if (Array.isArray(raw)) return raw;
    }
  } catch (e) {}
  return [];
}

let DB_CACHE = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null') || {
  settings: {
    examTitle: 'Portal Aplikasi Asesmen Sumatif Akhir Semester (ASAS)',
    subject: '',
    durationMinutes: 45,
    activeToken: 'CBT2026',
    shuffleQuestions: true,
    shuffleOptions: true,
    showReviewAfterSubmit: true,
    maxViolations: 4,
    subjectsList: []
  },
  classesList: loadSavedClassesMeta(),
  users: [
    {
      id: 'USR_ADMIN_1',
      username: 'admin',
      password: '123',
      name: 'Administrator Utama',
      role: 'Admin',
      kelas: 'Panitia Ujian',
      idKelas: '-',
      sesi: '-',
      ruang: '-'
    }
  ],
  questions: [],
  sessionsList: [
    { id: 'S1', name: 'Sesi 1', start: '07:30', end: '09:30', kelasAkses: 'ALL' },
    { id: 'S2', name: 'Sesi 2', start: '10:00', end: '12:00', kelasAkses: 'ALL' },
    { id: 'S3', name: 'Sesi 3', start: '13:00', end: '15:00', kelasAkses: 'ALL' }
  ],
  roomsList: [
    { id: 'R1', name: 'Lab Komputer 1', capacity: 36, note: 'Gedung Utama Lt. 1', kelasAkses: 'ALL' },
    { id: 'R2', name: 'Lab Komputer 2', capacity: 36, note: 'Gedung Utama Lt. 2', kelasAkses: 'ALL' }
  ],
  sessions: {}
};

if (!Array.isArray(DB_CACHE.classesList)) {
  DB_CACHE.classesList = loadSavedClassesMeta();
}

// Pastikan akun Administrator bawaan (admin / 123) selalu tersedia
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
        if (ans.toLowerCase() === (q.answer || '').toLowerCase()) autoScore += Number(q.weight || 0);
      } else {
        if (ans === q.answer) autoScore += Number(q.weight || 0);
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
      <a href="2-bank-soal.html" class="${activeFile === '2-bank-soal.html' ? 'active' : ''}"><i class="fa-solid fa-book-open"></i><span>Bank Soal & Mapel</span></a>
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
      <a href="2-bank-soal.html" class="${activeFile === '2-bank-soal.html' ? 'active' : ''}"><i class="fa-solid fa-book-open"></i><span>Bank Soal & Mapel</span></a>
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
