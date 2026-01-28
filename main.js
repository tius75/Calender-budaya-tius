// ==========================================
// KONSTANTA & DATA REFERENSI
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const NASIB_AHLI_WARIS = {
    1: { nama: "Gunung", arti: "Ahli waris yang ditinggalkan akan mendapatkan kehidupan yang mulia." },
    2: { nama: "Guntur", arti: "Orang yang ditinggalkan atau ahli waris akan mendapat kesulitan." },
    3: { nama: "Segoro", arti: "Ahli waris akan menghadapi situasi dimudahkannya mencari rezeki." },
    0: { nama: "Asat", arti: "Ahli waris yang ditinggalkan akan mengalami kesulitan mendapat rezeki." }
};

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

let current = new Date();
const TODAY = new Date();

// ==========================================
// FUNGSI PENDUKUNG (PASARAN, WUKU, & JAWA)
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
    const refDate = new Date(2026, 0, 28); // 28 Jan 2026
    const refTglJawa = 9;
    const refBulanIdx = 7; // Ruwah
    const refTahunJawa = 1959;

    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let totalHariJawa = refTglJawa + diffDays;
    
    let bulanIdx = refBulanIdx;
    let tahunJawa = refTahunJawa;
    let tglJawa = totalHariJawa;

    while (tglJawa > 30) {
        tglJawa -= 30;
        bulanIdx = (bulanIdx + 1) % 12;
        if (bulanIdx === 0) tahunJawa++;
    }
    while (tglJawa <= 0) {
        tglJawa += 30;
        bulanIdx = (bulanIdx - 1 + 12) % 12;
        if (bulanIdx === 11) tahunJawa--;
    }
    return { tanggal: tglJawa, bulan: DATA_BULAN_JAWA[bulanIdx], tahun: tahunJawa };
}

// ==========================================
// FUNGSI RENDER GRID KALENDER
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

