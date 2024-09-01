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
  }
}

export default ScoreScene