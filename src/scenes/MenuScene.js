import BaseScene from './BaseScene'

class MenuScene extends BaseScene {
  constructor(config) {
    super('MenuScene', config)

    this.menu = [
      { scene: 'PlayScene', text: 'Play' },
      { scene: 'ScoreScene', text: 'Score' },
      { scene: null, text: 'Exit' }
    ]
  }

  create() {
    super.create()
    this.createMenu(this.menu, this.setupMenuEvents.bind(this))

    this.add.image(70, 100, 'cloud').setOrigin(0)
    this.add.image(260, 200, 'cloud').setOrigin(0)

    this.bird = this.physics.add.sprite(300, 200, 'bird')
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
      menuItem.scene && this.scene.start(menuItem.scene)

      if (menuItem.text === 'Exit') {
        this.game.destroy(true)
      }
    })
  }
}

export default MenuScene