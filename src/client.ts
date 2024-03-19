import * as Phaser from 'phaser';
import Boot from './Scenes/Boot';
import Menu from './Scenes/Menu';
import Lobby from './Scenes/Lobby';
import Game from './Scenes/Game';
import { PhaserNavMeshPlugin } from "phaser-navmesh";
import Hud from './Scenes/Hud';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config: Phaser.Types.Core.GameConfig = {
    title: 'Troops',
    parent: "game", // ID canvas
    type: Phaser.AUTO,
    width: 1000,
    height: 563,
    disableContextMenu: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    plugins: {
        scene: [
          {
            key: "PhaserNavMeshPlugin", 
            plugin: PhaserNavMeshPlugin, // Class that constructs plugins
            mapping: "navMeshPlugin", // Property mapping to use for the scene, e.g. this.navMeshPlugin
            start: true,
          },
        ],
      },
    scene: [Boot, Menu, Lobby, Game, Hud],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
};

new Phaser.Game(config);