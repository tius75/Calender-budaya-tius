/**
 * KALENDER JAWA - VERSI TOTAL FIX (STABILITAS TINGGI)
 * Fitur: Kamarokam (Pembagi 6), Sri Jati, Shio Update, Cari Tanggal, PDF, & Full WA.
 */

// --- DATA REFERENSI ---
const NAMA_HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const NAMA_PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const SKOR_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const SKOR_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const DATA_KAMAROKAM = {
    1: { n: "NUJU PADU", w: "Wataknya Jelek, segala sesuatu selalu kudu sulaya, dan sering bertengkar, jika dipergunakan untuk ahad nikah , tidak ada kesatuan pendapat dalam rumah tangga. Manfaat: Mendirikan Rumah untuk dapur, Warung, Restaurant dan sebagainya." },
    2: { n: "KALA TINANTANG", w: "Wataknya Jelek, selalu kekurangan hidupnya dan sering sakit – sakitan, serta besar napsu amarahnya, untuk Nikahan dan Pindahan Jelek. Manfaat: Mendirikan Dapur, rumah, Warung, Restaurant dan sebagainya." },
    3: { n: "SANGGAR WARINGIN", w: "Wataknya Baik, tenteram, mendapatkan kebahagiaan, rejeki berkembeang, hasilnya terang dan bisa menjadi pelindung dikalangan keluarganya, serta senang menuntut Ilmu. Manfaat: Untuk Hajatan, pindah rumah, mendirikan tempat ibadah, sanggar pamelengan." },
    4: { n: "MANTRI SINAROJA", w: "Wataknya Baik, tercapai apa yang dicita – citakan, hidupnya senang tidak kekurangan sandang pangan dan banyak anaknya. Manfaat: Untuk hajatan , pindah rumah." },
    5: { n: "MACAN KETAWAN", w: "Wataknya sedang – sedang saja, disegani tetapi juga dijauhi dan sering kehilangan, serta ada yang berniat jelek. Manfaat: Untuk mendirikan rumah dan pintu regol atau pintu gerbang." },
    0: { n: "NUJU PATI", w: "Wataknya Mampet rejekinya, susah hidupnya, kalau untuk mantu tidak lama bercerai, selalu dirundung malang, dan sering mengalami bencana. Manfaat: untuk membuat paku bumi dan jabung ( gerabah )." }
};

// --- STATE GLOBAL ---
let tglNavigasi = new Date();
const HARI_SEKARANG = new Date();

