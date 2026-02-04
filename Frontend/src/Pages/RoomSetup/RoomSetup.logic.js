export function sensorLayout({ length, width, covergae = 4, overlapPct = 0.1}) {
    const L = Math.max(0.1 , Number(length || 0));
    const W = Math.max(0.1 , Number(width || 0));
    const cov = Math.max(0.1 , Number(covergae));
    const overlap = Math.min(Math.max(0, Number(overlapPct)), 0.9);
    const spacing = cov * (1 - overlap);
    const cols = Math.max(1, Math.ceil(L / spacing));
    const rows = Math.max(1, Math.ceil(W / spacing));
    const spacingx = L/cols;
    const spacingy = W/rows;

    const sensors= [];
    let id = 1;
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols; c++) {
            const x = (c + 0.5)*spacingx;
            const y = (r + 0.5)*spacingy;
            sensors.push({id: `${id++}`,x,y});
        }
    }

    return {
        rows, cols, sensors, sensorFootprint : cov, spacing,
    };
} 

export async function verifyESP32(espId) {
    if(!espId || !espId.trim()) return { ok: false, message: "ESP32 ID Required"};

    return new Promise((resolve) => {
     setTimeout(() => {
      if (espId.trim().toUpperCase().startsWith("RADAR_")) {
        resolve({ ok: true, message: "Verified" });
      } else {
        resolve({ ok: false, message: "Not found on network" });
      }
    }, 700);   
    });
}