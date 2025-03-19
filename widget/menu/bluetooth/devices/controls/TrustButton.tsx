import { bind } from 'astal';
import AstalBluetooth from 'gi://AstalBluetooth?version=0.1';
import { isPrimaryClick } from '../../../../../utils';
import { ActionButton } from './ActionButton';

export const TrustButton = ({ device }: TrustButtonProps): JSX.Element => {
    return (
        <ActionButton
            name={'untrust'}
            tooltipText={bind(device, 'trusted').as((trusted) => (trusted ? 'Não Confiar' : 'Confiar'))}
            label={bind(device, 'trusted').as((trusted) => (trusted ? '' : '󱖡'))}
            onClick={(_, self) => {
                if (isPrimaryClick(self)) {
                    device.set_trusted(!device.trusted);
                }
            }}
        />
    );
};

interface TrustButtonProps {
    device: AstalBluetooth.Device;
}
