import { PowerProfilesBody as PowerProfilesBody } from "./PowerProfilesBody";
import { PowerProfileHeader } from "./PowerProfilesHeader";

export const PowerProfiles = (): JSX.Element => {
    return (
        <box className="menu-section-container energy" vertical>
            <PowerProfileHeader />
            <PowerProfilesBody />
        </box>
    );
};
