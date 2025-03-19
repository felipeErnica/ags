import { bind } from 'astal';
import AstalWp from 'gi://AstalWp?version=0.1';
import { ActiveDeviceMenu } from '../ActiveDevices';
import { SliderItem } from '../sliderItem/SliderItem';

const wireplumber = AstalWp.get_default() as AstalWp.Wp;
const audioService = wireplumber.audio;

const NoStreams = (): JSX.Element => {
    return <label className={'no-playbacks dim'} label={'Nenhum dispositivo de saída encontrado.'} expand />;
};

export const ActivePlaybacks = (): JSX.Element => {
    return (
        <box className={'menu-items-section selected'} name={ActiveDeviceMenu.Playbacks} vertical>
            <scrollable className={'menu-scroller active-playbacks-scrollable'}>
                <box vertical>
                    {bind(audioService, 'streams').as((streams) => {
                        if (!streams || streams.length === 0) {
                            return <NoStreams />;
                        }

                        const currentStreams = streams;

                        return currentStreams.map((stream) => {
                            return <SliderItem type={'playback'} device={stream} />;
                        });
                    })}
                </box>
            </scrollable>
        </box>
    );
};
