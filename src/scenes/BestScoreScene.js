import BaseScene from "./BaseScene";
import {CENTER_OF_SCREEN, MENU_MARGIN_BOTTOM} from "../constants";
import {menuItemHover, styledMenu, styledReturn} from "../styles";

export default class BestScoreScene extends BaseScene {

    constructor(config) {
        super('BestScoreScene', config);
    }

    create() {
        super.create();
        this.add.text(...CENTER_OF_SCREEN,
            `BEST SCORE: ${localStorage.bestScore ? localStorage.getItem('bestScore') : 0}`,
            styledMenu).setOrigin(0.5, 1);

        const returnBtn = this.add.text(CENTER_OF_SCREEN[0], CENTER_OF_SCREEN[1] + MENU_MARGIN_BOTTOM, `RETURN`, styledReturn)
                          .setOrigin(0.5, 0.5).setInteractive();

        super.textPointerOver(returnBtn, menuItemHover);
        super.textPointerOut(returnBtn, styledReturn);
        super.backToMenu(returnBtn);

    }
}