/**
 * KALENDER JAWA & NUMEROLOGI - STABLE VERSION 2026
 * Perbaikan: Tombol ganda dihapus, Zodiak & Shio ditambahkan, PDF Anti-Blank
 */

let current = new Date();
const TODAY = new Date();

// DATA REFERENSI
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

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

// FUNGSI PEMBANTU (Zodiak & Shio)
function getZodiak(d, m) {
    const zodiacs = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
    const last_day = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21];
    return (d > last_day[m]) ? zodiacs[(m + 1) % 12] : zodiacs[m];
}

function getShio(year) {
    const list = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];
    return list[year % 12];
}

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getTanggalJawa(date) {
    const refDate = new Date(2026, 0, 28); 
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let tglJawa = 9 + diffDays;
    let bulanIdx = 7; 
    while (tglJawa > 30) { tglJawa -= 30; bulanIdx = (bulanIdx + 1) % 12; }
    while (tglJawa <= 0) { tglJawa += 30; bulanIdx = (bulanIdx - 1 + 12) % 12; }
    return { tanggal: tglJawa, bulan: DATA_BULAN_JAWA[bulanIdx], tahun: 1959 };
}

// RENDER KALENDER
function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;
    
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    mNav.innerText = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(current);

    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        if(i === 0) el.style.color = 'red';
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
        if (dateObj.getDay() === 0) cell.style.color = 'red';
        if (dateObj.toDateString() === TODAY.toDateString()) cell.style.border = '2px solid orange';
        
        cell.innerHTML = `<b>${d}</b><br><small>${p}</small>`;
        cell.onclick = () => updateDetail(dateObj, p);
        grid.appendChild(cell);
    }
}

// UPDATE DETAIL
function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const nH = NEPTU_HARI[h];
    const nP = NEPTU_PASARAN[pasaran];
    const nTotal = nH + nP;
    const infoJawa = getTanggalJawa(date);
    const zodiak = getZodiak(date.getDate(), date.getMonth());
    const shio = getShio(date.getFullYear());
    
    // Ambil Numerologi dari file terpisah (numerology.js)
    let lp = { angka: '?', arti: 'Numerologi tidak dimuat.' };
    if (typeof NUMEROLOGI_ENGINE !== 'undefined') {
        lp = NUMEROLOGI_ENGINE.calculateLifePath(date);
    }

    // Tampilkan Detail & Tombol secara dinamis (Tombol di HTML harus dihapus)
    detailDiv.innerHTML = `
        <div id="printableArea" style="background:#fff; padding:20px; border:2px solid #D30000; border-radius:15px; color:#000;">
            <h2 style="color:#D30000; border-bottom:2px solid #D30000; margin-bottom:15px; padding-bottom:5px;">${h} ${pasaran}</h2>
            
            <p>📅 <b>Masehi:</b> ${date.getDate()} ${new Intl.DateTimeFormat('id-ID', {month:'long'}).format(date)} ${date.getFullYear()}</p>
            <p>🌙 <b>Jawa:</b> ${infoJawa.tanggal} ${infoJawa.bulan.nama} 1959</p>
            <p>🐉 <b>Shio:</b> ${shio} | ♒ <b>Zodiak:</b> ${zodiak}</p>
            
            <div style="background:#f9f9f9; padding:10px; border-radius:8px; margin:10px 0; border:1px solid #ddd;">
                <p style="margin:0;"><b>Status Bulan:</b> <span style="color:${infoJawa.bulan.status.includes('Tidak') ? 'red' : 'green'}">${infoJawa.bulan.status}</span></p>
                <p style="margin:5px 0 0 0; font-size:0.85rem;">Tali Wangke: ${infoJawa.bulan.taliWangke}</p>
            </div>

            <div style="background:#fff5f5; border:1px solid #ffcdd2; padding:10px; border-radius:8px; text-align:center; margin:15px 0;">
                <strong>Kalkulasi Neptu: ${h}(${nH}) + ${pasaran}(${nP}) = <span style="color:#D30000; font-size:1.2rem;">${nTotal}</span></strong>
            </div>

            <div style="padding:15px; border:1px solid #084298; border-radius:10px; background:#f0f7ff;">
                <h4 style="color:#084298; margin:0 0 5px 0;">🔮 Numerologi Life Path</h4>
                <p style="font-size:1.1rem; font-weight:bold; margin:0;">Angka: ${lp.angka}</p>
                <p style="font-size:0.85rem; color:#444; line-height:1.4;">${lp.arti}</p>
            </div>
        </div>

        <div style="margin-top:20px; display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
            <button onclick="downloadPDF()" style="padding:15px; background:#333; color:white; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">Simpan PDF</button>
            <button onclick="shareWA('${h} ${pasaran}', ${nTotal})" style="padding:15px; background:#25D366; color:white; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">Share WA</button>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// FIX PDF BLANK
async function downloadPDF() {
    const area = document.getElementById("printableArea");
    if (!area) return;

    const opt = {
        margin: 10,
        filename: 'Ramalan-Lengkap.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true, 
            backgroundColor: "#ffffff",
            scrollY: -window.scrollY // Fix posisi potret
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(opt).from(area).save();
    } catch (e) {
        alert("Gagal mengunduh PDF");
    }
}

function shareWA(weton, neptu) {
    const text = `Hasil Ramalan Weton: ${weton}\nNeptu: ${neptu}\nCek selengkapnya di website kami!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

// INITIALIZE
window.onload = () => {
    generateCalendar();
    document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
};
