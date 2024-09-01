import BaseScene from './BaseScene'

class ScoreScene extends BaseScene {
  constructor(config) {
    super('ScoreScene', {...config, canGoBack: true})
  }

  create() {
    super.create()

    const bestScore = localStorage.getItem('bestScore')
    this.add.text(...this.screenCenter, `Score: ${bestScore || 0}`, this.fontOptions).setOrigin(0.5)

    this.add.image(70, 100, 'cloud').setOrigin(0)
    this.add.image(260, 200, 'cloud').setOrigin(0)

    if (bestScore > 20) {
      this.birdStatus('birdGreen')
    }
    if (bestScore > 40) {
      this.birdStatus('birdGold')
    } else {
      this.birdStatus('bird')
    }
  }

  birdStatus(birdColor) {
    this.bird = this.physics.add.sprite(300, 200, birdColor)
      .setFlipX(true)
      .setScale(2)
      .setOrigin(0, 0)
  }
}

export default ScoreScene