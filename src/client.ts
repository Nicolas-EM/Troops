import Phaser from 'phaser';
import Boot from './Scenes/boot';
import Menu from './Scenes/menu';
import Lobby from './Scenes/lobby';
import Game from './Scenes/game';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config:Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot, Menu, Lobby, Game],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    }
};

new Phaser.Game(config);
