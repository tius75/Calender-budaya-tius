/**
 * KALENDER JAWA MODERN - VERSI SUPER LENGKAP
 * Integrasi: Jawa (Sri Jati, Wuku, Windu), Masehi, & Imlek
 */

// --- DATA REFERENSI (Sesuai Kode Asli Anda) ---
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

// ... (Data Sifat, Nasib, Bulan Jawa, Siklus Tahun, dan Windu tetap sama seperti sebelumnya) ...
// (Pastikan data DATA_SIFAT_PASARAN, DATA_SIFAT_HARI, DATA_BULAN_JAWA, dll. ada di sini)

let current = new Date();
const TODAY = new Date();

// ==========================================
// ENGINES (LOGIKA PERHITUNGAN)
// ==========================================

function getLunarImlek(date) {
    const refDate = new Date(2025, 0, 29); 
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    const LUNAR_CYCLE = 29.53059;
    let totalMonths = Math.floor(diffDays / LUNAR_CYCLE);
    let lDay = Math.floor(diffDays % LUNAR_CYCLE) + 1;
    let lMonth = (totalMonths % 12) + 1;
    let lYear = 2576 + Math.floor(totalMonths / 12);
    if (lDay > 30) { lDay = 1; lMonth++; }
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

function getArahMeditasi(neptu) {
    const map = { 7: "Barat", 8: "Utara", 9: "Timur", 10: "Selatan", 11: "Barat", 12: "Utara", 13: "Timur", 14: "Selatan", 15: "Barat", 16: "Utara", 17: "Timur", 18: "Selatan" };
    return map[neptu] || "Pusat";
}

function hitungUsiaLengkap(birthDate) {
    let now = new Date();
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();
    if (days < 0) { months--; days += 30; }
    if (months < 0) { years--; months += 12; }
    return `${years} Thn, ${months} Bln, ${days} Hr`;
}

// ==========================================
// RENDER UI & DETAIL (THE HEART)
// ==========================================

function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
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
        const imlek = getLunarImlek(dateObj);
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        if (dateObj.getDay() === 0) cell.classList.add('sunday-red');
        if (dateObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');
        
        cell.innerHTML = `<div class="date-num">${d}</div><div class="pasaran-text">${p}</div><div class="imlek-num" style="position:absolute; bottom:2px; right:4px; font-size:9px; color:#D30000; font-weight:bold;">${imlek.tanggal}</div>`;
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
    const imlek = getLunarImlek(date);
    const h = HARI[date.getDay()];
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const infoJawa = getTanggalJawa(date);
    const wuku = getWuku(date);
    const usia = hitungUsiaLengkap(date);
    const arah = getArahMeditasi(neptu);
    
    // Perhitungan Sri Jati (Menggunakan data eksternal TABEL_SRIJATI)
    const dataSriJati = (typeof TABEL_SRIJATI !== 'undefined') ? (TABEL_SRIJATI[neptu] || []) : [];
    let tabelSriJatiHtml = dataSriJati.map(item => `
        <tr><td>${item.usia} Thn</td><td style="color:red; font-weight:bold;">${item.nilai}</td><td>${SRI_JATI_DESC[item.nilai]}</td></tr>
    `).join('');

    detailDiv.innerHTML = `
        <div class="card-result" style="text-align:left; line-height:1.5;">
            <div style="background:#fff1f0; padding:10px; border-radius:8px; border:1px solid #ffa39e; margin-bottom:15px;">
                <p style="margin:0; color:#cf1322; font-weight:bold;">🧧 Penanggalan Imlek</p>
                <p style="margin:0; font-size:0.9rem;">Tahun ${imlek.tahun}, Bulan ${imlek.bulan}, Tanggal ${imlek.tanggal} (Shio ${imlek.shio})</p>
            </div>

            <h2 style="color:#D30000; margin:0;">${h} ${pasaran}</h2>
            <p style="margin:5px 0;">📅 <strong>Masehi:</strong> ${date.getDate()} ${["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"][date.getMonth()]} ${date.getFullYear()}</p>
            <p style="margin:5px 0;">🌙 <strong>Jawa:</strong> ${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun} AJ</p>
            <p style="margin:5px 0;">🔢 <strong>Neptu:</strong> ${neptu} | <strong>Wuku:</strong> ${wuku}</p>
            <p style="margin:5px 0;">🧘 <strong>Arah Meditasi:</strong> ${arah}</p>
            <p style="margin:5px 0;">👶 <strong>Usia:</strong> ${usia}</p>
            
            <hr>
            <p><strong>Sifat Hari:</strong> ${DATA_SIFAT_HARI[h]}</p>
            <p><strong>Sifat Pasaran:</strong> ${DATA_SIFAT_PASARAN[pasaran.toUpperCase()]}</p>
            
            <h3 style="margin-top:15px; font-size:1rem; border-bottom:1px solid #ccc;">📈 Tabel Rejeki (Sri Jati)</h3>
            <table style="width:100%; font-size:0.8rem; border-collapse:collapse;" border="1" cellpadding="5">
                <tr style="background:#eee;"><th>Usia</th><th>Nilai</th><th>Keterangan</th></tr>
                ${tabelSriJatiHtml || '<tr><td colspan="3">Data Sri Jati tidak tersedia</td></tr>'}
            </table>
        </div>
    `;
}

// Tambahkan Fungsi Navigasi dan Inisialisasi di akhir seperti sebelumnya...