// --- LOGIKA PERHITUNGAN ---
function hitungPasaran(dt) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((dt.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return NAMA_PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function hitungShio(tahun) {
    const shios = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];
    return shios[tahun % 12];
}

function hitungZodiak(dt) {
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

// --- RENDER KALENDER ---
function renderKalender() {
    const grid = document.getElementById('calendar');
    const label = document.getElementById('monthYearNav');
    if (!grid) return;

    grid.innerHTML = '';
    const y = tglNavigasi.getFullYear();
    const m = tglNavigasi.getMonth();
    const bln = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    if(label) label.innerText = `${bln[m]} ${y}`;

    NAMA_HARI.forEach((h, i) => {
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
        const pas = hitungPasaran(dObj);
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        if (dObj.toDateString() === HARI_SEKARANG.toDateString()) cell.classList.add('today-highlight');
        
        cell.innerHTML = `<b>${d}</b><br><small>${pas}</small>`;
        cell.onclick = () => {
            document.querySelectorAll('.calendar-day').forEach(c => c.style.border = "1px solid #eee");
            cell.style.border = "2px solid #D30000";
            tampilkanDetail(dObj);
        };
        grid.appendChild(cell);
    }
}

// --- TAMPILKAN DETAIL (SHOW DETAIL) ---
function tampilkanDetail(date) {
    const box = document.getElementById('detail');
    if (!box) return;

    const h = NAMA_HARI[date.getDay()];
    const p = hitungPasaran(date);
    const neptu = SKOR_HARI[h] + SKOR_PASARAN[p];
    const kam = DATA_KAMAROKAM[neptu % 6];
    const shio = hitungShio(date.getFullYear());
    const zod = hitungZodiak(date);
    
    // Sri Jati (Tabel Rejeki)
    let sriTable = "";
    if (typeof TABEL_SRIJATI !== 'undefined' && TABEL_SRIJATI[neptu]) {
        sriTable = `<table style="width:100%; border-collapse:collapse; margin-top:10px; font-size:12px; border:1px solid #ddd;">
                    <tr style="background:#f9f9f9;"><th>Usia</th><th>Nilai</th><th>Nasib</th></tr>`;
        TABEL_SRIJATI[neptu].forEach(r => {
            sriTable += `<tr style="text-align:center; border-top:1px solid #ddd;"><td>${r.usia}</td><td style="color:red; font-weight:bold;">${r.nilai}</td><td>${r.ket||'-'}</td></tr>`;
        });
        sriTable += `</table>`;
    } else {
        sriTable = `<p style="font-size:12px; color:#999;">Data Sri Jati Neptu ${neptu} tidak ditemukan.</p>`;
    }

    box.style.display = "block";
    box.innerHTML = `
        <style>
            @media print { .no-print { display: none !important; } #detail { display: block !important; width: 100%; } }
        </style>
        <div id="captureReport" style="background:#fff; padding:20px; border:1px solid #ddd; border-radius:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center;" class="no-print">
                <h2 style="margin:0; color:#D30000; border-bottom:3px solid #D30000;">${h} ${p}</h2>
                <div>
                    <button onclick="fungsiShareWA()" style="background:#25D366; color:white; border:none; padding:8px 12px; border-radius:6px; cursor:pointer; font-weight:bold;">WhatsApp</button>
                    <button onclick="window.print()" style="background:#333; color:white; border:none; padding:8px 12px; border-radius:6px; cursor:pointer; font-weight:bold;">PDF</button>
                </div>
            </div>
            
            <p style="font-size:1.1rem; margin:15px 0 5px;"><strong>📅 Masehi:</strong> ${date.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
            <p style="margin:5px 0;"><strong>🔢 Neptu:</strong> ${neptu} | <strong>🐉 Shio:</strong> ${shio} | <strong>♈ Zodiak:</strong> ${zod}</p>

            <div style="background:#fff3e0; border-left:5px solid #ff9800; padding:15px; margin:15px 0; border-radius:0 8px 8px 0;">
                <h4 style="margin:0; color:#e65100; text-transform:uppercase;">⚖️ KAMAROKAM: ${kam.n}</h4>
                <p style="font-size:0.9rem; line-height:1.5; margin-top:8px;">${kam.w}</p>
            </div>

            <div style="margin-top:20px;">
                <h4 style="border-bottom:2px solid #D30000; padding-bottom:5px; margin-bottom:10px; color:#D30000;">📈 TABEL SRI JATI (SIKLUS REJEKI)</h4>
                ${sriTable}
            </div>
        </div>
    `;
    box.scrollIntoView({ behavior: 'smooth' });
}

// --- FUNGSI TOOLS ---
function fungsiCari() {
    const input = document.getElementById('inputTgl');
    if (!input || !input.value) return alert("Silakan pilih tanggal!");
    
    const target = new Date(input.value);
    tglNavigasi = new Date(target.getFullYear(), target.getMonth(), 1);
    renderKalender();
    tampilkanDetail(target);
}

function fungsiShareWA() {
    const teks = document.getElementById('captureReport').innerText.replace(/WhatsApp|PDF/g, '');
    window.open("https://wa.me/?text=" + encodeURIComponent("*HASIL DETAIL KALENDER JAWA*\n\n" + teks), "_blank");
}

// --- INITIALIZE ---
document.addEventListener("DOMContentLoaded", () => {
    // Jalankan kalender & detail hari ini
    renderKalender();
    tampilkanDetail(HARI_SEKARANG);

    // Hubungkan tombol navigasi
    const bPrev = document.getElementById('prevMonth');
    const bNext = document.getElementById('nextMonth');
    const bCari = document.getElementById('btnCari');

    if(bPrev) bPrev.onclick = () => { tglNavigasi.setMonth(tglNavigasi.getMonth() - 1); renderKalender(); };
    if(bNext) bNext.onclick = () => { tglNavigasi.setMonth(tglNavigasi.getMonth() + 1); renderKalender(); };
    if(bCari) bCari.onclick = fungsiCari;
});