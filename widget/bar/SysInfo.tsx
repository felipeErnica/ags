import { getUsage, initCpu } from "@/services/Cpu"
import { calculateRam } from "@/services/Memory"
import { bind, Variable } from "astal"

const Cpu = (): JSX.Element => {
    let cpuData = initCpu()

    const usage = Variable(0).poll(1000, () => {
        const [newUsage, newData] = getUsage(cpuData)
        cpuData = newData
        return newUsage
    })

    return (
        <>
            <label>
                {bind(usage).as(percentage => `  ${percentage.toFixed(1)}%`)}
            </label>
        </>
    )
}

const Mem = (): JSX.Element => {
    const usage = Variable(0).poll(1000, calculateRam)
    return (
        <>
            <label>
                {bind(usage).as(percentage => `  ${percentage.toFixed(1)}%`)}
            </label>
        </>
    )
}

export const SysInfo = (): JSX.Element => {
    return <button className="SysInfo" onClick={"alacritty -e bash -c btop"}>
        <box>
            <Cpu />
            <Mem />
        </box>
    </button>
}


