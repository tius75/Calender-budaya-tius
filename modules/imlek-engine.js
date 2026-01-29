import { DATA_IMLEK } from "./imlek-data.js";

export function getTanggalChina(date) {
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
