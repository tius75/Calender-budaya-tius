/**
 * KALENDER JAWA MODERN - VERSI FINAL FIX 2026
 * Fitur: Pemisahan Deskripsi Hari & Pasaran, Tabel Sri Jati Fix
 */

// ==========================================
// KONSTANTA & DATA REFERENSI
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const DATA_HARI = {
    // Sifat Dasar Hari
    "Senin": "Selalu berubah, indah dan selalu mendapatkan simpati.",
    "Selasa": "Pemarah dan pencemburu serta luas pergaulannya.",
    "Rabu": "Pendiam, pemomong dan penyabar.",
    "Kamis": "Sangar dan menakutkan.",
    "Jumat": "Energik dan mengagumkan.",
    "Sabtu": "Membuat orang merasa senang dan susah ditebak.",
    "Minggu": "Tekun, mandiri dan berwibawa.",
    // Sifat Dasar Pasaran
    "Kliwon": "Pandai bicara dan bergaul, periang, ambisius, urakan, setia pada janji.",
    "Legi": "Bertanggung jawab, murah hati, enak dalam pergaulan, selalu gembira.",
    "Pahing": "Penuh perhitungan untuk untung, suka menolong, mandiri, kuat lapar.",
    "Pon": "Bicaranya banyak diterima orang, suka tinggal di rumah, sedikit pemarah.",
    "Wage": "Menarik tetapi angkuh, setia dan penurut, kaku hati, sering difitnah."
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
    0: { nama: "Pati", arti: "Banyak hambatan, perlu kehati-hatian." }
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
// FUNGSI LOGIKA (INTERNAL)
// ==========================================
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
    let tgl = 9 + diffDays;
    let blnIdx = 7, thn = 1959;
    while (tgl > 30) { tgl -= 30; blnIdx = (blnIdx + 1) % 12; if (blnIdx === 0) thn++; }
    while (tgl <= 0) { tgl += 30; blnIdx = (blnIdx - 1 + 12) % 12; if (blnIdx === 11) thn--; }
    return { tanggal: tgl, bulan: DATA_BULAN_JAWA[blnIdx], tahun: thn };
}

function hitungUsiaLengkap(birthDate) {
    let now = new Date();
    let y = now.getFullYear() - birthDate.getFullYear();
    let m = now.getMonth() - birthDate.getMonth();
    let d = now.getDate() - birthDate.getDate();
    if (d < 0) { m--; d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (m < 0) { y--; m += 12; }
    return `${y} Thn, ${m} Bln, ${d} Hari`;
}

// ==========================================
// RENDER UI
// ==========================================
function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;
    grid.innerHTML = '';
    const y = current.getFullYear(), m = current.getMonth();
    mNav.innerText = `${["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"][m]} ${y}`;

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
        cell.onclick = () => updateDetail(dateObj, p);
        grid.appendChild(cell);
    }
}

function searchWeton() {
    const input = document.getElementById('dateInput');
    if (!input.value) return alert("Pilih tanggal!");
    const target = new Date(input.value);
    current = new Date(target.getFullYear(), target.getMonth(), 1);
    generateCalendar();
    updateDetail(target, getPasaran(target));
}

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    const h = HARI[date.getDay()];
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const infoJ = getTanggalJawa(date);
    const nasib5 = PEMBAGI_5[neptu % 5];
    const dataSri = (typeof TABEL_SRIJATI !== 'undefined') ? (TABEL_SRIJATI[neptu] || []) : [];

    // PEMISAHAN HARI DAN PASARAN
    const teksHari = `
        <div style="margin-bottom:12px; padding:10px; background:#fdf2f2; border-left:4px solid #D30000; border-radius:4px;">
            <strong style="color:#D30000;">Sifat Hari ${h}:</strong><br>
            <span style="font-size:0.85rem;">${DATA_HARI[h] || "Data tidak ada"}</span>
        </div>
        <div style="padding:10px; background:#f2f7fd; border-left:4px solid #0056b3; border-radius:4px;">
            <strong style="color:#0056b3;">Sifat Pasaran ${pasaran}:</strong><br>
            <span style="font-size:0.85rem;">${DATA_HARI[pasaran] || "Data tidak ada"}</span>
        </div>
    `;

    let tabelHtml = `<table style="width:100%; border-collapse: collapse; margin-top:10px; font-size:0.85rem; border:1px solid #ddd;">
        <tr style="background:#f9f9f9;"><th style="border:1px solid #ddd; padding:8px;">Usia</th><th style="border:1px solid #ddd; padding:8px;">Nilai</th><th style="border:1px solid #ddd; padding:8px;">Nasib</th></tr>`;
    dataSri.forEach(item => {
        const skor = item.nilai || item.v || 0;
        const desc = (typeof SRI_JATI_DESC !== 'undefined') ? (SRI_JATI_DESC[skor] || "-") : "-";
        tabelHtml += `<tr><td style="border:1px solid #ddd; padding:8px; text-align:center;">${item.usia || "-"} Thn</td><td style="border:1px solid #ddd; padding:8px; text-align:center; color:red; font-weight:bold;">${skor}</td><td style="border:1px solid #ddd; padding:8px;">${desc}</td></tr>`;
    });
    tabelHtml += `</table>`;

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="printableArea" style="background:#fff; padding:20px; border-radius:12px; border:1px solid #eee; color:#000;">
            <h2 style="color:#D30000; border-bottom:2px solid #D30000; display:inline-block;">${h} ${pasaran}</h2>
            <p style="font-weight:bold; margin-top:10px;">📅 ${date.getDate()} ${["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"][date.getMonth()]} ${date.getFullYear()}</p>
            <p style="color:#D30000;"><strong>Jawa:</strong> ${infoJ.tanggal} ${infoJ.bulan.nama} ${infoJ.tahun} AJ</p>
            <div style="background:#e8f5e9; padding:12px; border-radius:8px; margin:15px 0;">
                <h4 style="margin:0; color:#2e7d32;">💎 Nasib: ${nasib5.nama}</h4>
                <p style="font-size:0.85rem; margin-top:5px;">${nasib5.arti}</p>
            </div>
            <div style="margin-top:20px;">
                <h4 style="color:#D30000; border-bottom:1px solid #eee; padding-bottom:5px;">🌸 Watak Hari & Pasaran</h4>
                ${teksHari}
            </div>
            <div style="margin-top:20px;">
                <h4 style="color:#D30000; border-bottom:1px solid #eee; padding-bottom:5px;">📈 Siklus Sri Jati (Rejeki)</h4>
                ${dataSri.length > 0 ? tabelHtml : "<p>Data tidak tersedia</p>"}
            </div>
        </div>`;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
    updateDetail(TODAY, getPasaran(TODAY));
    document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
});
