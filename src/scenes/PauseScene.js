import BaseScene from './BaseScene'

class PauseScene extends BaseScene {
  constructor(config) {
    super('PauseScene', config)

    this.menu = [
      {scene: 'PlayScene', text: 'Resume'},
      {scene: 'MenuScene', text: 'Exit'},
    ]
  }

  create() {
    super.create()
    this.createMenu(this.menu, this.setupMenuEvents.bind(this))

    this.add.image(70, 100, 'cloud').setOrigin(0)
    this.add.image(260, 200, 'cloud').setOrigin(0)

    const birdObject = localStorage.getItem('birdObject')
    this.bird = this.physics.add.sprite(300, 200, birdObject)
      .setFlipX(true)
      .setScale(2)
      .setOrigin(0, 0)
  }

  setupMenuEvents(menuItem) {
    const textGO = menuItem.textGO
    textGO.setInteractive()

    textGO.on('pointerover', () => {
      textGO.setStyle({fill: '#ff0'})
    })

    textGO.on('pointerout', () => {
      textGO.setStyle({fill: '#fff'})
    })

    textGO.on('pointerup', () => {
      if (menuItem.scene && menuItem.text === 'Resume') {
        this.scene.stop()
        this.scene.resume(menuItem.scene)
      }

      if (menuItem.scene && menuItem.text === 'Exit') {
        this.scene.stop('PlayScene')
        this.scene.start(menuItem.scene)
      }
    })
  }
}

export default PauseScene