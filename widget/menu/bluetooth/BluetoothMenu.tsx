import { DropdownMenu } from '../shared/dropdown/DropdownMenu.js';
import { BluetoothDevices } from './devices/index.js';
import { Header } from './header/index.js';
import { bind } from 'astal';
import { Gtk } from 'astal/gtk3';

export default (): JSX.Element => {
    return (
        <DropdownMenu name={'bluetoothmenu'} >
            <box className={'menu-items bluetooth'} halign={Gtk.Align.FILL} hexpand>
                <box className={'menu-items-container bluetooth'} halign={Gtk.Align.FILL} vertical hexpand>
                    <box className={'menu-section-container bluetooth'} vertical>
                        <Header />
                        <BluetoothDevices />
                    </box>
                </box>
            </box>
        </DropdownMenu>
    );
};
