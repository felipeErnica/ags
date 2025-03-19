import AstalBluetooth from 'gi://AstalBluetooth?version=0.1';
import { forgetBluetoothDevice } from '../helpers';
import { isPrimaryClick } from '../../../../../utils';
import { Astal } from 'astal/gtk3';
import { ActionButton } from './ActionButton';

export const ForgetButton = ({ device }: ForgetButtonProps): JSX.Element => {
    return (
        <ActionButton
            name={'delete'}
            tooltipText={'Esquecer Dispositivo'}
            label={'󰆴'}
            onClick={(_: any,event: Astal.ClickEvent) => {
                if (isPrimaryClick(event)) {
                    forgetBluetoothDevice(device);
                }
            }}
        />
    );
};

interface ForgetButtonProps {
    device: AstalBluetooth.Device;
}
