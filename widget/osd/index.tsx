import { Astal } from 'astal/gtk3';
import { getOsdMonitor } from './helpers';
import { OsdRevealer } from './OsdRevealer';

export function OSD(): JSX.Element {
    return (
        <window
            monitor={getOsdMonitor()()}
            name={'indicator'}
            namespace={'indicator'}
            className={'indicator'}
            visible={true}
            layer={Astal.Layer.TOP}
            anchor={Astal.WindowAnchor.RIGHT}
            setup={(self) => {
                getOsdMonitor().subscribe(() => {
                    self.set_click_through(true);
                });
            }}
            clickThrough
        >
            <OsdRevealer />
        </window>
    );
};
