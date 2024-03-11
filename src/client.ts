import * as Phaser from 'phaser';
import Boot from './Scenes/Boot';
import Menu from './Scenes/Menu';
import Lobby from './Scenes/Lobby';
import Game from './Scenes/Game';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config: Phaser.Types.Core.GameConfig = {
    title: 'Troops',
    parent: "game", // ID canvas
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    disableContextMenu: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot, Menu, Lobby, Game],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

new Phaser.Game(config);