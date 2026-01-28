import { WUKU_LIST, PASARAN, NEPTU_HARI, NEPTU_PASARAN } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const mainApp = document.getElementById('mainApp');
    
    // MENGHILANGKAN LOCK: Menampilkan aplikasi secara otomatis
    mainApp.classList.remove('hidden'); 
    
    console.log("Aplikasi Kalender Jawa Siap.");
    
    // Fungsi pencarian tanggal sederhana
    window.searchDate = () => {
        const dateInput = document.getElementById('dateInput').value;
        if (!dateInput) return alert("Pilih tanggal dulu!");
        
        const selDate = new Date(dateInput);
        const hari = selDate.toLocaleDateString('id-ID', { weekday: 'long' });
        
        // Rumus Pasaran
        const baseDate = new Date('1900-01-01');
        const diff = Math.floor((selDate - baseDate) / (1000 * 60 * 60 * 24));
        const pasaran = PASARAN[(diff % 5 + 5) % 5];
        
        const detail = document.getElementById('detail');
        detail.style.display = 'block';
        detail.innerHTML = `<h3>Hasil: ${hari} ${pasaran}</h3><p>Neptu: ${NEPTU_HARI[hari] + NEPTU_PASARAN[pasaran]}</p>`;
    };
});
