import { BarEventMargins } from './eventBoxes/index';
import { App, Astal, Gdk, Gtk } from 'astal/gtk3';
import { Revealer } from 'astal/gtk3/widget';
import { globalEventBoxes } from './globalEventBoxes';
import AstalHyprland from 'gi://AstalHyprland?version=0.1';
import { Variable } from 'astal';

export const DropdownMenu = ({
    marginStart,
    name,
    child,
}: MenuProps): JSX.Element => {

    const width = Variable(AstalHyprland.get_default().get_focused_monitor().width)

    return (
        <window
            name={name}
            namespace={name}
            className={`${name} dropdown-menu`}
            onKeyPressEvent={(_, event) => {
                const key = event.get_keyval()[1];

                if (key === Gdk.KEY_Escape) {
                    App.get_window(name)?.set_visible(false);
                }
            }}
            visible={false}
            application={App}
            keymode={Astal.Keymode.ON_DEMAND}
            exclusivity={Astal.Exclusivity.IGNORE}
            anchor={Astal.WindowAnchor.TOP}
        >
            <eventbox
                className="parent-event"
                onButtonPressEvent={(_, event) => {
                    const buttonClicked = event.get_button()[1];

                    if (buttonClicked === Gdk.BUTTON_PRIMARY || buttonClicked === Gdk.BUTTON_SECONDARY) {
                        App.get_window(name)?.set_visible(false);
                    }
                }}
            >
                <box className="top-eb" vertical>
                    <BarEventMargins windowName={name} />;
                    <eventbox
                        marginEnd={width(w => w - (marginStart + 500))}
                        marginStart={marginStart}
                        marginBottom={450}
                        className="in-eb menu-event-box"
                        onButtonPressEvent={(_, event) => {
                            const buttonClicked = event.get_button()[1];

                            if (buttonClicked === Gdk.BUTTON_PRIMARY || buttonClicked === Gdk.BUTTON_SECONDARY) {
                                return true;
                            }
                        }}
                    >
                        <box className="dropdown-menu-container" css="padding: 1px; margin: -1px;">
                            <revealer
                                revealChild={false}
                                setup={(self: Revealer) => {
                                    App.connect('window-toggled', (_, window) => {
                                        self.set_reveal_child(window.visible);
                                    });
                                }}
                            >
                                <box className="dropdown-content" halign={Gtk.Align.CENTER} expand canFocus>
                                    {child}
                                </box>
                            </revealer>
                        </box>
                    </eventbox>
                </box>
            </eventbox>
        </window>
    );
};

interface MenuProps {
    marginStart: number
    name: string
    child?: JSX.Element | JSX.Element[]
}
