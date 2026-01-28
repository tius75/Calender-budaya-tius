/**
 * KALENDER JAWA MODERN - FINAL REVISION
 * Fix: Red Sunday, Search Button, WhatsApp Share, & Clean PDF Print.
 */

// --- DATA REFERENSI ---
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const KAMAROKAM_6 = {
    1: { nama: "NUJU PADU", arti: "Jelek, sering bertengkar. Manfaat: Dapur, Warung." },
    2: { nama: "KALA TINANTANG", arti: "Jelek, sering sakit, amarah tinggi. Manfaat: Dapur." },
    3: { nama: "SANGGAR WARINGIN", arti: "Baik, tenteram, bahagia. Manfaat: Hajatan, Pindah Rumah." },
    4: { nama: "MANTRI SINAROJA", arti: "Baik, tercapai cita-cita. Manfaat: Hajatan." },
    5: { nama: "MACAN KETAWAN", arti: "Sedang, disegani tapi dijauhi. Manfaat: Pintu Gerbang." },
    0: { nama: "NUJU PATI", arti: "Buruk, rejeki mampet. Manfaat: Paku Bumi." }
};

let current = new Date();
const TODAY = new Date();

// --- LOGIKA PERHITUNGAN ---
function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getLunarShio(year) {
    const shios = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];
    return shios[year % 12];
}

// --- RENDER KALENDER ---
function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;
    
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    if(mNav) mNav.innerText = `${namaBulan[m]} ${y}`;

    // Header Hari
    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        // FIX: Warna Merah Hari Minggu di Header
        el.className = 'header-day' + (i === 0 ? ' sunday-text' : '');
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
        
        // FIX: Warna Merah Hari Minggu di Angka
        if (dateObj.getDay() === 0) cell.classList.add('sunday-text');
        if (dateObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');
        
        cell.innerHTML = `<strong>${d}</strong><br><small>${p}</small>`;
        cell.onclick = () => {
            document.querySelectorAll('.calendar-day').forEach(c => c.classList.remove('selected-day'));
            cell.classList.add('selected-day');
            updateDetail(dateObj, p);
        };
        grid.appendChild(cell);
    }
}

// --- TAMPILKAN DETAIL (LENGKAP) ---
function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const kam = KAMAROKAM_6[neptu % 6];
    const shio = getLunarShio(date.getFullYear());
    const dataSriJati = (typeof TABEL_SRIJATI !== 'undefined') ? (TABEL_SRIJATI[neptu] || []) : [];

    let tabelSriJati = `<table style="width:100%; border-collapse:collapse; margin-top:10px; font-size:12px; border:1px solid #ddd;">
                        <tr style="background:#f2f2f2;"><th>Usia</th><th>Nilai</th><th>Nasib</th></tr>`;
    dataSriJati.forEach(r => {
        tabelSriJati += `<tr style="text-align:center; border-top:1px solid #ddd;"><td>${r.usia}</td><td style="color:red; font-weight:bold;">${r.nilai}</td><td>${r.ket||'-'}</td></tr>`;
    });
    tabelSriJati += `</table>`;

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <style>
            @media print {
                body * { visibility: hidden; }
                #printArea, #printArea * { visibility: visible; }
                #printArea { position: absolute; left: 0; top: 0; width: 100%; padding: 20px; }
                .no-print { display: none !important; }
            }
            .sunday-text { color: red !important; }
        </style>

        <div id="printArea" style="background:#fff; padding:20px; border-radius:10px; border:1px solid #ddd; color: #000;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h2 style="color:#D30000; margin:0;">${h} ${pasaran}</h2>
                <div class="no-print">
                    <button onclick="shareWA('${h} ${pasaran}', '${date.toLocaleDateString()}', '${neptu}')" style="background:#25D366; color:white; border:none; padding:8px 12px; border-radius:5px; cursor:pointer;">Share WA</button>
                    <button onclick="window.print()" style="background:#333; color:white; border:none; padding:8px 12px; border-radius:5px; cursor:pointer;">Cetak PDF</button>
                </div>
            </div>
            <p><strong>Masehi:</strong> ${date.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
            <p><strong>Neptu:</strong> ${neptu} | <strong>Shio:</strong> ${shio}</p>
            <hr>
            <div style="background:#fff3e0; padding:15px; border-radius:8px; margin:10px 0; border-left: 5px solid #ff9800;">
                <h4 style="margin:0; color:#e65100;">⚖️ KAMAROKAM: ${kam.nama}</h4>
                <p style="font-size:13px; margin:5px 0; color: #333;">${kam.arti}</p>
            </div>
            <div style="margin-top:20px;">
                <h4 style="color:#D30000; border-bottom:2px solid #D30000; padding-bottom:5px;">📈 TABEL SRI JATI (REJEKI)</h4>
                ${dataSriJati.length > 0 ? tabelSriJati : "<p style='color:#999; font-style:italic;'>Data rejeki tidak ditemukan.</p>"}
            </div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// --- FUNGSI TOOLS ---
function cariTanggal() {
    const input = document.getElementById('inputTgl');
    if (!input || !input.value) return alert("Pilih tanggal dulu!");
    const target = new Date(input.value);
    current = new Date(target.getFullYear(), target.getMonth(), 1);
    generateCalendar();
    updateDetail(target, getPasaran(target));
}

function shareWA(weton, tgl, neptu) {
    const text = `*KALENDER JAWA MODERN*\n\n📅 *Weton:* ${weton}\n📆 *Masehi:* ${tgl}\n🔢 *Neptu:* ${neptu}\n\nCek selengkapnya di: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

// --- INISIALISASI ---
document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
    updateDetail(TODAY, getPasaran(TODAY));

    // FIX: Binding Tombol Cari
    const btnCari = document.getElementById('btnCari');
    if(btnCari) btnCari.onclick = cariTanggal;

    const prev = document.getElementById('prevMonth');
    const next = document.getElementById('nextMonth');
    if(prev) prev.onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    if(next) next.onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
});
