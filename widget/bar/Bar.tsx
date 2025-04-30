import { Astal, Gtk, Gdk, App } from "astal/gtk3"
import { Volume } from "./volume/Volume"
import { NetworkElement } from "./network/Network"
import { Time } from "./Time"
import { Workspaces } from "./workspaces/Workspaces"
import { BatteryLevel } from "./battery/Battery"
import { Bluetooth } from "./bluetooth/Bluetooth"
import { SysInfo } from "./SysInfo"

function PowerButton() {
    return <box className={"Power"}>
        <button 
            className={"power-button"} 
            label={"⏻"}
            onClick={"wlogout"}
        />
    </box>
}

function AppsButton() {
    return <button 
        className="apps-button"
        onClick={() => App.toggle_window("launcher")}
        label="Apps"
    />
}


export default function Bar(monitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

    return <window
        className="Bar"
        gdkmonitor={monitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}>
        <centerbox>
            <box className="left-box" halign={Gtk.Align.START}>
                <button
                    className="arch-info-label" 
                    label="󰣇" 
                    onClick="kitty --hold -e fastfetch"
                />
                <SysInfo />
                <AppsButton />
                <Workspaces />
            </box>
            <box className="Middle-Box">
                <Time />
            </box>
            <box className={"Right-Box"} halign={Gtk.Align.END} >
                <box className="Tool-Box">
                    <Bluetooth />
                    <NetworkElement />
                    <Volume />
                    <BatteryLevel />
                </box>
                <PowerButton />
            </box>
        </centerbox>
    </window>
}
