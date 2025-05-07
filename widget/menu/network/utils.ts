import AstalNetwork from "gi://AstalNetwork?version=0.1";

/**
 * Retrieves the appropriate WiFi icon based on the provided icon name.
 *
 * This function returns a WiFi icon based on the given icon name. If the icon name is not provided,
 * it returns a default icon. It uses a predefined mapping of device icon names to WiFi icons.
 *
 * @param iconName The name of the icon to look up. If not provided, a default icon is returned.
 *
 * @returns The corresponding WiFi icon as a string.
 */
const getWifiIcon = (iconName?: string): string => {
    if (iconName === undefined) {
        return '󰤫';
    }

    const deviceIconMap = [
        ['network-wireless-acquiring', '󰤩'],
        ['network-wireless-connected', '󰤨'],
        ['network-wireless-encrypted', '󰤪'],
        ['network-wireless-hotspot', '󰤨'],
        ['network-wireless-no-route', '󰤩'],
        ['network-wireless-offline', '󰤮'],
        ['network-wireless-signal-excellent', '󰤨'],
        ['network-wireless-signal-good', '󰤥'],
        ['network-wireless-signal-ok', '󰤢'],
        ['network-wireless-signal-weak', '󰤟'],
        ['network-wireless-signal-none', '󰤯'],
    ];

    const foundMatch = deviceIconMap.find((icon) => RegExp(icon[0]).test(iconName.toLowerCase()));

    return foundMatch ? foundMatch[1] : '󰤨';
};

export { getWifiIcon };

type DeviceStates = {
    [key in AstalNetwork.DeviceState]: string;
};

export const DEVICE_STATES: DeviceStates = {
    [AstalNetwork.DeviceState.UNKNOWN]: 'Desconhecido',
    [AstalNetwork.DeviceState.UNMANAGED]: 'Intocado',
    [AstalNetwork.DeviceState.UNAVAILABLE]: 'Indisponível',
    [AstalNetwork.DeviceState.DISCONNECTED]: 'Desconectado',
    [AstalNetwork.DeviceState.PREPARE]: 'Preparar',
    [AstalNetwork.DeviceState.CONFIG]: 'Configurando...',
    [AstalNetwork.DeviceState.NEED_AUTH]: 'Autenticação Necessária',
    [AstalNetwork.DeviceState.IP_CONFIG]: 'Configuração IP',
    [AstalNetwork.DeviceState.IP_CHECK]: 'Checagem de IP',
    [AstalNetwork.DeviceState.SECONDARIES]: 'Secundários',
    [AstalNetwork.DeviceState.ACTIVATED]: 'Ativado',
    [AstalNetwork.DeviceState.DEACTIVATING]: 'Desativando',
    [AstalNetwork.DeviceState.FAILED]: 'Falha',
};
