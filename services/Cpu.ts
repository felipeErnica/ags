import GTop from 'gi://GTop';

type CpuData = GTop.glibtop_cpu

export const initCpu = (): CpuData => {
    const cpuData = new GTop.glibtop_cpu();
    GTop.glibtop_get_cpu(cpuData)
    return cpuData
}

export const getUsage = (previousData: CpuData): [number, CpuData] => {
    const newCpu = new GTop.glibtop_cpu();
    GTop.glibtop_get_cpu(newCpu)
    const totalDiff = newCpu.total - previousData.total
    const idleDiff = newCpu.idle - previousData.idle
    const newUsagePercentage = totalDiff > 0 ? ((totalDiff - idleDiff) / totalDiff) * 100 : 0;
    return [newUsagePercentage, newCpu]
}
