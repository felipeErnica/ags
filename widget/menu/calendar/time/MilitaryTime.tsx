import { bind, GLib, Variable } from 'astal';
import { Gtk } from 'astal/gtk3';

const systemTime = Variable(GLib.DateTime.new_now_local()).poll(
    1000,
    (): GLib.DateTime => GLib.DateTime.new_now_local(),
);

export const MilitaryTime = (): JSX.Element => {
    return (
        <box
            onDestroy={() => {
                systemTime.drop();
            }}
        >
            <label
                className={'clock-content-time'}
                label={bind(systemTime).as((time) => {
                    return time?.format('%H:%M:%S') || '';
                })}
            />
        </box>
    );
};
