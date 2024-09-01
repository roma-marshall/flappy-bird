import BaseScene from './BaseScene'

class SettingsScene extends BaseScene {
  constructor(config) {
    super('SettingsScene', {...config, canGoBack: true})
  }

  create() {
    super.create()

    // const bestScore = localStorage.getItem('bestScore')
    // this.add.text(...this.screenCenter, `Score: ${bestScore || 0}`, this.fontOptions).setOrigin(0.5)
    this.add.text(...this.screenCenter, `Settings`, this.fontOptions).setOrigin(0.5)

    this.add.image(70, 100, 'cloud').setOrigin(0)
    this.add.image(260, 200, 'cloud').setOrigin(0)

    this.bird = this.physics.add.sprite(300, 200, 'bird')
      .setFlipX(true)
      .setScale(2)
      .setOrigin(0, 0)


    const bird = this.add.image(this.config.width / 2 - 50, this.config.height / 1.7, 'bird')
      .setFlipX(true)
      .setScale(2.5)
      .setInteractive()

    bird.on('pointerup', () => {
      this.scene.start('PlayScene')
      localStorage.setItem('birdColor', 'fly')
    })


    const birdGreen = this.add.image(this.config.width / 2, this.config.height / 1.7, 'birdGreen')
      .setFlipX(true)
      .setScale(2.5)
      .setInteractive()

    birdGreen.on('pointerup', () => {
      this.scene.start('PlayScene')
      localStorage.setItem('birdColor', 'flyGreen')
    })

    const birdGold = this.add.image(this.config.width / 2 + 50, this.config.height / 1.7, 'birdGold')
      .setFlipX(true)
      .setScale(2.5)
      .setInteractive()

    birdGold.on('pointerup', () => {
      this.scene.start('PlayScene')
      localStorage.setItem('birdColor', 'flyGold')
    })


  }
}

export default SettingsScene