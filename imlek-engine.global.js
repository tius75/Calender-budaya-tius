/* =========================================
   IMLEK ENGINE - GLOBAL VERSION
   Aman untuk GitHub Pages & HTML murni
========================================= */

(function () {

    const DATA_IMLEK = [
        {y:2023,m:1,d:22,leap:2},
        {y:2024,m:2,d:10,leap:0},
        {y:2025,m:1,d:29,leap:0},
        {y:2026,m:2,d:17,leap:0},
        {y:2027,m:2,d:6, leap:0},
        {y:2028,m:1,d:26,leap:5},
        {y:2029,m:2,d:13,leap:0},
        {y:2030,m:2,d:3, leap:0}
    ];

    const SHIO = [
        "Tikus","Kerbau","Macan","Kelinci","Naga","Ular",
        "Kuda","Kambing","Monyet","Ayam","Anjing","Babi"
    ];

    const ELEMEŃ = [
        "Kayu","Kayu","Api","Api","Tanah","Tanah",
        "Logam","Logam","Air","Air"
    ];

    function getTanggalChina(date) {
        const y = date.getFullYear();
        let ref = DATA_IMLEK.find(r => r.y === y);
        if (!ref || date < new Date(y, ref.m - 1, ref.d)) {
            ref = DATA_IMLEK.find(r => r.y === y - 1);
        }
        if (!ref) return null;

        const start = new Date(ref.y, ref.m - 1, ref.d);
        let diff = Math.floor((date - start) / 86400000);

        let lunarDay = 1;
        let lunarMonth = 1;
        let lunarYear = ref.y;

        const monthLength = (m) => (m === ref.leap ? 29 : 30);

        while (diff > 0) {
            lunarDay++;
            if (lunarDay > monthLength(lunarMonth)) {
                lunarDay = 1;
                lunarMonth++;
                if (lunarMonth > 12) {
                    lunarMonth = 1;
                    lunarYear++;
                }
            }
            diff--;
        }

        return {
            tanggal: lunarDay,
            bulan: lunarMonth,
            tahun: lunarYear,
            kabisat: lunarMonth === ref.leap
        };
    }

    function getShioElemen(year) {
        const shio = SHIO[(year - 4) % 12];
        const elemen = ELEMEŃ[Math.floor(((year - 4) % 10) / 2)];
        return { shio, elemen };
    }

    // 🔓 expose ke global
    window.ImlekEngine = {
        getTanggalChina,
        getShioElemen
    };

})();
