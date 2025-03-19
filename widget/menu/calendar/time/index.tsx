import { Gtk } from 'astal/gtk3';
import { MilitaryTime } from './MilitaryTime';

export const TimeWidget = (): JSX.Element => {
    return (
        <box className={'calendar-menu-item-container clock'} valign={Gtk.Align.CENTER} halign={Gtk.Align.FILL} hexpand>
            <box className={'clock-content-items'} valign={Gtk.Align.CENTER} halign={Gtk.Align.CENTER} hexpand>
                <MilitaryTime />
            </box>
        </box>
    );
};
