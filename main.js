/**
 * KALENDER JAWA MODERN 2026 - FINAL FIX
 * Integrasi Data Terpisah (Sri Paljati, Wuku) & PDF Stability
 */

// ==========================================
// RENDER GRID KALENDER
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

    // Padding awal bulan
    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));

    // Isi Tanggal
    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(y, m, d);
        const p = getPasaran(dateObj);
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        
        if (dateObj.getDay() === 0) cell.classList.add('sunday-red');
        if (dateObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');
        
        cell.innerHTML = `<div class="date-num">${d}</div><div class="pasaran-text">${p}</div>`;
        cell.onclick = () => {
            // Highlight selected
            document.querySelectorAll('.calendar-day').forEach(c => c.classList.remove('selected-day'));
            cell.classList.add('selected-day');
            updateDetail(dateObj, p);
        };
        grid.appendChild(cell);
    }
}

// ==========================================
// UPDATE DETAIL (MENGGUNAKAN DATA TERPISAH)
// ==========================================
function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const wetonKey = `${h} ${pasaran}`;
    const nH = NEPTU_HARI[h];
    const nP = NEPTU_PASARAN[pasaran];
    const neptuTotal = nH + nP;
    
    const infoJawa = getTanggalJawa(date);
    const wukuName = getWuku(date);
    const arah = getArahMeditasi(neptuTotal);
    const usia = hitungUsiaLengkap(date);
    
    const isNaas = infoJawa.bulan.naas.includes(infoJawa.tanggal);
    const isTaliWangke = (wetonKey === infoJawa.bulan.taliWangke);

    // --- LOGIKA SRI PALJATI (MENGAMBIL DARI DATA TERPISAH) ---
    let tabelSriPaljati = '';
    const dataSiklus = (typeof TABEL_SRIJATI !== 'undefined') ? TABEL_SRIJATI[neptuTotal] : null;
    
    if (dataSiklus) {
        tabelSriPaljati = `<table style="width:100%; border-collapse: collapse; margin-top:10px; font-size:0.8rem; border:1px solid #ddd;">
            <tr style="background:#f9f9f9;">
                <th style="border:1px solid #ddd; padding:6px;">Usia</th>
                <th style="border:1px solid #ddd; padding:6px;">Nilai</th>
                <th style="border:1px solid #ddd; padding:6px;">Nasib</th>
            </tr>`;
        dataSiklus.forEach(item => {
            const skor = item.v !== undefined ? item.v : (item.nilai || 0);
            const range = item.a || item.usia || "-";
            const ket = (typeof SRI_JATI_DESC !== 'undefined') ? SRI_JATI_DESC[skor] : "Data...";
            tabelSriPaljati += `<tr>
                <td style="border:1px solid #ddd; padding:6px; text-align:center;">${range} Th</td>
                <td style="border:1px solid #ddd; padding:6px; text-align:center; font-weight:bold; color:#D30000;">${skor}</td>
                <td style="border:1px solid #ddd; padding:6px;">${ket}</td>
            </tr>`;
        });
        tabelSriPaljati += `</table>`;
    }

    // --- DATA WUKU (MENGAMBIL DARI DATA TERPISAH) ---
    const teksWuku = (typeof DATA_WUKU !== 'undefined') ? (DATA_WUKU[wukuName] || "Detail wuku belum tersedia.") : "Data Wuku tidak terdeteksi.";

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="printableArea" style="background:#fff; padding:20px; border-radius:8px; color:#000; border:1px solid #eee;">
            <div style="border-bottom:2px solid #D30000; padding-bottom:10px; margin-bottom:15px;">
                <h2 style="margin:0; color:#D30000;">${wetonKey}</h2>
                <p style="margin:5px 0; font-weight:bold;">${date.getDate()} ${["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"][date.getMonth()]} ${date.getFullYear()}</p>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:15px;">
                <div style="background:#fff8e1; padding:10px; border-radius:8px; border:1px solid #ffe0b2;">
                    <h4 style="margin:0 0 5px; color:#e65100;">📊 Jumlah Neptu: ${neptuTotal}</h4>
                    <p style="margin:0; font-size:0.85rem;">Hari ${h}: ${nH}</p>
                    <p style="margin:0; font-size:0.85rem;">Pasaran ${pasaran}: ${nP}</p>
                </div>
                <div style="background:#f1f8e9; padding:10px; border-radius:8px; border:1px solid #c8e6c9;">
                    <h4 style="margin:0 0 5px; color:#2e7d32;">🌙 Bulan Jawa</h4>
                    <p style="margin:0; font-size:0.85rem;">${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun}</p>
                    <p style="margin:0; font-size:0.85rem;">Status: <strong>${infoJawa.bulan.status}</strong></p>
                </div>
            </div>

            <div style="background:#fafafa; padding:10px; border-radius:8px; border:1px solid #ddd; margin-bottom:15px; font-size:0.85rem;">
                <p style="margin:0;"><strong>Tali Wangke:</strong> ${infoJawa.bulan.taliWangke}</p>
                <p style="margin:5px 0 0;"><strong>Tanggal Naas Bulan Ini:</strong> ${infoJawa.bulan.naas.join(', ')}</p>
                ${isNaas || isTaliWangke ? `<p style="color:red; margin-top:8px; font-weight:bold;">⚠️ PERINGATAN: HARI INI NAAS / TALI WANGKE</p>` : ''}
            </div>

            <div style="margin-bottom:15px;">
                <h4 style="color:#D30000; border-bottom:1px solid #eee; padding-bottom:5px;">🛡️ Analisis Wuku ${wukuName}</h4>
                <div style="font-size:0.85rem; line-height:1.5;">${teksWuku}</div>
            </div>

            <div style="margin-top:20px;">
                <h4 style="color:#D30000; border-bottom:1px solid #eee; padding-bottom:5px;">📈 Sri Paljati (Siklus Rejeki)</h4>
                ${tabelSriPaljati || '<p>Data rejeki tidak tersedia.</p>'}
            </div>
            
            <p style="font-size:0.75rem; color:#888; margin-top:20px;">*Usia saat ini: ${usia} | Arah: ${arah}</p>
        </div>
        
        <div class="no-print" style="margin-top:15px; display:flex; gap:10px;">
            <button onclick="downloadPDF()" style="flex:1; background:#D30000; color:#fff; padding:12px; border:none; border-radius:5px; cursor:pointer; font-weight:bold;">⬇️ Download PDF</button>
            <button onclick="shareWhatsApp()" style="flex:1; background:#25D366; color:#fff; padding:12px; border:none; border-radius:5px; cursor:pointer; font-weight:bold;">📲 Share WhatsApp</button>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// DOWNLOAD PDF FIX (ANTI BLANK)
// ==========================================
async function downloadPDF() {
    const element = document.getElementById('printableArea');
    if (!element) return alert("Data tidak ditemukan!");

    const opt = {
        margin: [10, 10, 10, 10],
        filename: 'Hasil-Weton-Lengkap.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true, 
            logging: false,
            letterRendering: true,
            windowWidth: 800 // Kunci agar layout tidak hancur saat render
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(opt).from(element).save();
    } catch (err) {
        console.error("PDF Error: ", err);
        alert("Gagal membuat PDF. Pastikan library html2pdf sudah terpasang.");
    }
}

// ==========================================
// SHARE WHATSAPP FIX
// ==========================================
function shareWhatsApp() {
    const area = document.getElementById('printableArea');
    if (!area) return;
    
    // Ambil teks dan rapikan spasi/barisnya
    const textContent = area.innerText.replace(/\n\s*\n/g, '\n').trim();
    const message = `*HASIL CEK WETON JAWA*\n\n${textContent}\n\n_Generated by Kalender Jawa Modern_`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
}
