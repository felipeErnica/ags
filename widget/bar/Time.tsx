import { GLib, Variable, bind } from "astal"
import { setup } from "../../utils"

export function Time() {
    const time = Variable(GLib.DateTime.new_now_local()).poll(1000, 
        () => GLib.DateTime.new_now_local())  
    
    const day = bind(time).as(time => time.format("%a, %d/%m/%Y  %H:%M") || "")

    return <box
        className="Time"
        onDestroy={() => time.drop()}
    >
        <button 
            className="time-button" 
            label={day}
            setup={self => {
                setup(self, "calendarmenu")
            }}
        />
    </box>
}
