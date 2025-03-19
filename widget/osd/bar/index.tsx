import { Gtk } from 'astal/gtk3';
import { setupOsdBar } from './helpers';
import { LevelBar } from 'astal/gtk3/widget';

export const OSDBar = (): JSX.Element => {

    return (
        <box className={'osd-bar-container'}>
            <LevelBar
                className={'osd-bar'}
                inverted
                orientation={Gtk.Orientation.VERTICAL}
                mode={Gtk.LevelBarMode.CONTINUOUS}
                setup={setupOsdBar}
            />
        </box>
    );
};
