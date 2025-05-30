import { Gdk, Gtk } from 'astal/gtk3';
import AstalNetwork from 'gi://AstalNetwork?version=0.1';
import { execAsync, Variable } from 'astal';
import { isPrimaryClick, notify } from '../../../../../utils';

export const PasswordInput = ({ connecting, staging }: PasswordInputProps): JSX.Element => {
    const shouldMaskPassword = true;

    return (
        <box className="network-password-input-container" halign={Gtk.Align.FILL} hexpand>
            <entry
                className="network-password-input"
                hexpand
                halign={Gtk.Align.START}
                visibility={shouldMaskPassword}
                placeholderText="Inserir Senha"
                onKeyPressEvent={(self, event) => {
                    const keyPressed = event.get_keyval()[1];

                    if (keyPressed === Gdk.KEY_Return) {
                        connecting.set(staging.get()?.bssid ?? '');

                        const connectCommand = `nmcli device wifi connect "${staging.get()?.ssid}" password "${self.text}"`;

                        execAsync(connectCommand)
                            .catch((err) => {
                                connecting.set('');
                                notify({title: "Rede", message: err.message })
                            })
                            .then(() => {
                                connecting.set('');

                                staging.set({} as AstalNetwork.AccessPoint);
                            });

                        self.text = '';
                    }
                }}
            />
            <button
                className="close-network-password-input-button"
                halign={Gtk.Align.END}
                onClick={(_, event) => {
                    if (isPrimaryClick(event)) {
                        connecting.set('');
                        staging.set({} as AstalNetwork.AccessPoint);
                    }
                }}
            >
                <icon className="close-network-password-input-icon" icon="window-close-symbolic" />
            </button>
        </box>
    );
};

interface PasswordInputProps {
    staging: Variable<AstalNetwork.AccessPoint | undefined>;
    connecting: Variable<string>;
}
