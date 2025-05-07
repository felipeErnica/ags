import { DropdownMenu } from "@/widget/menu/shared/dropdown/DropdownMenu";
import { Gtk } from "astal/gtk3";
import { PowerProfiles } from "./profile/PowerProfiles";

export default (): JSX.Element => {
    return (
        <DropdownMenu name={'batterymenu'} marginStart={1400} >
            <box className={'menu-items energy'} halign={Gtk.Align.FILL} hexpand>
                <box className={'menu-items-container energy'} halign={Gtk.Align.FILL} hexpand vertical>
                    <PowerProfiles />
                </box>
            </box>
        </DropdownMenu>
    );
};
