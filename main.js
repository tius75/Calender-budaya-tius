/**
 * KALENDER JAWA & NUMEROLOGI - FIX VERSION 2026
 * Mengatasi masalah klik dan detail tidak muncul
 */

let current = new Date();
const TODAY = new Date();

// DATA DASAR INTERNAL (Agar tetap jalan meskipun file data eksternal error)
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

// DATA BULAN JAWA (WAJIB ADA agar tidak error)
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

// ==========================================
// LOGIKA KALENDER
// ==========================================

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getTanggalJawa(date) {
    const refDate = new Date(2026, 0, 28); // 9 Ruwah 1959
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let totalHariJawa = 9 + diffDays;
    let bulanIdx = 7; 
    let tglJawa = totalHariJawa;
    while (tglJawa > 30) { tglJawa -= 30; bulanIdx = (bulanIdx + 1) % 12; }
    while (tglJawa <= 0) { tglJawa += 30; bulanIdx = (bulanIdx - 1 + 12) % 12; }
    return { tanggal: tglJawa, bulan: DATA_BULAN_JAWA[bulanIdx], tahun: 1959 };
}

function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;
    
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    mNav.innerText = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(current);

    // Render Header Hari
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
        cell.style.cursor = 'pointer';
        cell.style.padding = '10px 2px';
        cell.style.border = '1px solid #eee';
        
        if (dateObj.getDay() === 0) cell.style.color = 'red';
        if (dateObj.toDateString() === TODAY.toDateString()) cell.style.background = '#fff9c4';
        
        cell.innerHTML = `<b>${d}</b><br><small style="font-size:0.7rem">${p}</small>`;
        
        // EVENT KLIK YANG DIPERBAIKI
        cell.onclick = () => {
            updateDetail(dateObj, p);
        };
        grid.appendChild(cell);
    }
}

// ==========================================
// TAMPILAN DETAIL
// ==========================================

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const nH = NEPTU_HARI[h];
    const nP = NEPTU_PASARAN[pasaran];
    const nTotal = nH + nP;
    
    const infoJawa = getTanggalJawa(date);
    
    // Integrasi Numerologi (Cek apakah file numerology.js sudah dimuat)
    let lp = { angka: '?', arti: 'Data Numerologi tidak ditemukan.' };
    if (typeof NUMEROLOGI_ENGINE !== 'undefined') {
        lp = NUMEROLOGI_ENGINE.calculateLifePath(date);
    }

    const isNaas = infoJawa.bulan.naas.includes(infoJawa.tanggal);
    const colorStatus = infoJawa.bulan.status.includes("Tidak") ? "#d32f2f" : "#2e7d32";

    detailDiv.innerHTML = `
        <div id="printableArea" style="background:#fff; padding:20px; border:2px solid #D30000; border-radius:15px; margin-top:20px; color:#000;">
            <h2 style="color:#D30000; border-bottom:2px solid #D30000; margin-bottom:10px;">${h} ${pasaran}</h2>
            <p>📅 <b>Masehi:</b> ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}</p>
            <p>🌙 <b>Jawa:</b> ${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun}</p>
            
            <div style="background:#f5f5f5; padding:10px; border-radius:8px; margin:10px 0;">
                <p style="margin:0;"><strong>Status Bulan:</strong> <span style="color:${colorStatus}">${infoJawa.bulan.status}</span></p>
                <p style="margin:5px 0 0 0; font-size:0.85rem;">Tali Wangke: ${infoJawa.bulan.taliWangke}</p>
            </div>

            <div style="background:#fff5f5; border:1px solid #ffcdd2; padding:10px; border-radius:8px; text-align:center;">
                <small>Kalkulasi Neptu</small><br>
                <strong>${h}(${nH}) + ${pasaran}(${nP}) = <span style="color:#D30000; font-size:1.2rem;">${nTotal}</span></strong>
            </div>

            ${isNaas ? `<div style="margin-top:10px; background:#ffebee; color:#c62828; padding:8px; border-radius:5px; border-left:4px solid #d32f2f;">⚠️ <b>Hari Naas:</b> Tidak disarankan untuk hajat besar.</div>` : ''}

            <div style="margin-top:20px; padding:15px; border:1px solid #084298; border-radius:10px; background:#f0f7ff;">
                <h4 style="color:#084298; margin:0 0 5px 0;">🔮 Numerologi Life Path</h4>
                <p style="font-size:1.1rem; font-weight:bold; margin:0;">Angka: ${lp.angka}</p>
                <p style="font-size:0.85rem; color:#444; margin:5px 0 0 0;">${lp.arti}</p>
            </div>
        </div>

        <div style="margin-top:15px; display:flex; gap:10px;">
            <button onclick="downloadPDF()" style="flex:1; padding:12px; background:#333; color:white; border:none; border-radius:8px; cursor:pointer;">Cetak PDF</button>
            <button onclick="shareWA('${h} ${pasaran}', ${nTotal})" style="flex:1; padding:12px; background:#25D366; color:white; border:none; border-radius:8px; cursor:pointer;">WhatsApp</button>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// FITUR DOWNLOAD (ANTI-BLANK)
// ==========================================

async function downloadPDF() {
    const area = document.getElementById("printableArea");
    if (!area) return alert("Pilih tanggal terlebih dahulu!");

    const btn = event.target;
    btn.innerText = "⏳ Sedang Memproses...";
    btn.disabled = true;

    const opt = {
        margin: 10,
        filename: 'Hasil_Ramalan_Weton.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true, 
            backgroundColor: "#ffffff" 
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(opt).from(area).save();
    } catch (e) {
        alert("Gagal mengunduh PDF. Pastikan library html2pdf.js sudah terpasang.");
    } finally {
        btn.innerText = "Cetak PDF";
        btn.disabled = false;
    }
}

function shareWA(weton, neptu) {
    const text = `Hasil Cek Weton: ${weton}\nNeptu: ${neptu}\nCek lengkap di aplikasi kami.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

// JALANKAN SAAT START
window.onload = () => {
    generateCalendar();
    document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
};
