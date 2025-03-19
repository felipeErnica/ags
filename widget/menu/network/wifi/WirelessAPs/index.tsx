import { Gtk } from 'astal/gtk3';
import { bind } from 'astal/binding';
import AstalNetwork from 'gi://AstalNetwork?version=0.1';
import { AccessPoint } from './AccessPoint';
import { Controls } from './Controls';
import { Variable } from 'astal';
import { connecting, getFilteredWirelessAPs, isWifiEnabled, staging, wifiAccessPoints } from './helpers';

export const WirelessAPs = (): JSX.Element => {
    const wapBinding = Variable.derive(
        [bind(staging), bind(connecting), bind(wifiAccessPoints), bind(isWifiEnabled)],
        () => {
            const filteredWAPs = getFilteredWirelessAPs();

            if (filteredWAPs.length <= 0 && staging.get() === undefined) {
                return (
                    <label
                        className={'waps-not-found dim'}
                        expand
                        halign={Gtk.Align.CENTER}
                        valign={Gtk.Align.CENTER}
                        label={'Nenhuma Rede Wi-fi encontrada'}
                    />
                );
            }

            return (
                <scrollable className={'menu-scroller wap'}>
                    <box className={'available-waps-list'} vertical>
                        {filteredWAPs.map((ap: AstalNetwork.AccessPoint) => {
                            return (
                                <box className={'network-element-itens'}>
                                    <AccessPoint connecting={connecting} accessPoint={ap} />
                                    <Controls connecting={connecting} accessPoint={ap} />
                                </box>
                            );
                        })}
                    </box>
                </scrollable>
            );
        },
    );

    return (
        <box
            className={'available-waps'}
            vertical
            onDestroy={() => {
                wapBinding.drop();
            }}
        >
            {wapBinding()}
        </box>
    );
};
