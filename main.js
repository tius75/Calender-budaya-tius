// JANGAN ada baris 'import' di sini!

const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

let current = new Date();
const TODAY = new Date();

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;

    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    mNav.innerText = `${namaBulan[m]} ${y}`;

    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        el.className = 'header-day';
        if (i === 0) el.style.color = '#D30000';
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

        if (dateObj.getDay() === 0) cell.classList.add('sunday-block');
        if (dateObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');

        cell.innerHTML = `<div class="date-num">${d}</div><div class="pasaran-text">${p}</div>`;
        cell.onclick = () => updateDetail(dateObj, p);
        grid.appendChild(cell);
    }
}

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    const h = HARI[date.getDay()];
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    
    // TABEL_SRIJATI diambil dari file data-srijati.js yang dimuat sebelumnya
    const dataRejeki = (typeof TABEL_SRIJATI !== 'undefined') ? (TABEL_SRIJATI[neptu] || []) : [];
    
    let tabelHtml = `<table style="width:100%; border-collapse: collapse; margin-top:10px; font-size:0.8rem; border:1px solid #ddd;">
        <tr style="background:#eee;"><th>Usia</th><th>Nilai</th><th>Nasib</th></tr>`;

    dataRejeki.forEach(item => {
        tabelHtml += `<tr>
            <td style="border:1px solid #ddd;padding:5px;text-align:center;">${item.usia}</td>
            <td style="border:1px solid #ddd;padding:5px;text-align:center;color:red;font-weight:bold;">${item.nilai}</td>
            <td style="border:1px solid #ddd;padding:5px;">${item.ket}</td>
        </tr>`;
    });
    tabelHtml += `</table>`;

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div class="card-result">
            <h3 style="color:#D30000;">Neptu: ${neptu}</h3>
            <p><strong>Weton:</strong> ${h} ${pasaran}</p>
            <div style="margin-top:10px;">
                <h4 style="color:#D30000; border-bottom:1px solid #eee;">📈 Siklus Rejeki (Sri Jati)</h4>
                ${dataRejeki.length > 0 ? tabelHtml : "<p>Data neptu ini belum tersedia.</p>"}
            </div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// FUNGSI CARI: Pindah View Tahun & Bulan
const btnSearch = document.getElementById('btnSearch');
if (btnSearch) {
    btnSearch.onclick = () => {
        const val = document.getElementById('dateInput').value;
        if (val) {
            const targetDate = new Date(val);
            current = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
            generateCalendar();
            updateDetail(targetDate, getPasaran(targetDate));
        }
    };
}

document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };

generateCalendar();
updateDetail(TODAY, getPasaran(TODAY));

// Tambahkan fungsi hitung Wuku sederhana (Siklus 210 hari)
function getWuku(date) {
    const wukuList = ["Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", "Warigalit", "Wariagung", "Julungwangi", "Sungsang", "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut", "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", "Maktal", "Wuye", "Manahil", "Prangbakat", "Bala", "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"];
    const baseDate = new Date(1900, 0, 7); // Patokan Wuku Sinta
    const diff = Math.floor((date.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
    const wukuIndex = Math.floor((diff % 210) / 7);
    return wukuList[wukuIndex >= 0 ? wukuIndex : wukuIndex + 30];
}

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    const h = HARI[date.getDay()];
    const wetonKey = `${h} ${pasaran}`;
    const wukuName = getWuku(date);
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];

    // Ambil teks dari file eksternal
    const teksWuku = (typeof DATA_WUKU !== 'undefined') ? (DATA_WUKU[wukuName] || "Detail Wuku belum tersedia.") : "";
    const teksHari = (typeof DATA_HARI !== 'undefined') ? (DATA_HARI[wetonKey] || "Detail watak hari belum tersedia.") : "";
    const dataRejeki = (typeof TABEL_SRIJATI !== 'undefined') ? (TABEL_SRIJATI[neptu] || []) : [];

    // Tampilkan di HTML
    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div class="card-result">
            <h3 style="color:#D30000;">${wetonKey} (Neptu ${neptu})</h3>
            <p><strong>Wuku:</strong> ${wukuName}</p>
            <hr>
            <div class="info-section">
                <h4>🌸 Watak Kelahiran</h4>
                <p style="font-size:0.85rem;">${teksHari}</p>
            </div>
            <div class="info-section">
                <h4>🛡️ Analisis Wuku</h4>
                <p style="font-size:0.85rem;">${teksWuku}</p>
            </div>
            <div class="info-section">
                <h4>📈 Siklus Sri Jati (Rejeki)</h4>
                </div>
        </div>
    `;
}
