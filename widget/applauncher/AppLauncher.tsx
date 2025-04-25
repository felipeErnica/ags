import Apps from "gi://AstalApps"
import { App, Astal, Gdk, Gtk } from "astal/gtk3"
import { Variable } from "astal"
import AstalHyprland from "gi://AstalHyprland?version=0.1"

function hide() {
    App.get_window("launcher")!.hide()
}

function AppButton({ app }: { app: Apps.Application }) {
    return <button
        className="AppButton"
        onClicked={() => { hide(); app.launch() }}>
        <box>
            <icon icon={app.iconName} />
            <box valign={Gtk.Align.CENTER} vertical>
                <label
                    className="name"
                    truncate
                    xalign={0}
                    label={app.name}
                />
            </box>
        </box>
    </button>
}

export default function Applauncher() {
    const { CENTER } = Gtk.Align
    const apps = new Apps.Apps()
    const width = Variable(AstalHyprland.get_default().get_focused_monitor().width)

    const text = Variable("")
    const list = text(text => apps.fuzzy_query(text))
    const onEnter = () => {
        apps.fuzzy_query(text.get())?.[0].launch()
        hide()
    }

    return <window 
        name="launcher"
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM}
        exclusivity={Astal.Exclusivity.IGNORE}
        keymode={Astal.Keymode.ON_DEMAND}
        application={App}
        visible={false}
        onShow={() => {
            text.set("")
        }}
        onKeyPressEvent={function (self, event: Gdk.Event) {
            if (event.get_keyval()[1] === Gdk.KEY_Escape)
                self.hide()
        }}>
        <box>
            <eventbox  widthRequest={width(w => w/2)} expand onClick={hide} />
            <box hexpand={false} vertical>
                <eventbox heightRequest={200} onClick={hide} />
                <box widthRequest={1000} className="Applauncher" vertical>
                    <entry
                        placeholderText="Pesquisar..."
                        text={text()}
                        setup={self => self.grab_focus}
                        onChanged={self => text.set(self.text)}
                        onActivate={onEnter}
                    />
                    <scrollable>
                        <box className="Apps-List" vertical expand>
                            {list.as(list => list.map(app => (
                                <AppButton app={app} />
                            )))}
                        </box>
                    </scrollable>
                    <box
                        halign={CENTER}
                        className="not-found"
                        vertical
                        visible={list.as(l => l.length === 0)}>
                        <icon icon="system-search-symbolic" />
                        <label label="Nenhum resultado encontrado!" />
                    </box>
                </box>
                <eventbox expand onClick={hide} />
            </box>
            <eventbox widthRequest={width(w => w / 2)} expand onClick={hide} />
        </box>
    </window>
}
