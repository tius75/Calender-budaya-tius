const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

let current = new Date();
const TODAY = new Date();

// 1. Fungsi Pasaran
function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

// 2. Fungsi Wuku (Dikalibrasi agar 28 Jan 2026 = Maktal)
function getWuku(date) {
    const wukuList = ["Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", "Warigalit", "Wariagung", "Julungwangi", "Sungsang", "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut", "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", "Maktal", "Wuye", "Manahil", "Prangbakat", "Bala", "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"];
    
    // Referensi: 25 Januari 2026 adalah awal Wuku Maktal (Ahad/Minggu)
    const refDate = new Date(2026, 0, 25); 
    const diffTime = date.getTime() - refDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Indeks Maktal adalah 20
    let wukuIndex = (20 + Math.floor(diffDays / 7)) % 30;
    if (wukuIndex < 0) wukuIndex += 30;
    
    return wukuList[wukuIndex];
}

// 3. Fungsi Render Grid
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
        el.className = 'header-day' + (i === 0 ? ' sunday' : '');
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

// 4. FUNGSI DETAIL TUNGGAL (Menggabungkan Hari, Wuku, dan Sri Jati)
function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    const h = HARI[date.getDay()];
    const wetonKey = `${h} ${pasaran}`;
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const wukuName = getWuku(date);
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

const NASIB_AHLI_WARIS = {
    1: { nama: "Gunung", arti: "Ahli waris yang ditinggalkan akan mendapatkan kehidupan yang mulia." },
    2: { nama: "Guntur", arti: "Orang yang ditinggalkan atau ahli waris akan mendapat kesulitan." },
    3: { nama: "Segoro", arti: "Ahli waris akan menghadapi situasi dimudahkannya mencari penghasilan atau rezeki." },
    0: { nama: "Asat", arti: "Ahli waris yang ditinggalkan akan mengalami kesulitan mendapat rezeki." } // 0 adalah hasil sisa bagi 4 yang habis (seperti 12)
};

    // Ambil data dari variabel global (file data-*.js)
    const teksWuku = (typeof DATA_WUKU !== 'undefined') ? (DATA_WUKU[wukuName] || "Detail wuku belum diinput.") : "File data-wuku.js belum terbaca.";
    const teksHari = (typeof DATA_HARI !== 'undefined') ? (DATA_HARI[wetonKey] || "Data watak belum tersedia.") : "File data-hari.js belum terbaca.";
    const dataRejeki = (typeof TABEL_SRIJATI !== 'undefined') ? (TABEL_SRIJATI[neptu] || []) : [];

    // Buat Tabel Sri Jati
    let tabelHtml = `
        <table style="width:100%; border-collapse: collapse; margin-top:10px; font-size:0.85rem; border:1px solid #ddd;">
            <tr style="background:#f4f4f4;">
                <th style="border:1px solid #ddd; padding:8px;">Usia</th>
                <th style="border:1px solid #ddd; padding:8px;">Nilai</th>
                <th style="border:1px solid #ddd; padding:8px;">Nasib</th>
            </tr>`;
    
    dataRejeki.forEach(item => {
        tabelHtml += `
            <tr>
                <td style="border:1px solid #ddd; padding:8px; text-align:center;">${item.usia}</td>
                <td style="border:1px solid #ddd; padding:8px; text-align:center; color:#D30000; font-weight:bold;">${item.nilai}</td>
                <td style="border:1px solid #ddd; padding:8px;">${item.ket}</td>
            </tr>`;
    });
    tabelHtml += `</table>`;

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div class="card-result" style="padding:15px; border:1px solid #eee; border-radius:12px;">
            <h2 style="color:#D30000; margin-bottom:5px;">${wetonKey}</h2>
            <p style="font-size:0.9rem; color:#666;">${date.getDate()} ${namaBulan[date.getMonth()]} ${date.getFullYear()}</p>
            <p style="margin-top:5px;"><strong>Neptu:</strong> ${neptu} | <strong>Wuku:</strong> ${wukuName}</p>
            
            <hr style="margin:15px 0; border:0; border-top:1px solid #eee;">
            
            <div class="info-section" style="margin-bottom:15px;">
                <h4 style="color:#D30000; margin-bottom:5px;">🌸 Watak Kelahiran</h4>
                <div style="font-size:0.85rem; line-height:1.5;">${teksHari}</div>
            </div>

            <div class="info-section" style="margin-bottom:15px;">
                <h4 style="color:#D30000; margin-bottom:5px;">🛡️ Analisis Wuku ${wukuName}</h4>
                <div style="font-size:0.85rem; line-height:1.5;">${teksWuku}</div>
            </div>

            <div class="info-section">
                <h4 style="color:#D30000; margin-bottom:5px;">📈 Siklus Sri Jati (Rejeki)</h4>
                ${dataRejeki.length > 0 ? tabelHtml : "<p style='color:#999;'>Data rejeki untuk neptu ini belum tersedia.</p>"}
            </div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// 5. Navigasi & Search
document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };

// Gunakan ID tombol search yang benar di HTML Anda (misal: btnSearch)
const searchBtn = document.getElementById('btnSearch');
if (searchBtn) {
    searchBtn.onclick = () => {
        const val = document.getElementById('dateInput').value;
        if (val) {
            const d = new Date(val);
            current = new Date(d.getFullYear(), d.getMonth(), 1);
            generateCalendar();
            updateDetail(d, getPasaran(d));
        }
    };
}

// Inisialisasi
generateCalendar();
updateDetail(TODAY, getPasaran(TODAY));
