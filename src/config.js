import Phaser from "phaser";
import {SHARED_CONFIG} from "./constants";
import PreloadScene from "./scenes/PreloadScene";
import GameScene from "./scenes/GameScene";
import MenuScene from "./scenes/MenuScene";
import BestScoreScene from './scenes/BestScoreScene'
import PauseScene from "./scenes/PauseScene";

const SCENES = [PreloadScene, MenuScene, GameScene, BestScoreScene, PauseScene];
const createScenes = Scene => new Scene(SHARED_CONFIG)

const initScenes = () => SCENES.map(createScenes)

export const config = {
    type: Phaser.AUTO,
    ...SHARED_CONFIG,
    pixelArt: true,
    physics: {
        default: 'arcade',
        // arcade: {
        //     debug: true
        // }
    },
    scene: initScenes()
}