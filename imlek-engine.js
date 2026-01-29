/**
 * KALENDER JAWA MODERN - VERSI FINAL FIX 2026
 * Integrasi Penuh: Jawa, Masehi, Imlek & Horoskop
 */

// ==========================================
// KONSTANTA & DATA REFERENSI
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const DATA_SIFAT_PASARAN = {
    'KLIWON': 'Pandai bicara dan bergaul, periang, ambisius, urakan, kurang bisa membalas budi, setia pada janji, ceroboh memilih makanan, banyak selamat dan doanya.',
    'LEGI': 'Bertanggung jawab, murah hati, enak dalam pergaulan, selalu gembira seperti tidak pernah susah, sering kena fitnah, kuat tidak tidur malam hari, berhati-hati namun sering bingung sendiri, bicaranya berisi. Banyak keberuntungan dan kesialannya.',
    'PAHING': 'Selalu ingin memiliki (barang), kesungguhannya penuh perhitungan untuk mendapatkan untung, suka menolong, mandiri, kuat lapar, banyak musuhnya, kalau tersinggung menakutkan marahnya, suka kebersihan. Sering kena tipu dan kalau kehilangan jarang bisa menemukan kembali.',
    'PON': 'Bicaranya banyak diterima orang, suka tinggal di rumah, tidak mau memakan yang bukan kepunyaannya sendiri, suka marah kepada keluarganya, jalan pikirannya sering berbeda dengan pandangan umum. Suka berbantahan, berani kepada atasan. Rejekinya cukup.',
    'WAGE': 'Menarik tetapi angkuh, setia dan penurut, malas mencari nafkah perlu dibantu orang lain, kaku hati, tidak bisa berpikir panjang, sering gelap pikiran dan mendapat fitnah.'
};

const DATA_SIFAT_HARI = {
    'Minggu': 'Tekun, mandiri dan berwibawa.',
    'Senin': 'Selalu berubah, indah dan selalu mendapatkan simpati.',
    'Selasa': 'Pemarah dan pencemburu serta luas pergaulannya.',
    'Rabu': 'Pendiam, pemomong dan penyabar.',
    'Kamis': 'Sangar menakutkan.',
    'Jumat': 'Energik dan mengagumkan.',
    'Sabtu': 'Membuat orang merasa senang dan susah ditebak.'
};

const DATA_BULAN_JAWA = [
    { nama: "Sura", status: "Tidak Baik", naas: [6, 11, 13, 14, 17, 18, 27], taliWangke: "Rabu Pahing" },
    { nama: "Sapar", status: "Tidak Baik", naas: [1, 10, 12, 20, 22], taliWangke: "Kamis Pon" },
    { nama: "Mulud", status: "Tidak Baik", naas: [1, 3, 8, 10, 13, 15, 20, 23], taliWangke: "Jumat Wage" },
    { nama: "Bakdamulud", status: "Baik", naas: [10, 15, 16, 20, 25, 28], taliWangke: "Sabtu Kliwon" },
    { nama: "Jumadilawal", status: "Tidak Baik", naas: [1, 5, 10, 11, 16, 26, 28], taliWangke: "Senin Kliwon" },
    { nama: "Jumadilakir", status: "Kurang Baik", naas: [4, 10, 11, 14, 18, 21], taliWangke: "Selasa Legi" },
    { nama: "Rejeb", status: "Tidak Baik", naas: [2, 11, 12, 13, 14, 18, 22, 27], taliWangke: "Rabu Pahing" },
    { nama: "Ruwah", status: "Baik", naas: [4, 12, 13, 19, 24, 26, 28], taliWangke: "Kamis Pon" },
    { nama: "Pasa", status: "Tidak Baik", naas: [7, 9, 10, 15, 20, 21, 24, 25], taliWangke: "Jumat Wage" },
    { nama: "Syawal", status: "Sangat Tidak Baik", naas: [2, 10, 17, 20, 27], taliWangke: "Sabtu Kliwon" },
    { nama: "Dulkaidah", status: "Cukup Baik", naas: [2, 6, 11, 12, 13, 21, 22, 24, 28], taliWangke: "Senin Kliwon" },
    { nama: "Besar", status: "Sangat Baik", naas: [1, 6, 10, 13, 20, 23, 25], taliWangke: "Selasa Wage" }
];

