import { App } from "astal/gtk3"
import main from "./style/main.scss"
import Bar from "./widget/bar/Bar"
import Applauncher from "./widget/applauncher/AppLauncher";
import NetworkMenu from "./widget/menu/network/NetworkMenu";
import AudioMenu from "./widget/menu/audio/AudioMenu";
import BluetoothMenu from "./widget/menu/bluetooth/BluetoothMenu";
import Calendar from "./widget/menu/calendar/Calendar";

App.start({
    css: main,
    main() {
        App.get_monitors().map(Bar)
        NetworkMenu()
        AudioMenu()
        BluetoothMenu()
        Calendar()
        Applauncher()
    },
})
