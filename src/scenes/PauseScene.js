import BaseScene from "./BaseScene";
import {PAUSE_MENU} from "../constants";
import {menuItemHover, styledMenu} from "../styles";

export default class PauseScene extends BaseScene {
    constructor(config) {
        super('PauseScene', config);
    }

    create() {
        super.create();
        super.createMenu(PAUSE_MENU, this.setupMenuEvents.bind(this))
    }

    setupMenuEvents(menuItem) {
        const text = menuItem.textInteractive.setInteractive();

        super.textPointerOver(text, menuItemHover);
        super.textPointerOut(text, styledMenu);

        text.on('pointerup', () => {
            menuItem.text === 'Resume' ?
                this.scene.stop().resume(menuItem.scene) :
                this.scene.stop('GameScene').start('MenuScene');
        });
    }
}