const DATA_SIKLUS_TAHUN = [
    { nama: "Alip", makna: "Niat", deskripsi: "Melambangkan permulaan. Waktunya menanam niat." },
    { nama: "Ehe", makna: "Bekerja", deskripsi: "Melambangkan realisasi tindakan." },
    { nama: "Jimawal", makna: "Pekerjaan", deskripsi: "Melambangkan ketekunan dalam proses." },
    { nama: "Je", makna: "Nasib", deskripsi: "Melambangkan dinamika dan ujian hidup." },
    { nama: "Dal", makna: "Hidup", deskripsi: "Waktunya merenungi hakikat keberadaan." },
    { nama: "Be", makna: "Kembali", deskripsi: "Melambangkan keteguhan pada kebaikan." },
    { nama: "Wawu", makna: "Tujuan", deskripsi: "Fokus pada arah akhir hidup." },
    { nama: "Jimakir", makna: "Selesai", deskripsi: "Fase evaluasi dan melepaskan keterikatan." }
];

const WINDU_LIST = ["Kuntara", "Sangara", "Sancaya", "Adi"];

let current = new Date();
const TODAY = new Date();

// ==========================================
// MESIN PERHITUNGAN (ENGINES)
// ==========================================

function getLunarImlek(date) {
    // Kalibrasi khusus 2026
    const refDate = new Date(2025, 0, 29); // 1-1-2576
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    const LUNAR_CYCLE = 29.53059;
    
    let totalMonths = Math.floor(diffDays / LUNAR_CYCLE);
    let lDay = Math.floor(diffDays % LUNAR_CYCLE) + 1;
    let lMonth = (totalMonths % 12) + 1;
    let lYear = 2576 + Math.floor(totalMonths / 12);

    if (lDay > 30) { lDay = 1; lMonth++; }
    if (lMonth > 12) { lMonth = 1; lYear++; }

    // Shio 2026 adalah Kuda (Bukan Ular/Anjing)
    const shios = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];
    return { tanggal: lDay, bulan: lMonth, tahun: lYear, shio: shios[lYear % 12] };
}

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getWuku(date) {
    const wukuList = ["Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", "Warigalit", "Wariagung", "Julungwangi", "Sungsang", "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut", "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", "Maktal", "Wuye", "Manahil", "Prangbakat", "Bala", "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"];
    const refDate = new Date(2026, 0, 25); 
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let wukuIndex = (20 + Math.floor(diffDays / 7)) % 30;
    while (wukuIndex < 0) wukuIndex += 30;
    return wukuList[wukuIndex];
}

function getTanggalJawa(date) {
    const refDate = new Date(2026, 0, 28); 
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let tglJawa = 9 + diffDays;
    let bulanIdx = 7; let tahunJawa = 1959;
    while (tglJawa > 30) { tglJawa -= 30; bulanIdx = (bulanIdx + 1) % 12; if (bulanIdx === 0) tahunJawa++; }
    while (tglJawa <= 0) { tglJawa += 30; bulanIdx = (bulanIdx - 1 + 12) % 12; if (bulanIdx === 11) tahunJawa--; }
    return { tanggal: tglJawa, bulan: DATA_BULAN_JAWA[bulanIdx], tahun: tahunJawa };
}

function getSiklusBesar(tahunJawa) {
    const diffYears = tahunJawa - 1959;
    let tahunIdx = (7 + diffYears) % 8; if (tahunIdx < 0) tahunIdx += 8;
    let winduIdx = (2 + Math.floor(diffYears / 8)) % 4; if (winduIdx < 0) winduIdx += 4;
    return { tahun: DATA_SIKLUS_TAHUN[tahunIdx], windu: WINDU_LIST[winduIdx] };
}

// ==========================================
// RENDER UI KALENDER
// ==========================================

