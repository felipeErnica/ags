import { AvailableDevices } from './available/AvailableDevices.js';
import { VolumeSliders } from './active/ActiveDevices.js';
import { Gtk } from 'astal/gtk3';
import { DropdownMenu } from '../shared/dropdown/DropdownMenu.js';

export default (): JSX.Element => {
    
    return (
        <DropdownMenu name='audiomenu' marginStart={1400}>
            <box className={'menu-items audio'} halign={Gtk.Align.FILL} hexpand>
                <box className={'menu-items-container audio'} halign={Gtk.Align.FILL} vertical hexpand>
                    <VolumeSliders />
                    <AvailableDevices />
                </box>
            </box>
        </DropdownMenu>
    );
};
