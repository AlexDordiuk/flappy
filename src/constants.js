

// Internal constants:

const WIDTH = 800;
const HEIGHT = 600;

const INITIAL_POSITION = {
    width: WIDTH / 10,
    height: HEIGHT / 2
};


//External constants

export const SHARED_CONFIG = {
    width: WIDTH,
    height: HEIGHT,
    initialPosition: INITIAL_POSITION
}

export const CENTER_OF_SCREEN = [WIDTH/2, HEIGHT/2];

export const START_MENU = [
    {scene: 'GameScene', text: 'Play'},
    {scene: 'BestScoreScene', text: 'Best Score'},
    {scene: '', text: 'Exit'}
];

export const PAUSE_MENU = [
    {scene: 'GameScene', text: 'Resume'},
    {scene: 'MenuScene', text: 'To menu'},
]

export const VELOCITY = 200;

export const VERTICAL_DISTANCE_RANGE = [150, 250];
export const HORIZONTAL_DISTANCE = 350;

export const PADDING = 20;
export const MENU_MARGIN_BOTTOM = 70;

export const WALL_TO_RENDER = 2000;