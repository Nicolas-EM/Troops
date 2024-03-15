import Phaser from 'phaser';
import { Client } from '../client';

export default class Lobby extends Phaser.Scene {
  constructor() {
    super({ key: 'lobby' });
  }

  create() {
    const blue = this.add.sprite(100, 100, "Villager_Blue").setInteractive();
    blue.on("pointerdown", () => this.newPlayer("Blue"));

    const red = this.add.sprite(200, 100, "Villager_Red").setInteractive();
    red.on("pointerdown", () => Client.askNewPlayer("Red"));
  }

  newPlayer(color: string){
    console.log("connecting new player", color)
    Client.askNewPlayer(color);
  }

  update() {
    if(Client.inGame)
      this.scene.start('game', { mapId: 'desert', p1: 'Blue', p2: 'Red' });
  }
}