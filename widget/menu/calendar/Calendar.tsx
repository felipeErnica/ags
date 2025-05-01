import { DropdownMenu } from '../shared/dropdown/DropdownMenu.js';
import { CalendarWidget } from './CalendarWidget.js';
import { TimeWidget } from './time/index.js';

export default (): JSX.Element => {
    return (
        <DropdownMenu
            name={'calendarmenu'}
            marginStart={700}
        >
            <box css={'padding: 1px; margin: -1px;'}>
                <box className={'calendar-menu-content'} vexpand={false}>
                    <box className={'calendar-content-container'} vertical>
                        <box className={'calendar-content-items'} vertical>
                            <TimeWidget />
                            <CalendarWidget />
                        </box>
                    </box>
                </box>
            </box>
        </DropdownMenu>
    );
};
