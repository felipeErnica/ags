import { Gtk } from 'astal/gtk3';

export const NotFoundButton = ({ type }: { type: string }): JSX.Element => {

    const deviceType = type === 'playback' ? 'saída' : 'entrada'

    return (
        <button className={`menu-unfound-button ${type}`} sensitive={false}>
            <box>
                <box halign={Gtk.Align.START}>
                    <label className={`menu-button-name ${type}`} label={`Nenhum dispositivo de ${deviceType} encontrado...`} />
                </box>
            </box>
        </button>
    );
};
