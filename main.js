/**
 * KALENDER JAWA & IMLEK - FIX GRID & FORMAT ANGKA
 */

const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
let current = new Date();
const TODAY = new Date();

// ==========================================
// 1. LOGIKA IMLEK (FORMAT ANGKA DD:BB:YY)
// ==========================================
function getImlekData(date) {
    // Referensi: 29 Jan 2026 adalah 12:11:2576 (Imlek lama)
    // Berdasarkan permintaan: Tanggal 11, Bulan 12, Tahun 2576
    const ref = {y: 2025, m: 1, d: 29, kYear: 2576}; 
    const start = new Date(ref.y, ref.m - 1, ref.d);
    let diff = Math.floor((date - start) / 86400000);
    
    let d = 1, m = 1, yr = ref.kYear;
    while (diff > 0) {
        let daysInMonth = (m % 2 === 1) ? 30 : 29;
        if (diff >= daysInMonth) { diff -= daysInMonth; m++; if (m > 12) { m = 1; yr++; } }
        else { d += diff; diff = 0; }
    }

    // Format DD:BB:YY (Contoh: 11:12:2576)
    const dd = String(d).padStart(2, '0');
    const bb = String(m).padStart(2, '0');
    const yy = yr;
    
    const SHIOS = ["Monyet","Ayam","Anjing","Babi","Tikus","Kerbau","Macan","Kelinci","Naga","Ular","Kuda","Kambing"];
    return { 
        display: `${dd}:${bb}:${yy}`,
        shio: SHIOS[yr % 12]
    };
}

// ==========================================
// 2. GENERATE GRID KALENDER (FIX VISUAL)
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

    // Header Hari
    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        el.style.fontWeight = "bold";
        el.style.textAlign = "center";
        if (i === 0) el.style.color = "red";
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
        cell.style.border = "1px solid #eee";
        cell.style.padding = "5px";
        cell.style.cursor = "pointer";
        cell.style.textAlign = "center";
        
        if (dateObj.getDay() === 0) cell.style.color = "red";
        if (dateObj.toDateString() === TODAY.toDateString()) cell.style.backgroundColor = "#fff9c4";
        
        cell.innerHTML = `<div>${d}</div><div style="font-size:0.7rem; color:#666;">${p}</div>`;
        cell.onclick = () => updateDetail(dateObj, p);
        grid.appendChild(cell);
    }
}

// ==========================================
// 3. DETAIL & FITUR SALIN
// ==========================================
function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    const imlek = getImlekData(date);
    const h = HARI[date.getDay()];

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="printableArea" style="background:#fff; padding:15px; border:1px solid #ddd; border-radius:8px;">
            <div style="display:flex; justify-content:space-between;">
                <h3 style="margin:0; color:red;">${h} ${pasaran}</h3>
                <button onclick="copyToClipboard()" style="cursor:pointer;">📋 Salin</button>
            </div>
            <p>📅 ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}</p>
            
            <div style="background:#fff1f0; padding:10px; border-radius:5px; margin:10px 0;">
                <strong>🏮 Imlek: ${imlek.display}</strong><br>
                <small>Shio: ${imlek.shio}</small>
            </div>
            
            <p style="font-size:0.9rem;">Wuku: ${getWuku(date)}</p>
            </div>
    `;
}

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / 86400000);
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getWuku(date) {
    const wukuList = ["Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", "Warigalit", "Wariagung", "Julungwangi", "Sungsang", "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut", "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", "Maktal", "Wuye", "Manahil", "Prangbakat", "Bala", "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"];
    const refDate = new Date(2026, 0, 25); 
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / 86400000);
    let idx = (20 + Math.floor(diffDays / 7)) % 30;
    return wukuList[idx < 0 ? idx + 30 : idx];
}

function copyToClipboard() {
    const text = document.getElementById('printableArea').innerText;
    navigator.clipboard.writeText(text).then(() => alert("Berhasil disalin!"));
}

document.addEventListener('DOMContentLoaded', generateCalendar);