function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;
    
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    const namaBulanMasehi = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    mNav.innerText = `${namaBulanMasehi[m]} ${y}`;

    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        el.className = 'header-day' + (i === 0 ? ' sunday-red' : '');
        grid.appendChild(el);
    });

    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));

    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(y, m, d);
        const p = getPasaran(dateObj);
        const imlek = getLunarImlek(dateObj);
        
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        if (dateObj.getDay() === 0) cell.classList.add('sunday-red');
        if (dateObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');
        
        cell.innerHTML = `
            <div class="date-num">${d}</div>
            <div class="pasaran-text">${p}</div>
            <div class="imlek-num" style="position:absolute; bottom:2px; right:4px; font-size:9px; color:#D30000; font-weight:bold;">${imlek.tanggal}</div>
        `;
        
        cell.onclick = () => {
            document.querySelectorAll('.calendar-day').forEach(c => c.classList.remove('selected-day'));
            cell.classList.add('selected-day');
            updateDetail(dateObj, p);
        };
        grid.appendChild(cell);
    }
}

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('printableArea');
    if (!detailDiv) return;

    const imlek = getLunarImlek(date);
    const h = HARI[date.getDay()];
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const infoJawa = getTanggalJawa(date);
    const siklus = getSiklusBesar(infoJawa.tahun);
    const wukuName = getWuku(date);

    // Cek Hari Naas
    const isNaas = infoJawa.bulan.naas.includes(infoJawa.tanggal);
    const warningNaas = isNaas ? `<div style="background:#ffebee; color:#c62828; padding:12px; border-radius:8px; margin-bottom:15px; border-left:5px solid #d32f2f;"><strong>⚠️ HARI NAAS:</strong> Tidak disarankan untuk hajat besar.</div>` : "";

    detailDiv.innerHTML = `
        <div class="card-result" style="text-align:left;">
            ${warningNaas}
            
            <div style="background:#fff1f0; padding:12px; border-radius:8px; margin-bottom:15px; border:1px solid #ffa39e;">
                <p style="margin:0; color:#cf1322; font-weight:bold; font-size:1rem;">🧧 Penanggalan Imlek</p>
                <p style="margin:5px 0; font-size:0.9rem;">Tahun ${imlek.tahun}, Bulan ${imlek.bulan}, Tanggal ${imlek.tanggal} (Shio ${imlek.shio})</p>
            </div>

            <h1 style="color:#D30000; margin:0 0 10px 0;">${h} ${pasaran}</h1>
            
            <p style="margin:5px 0;">📅 <strong>Masehi:</strong> ${date.getDate()} ${["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"][date.getMonth()]} ${date.getFullYear()}</p>
            <p style="margin:5px 0;">🌙 <strong>Jawa:</strong> ${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun} AJ</p>
            <p style="margin:5px 0;">🔢 <strong>Neptu:</strong> ${neptu} | <strong>Wuku:</strong> ${wukuName}</p>
            <p style="margin:5px 0;">✨ <strong>Windu:</strong> ${siklus.windu} | <strong>Tahun:</strong> ${siklus.tahun.nama}</p>
            
            <hr style="border:0; border-top:1px solid #eee; margin:15px 0;">
            
            <p style="font-size:0.9rem;"><strong>Sifat Hari (${h}):</strong> ${DATA_SIFAT_HARI[h]}</p>
            <p style="font-size:0.9rem; margin-top:10px;"><strong>Sifat Pasaran (${pasaran}):</strong> ${DATA_SIFAT_PASARAN[pasaran.toUpperCase()]}</p>
            
            <div style="background:#f8f9fa; padding:10px; border-radius:8px; margin-top:15px; font-size:0.8rem; color:#666; font-style:italic;">
                "${siklus.tahun.deskripsi}"
            </div>
        </div>
    `;
    detailDiv.parentElement.style.display = 'block';
}

// ==========================================
// FUNGSI PENDUKUNG
// ==========================================

function searchWeton() {
    const input = document.getElementById('dateInput');
    if (!input || !input.value) return;
    const target = new Date(input.value);
    current = new Date(target.getFullYear(), target.getMonth(), 1);
    generateCalendar();
    updateDetail(target, getPasaran(target));
}

function shareWhatsApp() {
    const text = document.getElementById('printableArea').innerText;
    window.open(`https://wa.me/?text=${encodeURIComponent("*HASIL CEK KALENDER*\n\n" + text)}`);
}

// Inisialisasi
document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
    updateDetail(TODAY, getPasaran(TODAY));
    
    document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
});
