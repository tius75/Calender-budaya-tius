// ==========================================
// 1. DATA REFERENSI (Internalized)
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const PEMBAGI_5 = {
    1: { n: "Sri", a: "Rezeki melimpah dan hidup makmur." },
    2: { n: "Lungguh", a: "Mendapatkan kedudukan atau derajat tinggi." },
    3: { n: "Gendhong", a: "Mapan dan dihargai banyak orang." },
    4: { n: "Loro", a: "Sering menghadapi hambatan kesehatan." },
    0: { n: "Pati", a: "Banyak rintangan, perlu kehati-hatian." }
};

const PEMBAGI_4 = {
    1: { n: "Gunung", a: "Kehidupan yang mulia bagi ahli waris." },
    2: { n: "Guntur", a: "Ahli waris akan mendapatkan kesulitan." },
    3: { n: "Segoro", a: "Kemudahan rezeki dan wawasan luas." },
    0: { n: "Asat", a: "Rezeki sering cepat habis atau sulit terkumpul." }
};

// ==========================================
// 2. LOGIKA PERHITUNGAN
// ==========================================

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getZodiak(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const z = [
        {n:"Capricorn", r:[22,12,19,1]}, {n:"Aquarius", r:[20,1,18,2]},
        {n:"Pisces", r:[19,2,20,3]}, {n:"Aries", r:[21,3,19,4]},
        {n:"Taurus", r:[20,4,20,5]}, {n:"Gemini", r:[21,5,20,6]},
        {n:"Cancer", r:[21,6,22,7]}, {n:"Leo", r:[23,7,22,8]},
        {n:"Virgo", r:[23,8,22,9]}, {n:"Libra", r:[23,9,22,10]},
        {n:"Scorpio", r:[23,10,21,11]}, {n:"Sagittarius", r:[22,11,21,12]}
    ];
    for(let i of z) {
        if((m==i.r[1] && d>=i.r[0]) || (m==i.r[3] && d<=i.r[2])) return i.n;
    }
    return "Capricorn";
}

function getLunarInfo(date) {
    const shios = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];
    const y = date.getFullYear();
    return { shio: shios[y % 12], thn: y + 3760 };
}

// ==========================================
// 3. FUNGSI RENDER (Solusi Data Hilang)
// ==========================================

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const wukuName = (typeof getWuku === 'function') ? getWuku(date) : "Sinta";
    const mangsa = (typeof getMangsaInfo === 'function') ? getMangsaInfo(date) : {nama: "Tidak Terdeteksi", deskripsi: ""};
    const zodiak = getZodiak(date);
    const lunar = getLunarInfo(date);
    const infoJawa = (typeof getTanggalJawa === 'function') ? getTanggalJawa(date) : {tanggal: date.getDate(), bulan:{nama:"-"}, tahun:"-"};

    // Pal Jati / Sri Jati Table Logic
    let tabelSriJati = "";
    if (typeof TABEL_SRIJATI !== 'undefined' && TABEL_SRIJATI[neptu]) {
        tabelSriJati = `<div style="margin-top:20px;"><h4 style="color:#D30000; border-bottom:1px solid #eee;">📈 Pal Jati (Siklus Rezeki)</h4>
        <table style="width:100%; border-collapse:collapse; font-size:0.8rem; margin-top:5px;">
            <tr style="background:#eee;"><th>Usia</th><th>Nilai</th><th>Keterangan</th></tr>
            ${TABEL_SRIJATI[neptu].map(i => `<tr><td style="border:1px solid #ddd; padding:4px; text-align:center;">${i.usia}</td><td style="border:1px solid #ddd; padding:4px; text-align:center; color:red;">${i.nilai}</td><td style="border:1px solid #ddd; padding:4px;">${i.ket}</td></tr>`).join('')}
        </table></div>`;
    }

    // Render HTML
    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="pdf-area" style="background:#fff; padding:20px; border-radius:15px; border:1px solid #ddd; color:#000;">
            <h2 style="color:#D30000; margin:0;">${h} ${pasaran}</h2>
            <p style="font-size:0.85rem; margin:5px 0;">Masehi: ${date.toLocaleDateString('id-ID')}</p>
            <p style="font-size:0.85rem; margin:5px 0;">Jawa: ${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun} AJ</p>
            <p style="font-size:0.85rem; margin:5px 0;">Lunar: ${lunar.thn} (Shio ${lunar.shio}) | Zodiak: ${zodiak}</p>

            <div style="background:#e8f5e9; padding:10px; border-radius:8px; margin:15px 0; border-left:5px solid #2e7d32;">
                <h4 style="margin:0; color:#1b5e20;">💎 Nasib Pembagi 5: ${PEMBAGI_5[neptu % 5].n}</h4>
                <p style="margin:5px 0 0; font-size:0.85rem;">${PEMBAGI_5[neptu % 5].a}</p>
            </div>

            <div style="background:#fff3e0; padding:10px; border-radius:8px; margin:15px 0; border-left:5px solid #ef6c00;">
                <h4 style="margin:0; color:#e65100;">🪦 Nasib Kematian: ${PEMBAGI_4[neptu % 4].n}</h4>
                <p style="margin:5px 0 0; font-size:0.85rem;">${PEMBAGI_4[neptu % 4].a}</p>
            </div>

            <div style="background:#e3f2fd; padding:10px; border-radius:8px; margin:15px 0;">
                <h4 style="margin:0; color:#0d47a1;">🌾 Pranata Mangsa: ${mangsa.nama}</h4>
                <p style="margin:5px 0 0; font-size:0.85rem; line-height:1.4;">${mangsa.deskripsi}</p>
            </div>

            <h4 style="color:#D30000; border-bottom:1px solid #eee; margin-top:15px;">🛡️ Analisis Wuku: ${wukuName}</h4>
            <div style="font-size:0.85rem; line-height:1.4;">${(typeof DATA_WUKU !== 'undefined') ? (DATA_WUKU[wukuName] || "") : ""}</div>

            ${tabelSriJati}
        </div>
    `;
}

// Fungsi Download PDF (Fixed)
window.downloadPDF = () => {
    const element = document.getElementById('pdf-area');
    if (!element) return alert("Pilih tanggal dulu!");
    const opt = {
        margin: 0.5,
        filename: 'Ramalan_Lengkap.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
};

// Start Apps
generateCalendar(); 
updateDetail(TODAY, getPasaran(TODAY));