// ==========================================
// FUNGSI TAMPIL DETAIL (SHOW DETAIL)
// ==========================================
function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const wetonKey = `${h} ${pasaran}`;
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const wukuName = getWuku(date);
    const infoJawa = getTanggalJawa(date);
    const sisaBagi4 = neptu % 4;
    const nasibKematian = NASIB_AHLI_WARIS[sisaBagi4];

    document.getElementById('actionButtons').style.display = 'flex';

    const teksWuku = (typeof DATA_WUKU !== 'undefined') ? (DATA_WUKU[wukuName] || "Detail wuku belum tersedia.") : "Data Wuku tidak terbaca.";
    const teksHari = (typeof DATA_HARI !== 'undefined') ? (DATA_HARI[wetonKey] || "Data watak hari belum tersedia.") : "Data Hari tidak terbaca.";
    const dataSriJati = (typeof TABEL_SRIJATI !== 'undefined') ? (TABEL_SRIJATI[neptu] || []) : [];

    const isNaas = infoJawa.bulan.naas.includes(infoJawa.tanggal);
    const isTaliWangke = (wetonKey === infoJawa.bulan.taliWangke);

    let warningNaas = "";
    if (isNaas || isTaliWangke) {
        warningNaas = `
        <div style="background:#ffebee; color:#c62828; padding:10px; border-radius:8px; margin-bottom:15px; border-left:5px solid #d32f2f; font-size:0.85rem;">
            <strong>⚠️ PERINGATAN HARI NAAS</strong><br>
            ${isNaas ? `• Tanggal ${infoJawa.tanggal} ${infoJawa.bulan.nama} merupakan tanggal dilarang.<br>` : ""}
            ${isTaliWangke ? `• Hari ini adalah Tali Wangke (${infoJawa.bulan.taliWangke}).` : ""}
        </div>`;
    }

    let tabelHtml = `
        <table style="width:100%; border-collapse: collapse; margin-top:10px; font-size:0.85rem; border:1px solid #ddd;">
            <tr style="background:#f9f9f9;">
                <th style="border:1px solid #ddd; padding:8px;">Usia</th>
                <th style="border:1px solid #ddd; padding:8px;">Nilai</th>
                <th style="border:1px solid #ddd; padding:8px;">Nasib</th>
            </tr>`;
    dataSriJati.forEach(item => {
        tabelHtml += `<tr><td style="border:1px solid #ddd; padding:8px; text-align:center;">${item.usia}</td><td style="border:1px solid #ddd; padding:8px; text-align:center; color:#D30000; font-weight:bold;">${item.nilai}</td><td style="border:1px solid #ddd; padding:8px;">${item.ket}</td></tr>`;
    });
    tabelHtml += `</table>`;

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div class="card-result" style="background:#fff; padding:15px; border-radius:12px; border:1px solid #eee; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            ${warningNaas}
            <h2 style="color:#D30000; margin-bottom:5px; border-bottom:2px solid #D30000; display:inline-block;">${wetonKey}</h2>
            <p style="margin-top:10px; font-size:0.95rem;"><strong>Jawa:</strong> ${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun} AJ</p>
            <p style="font-size:0.9rem; color:#666;">Status Bulan: ${infoJawa.bulan.status}</p>
            <p style="margin-top:5px;"><strong>Neptu:</strong> ${neptu} | <strong>Wuku:</strong> ${wukuName}</p>
            
            <div style="margin-top:15px; padding:10px; background:#fffcf0; border-left:4px solid #f1c40f; border-radius:4px;">
                <h4 style="margin:0; color:#856404; font-size:0.9rem;">🪦 Nasib Ahli Waris (Kematian)</h4>
                <p style="margin:5px 0 0; font-weight:bold;">Kategori: ${nasibKematian.nama}</p>
                <p style="margin:2px 0 0; font-size:0.85rem; font-style:italic;">"${nasibKematian.arti}"</p>
            </div>

            <div style="margin-top:20px;">
                <h4 style="color:#D30000; border-bottom:1px solid #eee; padding-bottom:3px;">🌸 Watak Kelahiran</h4>
                <div style="font-size:0.85rem; line-height:1.5; color:#444;">${teksHari}</div>
            </div>

            <div style="margin-top:20px;">
                <h4 style="color:#D30000; border-bottom:1px solid #eee; padding-bottom:3px;">🛡️ Analisis Wuku ${wukuName}</h4>
                <div style="font-size:0.85rem; line-height:1.5; color:#444;">${teksWuku}</div>
            </div>

            <div style="margin-top:20px;">
                <h4 style="color:#D30000; border-bottom:1px solid #eee; padding-bottom:3px;">📈 Siklus Sri Jati (Rejeki)</h4>
                ${dataSriJati.length > 0 ? tabelHtml : "<p style='font-size:0.8rem; color:#999;'>Data rejeki belum tersedia.</p>"}
            </div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// NAVIGASI, PENCARIAN, & TOOLS
// ==========================================
document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };

window.searchWeton = () => {
    const val = document.getElementById('dateInput').value;
    if (val) {
        const d = new Date(val);
        current = new Date(d.getFullYear(), d.getMonth(), 1);
        generateCalendar();
        updateDetail(d, getPasaran(d));
    }
};

window.downloadPDF = () => {
    const element = document.getElementById('detail');
    if (!element || element.innerText.trim() === "") { alert("Pilih tanggal terlebih dahulu!"); return; }
    const opt = {
        margin: 0.5,
        filename: 'Ramalan_Weton.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
            scale: 2, backgroundColor: "#ffffff", useCORS: true,
            onclone: (clonedDoc) => {
                const detailClone = clonedDoc.getElementById('detail');
                detailClone.style.color = "black";
                const allTexts = detailClone.querySelectorAll('*');
                allTexts.forEach(el => el.style.color = "black");
            }
        },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
};

window.shareWhatsApp = () => {
    const detailText = document.getElementById('detail').innerText;
    const url = "https://api.whatsapp.com/send?text=" + encodeURIComponent("Hasil Ramalan Weton & Primbon:\n\n" + detailText);
    window.open(url, '_blank');
};

generateCalendar();
updateDetail(TODAY, getPasaran(TODAY));

// Fungsi di main.js menjadi sangat pendek
function getMangsaInfo(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    let id = 1;

    // Logika penentuan ID Mangsa
    if ((d >= 22 && m == 6) || (m == 7) || (d <= 1 && m == 8)) id = 1;
    else if (d >= 2 && m == 8 && d <= 25) id = 2;
    // ... dan seterusnya untuk 12 mangsa

    return DATA_MANGSA[id]; // Mengambil data dari file sebelah
}
