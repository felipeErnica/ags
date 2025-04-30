import { GLib, Variable, bind } from "astal"
import { App } from "astal/gtk3"

export function Time() {
    const time = Variable(GLib.DateTime.new_now_local()).poll(1000, 
        () => GLib.DateTime.new_now_local())  
    
    const day = bind(time).as(time => time.format("%a, %d/%m/%Y  %H:%M") || "")

    return <button 
            className="Time" 
            label={day}
            onDestroy={() => time.drop()}
            onClick={() => App.toggle_window("calendarmenu")}
        />
}
