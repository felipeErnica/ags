import AstalWp from 'gi://AstalWp?version=0.1';
import { ActiveDeviceMenu } from '../ActiveDevices';
import { SliderItem } from '../sliderItem/SliderItem';

const wireplumber = AstalWp.get_default() as AstalWp.Wp;
const audioService = wireplumber.audio;

const ActiveDeviceContainer = ({ children }: ActiveDeviceContainerProps): JSX.Element => {
    return (
        <box className={'menu-items-section selected'} name={ActiveDeviceMenu.Devices} vertical>
            {children}
        </box>
    );
};

export const ActiveDevices = (): JSX.Element => {
    return (
        <ActiveDeviceContainer>
            <SliderItem type={'playback'} device={audioService.defaultSpeaker} />
            <SliderItem type={'input'} device={audioService.defaultMicrophone} />
        </ActiveDeviceContainer>
    );
};

interface ActiveDeviceContainerProps {
    children?: JSX.Element[];
}
