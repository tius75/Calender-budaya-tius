/**
 * KALENDER JAWA - VERSI FINAL REVISI TOTAL
 * Fix: Clickable, Search Function, Sri Jati, Kamarokam, Shio, Zodiak.
 */

// --- DATA KONSTAN ---
const HARI_LIST = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN_LIST = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_H_MAP = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_P_MAP = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const KAMAROKAM_DATA = {
    1: { n: "NUJU PADU", w: "Jelek, sering bertengkar. Manfaat: Dapur, Warung." },
    2: { n: "KALA TINANTANG", w: "Jelek, sering sakit, amarah tinggi. Manfaat: Dapur, Rumah." },
    3: { n: "SANGGAR WARINGIN", w: "Baik, tentrem, rejeki berkembang. Manfaat: Hajatan, Pindah Rumah." },
    4: { n: "MANTRI SINAROJA", w: "Baik, cita-cita tercapai, cukup sandang pangan. Manfaat: Hajatan." },
    5: { n: "MACAN KETAWAN", w: "Sedang, disegani tapi dijauhi. Manfaat: Pintu Regol/Gerbang." },
    0: { n: "NUJU PATI", w: "Buruk, rejeki mampet, bencana. Manfaat: Paku Bumi, Gerabah." }
};

// --- STATE ---
let tglTampilan = new Date();
const HARI_INI = new Date();

// --- FUNGSI UTAMA ---
function getPasaran(dt) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((dt.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN_LIST[(((diff + 1) % 5) + 5) % 5];
}

function getZodiak(dt) {
    const d = dt.getDate(), m = dt.getMonth() + 1;
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

function getShio(dt) {
    const shios = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];
    return shios[dt.getFullYear() % 12];
}

// --- RENDER SISTEM ---
function buildCalendar() {
    const grid = document.getElementById('calendar');
    const label = document.getElementById('monthYearNav');
    if (!grid) return;

    grid.innerHTML = '';
    const y = tglTampilan.getFullYear();
    const m = tglTampilan.getMonth();
    const blnNama = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    if(label) label.innerText = `${blnNama[m]} ${y}`;

    // Render Headers
    HARI_LIST.forEach((h, i) => {
        const d = document.createElement('div');
        d.className = 'header-day' + (i === 0 ? ' sunday' : '');
        d.innerText = h.substring(0, 3);
        grid.appendChild(d);
    });

    const fDay = new Date(y, m, 1).getDay();
    const lDay = new Date(y, m + 1, 0).getDate();

    for (let i = 0; i < fDay; i++) grid.appendChild(document.createElement('div'));

    for (let d = 1; d <= lDay; d++) {
        const dObj = new Date(y, m, d);
        const pas = getPasaran(dObj);
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        if (dObj.toDateString() === HARI_INI.toDateString()) cell.classList.add('today-highlight');
        
        cell.innerHTML = `<b>${d}</b><br><small>${pas}</small>`;
        cell.style.cursor = "pointer";
        cell.onclick = () => {
            document.querySelectorAll('.calendar-day').forEach(c => c.classList.remove('selected-day'));
            cell.classList.add('selected-day');
            updateShowDetail(dObj);
        };
        grid.appendChild(cell);
    }
}

function updateShowDetail(date) {
    const box = document.getElementById('detail');
    if (!box) return;

    const h = HARI_LIST[date.getDay()];
    const p = getPasaran(date);
    const neptu = NEPTU_H_MAP[h] + NEPTU_P_MAP[p];
    const kam = KAMAROKAM_DATA[neptu % 6];
    const shio = getShio(date);
    const zod = getZodiak(date);
    
    // Arah Meditasi
    const meditasiMap = { 7:"Barat", 8:"Utara", 9:"Timur", 10:"Selatan", 11:"Barat", 12:"Utara", 13:"Timur", 14:"Selatan", 15:"Barat", 16:"Utara", 17:"Timur", 18:"Selatan" };
    const meditasi = meditasiMap[neptu] || "Pusat";

    // Sri Jati (Logic Tabel)
    let sriHtml = "";
    if (typeof TABEL_SRIJATI !== 'undefined' && TABEL_SRIJATI[neptu]) {
        sriHtml = `<table style="width:100%; border-collapse:collapse; margin-top:10px; font-size:12px; border:1px solid #ddd;">
                    <tr style="background:#f2f2f2;"><th>Usia</th><th>Rejeki</th><th>Ket</th></tr>`;
        TABEL_SRIJATI[neptu].forEach(r => {
            sriHtml += `<tr style="text-align:center; border-top:1px solid #ddd;"><td>${r.usia}</td><td style="color:red; font-weight:bold;">${r.nilai}</td><td>${r.ket||''}</td></tr>`;
        });
        sriHtml += `</table>`;
    } else {
        sriHtml = `<p style="font-size:12px; color:#666;">Data Sri Jati untuk Neptu ${neptu} belum tersedia.</p>`;
    }

    box.style.display = "block";
    box.innerHTML = `
        <div id="printArea" style="background:#fff; padding:15px; border:1px solid #ccc; border-radius:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center;" class="no-print">
                <h3 style="margin:0; color:#D30000;">${h} ${p}</h3>
                <button onclick="shareWA()" style="background:#25D366; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Share WA</button>
            </div>
            <p style="margin:10px 0;"><b>📅 Masehi:</b> ${date.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
            <p style="margin:5px 0;"><b>🔢 Neptu:</b> ${neptu} | <b>♈ Zodiak:</b> ${zod} | <b>🐉 Shio:</b> ${shio}</p>
            <p style="margin:5px 0;"><b>🧘 Meditasi:</b> ${meditasi}</p>
            
            <div style="background:#fff3e0; border-left:4px solid #ff9800; padding:10px; margin:10px 0;">
                <h4 style="margin:0; color:#e65100;">⚖️ KAMAROKAM (Pembagi 6): ${kam.n}</h4>
                <p style="font-size:13px; margin:5px 0;">${kam.w}</p>
            </div>

            <div style="margin-top:15px;">
                <h4 style="border-bottom:2px solid #D30000; padding-bottom:3px; margin-bottom:10px;">📈 SRI JATI (Siklus Rejeki)</h4>
                ${sriHtml}
            </div>
        </div>
    `;
    box.scrollIntoView({ behavior: 'smooth' });
}

// --- ACTIONS ---
function cariTanggal() {
    const input = document.getElementById('inputTgl');
    if (!input || !input.value) return alert("Pilih tanggal!");
    
    const target = new Date(input.value);
    tglTampilan = new Date(target.getFullYear(), target.getMonth(), 1);
    buildCalendar();
    updateShowDetail(target);
}

function shareWA() {
    const text = document.getElementById('printArea').innerText.replace("Share WA", "");
    window.open("https://wa.me/?text=" + encodeURIComponent("*HASIL ANALISIS KALENDER JAWA*\n\n" + text), "_blank");
}

// --- INIT ---
document.addEventListener("DOMContentLoaded", () => {
    buildCalendar();
    updateShowDetail(HARI_INI);

    // Bind Buttons
    const btnCari = document.getElementById('btnCari');
    if(btnCari) btnCari.onclick = cariTanggal;

    const btnPrev = document.getElementById('prevMonth');
    if(btnPrev) btnPrev.onclick = () => { tglTampilan.setMonth(tglTampilan.getMonth() - 1); buildCalendar(); };

    const btnNext = document.getElementById('nextMonth');
    if(btnNext) btnNext.onclick = () => { tglTampilan.setMonth(tglTampilan.getMonth() + 1); buildCalendar(); };
});