/**
 * KALENDER JAWA MODERN - VERSI FINAL FIX 2026
 * Update: Integrasi Internal Imlek Engine, Detail Perhitungan Neptu & Info Lengkap
 */

// ==========================================
// 🏮 INTERNAL IMLEK ENGINE (PASTI TERDETEKSI)
// ==========================================
const DATA_IMLEK_INTERNAL = [
    {y:2023,m:1,d:22,leap:2}, {y:2024,m:2,d:10,leap:0},
    {y:2025,m:1,d:29,leap:0}, {y:2026,m:2,d:17,leap:0},
    {y:2027,m:2,d:6, leap:0}, {y:2028,m:1,d:26,leap:5},
    {y:2029,m:2,d:13,leap:0}, {y:2030,m:2,d:3, leap:0}
];

function getImlekData(date) {
    const y = date.getFullYear();
    let ref = DATA_IMLEK_INTERNAL.find(r => r.y === y);
    if (!ref || date < new Date(y, ref.m - 1, ref.d)) {
        ref = DATA_IMLEK_INTERNAL.find(r => r.y === y - 1);
    }
    if (!ref) return null;

    const start = new Date(ref.y, ref.m - 1, ref.d);
    let diff = Math.floor((date - start) / 86400000);
    let d = 1, m = 1, yr = ref.y;
    const monthLen = (mon) => (mon === ref.leap ? 29 : 30);

    while (diff > 0) {
        d++;
        if (d > monthLen(m)) { d = 1; m++; if (m > 12) { m = 1; yr++; } }
        diff--;
    }
    
    const SHIOS = ["Tikus","Kerbau","Macan","Kelinci","Naga","Ular","Kuda","Kambing","Monyet","Ayam","Anjing","Babi"];
    const ELEM = ["Kayu","Kayu","Api","Api","Tanah","Tanah","Logam","Logam","Air","Air"];
    const blnNama = ["", "Cia Gwee", "Ji Gwee", "Sa Gwee", "Si Gwee", "Go Gwee", "Lak Gwee", "Tjit Gwee", "Pe Gwee", "Kauw Gwee", "Tjap Gwee", "Tjap It Gwee", "Tjap Ji Gwee"];
    
    return {
        tanggal: d, 
        bulanNama: blnNama[m],
        tahun: yr,
        shio: SHIOS[(yr - 4) % 12],
        elemen: ELEM[Math.floor(((yr - 4) % 10) / 2)]
    };
}

// ==========================================
// KONSTANTA & DATA REFERENSI JAWA
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
// FUNGSI LOGIKA DASAR
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
    let totalHariJawa = refTglJawa + diffDays;
    let bulanIdx = refBulanIdx;
    let tahunJawa = refTahunJawa;
    let tglJawa = totalHariJawa;
    while (tglJawa > 30) { tglJawa -= 30; bulanIdx = (bulanIdx + 1) % 12; if (bulanIdx === 0) tahunJawa++; }
    while (tglJawa <= 0) { tglJawa += 30; bulanIdx = (bulanIdx - 1 + 12) % 12; if (bulanIdx === 11) tahunJawa--; }
    return { tanggal: tglJawa, bulan: DATA_BULAN_JAWA[bulanIdx], tahun: tahunJawa };
}

function getArahMeditasi(neptu) {
    const map = {
        7: "Kulon - Barat", 8: "Lor - Utara", 9: "Wetan - Timur", 10: "Kidul - Selatan",
        11: "Kulon - Barat", 12: "Lor - Utara", 13: "Wetan - Timur", 14: "Kidul - Selatan",
        15: "Kulon - Barat", 16: "Lor - Utara", 17: "Wetan - Timur", 18: "Kidul - Selatan"
    };
    return map[neptu] || "Pusat";
}

function hitungUsiaLengkap(birthDate) {
    let now = new Date();
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();
    if (days < 0) {
        months--;
        let lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
    }
    if (months < 0) { years--; months += 12; }
    return `${years} Tahun, ${months} Bulan, ${days} Hari`;
}

// ==========================================
// RENDER UI & SEARCH
// ==========================================

function searchWeton() {
    const input = document.getElementById('dateInput');
    if (!input || !input.value) return alert("Silakan pilih tanggal terlebih dahulu!");
    const target = new Date(input.value);
    current = new Date(target.getFullYear(), target.getMonth(), 1);
    generateCalendar();
    updateDetail(target, getPasaran(target));
}

