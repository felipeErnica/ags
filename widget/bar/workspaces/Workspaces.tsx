import { bind, Variable } from "astal"
import AstalHyprland from "gi://AstalHyprland?version=0.1"
import { icons_map } from "./IconsMap"

const hypr = AstalHyprland.get_default()

function find_title(title: string) {
    const title_words = title.split(" ")
    for (var index in title_words) {
        const word = title_words[index]
        const icon_match = icons_map.find(entry => word.toLowerCase() == entry[0])
        if (icon_match) return icon_match
    }
    return undefined
}

function find_terminal_program(client: AstalHyprland.Client, icon_match: string[]): string {
    const new_icon_match = find_title(client.title.toLowerCase())
    if (!new_icon_match) return icon_match[1]
    else return new_icon_match[1]
}

function build_button_label(workspace: AstalHyprland.Workspace, client: AstalHyprland.Client): string {
    let icon_match = icons_map.find(entry => RegExp(entry[0]).test(client?.class.toLowerCase()))

    if (!client?.class) return workspace.id + " " + "󰇄"

    if (!icon_match) {
        return workspace.id + " " + icons_map[icons_map.length -1][1]
    } else {
        if (icon_match[2] == "Terminal") return workspace.id + " " + find_terminal_program(client, icon_match)
        return workspace.id + " " + icon_match[1]
    }
}

function workspace_button(workspace: AstalHyprland.Workspace) {
    
    const button_label = Variable.derive([bind(workspace, "clients")], (clients) => build_button_label(workspace, clients[0])) 

    return <button
        label={bind(button_label).as(String)}
        className={bind(hypr, "focusedWorkspace").as(focused =>
            workspace === focused ? "focused" : "")}
        onClicked={() => workspace.focus()}>
    </button>
}

export function Workspaces() {

    return <box className="Workspaces">
        {bind(hypr, "workspaces").as(wss => wss
            .filter(ws => !(ws.id >= -99 && ws.id <= -2)) // filter out special workspaces
            .sort((a, b) => a.id - b.id)
            .map(ws => workspace_button(ws))
        )}
    </box>
}
