import { bind, Variable } from "astal"
import Network from "gi://AstalNetwork"
import { setup } from "../../../utils"

function getTooltipText(device: string, speed: number): string {
    return device + "(" + speed + ")"
}

export function wiredElement(wired: Network.Wired) {
    var tooltipText = Variable.derive([
        bind(wired, "device").as(String),
        bind(wired, "speed")
    ], (device, speed) => getTooltipText(device, speed))
    return <box>
        <button 
            className="network-button wired" 
            label={bind(wired, "device").as(device => device + " 󰒍")} 
            tooltipText={bind(tooltipText).as(String)}
            setup={self => setup(self, "networkmenu")}
        />
        <icon icon={bind(wired, "iconName")} />
    </box>
}
