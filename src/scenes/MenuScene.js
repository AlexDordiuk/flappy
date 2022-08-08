import BaseScene from "./BaseScene";
import {START_MENU} from "../constants";
import {menuItemHover, styledMenu} from "../styles";

export default class MenuScene extends BaseScene {
    constructor(config) {
        super('MenuScene', config);
    }

    create() {
        super.create();
        super.createMenu(START_MENU, this.setupMenuEvents.bind(this))
    }

    setupMenuEvents(menuItem) {
        const text = menuItem.textInteractive.setInteractive();

        super.textPointerOver(text, menuItemHover);
        super.textPointerOut(text, styledMenu);

        text.on('pointerup', () => {
            menuItem.scene.length ? this.scene.start(menuItem.scene) : this.game.destroy(true);
        });
    }

}