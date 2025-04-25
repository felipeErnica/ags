import { bind, Variable } from "astal";
import Network from "gi://AstalNetwork"
import { setup } from "../../../utils";
import { App } from "astal/gtk3";
import NetworkMenu from "@/widget/menu/network/NetworkMenu";

const icon_map = [
    ["network-wireless-signal-excellent-symbolic", "󰤨"],
    ["network-wireless-signal-ok-symbolic", "󰤥"],
    ["network-wireless-signal-good-symbolic", "󰤢"],
    ["network-wireless-signal-weak-symbolic", "󰤟"],
    ["network-wireless-signal-none-symbolic", "󰤯"],
]

function find_symbol(iconName: string) {
    const icon = icon_map.find(entry => entry[0] == iconName)
    if (!icon) return "󰤫"
    else return icon[1]
}

function get_label(ssid: string, iconName: string) {
    return ssid + " " + find_symbol(iconName)
}

function get_tooltip_text(ssid: string, strenght: number, frequency: number): string {
    frequency = frequency/1000;
    return ssid + "  (" + strenght + "%) -  " + frequency.toFixed(2) + " MHz";
}

export function wifi_element(wifi: Network.Wifi): JSX.Element {

    var tooltipText = Variable.derive([
        bind(wifi, "ssid"),
        bind(wifi, "strength"),
        bind(wifi, "frequency")
    ], (ssid, strenght, frequency) => get_tooltip_text(ssid, strenght, frequency));
    
    var label = Variable.derive([
        bind(wifi, "ssid"),
        bind(wifi, "iconName")
    ], (ssid, iconName) => get_label(ssid, iconName))

    return <box>
        <button
            className="network-button wifi" 
            label={bind(label).as(String)}
            tooltipText={bind(tooltipText).as(String)} 
            onClick={() => App.toggle_window('networkmenu')}
        />
    </box>
}
