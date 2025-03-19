import Wp from "gi://AstalWp"
import { get_icon } from "./VolumeIcon"
import { bind,  Variable } from "astal"
import { App, Gdk, Gtk } from "astal/gtk3"
import { onPrimaryClick, openMenu } from "../../../utils"

const rightClick = Variable('')

function build_label(isMute: boolean, device: string, volume: number) {
    if (isMute) return "󰖁" 
    
    var icon = get_icon(device, volume)
    var volume_percentage = Math.round(volume*100) + "%"

    return volume_percentage + " " + icon
}


export function Volume(): JSX.Element {
    const speaker = Wp.get_default()?.audio.defaultSpeaker!
    const volumeLabel = Variable.derive([
        bind(speaker, "mute"),
        bind(speaker, "icon"),
        bind(speaker, "volume")
    ], (isMute, device, volume) => build_label(isMute, device, volume))

    return <box className="Volume" >
        <button 
            className={'volume-button'}
            label={bind(volumeLabel).as(String)}
            //onClick={(self, handler: (self: Gtk.Widget, event: Gdk.Event)) => openMenu(self, event, "audiomenu")}
            setup={ (self) => {
                let disconnectFunctions: (() => void)[] = []
                Variable.derive([
                    bind(rightClick)
                ], () => {
                    disconnectFunctions.forEach((disconnect) => disconnect())
                    disconnectFunctions = []

                    disconnectFunctions.push(
                        onPrimaryClick(self, (self, event) => openMenu(self, event, "audiomenu"))
                    )
                }) 
            }}
        />
    </box>
}
