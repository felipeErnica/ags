import { bind } from 'astal';
import AstalBluetooth from 'gi://AstalBluetooth?version=0.1';
import { isPrimaryClick } from '../../../../../utils';
import { Astal } from 'astal/gtk3';
import { ActionButton } from './ActionButton';

export const PairButton = ({ device }: PairButtonProps): JSX.Element => {
    return (
        <ActionButton
            name={'unpair'}
            tooltipText={bind(device, 'paired').as((paired) => (paired ? 'Desemparelhar' : 'Emparelhar'))}
            label={bind(device, 'paired').as((paired) => (paired ? '' : ''))}
            onClick={(_: any, self: Astal.ClickEvent) => {
                if (!isPrimaryClick(self)) {
                    return;
                }

                if (device.paired) {
                    device.pair();
                } else {
                    device.cancel_pairing();
                }
            }}
        />
    );
};

interface PairButtonProps {
    device: AstalBluetooth.Device;
}
