import { NEPTU_HARI, NEPTU_PASARAN } from './constants.js';

export function getPasaran(date) {
    const pasaranArr = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
    const baseDate = new Date('1900-01-01');
    const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
    return pasaranArr[(diffDays % 5 + 5) % 5];
}

export function hitungNeptu(hari, pasaran) {
    return (NEPTU_HARI[hari] || 0) + (NEPTU_PASARAN[pasaran] || 0);
}

export function getWuku(date) {
    // Logika perhitungan wuku berdasarkan selisih minggu
    const baseWuku = new Date('1900-01-01');
    const diffWeeks = Math.floor((date - baseWuku) / (1000 * 60 * 60 * 24 * 7));
    return (diffWeeks % 30);
}


