import { bind, execAsync, Variable } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { calculateMenuPosition } from "./widget/menu/shared/dropdown/locationHandler";
import { NotificationBuilder } from "./types";

export function setup(self: Gtk.Widget, menuName: string): void {
    const leftClick = Variable('')
    let disconnectFunctions: (() => void)[] = []
    Variable.derive([
        bind(leftClick)
    ], 
    () => {
        disconnectFunctions.forEach((disconnect) => disconnect())
        disconnectFunctions = []

        disconnectFunctions.push(
            onPrimaryClick(self, (clicked, event) => {
                openMenu(clicked, event, menuName)    
            })
        )
    })

}


export function onPrimaryClick(widget: Gtk.Widget, handler: (self: Gtk.Widget, event: Gdk.Event) => void): () => void {
    const id = widget.connect('button-press-event', (self: Gtk.Widget, event: Gdk.Event) => {
        const eventButton = event.get_button()[1];
        if (eventButton === Gdk.BUTTON_PRIMARY) {
            handler(self, event);
        }
    });
    return () => widget.disconnect(id)
}

export const openMenu = async (clicked: Gtk.Widget, event: Gdk.Event, window: string): Promise<void> => {
    /*
     * NOTE: We have to make some adjustments so the menu pops up relatively
     * to the center of the button clicked. We don't want the menu to spawn
     * offcenter depending on which edge of the button you click on.
     * -------------
     * To fix this, we take the x coordinate of the click within the button's bounds.
     * If you click the left edge of a 100 width button, then the x axis will be 0
     * and if you click the right edge then the x axis will be 100.
     * -------------
     * Then we divide the width of the button by 2 to get the center of the button and then get
     * the offset by subtracting the clicked x coordinate. Then we can apply that offset
     * to the x coordinate of the click relative to the screen to get the center of the
     * icon click.
     */

    try {
        
        const middleOfButton = Math.floor(clicked.get_allocated_width() / 2);
        const xAxisOfButtonClick = clicked.get_pointer()[0];
        const middleOffset = middleOfButton - xAxisOfButtonClick;

        const position = event.get_root_coords()
        const adjustedXCoord = position[1] + middleOffset;
        const coords = [adjustedXCoord, position[2]];

        await calculateMenuPosition(coords, window, clicked.get_allocated_height());

        App.toggle_window(window);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error calculating menu position: ${error.stack}`);
        } else {
            console.error(`Unknown error occurred: ${error}`);
        }
    }
};

export function notify (notification: NotificationBuilder) {
    let command = `"${notification.title}"`
    command += ` "${notification.message}"`
    if (notification.urgency) command += ` -u ${notification.urgency}`
    if (notification.expirationTime) command += ` -t ${notification.expirationTime}`
    if (notification.iconPath) command += ` -i ${notification.iconPath}`
    if (notification.wait) command += ` -w ${notification.wait}`

    if (notification.sound) {
        execAsync(`paplay ${notification.sound}`)
        .catch((err) => console.error(`Falha ao enviar notificação: ${err.message}`))
    }

    execAsync(`notify-send ${command}`)
        .catch((err) => console.error(`Falha ao enviar notificação: ${err.message}`))
}

export function isPrimaryClick(event: Astal.ClickEvent): boolean {
    return event.button === Gdk.BUTTON_PRIMARY 
}

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Checks if an event is a scroll up.
 *
 * This function determines if the provided event is a scroll up based on the direction property.
 *
 * @param event The scroll event to check.
 *
 * @returns True if the event is a scroll up, false otherwise.
 */
export const isScrollUp = (event: Gdk.Event): boolean => {
    const [directionSuccess, direction] = event.get_scroll_direction();
    const [deltaSuccess, , yScroll] = event.get_scroll_deltas();

    if (directionSuccess && direction === Gdk.ScrollDirection.UP) {
        return true;
    }

    if (deltaSuccess && yScroll < 0) {
        return true;
    }

    return false;
};

/**
 * Checks if an event is a scroll down.
 *
 * This function determines if the provided event is a scroll down based on the direction property.
 *
 * @param event The scroll event to check.
 *
 * @returns True if the event is a scroll down, false otherwise.
 */
export const isScrollDown = (event: Gdk.Event): boolean => {
    const [directionSuccess, direction] = event.get_scroll_direction();
    const [deltaSuccess, , yScroll] = event.get_scroll_deltas();

    if (directionSuccess && direction === Gdk.ScrollDirection.DOWN) {
        return true;
    }

    if (deltaSuccess && yScroll > 0) {
        return true;
    }

    return false;
};

export async function sh(cmd: string | string[]): Promise<string> {
    return execAsync(cmd).catch((err) => {
        console.error(typeof cmd === 'string' ? cmd : cmd.join(' '), err);
        return '';
    });
}

export function hide(name: string) {
    App.get_window(name)!.hide()
}
