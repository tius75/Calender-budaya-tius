/**
 * KALENDER JAWA MODERN - FULL VERSION FIX
 * Integrasi: Weton, Shio, Zodiak, Pembagi 4 & 5, Wuku, Mangsa, Sri Jati, & Kamarokam.
 */

// ==========================================
// KONSTANTA & DATA REFERENSI
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const KAMAROKAM_6 = {
    1: { nama: "NUJU PADU", arti: "Wataknya Jelek, sering bertengkar. Manfaat: Dapur, Warung, Restaurant." },
    2: { nama: "KALA TINANTANG", arti: "Wataknya Jelek, sering sakit-sakitan. Manfaat: Dapur, Warung." },
    3: { nama: "SANGGAR WARINGIN", arti: "Wataknya Baik, tenteram, bahagia. Manfaat: Hajatan, Pindah Rumah." },
    4: { nama: "MANTRI SINAROJA", arti: "Wataknya Baik, tercapai cita-cita. Manfaat: Hajatan, Pindah Rumah." },
    5: { nama: "MACAN KETAWAN", arti: "Wataknya sedang, disegani tapi dijauhi. Manfaat: Pintu regol/gerbang." },
    0: { nama: "NUJU PATI", arti: "Wataknya Buruk, rejeki mampet. Manfaat: Membuat paku bumi/gerabah." }
};

const NASIB_AHLI_WARIS = { // Pembagi 4
    1: { nama: "Gunung", arti: "Kehidupan yang mulia bagi ahli waris." },
    2: { nama: "Guntur", arti: "Ahli waris akan mendapatkan kesulitan." },
    3: { nama: "Segoro", arti: "Kemudahan dalam mencari rezeki." },
    0: { nama: "Asat", arti: "Kesulitan dalam mendapatkan rezeki." }
};

const PEMBAGI_5 = { // Pembagi 5
    1: { nama: "Sri", arti: "Murah rezeki dan hidup makmur." },
    2: { nama: "Lungguh", arti: "Mendapatkan kedudukan atau pangkat tinggi." },
    3: { nama: "Gendhong", arti: "Mapan secara lahiriah dan dihargai orang." },
    4: { nama: "Loro", arti: "Sering menghadapi rintangan kesehatan/hidup." },
    0: { nama: "Pati", arti: "Banyak hambatan, perlu kehati-hatian." }
};

const DATA_BULAN_JAWA = [
    { nama: "Sura", naas: [6, 11, 13, 14, 17, 18, 27], taliWangke: "Rabu Pahing" },
    { nama: "Sapar", naas: [1, 10, 12, 20, 22], taliWangke: "Kamis Pon" },
    { nama: "Mulud", naas: [1, 3, 8, 10, 13, 15, 20, 23], taliWangke: "Jumat Wage" },
    { nama: "Bakdamulud", naas: [10, 15, 16, 20, 25, 28], taliWangke: "Sabtu Kliwon" },
    { nama: "Jumadilawal", naas: [1, 5, 10, 11, 16, 26, 28], taliWangke: "Senin Kliwon" },
    { nama: "Jumadilakir", naas: [4, 10, 11, 14, 18, 21], taliWangke: "Selasa Legi" },
    { nama: "Rejeb", naas: [2, 11, 12, 13, 14, 18, 22, 27], taliWangke: "Rabu Pahing" },
    { nama: "Ruwah", naas: [4, 12, 13, 19, 24, 26, 28], taliWangke: "Kamis Pon" },
    { nama: "Pasa", naas: [7, 9, 10, 15, 20, 21, 24, 25], taliWangke: "Jumat Wage" },
    { nama: "Syawal", naas: [2, 10, 17, 20, 27], taliWangke: "Sabtu Kliwon" },
    { nama: "Dulkaidah", naas: [2, 6, 11, 12, 13, 21, 22, 24, 28], taliWangke: "Senin Kliwon" },
    { nama: "Besar", naas: [1, 6, 10, 13, 20, 23, 25], taliWangke: "Selasa Wage" }
];

let current = new Date();
const TODAY = new Date();

// ==========================================
// FUNGSI LOGIKA
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

function getLunarShio(date) {
    const shios = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];
    return shios[date.getFullYear() % 12];
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

function getMangsaInfo(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    let id = 12; 
    if ((d >= 22 && m == 6) || (m == 7) || (d <= 1 && m == 8)) id = 1;
    else if (d >= 2 && m == 8 && d <= 25) id = 2;
    else if ((d >= 26 && m == 8) || (d <= 18 && m == 9)) id = 3;
    else if ((d >= 19 && m == 9) || (d <= 13 && m == 10)) id = 4;
    else if ((d >= 14 && m == 10) || (d <= 9 && m == 11)) id = 5;
    else if ((d >= 10 && m == 11) || (d <= 22 && m == 12)) id = 6;
    else if ((d >= 23 && m == 12) || (m == 1) || (d <= 3 && m == 2)) id = 7;
    else if (m == 2 && d >= 4) id = 8;
    else if (m == 3 && d <= 26) id = 9;
    else if ((d >= 27 && m == 3) || (d <= 19 && m == 4)) id = 10;
    else if ((d >= 20 && m == 4) || (d <= 12 && m == 5)) id = 11;
    return (typeof DATA_MANGSA !== 'undefined') ? DATA_MANGSA[id] : { nama: "Mangsa", deskripsi: "Data Pranata Mangsa sedang dimuat." };
}

function getArahMeditasi(neptu) {
    const map = { 7: "Barat", 8: "Utara", 9: "Timur", 10: "Selatan", 11: "Barat", 12: "Utara", 13: "Timur", 14: "Selatan", 15: "Barat", 16: "Utara", 17: "Timur", 18: "Selatan" };
    return map[neptu] || "Pusat";
}

