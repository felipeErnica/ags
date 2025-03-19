import { bind, timeout, Variable } from 'astal';
import { Widget } from 'astal/gtk3';
import AstalHyprland from 'gi://AstalHyprland?version=0.1';
import AstalWp from 'gi://AstalWp?version=0.1';
import Brightness from '../../services/Brightness';

const wireplumber = AstalWp.get_default() as AstalWp.Wp;
const audioService = wireplumber.audio;
const brightnessService = Brightness.get_default();
const hyprlandService = AstalHyprland.get_default();

let count = 0;

/*
 * So the OSD doesn't show on startup for no reason
 */
let isStartingUp = true;
timeout(3000, () => {
    isStartingUp = false;
});

/**
 * Handles the reveal state of a Widget.Revealer or Widget.Window.
 *
 * This function delegates the reveal handling to either `handleRevealRevealer` or `handleRevealWindow` based on the type of the widget.
 *
 * @param self The Widget.Revealer or Widget.Window instance.
 * @param property The property to check, either 'revealChild' or 'visible'.
 */
export const handleReveal = (self: Widget.Revealer): void => {
    if (isStartingUp) {
        return;
    }

    self.reveal_child = true;

    count++;
    timeout(1500, () => {
        count--;

        if (count === 0) {
            self.reveal_child = false;
        }
    });
};

/**
 * Retrieves the monitor index for the OSD.
 *
 * This function derives the monitor index for the OSD based on the focused monitor, default monitor, and active monitor settings.
 *
 * @returns A Variable<number> representing the monitor index for the OSD.
 */
export const getOsdMonitor = (): Variable<number> => {
    return Variable.derive(
        [bind(hyprlandService, 'focusedMonitor')],
        (currentMonitor) => { return currentMonitor.id; }
    );
};

/**
 * Sets up the revealer for OSD.
 *
 * This function hooks various services and settings to the revealer to handle its reveal state based on the OSD configuration.
 *
 * @param self The Widget.Revealer instance to set up.
 */
export const revealerSetup = (self: Widget.Revealer): void => {
    self.hook(brightnessService, 'notify::screen', () => {
        handleReveal(self);
    });

    self.hook(brightnessService, 'notify::kbd', () => {
        handleReveal(self);
    });

    Variable.derive(
        [bind(audioService.defaultMicrophone, 'volume'), bind(audioService.defaultMicrophone, 'mute')],
        () => {
            handleReveal(self);
        },
    );

    Variable.derive([bind(audioService.defaultSpeaker, 'volume'), bind(audioService.defaultSpeaker, 'mute')], () => {
        handleReveal(self);
    });
};
