import Network from "gi://AstalNetwork"
import { bind } from "astal"
import { wifi_element as wifi_element } from "./Wifi";
import { wiredElement as wired_element } from "./Wired";
import { setup } from "../../../utils";

const network = Network.get_default();

function connecting_element(): JSX.Element {
    return <label className="connecting-label" label="Conectando..."/>
}

function connected_element() {
    return bind(network, "primary").as(primary => {
        if (primary == Network.Primary.WIFI) return bind(network, "wifi").as(wifi => wifi_element(wifi)).get()
        if (primary ==  Network.Primary.WIRED) return bind(network, "wired").as(wired => wired_element(wired)).get()
    }).get()
}

function disconnected_element(): JSX.Element {
    return <button 
        className="network-button disconnected" 
        label="Desconectado ⚠" 
        setup={self => setup(self, "networkmenu")}
        />
}

function isDisconnected(state: Network.State): boolean {
    return state == Network.State.DISCONNECTED || state == Network.State.DISCONNECTING || state == Network.State.CONNECTED_LOCAL
} 

export function NetworkElement() {
    return <box className="network">
        {bind(network, "state").as(state => {
            if(isDisconnected(state)) return disconnected_element()
            if(state == Network.State.CONNECTED_GLOBAL || state == Network.State.CONNECTED_SITE) return connected_element()
            if(state == Network.State.CONNECTING ) return connecting_element()
        })}
    </box>
}
