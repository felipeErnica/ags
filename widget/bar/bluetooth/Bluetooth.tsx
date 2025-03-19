import { Variable, bind } from 'astal';
import AstalBluetooth from 'gi://AstalBluetooth?version=0.1';
import { setup } from '../../../utils';

const bluetoothService = AstalBluetooth.get_default();

const Bluetooth = () => {
    const BluetoothIcon = ({ isPowered }: BluetoothIconProps): JSX.Element => (
        <label className={'bar-button-icon bluetooth txt-icon bar'} label={isPowered ? '󰂯' : '󰂲'} />
    );

    const componentBinding = Variable.derive(
        [
            bind(bluetoothService, 'isPowered'),
        ], (isPowered) => {
                return <BluetoothIcon isPowered={isPowered} />;
        },
    );

    return (
        <button
            className="Bluetooth"
            setup={self => setup(self, "bluetoothmenu")}
        >
            {componentBinding()}
        </button>
    )

};

interface BluetoothIconProps {
    isPowered: boolean;
}

export { Bluetooth };
