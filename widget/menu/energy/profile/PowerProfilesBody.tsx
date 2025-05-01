import { isPrimaryClick } from "@/utils";
import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import AstalPowerProfiles from "gi://AstalPowerProfiles?version=0.1";

const powerProfilesService = AstalPowerProfiles.get_default();

type PowerProfileMap = {
    [profile: string]: PowerProfileProps
}

type PowerProfileProps = {
    icon: string
    label: string
}

const props: PowerProfileMap = {
    ['balanced']: {icon: 'power-profile-balanced-symbolic', label: 'Equilibrado'},
    ['power-saver']: { icon: 'power-profile-power-saver-symbolic', label: 'Economia de Energia'},
    ['performance']: { icon: 'power-profile-performance-symbolic', label: 'Performace'},
}

export const PowerProfilesBody = (): JSX.Element => {
    const powerProfiles = powerProfilesService.get_profiles();

    return (
        <box className="menu-items-section" valign={Gtk.Align.FILL} vexpand vertical>
            {powerProfiles.map((powerProfile: AstalPowerProfiles.Profile) => {
                const profileType = powerProfile.profile;

                return (
                    <button
                        className={bind(powerProfilesService, 'activeProfile').as(
                            (active) => `power-profile-item ${active === powerProfile.profile ? 'active' : ''}`,
                        )}
                        onClick={(_, event) => {
                            if (isPrimaryClick(event)) {
                                powerProfilesService.activeProfile = powerProfile.profile;
                            }
                        }}
                    >
                        <box>
                            <icon
                                className="power-profile-icon"
                                icon={props[profileType].icon || props['balanced'].icon}
                            />
                            <label className="power-profile-label" label={props[profileType].label} />
                        </box>
                    </button>
                );
            })}
        </box>
    );
};
