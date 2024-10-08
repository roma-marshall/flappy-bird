import Phaser from 'phaser'

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key)
    this.config = config
    this.screenCenter = [config.width / 2, config.height / 2]
    this.fontSize = 34
    this.lineHeight = 42
    this.fontOptions = {fontSize: `${this.fontSize}px`, fill: '#fff'}
  }

  create() {
    if (!localStorage.getItem('birdObject'))
      localStorage.setItem('birdObject', 'bird')

    if (!localStorage.getItem('birdColor'))
      localStorage.setItem('birdColor', 'fly')

    this.add.image(0, 0, 'sky').setOrigin(0).setScale(2)

    if (this.config.canGoBack) {
      const backButton = this.add.image(this.config.width - 20, this.config.height -70, 'back')
        .setOrigin(1)
        .setScale(2)
        .setInteractive()

      backButton.on('pointerup', () => {
        this.scene.start('MenuScene')
      })
    }
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0

    menu.forEach(menuItem => {
      const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY]
      menuItem.textGO = this.add.text(...menuPosition, menuItem.text, this.fontOptions).setOrigin(0.5, 1)
      lastMenuPositionY += this.lineHeight
      setupMenuEvents(menuItem)
    })
  }
}

export default BaseScene