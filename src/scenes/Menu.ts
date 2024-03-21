import * as Phaser from 'phaser';
import Client from '../client';

export default class Menu extends Phaser.Scene {
  quickPlayButton: Phaser.GameObjects.Text;
  createLobbyButton: Phaser.GameObjects.Text;
  joinLobbyButton: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'menu' });
  }

  create() {
    Client.setScene(this);

    this.quickPlayButton = this.add.text(this.cameras.main.width / 2, 100, 'Quick Play', { fontSize: '24px' }).setOrigin(0.5).setInteractive();
    this.quickPlayButton.on('pointerdown', () => this.quickPlay());

    this.createLobbyButton = this.add.text(this.cameras.main.width / 2, 200, 'Create Lobby', { fontSize: '24px' }).setOrigin(0.5).setInteractive();
    this.createLobbyButton.on('pointerdown', () => this.createLobby());

    this.joinLobbyButton = this.add.text(this.cameras.main.width / 2, 300, 'Join Lobby', { fontSize: '24px' }).setOrigin(0.5).setInteractive();
    this.joinLobbyButton.on('pointerdown', () => this.joinLobby());
  }

  startLobby() {
    this.scene.start('lobby');
  }

  quickPlay() {
    Client.quickPlay();
  }

  createLobby() {
    Client.createLobby();
  }

  joinLobby() {
    Client.joinLobby(globalThis.lobbyCode);
  }
}