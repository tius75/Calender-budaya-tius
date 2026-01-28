import { HARI, PASARAN, NEPTU_HARI, NEPTU_PASARAN } from './constants.js';
import { getPasaran, getWuku } from './calendar-engine.js';

// Import data terpisah
import { DATA_WUKU } from './data-wuku.js';
import { DATA_SRIJATI } from './data-srijati.js';
import { DATA_HARI } from './data-hari.js';

window.showDetail = function(date) {
    const d = new Date(date);
    const h = HARI[d.getDay()];
    const p = getPasaran(d);
    const w = getWuku(d);
    const weton = `${h} ${p}`;
    const nTotal = NEPTU_HARI[h] + NEPTU_PASARAN[p];

    const detailDiv = document.getElementById('detail');
    detailDiv.classList.add('active-show');

    detailDiv.innerHTML = `
        <div class="card">
            <h3>HASIL ANALISIS</h3>
            <p><strong>Weton:</strong> ${weton} (Neptu: ${nTotal})</p>
            <p><strong>Wuku:</strong> ${w}</p>
            
            <div class="content-section">
                <h4>📜 Sifat Wuku</h4>
                <p>${DATA_WUKU[w] || "Data wuku belum diisi."}</p>
            </div>

            <div class="content-section">
                <h4>✨ Ramalan Sri Jati</h4>
                <p>${DATA_SRIJATI[weton] || "Data ramalan belum diisi."}</p>
            </div>

            <div class="content-section">
                <h4>☀️ Sifat Hari</h4>
                <p>${DATA_HARI[h] || "Data hari belum diisi."}</p>
            </div>
        </div>
    `;
};
