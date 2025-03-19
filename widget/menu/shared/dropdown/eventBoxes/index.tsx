import { App } from 'astal/gtk3';

const EventBoxPadding = ({ className, windowName }: EventBoxPaddingProps): JSX.Element => {
    return (
        <eventbox
            className={className}
            hexpand
            vexpand={false}
            canFocus={false}
            setup={(self) => {
                self.connect('button-press-event', () => App.toggle_window(windowName));
            }}
        >
            <box />
        </eventbox>
    );
};

export const BarEventMargins = ({ windowName }: BarEventMarginsProps): JSX.Element => {
    return (
        <box className="event-box-container">
            <EventBoxPadding className="mid-eb event-top-padding-static" windowName={windowName} />
            <EventBoxPadding className="mid-eb event-top-padding" windowName={windowName} />
        </box>
    );
};

export type EventBoxPaddingProps = {
    className: string;
    windowName: string;
};

export type BarEventMarginsProps = {
    windowName: string;
};
