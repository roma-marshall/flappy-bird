import BaseScene from './BaseScene'

class ScoreScene extends BaseScene {
  constructor(config) {
    super('ScoreScene', {...config, canGoBack: true})
  }

  create() {
    super.create()

    const bestScore = localStorage.getItem('bestScore')
    const birdObject = localStorage.getItem('birdObject')

    this.add.text(...this.screenCenter, `Score: ${bestScore || 0}`, this.fontOptions).setOrigin(0.5)

    this.add.image(70, 100, 'cloud').setOrigin(0)
    this.add.image(260, 200, 'cloud').setOrigin(0)

    this.birdStatus(birdObject)
  }

  birdStatus(birdColor) {
    this.bird = this.physics.add.sprite(300, 200, birdColor)
      .setFlipX(true)
      .setScale(2)
      .setOrigin(0, 0)
  }
}

export default ScoreScene