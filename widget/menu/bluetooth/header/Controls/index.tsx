import { Gtk } from 'astal/gtk3';
import { ToggleSwitch } from './ToggleSwitch';
import { DiscoverButton } from './DiscoverButton';

export const Controls = (): JSX.Element => {
    return (
        <box className="controls-container" valign={Gtk.Align.START}>
            <ToggleSwitch />
            <DiscoverButton />
        </box>
    );
}
