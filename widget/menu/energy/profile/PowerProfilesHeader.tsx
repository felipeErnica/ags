import { Gtk } from 'astal/gtk3';

export const PowerProfileHeader = (): JSX.Element => {
    return (
        <box className="menu-label-container" halign={Gtk.Align.FILL}>
            <label className="menu-label" label="Perfis de Consumo de Energia" halign={Gtk.Align.START} hexpand />
        </box>
    );
};
