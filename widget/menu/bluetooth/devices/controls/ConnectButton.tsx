import { bind } from 'astal';
import AstalBluetooth from 'gi://AstalBluetooth?version=0.1';
import { isPrimaryClick } from '../../../../../utils';
import { ActionButton } from './ActionButton';

export const ConnectButton = ({ device }: ConnectButtonProps): JSX.Element => {
    return (
        <ActionButton
            name={'disconnect'}
            tooltipText={bind(device, 'connected').as((connected) => (connected ? 'Desconectar' : 'Conectar'))}
            label={bind(device, 'connected').as((connected) => (connected ? '󱘖' : ''))}
            onClick={(_: any, self: any) => {
                if (isPrimaryClick(self) && device.connected) {
                    device.disconnect_device((res) => {
                        console.info(res);
                    });
                } else {
                    device.connect_device((res) => {
                        console.info(res);
                    });
                }
            }}
        />
    );
};

interface ConnectButtonProps {
    device: AstalBluetooth.Device;
}
