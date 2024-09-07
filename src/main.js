import Phaser from 'phaser'
import PlayScene from './scenes/PlayScene'
import MenuScene from './scenes/MenuScene'
import PreloadScene from './scenes/PreloadScene'
import ScoreScene from './scenes/ScoreScene'
import SettingsScene from './scenes/SettingsScene'
import PauseScene from './scenes/PauseScene'

const WIDTH = window.screen.width
const HEIGHT = window.screen.height
const BIRD_POSITION = {
    x: WIDTH / 10,
    y: HEIGHT / 2
}

const SHARED_CONFIG = {
    width: WIDTH,
    height: HEIGHT,
    startPosition: BIRD_POSITION,
    scale: {
        // Fit to window
        // mode: Phaser.Scale.FIT,
        // Center vertically and horizontally
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

const Scenes = [PreloadScene, MenuScene, ScoreScene, PlayScene, PauseScene, SettingsScene]
const createScene = Scene => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(createScene)

const config = {
    type: Phaser.AUTO,
    ...SHARED_CONFIG,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            // gravity: {
            //   y: 200
            // }
        }
    },
    scene: initScenes()
}

function create() {

}

new Phaser.Game(config)
