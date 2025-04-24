import { GLib } from "astal";

export function calculateRam(): number {
    try {
        const [success, meminfoBytes] = GLib.file_get_contents('/proc/meminfo');

        if (!success || !meminfoBytes) {
            throw new Error('Failed to read /proc/meminfo or file content is null.');
        }

        const meminfo = new TextDecoder('utf-8').decode(meminfoBytes);

        const totalMatch = meminfo.match(/MemTotal:\s+(\d+)/);
        const availableMatch = meminfo.match(/MemAvailable:\s+(\d+)/);

        if (!totalMatch || !availableMatch) {
            throw new Error('Failed to parse /proc/meminfo for memory values.');
        }

        const totalRamInBytes = parseInt(totalMatch[1], 10) * 1024;
        const availableRamInBytes = parseInt(availableMatch[1], 10) * 1024;

        let usedRam = totalRamInBytes - availableRamInBytes;
        usedRam = isNaN(usedRam) || usedRam < 0 ? 0 : usedRam;
        return (usedRam/totalRamInBytes)*100
    } catch (error) {
        console.error('Error calculating RAM usage:', error);
        return 0
    }
}
