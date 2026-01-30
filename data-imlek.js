const DB_IMLEK = {
    // Data Historis (Contoh)
    1900: { m: 1, d: 31, shio: "Tikus" },
    1901: { m: 2, d: 19, shio: "Kerbau" },
    // ...
    1975: { m: 2, d: 11, shio: "Kelinci" }, // Akurasi tahun lama
    1976: { m: 1, d: 31, shio: "Naga" },
    // ...
    // Era Sekarang
    2024: { m: 2, d: 10, shio: "Naga" },
    2025: { m: 1, d: 29, shio: "Ular" },
    2026: { m: 2, d: 17, shio: "Kuda" }, // Fixed: 17 Feb 2026
    2027: { m: 2, d: 6, shio: "Kambing" },
    // ...
    // Era Masa Depan
    2099: { m: 1, d: 21, shio: "Kambing" },
    2100: { m: 2, d: 9, shio: "Monyet" }
};

/**
 * Catatan: Untuk data lengkap 1900-2100 (200 baris), 
 * sangat disarankan menggunakan algoritma astronomis di dalam main.js 
 * agar file tidak terlalu berat dan PWA tetap ringan.
 */