function hitungUsiaLengkap(birthDate) {
    let now = new Date();
    let y = now.getFullYear() - birthDate.getFullYear();
    let m = now.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) y--;
    return y < 0 ? "Baru Lahir" : y + " Tahun";
}

// ==========================================
// RENDER UI & FITUR
// ==========================================

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
        if (dateObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');
        
        cell.innerHTML = `<strong>${d}</strong><br><small>${p}</small>`;
        cell.onclick = () => {
            document.querySelectorAll('.calendar-day').forEach(c => c.style.border = "1px solid #eee");
            cell.style.border = "2px solid #D30000";
            updateDetail(dateObj, p);
        };
        grid.appendChild(cell);
    }
}

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const weton = `${h} ${pasaran}`;
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const wuku = getWuku(date);
    const infoJawa = getTanggalJawa(date);
    const mangsa = getMangsaInfo(date);
    const kam = KAMAROKAM_6[neptu % 6];
    const nasib5 = PEMBAGI_5[neptu % 5];
    const nasib4 = NASIB_AHLI_WARIS[neptu % 4];

    // Data Watak & Sri Jati (Safety Check)
    const watakNeptu = (typeof DATA_WATAK_NEPTU !== 'undefined') ? DATA_WATAK_NEPTU[neptu] : { watak: "Analisis watak tersedia di database." };
    const teksWuku = (typeof DATA_WUKU !== 'undefined') ? (DATA_WUKU[wuku] || "Detail analisis wuku.") : "Data Wuku dimuat.";
    const dataSriJati = (typeof TABEL_SRIJATI !== 'undefined') ? (TABEL_SRIJATI[neptu] || []) : [];

    let sriTable = `<table style="width:100%; border-collapse:collapse; margin-top:10px; font-size:12px; border:1px solid #ddd;">
                    <tr style="background:#f2f2f2;"><th>Usia</th><th>Rejeki</th><th>Nasib</th></tr>`;
    dataSriJati.forEach(r => {
        sriTable += `<tr style="text-align:center; border-top:1px solid #ddd;"><td>${r.usia}</td><td style="color:red; font-weight:bold;">${r.nilai}</td><td>${r.ket||'-'}</td></tr>`;
    });
    sriTable += `</table>`;

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="fullReport" style="background:#fff; padding:20px; border-radius:10px; border:1px solid #ddd;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h2 style="color:#D30000; margin:0;">${weton}</h2>
                <div class="no-print">
                    <button onclick="shareWA()" style="background:#25D366; color:white; border:none; padding:8px; border-radius:5px; cursor:pointer;">WA</button>
                    <button onclick="window.print()" style="background:#333; color:white; border:none; padding:8px; border-radius:5px; cursor:pointer;">PDF</button>
                </div>
            </div>
            <p><strong>Masehi:</strong> ${date.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
            <p><strong>Jawa:</strong> ${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun} AJ</p>
            <p><strong>Shio:</strong> ${getLunarShio(date)} | <strong>Zodiak:</strong> ${getZodiak(date)} | <strong>Neptu:</strong> ${neptu}</p>
            
            <div style="background:#fff3e0; border-left:4px solid #ff9800; padding:10px; margin:15px 0;">
                <h4 style="margin:0; color:#e65100;">⚖️ KAMAROKAM (Pembagi 6): ${kam.nama}</h4>
                <p style="font-size:13px; margin:5px 0;">${kam.arti}</p>
            </div>

            <div style="background:#e8f5e9; border-left:4px solid #4caf50; padding:10px; margin:15px 0;">
                <h4 style="margin:0; color:#1b5e20;">💎 SRI (Pembagi 5): ${nasib5.nama}</h4>
                <p style="font-size:13px; margin:5px 0;">${nasib5.arti}</p>
            </div>

            <div style="background:#e3f2fd; border-left:4px solid #2196f3; padding:10px; margin:15px 0;">
                <h4 style="margin:0; color:#0d47a1;">🌾 MANGSA: ${mangsa.nama}</h4>
                <p style="font-size:13px; margin:5px 0;">${mangsa.deskripsi}</p>
            </div>

            <div style="margin-top:20px;">
                <h4 style="color:#D30000; border-bottom:1px solid #eee;">🌟 WATAK NEPTU</h4>
                <p style="font-size:13px;">${watakNeptu.watak}</p>
            </div>

            <div style="margin-top:20px;">
                <h4 style="color:#D30000; border-bottom:1px solid #eee;">📈 SRI JATI (REJEKI)</h4>
                ${sriTable}
            </div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// ACTIONS (FIX CARI TANGGAL)
// ==========================================

function cariTanggal() {
    const input = document.getElementById('inputTgl');
    if (!input || !input.value) return alert("Pilih tanggal!");
    const tgl = new Date(input.value);
    current = new Date(tgl.getFullYear(), tgl.getMonth(), 1);
    generateCalendar();
    updateDetail(tgl, getPasaran(tgl));
}

function shareWA() {
    const report = document.getElementById('fullReport').innerText.replace(/WA|PDF/g, '');
    window.open("https://wa.me/?text=" + encodeURIComponent("*DETAIL KALENDER JAWA*\n\n" + report), "_blank");
}

// ==========================================
// START
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
    updateDetail(TODAY, getPasaran(TODAY));

    const btnCari = document.getElementById('btnCari');
    if(btnCari) btnCari.onclick = cariTanggal;

    const prev = document.getElementById('prevMonth');
    const next = document.getElementById('nextMonth');
    if(prev) prev.onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    if(next) next.onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
});
