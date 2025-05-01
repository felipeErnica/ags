import { bind } from 'astal';
import { Gdk, Gtk } from 'astal/gtk3';
import AstalWp from 'gi://AstalWp?version=0.1';
import { capitalizeFirstLetter, isScrollDown, isScrollUp } from '@/utils';

export const Slider = ({ device, type }: SliderProps): JSX.Element => {
    return (
        <box vertical>
            <label
                className={`menu-active ${type}`}
                halign={Gtk.Align.START}
                truncate
                hexpand
                wrap
                label={bind(device, 'description').as((description) => {
                    const deviceType = type === 'input' ? 'entrada' : 'saída'
                    return capitalizeFirstLetter(description ?? `Dispositivo  ${deviceType} Desconhecido`)
                })}
            />
            <slider
                value={bind(device, 'volume')}
                className={`menu-active-slider menu-slider ${type}`}
                drawValue={false}
                hexpand
                min={0}
                max={1}
                onDragged={({ value, dragging }) => {
                    if (dragging) {
                        device.volume = value;
                        device.mute = false;
                    }
                }}
                setup={(self) => {
                    self.connect('scroll-event', (_, event: Gdk.Event) => {
                        if (isScrollUp(event)) {
                            const newVolume = device.volume + 0.05;
                            const minVolume = 1
                            device.set_volume(Math.min(newVolume, minVolume));
                        }

                        if (isScrollDown(event)) {
                            const newVolume = device.volume - 0.05;
                            device.set_volume(newVolume);
                        }
                    });
                }}
            />
        </box>
    );
};

interface SliderProps {
    device: AstalWp.Endpoint;
    type: 'playback' | 'input';
}
