/**
 * KALENDER JAWA MODERN - VERSI FINAL STABIL
 * Perbaikan: Klik Tanggal Aktif, Cari Tanggal Fungsi, Semua Data Show Detail Muncul.
 */

// ==========================================
// KONSTANTA & DATA REFERENSI
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const KAMAROKAM_6 = {
    1: { nama: "NUJU PADU", arti: "Wataknya Jelek, segala sesuatu selalu kudu sulaya, dan sering bertengkar. Manfaat: Mendirikan dapur, warung, restaurant." },
    2: { nama: "KALA TINANTANG", arti: "Wataknya Jelek, selalu kekurangan dan sering sakit-sakitan. Manfaat: Mendirikan dapur, warung, restaurant." },
    3: { nama: "SANGGAR WARINGIN", arti: "Wataknya Baik, tenteram, bahagia, rejeki berkembang. Manfaat: Hajatan, pindah rumah, tempat ibadah." },
    4: { nama: "MANTRI SINAROJA", arti: "Wataknya Baik, tercapai cita-cita, hidup senang tidak kekurangan. Manfaat: Hajatan, pindah rumah." },
    5: { nama: "MACAN KETAWAN", arti: "Wataknya sedang-sedang saja, disegani tetapi juga dijauhi. Manfaat: Mendirikan rumah dan pintu regol." },
    0: { nama: "NUJU PATI", arti: "Wataknya Mampet rejekinya, susah hidupnya, sering bencana. Manfaat: Membuat paku bumi dan jabung." }
};

const NASIB_AHLI_WARIS = { 
    1: { nama: "Gunung", arti: "Kehidupan yang mulia bagi ahli waris." },
    2: { nama: "Guntur", arti: "Ahli waris akan mendapatkan kesulitan." },
    3: { nama: "Segoro", arti: "Kemudahan dalam mencari rezeki." },
    0: { nama: "Asat", arti: "Kesulitan dalam mendapatkan rezeki." }
};

