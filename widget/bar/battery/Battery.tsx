import { bind, Variable } from "astal"
import AstalBattery from "gi://AstalBattery?version=0.1"
import { notifyCriticalBattery, resetNotification } from "./helpers"
import { App } from "astal/gtk3"

const bat = AstalBattery.get_default()

function formatTime(timeInSeconds: number): string {
    const totalMinutes = ~~(timeInSeconds/60)
    const hours = totalMinutes >= 60 ? ~~(totalMinutes/60) : 0
    const minutes = hours == 0 ? totalMinutes : totalMinutes%hours
    return hours + "h " + minutes + "m"
}

function getTooltipText(isCharging: boolean, timeToFull: number, timeToEmpty: number) {
    if (isCharging) return "Tempo para carregar: " + formatTime(timeToFull)
    else return "Tempo para descarregar: " + formatTime(timeToEmpty)
}

function get_classname(isCharging: boolean, percentage: number) {
    if (isCharging) {
        resetNotification()
        return "battery-button charging" 
    }
    if (percentage <= 0.15) {
        notifyCriticalBattery()
        return "battery-button critical"
    }
    resetNotification()
    return "battery-button"
}

export function BatteryLevel() {

    const tooltip_text = Variable.derive([
        bind(bat, "charging"),
        bind(bat, "timeToFull"),
        bind(bat, "timeToEmpty")
    ], (isCharging, timeToFull, timeToEmpty) => getTooltipText(isCharging, timeToFull, timeToEmpty))

    var class_name = Variable.derive([
        bind(bat, "charging"),
        bind(bat, "percentage")
    ], (isCharging, percentage) => get_classname(isCharging, percentage))

    return <box className="Battery"
        visible={bind(bat, "isPresent")}
    >
        <button 
            className={bind(class_name).as(String)}
            tooltipText={bind(tooltip_text).as(String)}
            onClick={() => App.toggle_window('batterymenu')}
        >
            <box>
                <label className="battery-label" label={bind(bat, "percentage").as(p => `${Math.floor(p * 100)}%`)} />
                <icon className="battery-icon" icon={bind(bat, "batteryIconName")} />
            </box>
        </button>
    </box>
}

