import { Ethernet } from './ethernet/index';
import { Wifi } from './wifi/index';
import { bind } from 'astal';
import { NoWifi } from './wifi/WirelessAPs/NoWifi';
import AstalNetwork from 'gi://AstalNetwork?version=0.1';
import { DropdownMenu } from '../shared/dropdown/DropdownMenu';

const networkService = AstalNetwork.get_default();

export default (): JSX.Element => {

    return (
        <DropdownMenu name='networkmenu' marginStart={1250}>
            <box className={'menu-items network'}>
                <box className={'menu-items-container network'} vertical hexpand={false}>
                    <Ethernet />
                    {bind(networkService, 'wifi').as((wifi) => {
                        if (wifi === null) {
                            return <NoWifi />;
                        }
                        return <Wifi />;
                    })}
                </box>
            </box>
        </DropdownMenu>
    );
};