const PEMBAGI_5 = { 
    1: { nama: "Sri", arti: "Murah rezeki dan hidup makmur." },
    2: { nama: "Lungguh", arti: "Mendapatkan kedudukan atau pangkat tinggi." },
    3: { nama: "Gendhong", arti: "Mapan secara lahiriah dan dihargai orang." },
    4: { nama: "Loro", arti: "Sering menghadapi rintangan kesehatan/hidup." },
    0: { nama: "Pati", arti: "Banyak hambatan, perlu kehati-hatian dalam melangkah." }
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

let current = new Date();
const TODAY = new Date();

// ==========================================
// FUNGSI LOGIKA UTAMA
// ==========================================

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getZodiak(date) {
    const d = date.getDate(); const m = date.getMonth() + 1;
    if ((m == 3 && d >= 21) || (m == 4 && d <= 19)) return "Aries";
    if ((m == 4 && d >= 20) || (m == 5 && d <= 20)) return "Taurus";
    if ((m == 5 && d >= 21) || (m == 6 && d <= 20)) return "Gemini";
    if ((m == 6 && d >= 21) || (m == 7 && d <= 22)) return "Cancer";
    if ((m == 7 && d >= 23) || (m == 8 && d <= 22)) return "Leo";
    if ((m == 8 && d >= 23) || (m == 9 && d <= 22)) return "Virgo";
    if ((m == 9 && d >= 23) || (m == 10 && d <= 22)) return "Libra";
    if ((m == 10 && d >= 23) || (m == 11 && d <= 21)) return "Scorpio";
    if ((m == 11 && d >= 22) || (m == 12 && d <= 21)) return "Sagittarius";
    if ((m == 12 && d >= 22) || (m == 1 && d <= 19)) return "Capricorn";
    if ((m == 1 && d >= 20) || (m == 2 && d <= 18)) return "Aquarius";
    return "Pisces";
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
    const refTglJawa = 9;
    const refBulanIdx = 7; 
    const refTahunJawa = 1959;
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let tglJawa = refTglJawa + diffDays;
    let bulanIdx = refBulanIdx;
    let tahunJawa = refTahunJawa;
    while (tglJawa > 30) { tglJawa -= 30; bulanIdx = (bulanIdx + 1) % 12; if (bulanIdx === 0) tahunJawa++; }
    while (tglJawa <= 0) { tglJawa += 30; bulanIdx = (bulanIdx - 1 + 12) % 12; if (bulanIdx === 11) tahunJawa--; }
    return { tanggal: tglJawa, bulan: DATA_BULAN_JAWA[bulanIdx], tahun: tahunJawa };
}

// ==========================================
// RENDER UI & NAVIGASI
// ==========================================

function generateCalendar() {
    const grid = document.getElementById('calendar');
    if (!grid) return;
    
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    const mNav = document.getElementById('monthYearNav');
    if(mNav) mNav.innerText = `${namaBulan[m]} ${y}`;

    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        el.className = 'header-day' + (i === 0 ? ' sunday' : '');
        grid.appendChild(el);
    });

    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));

    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(y, m, d);
        const p = getPasaran(dateObj);
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        if (dateObj.getDay() === 0) cell.classList.add('sunday-block');
        if (dateObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');
        
        cell.innerHTML = `<div class="date-num">${d}</div><div class="pasaran-text">${p}</div>`;
        // Gunakan event listener murni agar stabil
        cell.addEventListener('click', function() {
            document.querySelectorAll('.calendar-day').forEach(c => c.classList.remove('selected-day'));
            cell.classList.add('selected-day');
            updateDetail(new Date(y, m, d), p);
        });
        grid.appendChild(cell);
    }
}

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const wetonKey = `${h} ${pasaran}`;
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const wukuName = getWuku(date);
    const infoJawa = getTanggalJawa(date);
    const zodiak = getZodiak(date);
    
    // Data Pembagi
    const nasib5 = PEMBAGI_5[neptu % 5];
    const nasib6 = KAMAROKAM_6[neptu % 6];
    const nasib4 = NASIB_AHLI_WARIS[neptu % 4];

    // Perhitungan Usia
    let ageY = TODAY.getFullYear() - date.getFullYear();
    let ageM = TODAY.getMonth() - date.getMonth();
    if (ageM < 0 || (ageM === 0 && TODAY.getDate() < date.getDate())) ageY--;
    const usiaTeks = ageY < 0 ? "Belum lahir" : ageY + " Tahun";

    // Data Meditasi
    const mapMeditasi = { 7:"Barat", 8:"Utara", 9:"Timur", 10:"Selatan", 11:"Barat", 12:"Utara", 13:"Timur", 14:"Selatan", 15:"Barat", 16:"Utara", 17:"Timur", 18:"Selatan" };
    const meditasi = mapMeditasi[neptu] || "Pusat";

    // Pengecekan Data Watak Eksternal
    const watakNeptu = (typeof DATA_WATAK_NEPTU !== 'undefined') ? DATA_WATAK_NEPTU[neptu] : { watak: "Data watak neptu belum dimuat." };
    const teksWuku = (typeof DATA_WUKU !== 'undefined') ? (DATA_WUKU[wukuName] || "Data wuku belum dimuat.") : "Analisis wuku tersedia di database.";
    const teksHari = (typeof DATA_HARI !== 'undefined') ? (DATA_HARI[wetonKey] || "Data watak hari belum dimuat.") : "Analisis watak hari lahir.";
    const mangsa = (typeof getMangsaInfo === 'function') ? getMangsaInfo(date) : { nama: "Mangsa", deskripsi: "Informasi mangsa belum tersedia." };
    const dataSriJati = (typeof TABEL_SRIJATI !== 'undefined') ? (TABEL_SRIJATI[neptu] || []) : [];

    const tglMasehi = `${date.getDate()} ${["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"][date.getMonth()]} ${date.getFullYear()}`;

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <style>@media print { .no-print, #calendar, .nav-container { display: none !important; } #detail { width: 100%; display: block; } }</style>
        <div id="fullReport" style="background:#fff; padding:20px; border:1px solid #ddd; border-radius:12px; color:#000;">
            <div style="display:flex; justify-content:space-between; align-items:center;" class="no-print">
                <h2 style="color:#D30000; border-bottom:2px solid #D30000; margin:0;">${wetonKey}</h2>
                <div>
                    <button onclick="shareWA()" style="background:#25D366; color:white; border:none; padding:8px 15px; border-radius:5px; cursor:pointer;">Share WA</button>
                    <button onclick="window.print()" style="background:#333; color:white; border:none; padding:8px 15px; border-radius:5px; cursor:pointer;">Cetak PDF</button>
                </div>
            </div>

            <p style="font-size:1.1rem; margin:15px 0 5px;"><strong>📅 Masehi:</strong> ${tglMasehi}</p>
            <p style="color:#D30000; margin:0;"><strong>🌙 Jawa:</strong> ${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun} AJ</p>
            <p style="margin:5px 0;"><strong>⏳ Usia:</strong> ${usiaTeks} | <strong>🧘 Meditasi:</strong> ${meditasi}</p>
            <p style="margin:5px 0;"><strong>♈ Zodiak:</strong> ${zodiak} | <strong>🐾 Wuku:</strong> ${wukuName} | <strong>🔢 Neptu:</strong> ${neptu}</p>

            <div style="background:#fff4e5; border-left:5px solid #ff9800; padding:10px; margin:15px 0;">
                <h4 style="margin:0; color:#e65100;">⚖️ KAMAROKAM (Pembagi 6): ${nasib6.nama}</h4>
                <p style="font-size:0.85rem; margin:5px 0;">${nasib6.arti}</p>
            </div>

            <div style="background:#f1f8e9; border-left:5px solid #4caf50; padding:10px; margin:15px 0;">
                <h4 style="margin:0; color:#1b5e20;">💎 SRI (Pembagi 5): ${nasib5.nama}</h4>
                <p style="font-size:0.85rem; margin:5px 0;">${nasib5.arti}</p>
            </div>

            <div style="background:#e3f2fd; border-left:5px solid #2196f3; padding:10px; margin:15px 0;">
                <h4 style="margin:0; color:#0d47a1;">🌾 PRANATA MANGSA: ${mangsa.nama}</h4>
                <p style="font-size:0.85rem; margin:5px 0;">${mangsa.deskripsi}</p>
            </div>

            <div style="margin-top:20px;">
                <h4 style="color:#D30000; border-bottom:1px solid #eee;">🌟 WATAK NEPTU & HARI</h4>
                <p style="font-size:0.85rem; line-height:1.5;">${watakNeptu.watak}</p>
                <p style="font-size:0.85rem; line-height:1.5; margin-top:10px;">${teksHari}</p>
            </div>

            <div style="margin-top:20px;">
                <h4 style="color:#D30000; border-bottom:1px solid #eee;">🛡️ ANALISIS WUKU</h4>
                <p style="font-size:0.85rem; line-height:1.5;">${teksWuku}</p>
            </div>

            <div style="margin-top:20px;">
                <h4 style="color:#D30000; border-bottom:1px solid #eee;">📈 SIKLUS REJEKI (SRI JATI)</h4>
                <p style="font-size:0.8rem; color:#666;">Data siklus rejeki berdasarkan usia.</p>
                </div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// --- FUNGSI TOOLS ---
function shareWA() {
    const report = document.getElementById('fullReport').innerText.replace(/Share WA|Cetak PDF/g, '');
    window.open("https://wa.me/?text=" + encodeURIComponent("*DETAIL KALENDER JAWA*\n\n" + report), "_blank");
}

function cariTanggal() {
    const input = document.getElementById('inputTgl');
    if(!input || !input.value) return;
    const d = new Date(input.value);
    current = new Date(d.getFullYear(), d.getMonth(), 1);
    generateCalendar();
    updateDetail(d, getPasaran(d));
}

// ==========================================
// INISIALISASI
// ==========================================
window.onload = () => {
    generateCalendar();
    updateDetail(TODAY, getPasaran(TODAY));

    // Navigasi
    const p = document.getElementById('prevMonth');
    const n = document.getElementById('nextMonth');
    if(p) p.onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    if(n) n.onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
    
    // Tombol Cari
    const b = document.getElementById('btnCari');
    if(b) b.onclick = cariTanggal;
};