function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    mNav.innerText = `${namaBulan[m]} ${y}`;

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
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        if (dateObj.getDay() === 0) cell.classList.add('sunday-red');
        if (dateObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');
        cell.innerHTML = `<div class="date-num">${d}</div><div class="pasaran-text">${p}</div>`;
        cell.onclick = () => {
            document.querySelectorAll('.calendar-day').forEach(c => c.classList.remove('selected-day'));
            cell.classList.add('selected-day');
            updateDetail(dateObj, p);
        };
        grid.appendChild(cell);
    }
}

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const wetonKey = `${h} ${pasaran}`;
    const nHari = NEPTU_HARI[h];
    const nPasaran = NEPTU_PASARAN[pasaran];
    const neptu = nHari + nPasaran;
    
    const wukuName = getWuku(date);
    const infoJawa = getTanggalJawa(date);
    const zodiak = getZodiak(date);
    const nasibKematian = NASIB_AHLI_WARIS[neptu % 4];
    const nasib5 = PEMBAGI_5[neptu % 5];
    const arahMeditasi = getArahMeditasi(neptu);
    const usia = hitungUsiaLengkap(date);

    // --- 🏮 INTEGRASI IMLEK (MENGGUNAKAN FUNGSI INTERNAL) ---
    const imlek = getImlekData(date);
    let imlekHtml = "";
    if (imlek) {
        imlekHtml = `
            <div style="background:#fff1f0; padding:12px; border-radius:8px; margin:15px 0; border:1px solid #ffa39e; border-left:5px solid #cf1322;">
                <p style="margin:0; color:#cf1322; font-weight:bold; font-size:1rem;">🏮 Kalender Imlek / China</p>
                <p style="margin:5px 0; font-size:1.1rem; color:#000;">
                    <strong>${imlek.tanggal} ${imlek.bulanNama} ${imlek.tahun}</strong>
                </p>
                <p style="margin:0; font-size:0.85rem; color:#666;">Tahun: <strong>${imlek.elemen} ${imlek.shio}</strong></p>
            </div>`;
    }

    const namaBulanMasehi = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const tglMasehiLengkap = `${date.getDate()} ${namaBulanMasehi[date.getMonth()]} ${date.getFullYear()}`;

    // --- RENDER KE UI ---
    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="printableArea" class="card-result" style="background:#fff; padding:20px; border-radius:12px; border:1px solid #eee; color:#000;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <h2 style="color:#D30000; margin:0; border-bottom:2px solid #D30000; display:inline-block;">${wetonKey}</h2>
                <button onclick="window.print()" style="background:#D30000; color:#fff; border:none; padding:8px 15px; border-radius:5px; cursor:pointer; font-weight:bold;">📋 Cetak / Simpan</button>
            </div>
            
            <p style="margin:15px 0; font-size:1.15rem; font-weight:bold;">📅 ${tglMasehiLengkap}</p>

            ${imlekHtml}

            <div style="background:#fff9f9; padding:12px; border-radius:8px; margin-bottom:15px; border:1px solid #ffeded;">
                <p style="margin:0; color:#d30000; font-weight:bold;">🌙 Kalender Jawa</p>
                <p style="margin:5px 0;"><strong>Tanggal:</strong> ${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun} AJ</p>
                <p style="margin:5px 0;"><strong>Status Bulan:</strong> <span style="color:#2e7d32;">${infoJawa.bulan.status}</span></p>
            </div>

            <div style="background:#f8f9fa; padding:12px; border-radius:8px; margin-bottom:15px; border:1px solid #e9ecef;">
                <p style="margin:0; font-weight:bold; color:#333;">🔢 Perhitungan Neptu</p>
                <p style="margin:5px 0; font-family:monospace;">Hari ${h} = ${nHari}<br>Pasaran ${pasaran} = ${nPasaran}<br>--- Total Neptu = ${neptu}</p>
            </div>

            <div style="background:#fff8e1; padding:15px; border-radius:8px; margin-bottom:15px; border:1px solid #ffe0b2;">
                <p style="margin:0; color:#e65100; font-weight:bold;">🎭 Karakter Hari & Pasaran</p>
                <p style="margin:8px 0 0; font-size:0.85rem;"><strong>Sifat ${h}:</strong> ${DATA_SIFAT_HARI[h]}</p>
                <p style="margin:8px 0 0; font-size:0.85rem;"><strong>Sifat ${pasaran}:</strong> ${DATA_SIFAT_PASARAN[pasaran.toUpperCase()]}</p>
            </div>

            <div style="background:#f0f7ff; padding:12px; border-radius:8px; border:1px solid #cfe2ff; margin-bottom:15px;">
                <p style="margin:0; font-size:0.9rem;">⏳ <strong>Usia Saat Ini:</strong> ${usia}</p>
                <p style="margin:5px 0 0; font-size:0.9rem;">🧘 <strong>Arah Meditasi:</strong> ${arahMeditasi}</p>
                <p style="margin:5px 0 0; font-size:0.9rem;">🌌 <strong>Zodiak:</strong> ${zodiak} | <strong>Wuku:</strong> ${wukuName}</p>
            </div>

            <div style="background:#e8f5e9; padding:12px; border-radius:8px; border:1px solid #c8e6c9;">
                <p style="margin:0; color:#2e7d32; font-weight:bold;">💎 Nasib & Filosofi</p>
                <p style="margin:5px 0; font-size:0.85rem;"><strong>Nasib (Ahli Waris):</strong> ${nasibKematian.nama} - <em>"${nasibKematian.arti}"</em></p>
                <p style="margin:5px 0; font-size:0.85rem;"><strong>Pembagi 5:</strong> ${nasib5.nama} - <em>"${nasib5.arti}"</em></p>
            </div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// Inisialisasi awal
document.addEventListener('DOMContentLoaded', generateCalendar);
