type FormatIcons = {
    [index: string]: string;
}

type VolumeIcons = {
    [index: string]: string;
}

const volumeIcons: VolumeIcons = {
    101: '',
    66: '',
    34: '',
    1: '󰕿',
    0: '󰝟',
};

const icons: FormatIcons = {
    "headphone": "",
    "hands-free": "",
    "headset": "",
    "phone": "",
    "portable": "",
    "car": "",
};

function get_volume_icon (volume: number): string {
    const foundVol = [101, 66, 34, 1, 0].find((threshold) => threshold <= volume * 100);

    if (foundVol !== undefined) {
        return volumeIcons[foundVol];
    }

    return volumeIcons[101];
}

export const get_icon = (deviceFound: string, volume: number): string => {
    
    var deviceFormat = deviceFound.replace("audio-","")
        .replace("-bluetooth", "").trim()

    var icon  = icons[deviceFormat]; 
    if (deviceFound.includes("bluetooth")) icon = icon + ""
    if (icon === undefined) return get_volume_icon(volume)
    return icon;
};
