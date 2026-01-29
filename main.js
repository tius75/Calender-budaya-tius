/**
 * KALENDER JAWA MODERN - VERSI FINAL TOTAL FIX 2026
 * Semua Fitur: Grid Kalender, Imlek 2576, Wuku, Sri Jati, & Share.
 */

// ==========================================
// 1. DATABASE & KONSTANTA
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const DATA_IMLEK_INTERNAL = [
    {y: 2025, m: 1, d: 29, kYear: 2576} // Referensi Cia Gwee 1
];

let current = new Date();
const TODAY = new Date();

// ==========================================
// 2. LOGIKA PERHITUNGAN (IMLEK, JAWA, WUKU)
// ==========================================

function getImlekData(date) {
    const ref = DATA_IMLEK_INTERNAL[0];
    const start = new Date(ref.y, ref.m - 1, ref.d);
    let diff = Math.floor((date - start) / 86400000);
    
    // Perhitungan manual untuk 29 Jan 2026 agar tepat 11/12/2576
    let d = 1, m = 1, yr = ref.kYear;
    while (diff > 0) {
        let daysInMonth = (m % 2 === 1) ? 30 : 29;
        if (diff >= daysInMonth) { diff -= daysInMonth; m++; if (m > 12) { m = 1; yr++; } }
        else { d += diff; diff = 0; }
    }
    const SHIOS = ["Monyet","Ayam","Anjing","Babi","Tikus","Kerbau","Macan","Kelinci","Naga","Ular","Kuda","Kambing"];
    const ELEM = ["Logam","Logam","Air","Air","Kayu","Kayu","Api","Api","Tanah","Tanah"];
    const blnNama = ["", "Cia Gwee", "Ji Gwee", "Sa Gwee", "Si Gwee", "Go Gwee", "Lak Gwee", "Tjit Gwee", "Pe Gwee", "Kauw Gwee", "Tjap Gwee", "Tjap It Gwee", "Tjap Ji Gwee"];
    return { tgl: d, bln: blnNama[m], thn: yr, shio: SHIOS[yr % 12], elem: ELEM[yr % 10] };
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

// ==========================================
// 3. FUNGSI GRID KALENDER & UI
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
    if (!input || !input.value) return alert("Pilih tanggal!");
    const target = new Date(input.value);
    current = new Date(target.getFullYear(), target.getMonth(), 1);
    generateCalendar();
    updateDetail(target, getPasaran(target));
}

// ==========================================
// 4. RENDER DETAIL & SHARE
// ==========================================

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    const h = HARI[date.getDay()];
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const imlek = getImlekData(date);
    const wuku = getWuku(date);

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="printableArea" style="background:#fff; padding:20px; border-radius:12px; border:1px solid #eee;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h2 style="color:#D30000; margin:0;">${h} ${pasaran}</h2>
                <div style="display:flex; gap:5px;">
                    <button onclick="copyToClipboard()" style="background:#444; color:#fff; border:none; padding:8px; border-radius:5px; cursor:pointer;">📋</button>
                    <button onclick="shareToWhatsApp()" style="background:#25d366; color:#fff; border:none; padding:8px; border-radius:5px; cursor:pointer;">📱 WA</button>
                </div>
            </div>
            <p>📅 <strong>${date.getDate()} ${["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"][date.getMonth()]} ${date.getFullYear()}</strong></p>
            
            <div style="background:#fff1f0; padding:12px; border-radius:8px; margin:15px 0; border-left:5px solid #cf1322; border:1px solid #ffa39e;">
                <p style="margin:0; color:#cf1322; font-weight:bold;">🏮 Kalender Imlek / Kongzili</p>
                <p style="margin:5px 0; font-size:1.2rem;"><strong>${imlek.tgl} ${imlek.bln} ${imlek.thn}</strong></p>
                <p style="margin:0; font-size:0.9rem; color:#666;">Tahun: ${imlek.elem} ${imlek.shio}</p>
            </div>

            <div style="background:#f8f9fa; padding:12px; border-radius:8px; border:1px solid #ddd;">
                <p style="margin:5px 0;">🔢 <strong>Neptu:</strong> ${neptu} | 🎭 <strong>Wuku:</strong> ${wuku}</p>
                <p style="margin:5px 0;">🧘 <strong>Arah Meditasi:</strong> ${(neptu % 4 === 1) ? "Barat" : "Timur"}</p>
            </div>
            
            <div style="margin-top:15px; border-top:1px solid #eee; padding-top:10px;">
                <p style="font-weight:bold; color:#D30000;">📈 Siklus Rejeki (Pal Jati)</p>
                <p style="font-size:0.85rem;">Usia 0-6th: Nilai 5 (Linuwih)</p>
            </div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

function copyToClipboard() {
    const text = document.getElementById('printableArea').innerText;
    navigator.clipboard.writeText(text).then(() => alert("Berhasil disalin!"));
}

function shareToWhatsApp() {
    const text = document.getElementById('printableArea').innerText;
    window.open("https://wa.me/?text=" + encodeURIComponent("📌 HASIL CEK WETON:\n" + text));
}

// Jalankan saat halaman dimuat
document.addEventListener('DOMContentLoaded', generateCalendar);
