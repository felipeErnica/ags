import { Gdk, Gtk } from 'astal/gtk3';
import { bind } from 'astal';
import AstalNetwork from 'gi://AstalNetwork?version=0.1';
import { isScanning } from './helpers';

const networkService = AstalNetwork.get_default();

export const RefreshButton = (): JSX.Element => {
    return (
        <button
            className="menu-icon-button search network"
            valign={Gtk.Align.CENTER}
            halign={Gtk.Align.END}
            onClick={(_, event) => {
                if (event.button == Gdk.BUTTON_PRIMARY) {
                    networkService.wifi?.scan();
                }
            }}
        >
            <icon
                className={bind(isScanning).as((scanning) => (scanning ? 'spinning-icon' : ''))}
                icon="view-refresh-symbolic"
            />
        </button>
    );
};
