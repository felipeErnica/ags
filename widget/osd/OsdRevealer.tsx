import { OSDLabel } from './label/index';
import { OSDBar } from './bar/index';
import { OSDIcon } from './icon/index';
import { Gtk } from 'astal/gtk3';
import { revealerSetup } from './helpers';

const VerticalOsd = (): JSX.Element => (
    <box vertical>
        <OSDIcon />
        <OSDBar />
        <OSDLabel />
    </box>
);

export const OsdRevealer = (): JSX.Element => {

    return (
        <revealer transitionType={Gtk.RevealerTransitionType.CROSSFADE} revealChild={false} setup={revealerSetup}>
            <box className={'osd-container'} vertical>
                <VerticalOsd />;
            </box>
        </revealer>
    );
};
