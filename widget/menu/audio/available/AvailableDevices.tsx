import { PlaybackDevices } from './PlaybackDevices.js';
import { InputDevices } from './InputDevices.js';
import { Header } from './Header.js';

export const AvailableDevices = (): JSX.Element => {
    return (
        <box vertical className={'menu-section-container playback'}>
            <Header type={'playback'} label={'Dispositivo de Saída'} />
            <PlaybackDevices />

        <Header type={'input'} label={'Dispositivo de Entrada'} />
            <InputDevices />
        </box>
    );
};
