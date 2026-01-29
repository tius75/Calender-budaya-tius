/**
 * KALENDER JAWA MODERN - VERSI INTEGRASI 2026
 * Fitur: Jawa Lengkap, Numerologi Terintegrasi, Fix PDF
 */

let current = new Date();
const TODAY = new Date();

// ==========================================
// 1. DATA REFERENSI INTERNAL
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

// ==========================================
// 2. FUNGSI LOGIKA DASAR
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
    const refTglJawa = 9;
    const refBulanIdx = 7; // Ruwah
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let totalHariJawa = refTglJawa + diffDays;
    let bulanIdx = refBulanIdx;
    let tglJawa = totalHariJawa;
    while (tglJawa > 30) { tglJawa -= 30; bulanIdx = (bulanIdx + 1) % 12; }
    while (tglJawa <= 0) { tglJawa += 30; bulanIdx = (bulanIdx - 1 + 12) % 12; }
    return { tanggal: tglJawa, bulan: DATA_BULAN_JAWA[bulanIdx], tahun: 1959 };
}

// ==========================================
// 3. RENDER UI KALENDER
// ==========================================
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
        el.className = 'header-day' + (i === 0 ? ' sunday-red' : '');
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
        if (dateObj.toDateString() === TODAY.toDateString()) cell.style.background = '#fff9c4';
        
        cell.innerHTML = `<b>${d}</b><br><small style="font-size:0.7rem">${p}</small>`;
        cell.onclick = () => updateDetail(dateObj, p);
        grid.appendChild(cell);
    }
}

// ==========================================
// 4. UPDATE DETAIL (GABUNGAN JAWA + NUMEROLOGI)
// ==========================================
function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const nHari = NEPTU_HARI[h];
    const nPasaran = NEPTU_PASARAN[pasaran];
    const neptuTotal = nHari + nPasaran;
    
    const infoJawa = getTanggalJawa(date);
    const wukuName = getWuku(date);

    // Ambil Data Numerologi dari file numerology.js
    const lp = typeof NUMEROLOGI_ENGINE !== 'undefined' ? NUMEROLOGI_ENGINE.calculateLifePath(date) : {angka:'?', arti:'Modul tidak dimuat'};
    const py = typeof NUMEROLOGI_ENGINE !== 'undefined' ? NUMEROLOGI_ENGINE.calculatePersonalYear(date) : {angka:'?', arti:''};

    // Logika Status Bulan
    const isNaas = infoJawa.bulan.naas.includes(infoJawa.tanggal);
    const colorStatus = infoJawa.bulan.status.includes("Tidak") ? "#d32f2f" : "#2e7d32";

    detailDiv.innerHTML = `
        <div id="printableArea" style="background:#fff; padding:25px; border-radius:15px; border:1px solid #ddd; color:#000; font-family:Arial, sans-serif;">
            <div style="border-bottom:3px solid #D30000; padding-bottom:10px; margin-bottom:15px;">
                <h1 style="color:#D30000; margin:0;">${h} ${pasaran}</h1>
                <p style="margin:5px 0; font-size:1.1rem;">📅 ${date.getDate()} ${new Intl.DateTimeFormat('id-ID', {month:'long'}).format(date)} ${date.getFullYear()}</p>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:20px;">
                <div style="background:#f9f9f9; padding:10px; border-radius:8px;">
                    <small>Bulan Jawa</small><br>
                    <strong>${infoJawa.bulan.nama} (${infoJawa.tanggal})</strong>
                </div>
                <div style="background:#f9f9f9; padding:10px; border-radius:8px;">
                    <small>Status Bulan</small><br>
                    <strong style="color:${colorStatus}">${infoJawa.bulan.status}</strong>
                </div>
            </div>

            <div style="background:#fff5f5; border:1px solid #ffcdd2; padding:15px; border-radius:10px; text-align:center; margin-bottom:20px;">
                <p style="margin:0 0 10px 0; font-size:0.9rem; color:#666;">Kalkulasi Neptu</p>
                <div style="display:flex; justify-content:center; align-items:center; gap:15px; font-weight:bold;">
                    <div>${h}<br>${nHari}</div>
                    <div style="font-size:1.5rem">+</div>
                    <div>${pasaran}<br>${nPasaran}</div>
                    <div style="font-size:1.5rem">=</div>
                    <div style="font-size:1.5rem; color:#D30000;">${neptuTotal}</div>
                </div>
            </div>

            ${isNaas ? `<div style="background:#ffebee; color:#c62828; padding:10px; border-radius:8px; border-left:5px solid #d32f2f; margin-bottom:20px;">⚠️ <b>Hari Naas:</b> Hindari mengadakan hajat besar.</div>` : ''}

            <div style="margin-top:20px; padding:15px; border:2px solid #084298; border-radius:10px; background:#f0f7ff;">
                <h3 style="color:#084298; margin:0 0 10px 0; border-bottom:2px solid #084298;">🔮 Numerologi Modern</h3>
                <p><strong>Life Path: ${lp.angka}</strong></p>
                <p style="font-size:0.85rem; color:#444;">${lp.arti}</p>
                <hr style="border:0; border-top:1px solid #cfe2ff; margin:10px 0;">
                <p style="font-size:0.85rem; color:#084298;"><strong>Tahun Personal:</strong> ${py.arti}</p>
            </div>

            <div style="margin-top:20px; font-size:0.85rem; color:#666; text-align:center;">
                Wuku: ${wukuName} | Tali Wangke: ${infoJawa.bulan.taliWangke}
            </div>
        </div>

        <div style="display:flex; gap:10px; margin-top:20px;">
            <button onclick="downloadPDF()" style="flex:1; padding:15px; background:#333; color:#fff; border:none; border-radius:10px; cursor:pointer; font-weight:bold;">Cetak PDF</button>
            <button onclick="shareWhatsApp()" style="flex:1; padding:15px; background:#25D366; color:#fff; border:none; border-radius:10px; cursor:pointer; font-weight:bold;">WhatsApp</button>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// 5. FIX DOWNLOAD PDF (ANTI-BLANK)
// ==========================================
async function downloadPDF() {
    const area = document.getElementById("printableArea");
    if (!area) return alert("Klik tanggal dulu!");

    const btn = event.target;
    btn.innerText = "⏳ Memproses...";
    btn.disabled = true;

    const opt = {
        margin: 10,
        filename: 'Ramalan-Lengkap.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true, 
            backgroundColor: "#ffffff",
            windowWidth: 800 
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(opt).from(area).save();
    } catch (e) {
        alert("Gagal cetak PDF");
    } finally {
        btn.innerText = "Cetak PDF";
        btn.disabled = false;
    }
}

function shareWhatsApp() {
    const area = document.getElementById('printableArea');
    const text = encodeURIComponent("*HASIL RAMALAN LENGKAP*\n" + area.innerText);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

// ==========================================
// INITIALIZE
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
    // Navigasi
    document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
});
