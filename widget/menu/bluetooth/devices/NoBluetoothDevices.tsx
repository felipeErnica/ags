import { Gtk } from 'astal/gtk3';

export const NoBluetoothDevices = (): JSX.Element => {
    return (
        <box className={'bluetooth-items'} vertical expand valign={Gtk.Align.CENTER} halign={Gtk.Align.CENTER}>
            <label className={'no-bluetooth-devices dim'} hexpand label={'Nenhum dispositivo encontrado'} />
            <label className={'search-bluetooth-label dim'} hexpand label={"Pressione '󰑐' para procurar"} />
        </box>
    );
};
