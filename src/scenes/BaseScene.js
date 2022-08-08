import Phaser from "phaser";
import {CENTER_OF_SCREEN, MENU_MARGIN_BOTTOM} from "../constants";
import {styledMenu} from "../styles";

export default class BaseScene extends Phaser.Scene {
    constructor(key, config) {
        super(key);
        this.config = config;
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0);
    }

    createMenu(menu, setupMenuEvents) {
        let itemMarginBottom = 0;

        menu.forEach(menuItem => {
            const menuPosition = [CENTER_OF_SCREEN[0], CENTER_OF_SCREEN[1] + itemMarginBottom];
            menuItem.textInteractive = this.add.text(...menuPosition, menuItem.text, styledMenu).setOrigin(0.5, 2);
            itemMarginBottom += MENU_MARGIN_BOTTOM;
            setupMenuEvents(menuItem);
        })
    }

    textPointerOver(item, style) {
        item.on('pointerover', () => item.setStyle(style));
    }

    textPointerOut(item, style) {
        item.on('pointerout', () => item.setStyle(style));
    }

    backToMenu(item) {
        item.on('pointerup', () => this.scene.start('MenuScene'));
    }

}