import BaseScene from './BaseScene'

const PIPES_TO_RENDER = 4

class PlayScene extends BaseScene {
  constructor(config) {
    super('PlayScene', config)

    this.bird = null
    this.pipes = null
    this.isPaused = false

    this.pipeVerticalDistanceRange = [230, 300]
    this.pipeHorizontalDistanceRange = [380, 380]
    this.flapVelocity = 300

    this.score = 0
    this.scoreText = ''

    this.currentDifficulty = 'kind'
    this.difficulties = {
      'kind': {
        pipeVerticalDistanceRange: [230, 300],
        pipeHorizontalDistanceRange: [380, 380]
      },
      'easy': {
        pipeVerticalDistanceRange: [210, 280],
        pipeHorizontalDistanceRange: [370, 380]
      },
      'normal': {
        pipeVerticalDistanceRange: [190, 260],
        pipeHorizontalDistanceRange: [370, 380]
      },
      'hard': {
        pipeVerticalDistanceRange: [170, 240],
        pipeHorizontalDistanceRange: [370, 380]
      }
    }
  }

  create() {
    this.currentDifficulty = 'kind'
    super.create()
    this.createClouds()
    this.createBird()
    this.createPipes()
    this.createColliders()
    this.createScore()
    this.createPause()
    this.handleInputs()
    this.listenToEvents()

    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('bird', { start: 8, end: 15 }),
      frameRate: 8, // 24 fps default
      repeat: -1 // repeat unlimited times, loops
    })

    this.anims.create({
      key: 'flyGreen',
      frames: this.anims.generateFrameNumbers('birdGreen', { start: 8, end: 15 }),
      frameRate: 8, // 24 fps default
      repeat: -1 // repeat unlimited times, loops
    })

    this.anims.create({
      key: 'flyGold',
      frames: this.anims.generateFrameNumbers('birdGold', { start: 8, end: 15 }),
      frameRate: 8, // 24 fps default
      repeat: -1 // repeat unlimited times, loops
    })

    this.bird.play(localStorage.getItem('birdColor'))
  }

  update() {
    this.checkGameStatus()
    this.recyclePipes()
    this.recycleClouds()
  }

  listenToEvents () {
    if (this.pauseEvent) {
      return
    }

    this.pauseEvent = this.events.on('resume', () => {
      this.initialTime = 3
      this.countDownText = this.add.text(...this.screenCenter, 'Fly in: ' + this.initialTime, this.fontOptions).setOrigin(0.5)
      this.timedEvent = this.time.addEvent({
        delay: 1000,
        callback: this.countDown,
        callbackScope: this,
        loop: true
      })
    })
  }

  countDown () {
    this.initialTime--
    this.countDownText.setText('Fly in: ' + this.initialTime)
    if (this.initialTime <= 0) {
      this.isPaused = false
      this.countDownText.setText('')
      this.physics.resume()
      this.timedEvent.remove()
    }
  }

  createBird() {
    this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird')
      .setFlipX(true)
      .setScale(2)
      .setOrigin(0, 0)

    this.bird.setBodySize(this.bird.width, this.bird.height - 8)
    this.bird.body.gravity.y = 600
    this.bird.setCollideWorldBounds(true)
  }

  createClouds() {
    this.clouds = this.physics.add.group()
    const firstCloud = this.clouds.create(0, 0, 'cloud')
      .setImmovable(true)
      .setOrigin(0, 1)
      .setVelocityX(-85)
      .setScale(0.7)
    const secondCloud = this.clouds.create(0, 0, 'cloud')
      .setImmovable(true)
      .setOrigin(0, 0)
      .setVelocityX(-80)
      .setScale(0.9)

    const thirdCloud = this.clouds.create(0, 0, 'cloud')
      .setImmovable(true)
      .setOrigin(0, 0)
      .setVelocityX(-70)
      .setScale(1.3)

    this.placeCloud(firstCloud, secondCloud, thirdCloud)
  }

  placeCloud(fCloud, sCloud, tCloud) {
    fCloud.x = Phaser.Math.Between(410, 430)
    fCloud.y = Phaser.Math.Between(70, 500)

    sCloud.x = Phaser.Math.Between(550, 700)
    sCloud.y = Phaser.Math.Between(70, 450)

    tCloud.x = Phaser.Math.Between(600, 800)
    tCloud.y = Phaser.Math.Between(70, 500)
  }

  recycleClouds() {
    const tempClouds = []
    this.clouds.getChildren().forEach(cloud => {
      if (!(cloud.getBounds().right > 0)) {
        // recycle cloud
        tempClouds.push(cloud)

        if (tempClouds.length === 3) {
          this.placeCloud(...tempClouds)
        }
      }
    })
  }

  createPipes() {
    this.pipes = this.physics.add.group()

    for (let i = 0; i < PIPES_TO_RENDER; i++) {
      const upperPipe = this.pipes.create(0, 0, 'pipe')
        .setFlipY(true)
        .setImmovable(true)
        .setOrigin(0, 1)
      const lowerPipe = this.pipes.create(0, 0, 'pipe')
        .setImmovable(true)
        .setOrigin(0, 0)

      this.placePipe(upperPipe, lowerPipe)
    }
    this.pipes.setVelocityX(-200)
  }

  createColliders() {
    this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this)
  }

  createScore() {
    this.score = 0
    const bestScore = localStorage.getItem('bestScore')
    this.scoreText = this.add.text(16, 66, `Score: ${0}`, {fontSize: '32px', color: '#fff'})
    this.add.text(16, 102, `Best score: ${bestScore || 0}`, {fontSize: '18px', color: '#fff'})
  }

  createPause() {
    this.isPaused = false
    const pauseButton = this.add.image(this.config.width - 20,this.config.height - 70,'pause')
      .setInteractive()
      .setScale(3)
      .setOrigin(1)

    pauseButton.on('pointerdown', () => {
      this.isPaused = true
      this.physics.pause()
      this.scene.pause()
      this.scene.launch('PauseScene')
    })
  }

  handleInputs() {
    this.input.on('pointerdown', this.flap, this)
    this.input.keyboard.on('keydown-SPACE', this.flap, this)
  }

  checkGameStatus() {
    if (this.bird.getBounds().bottom >= this.config.height || this.bird.y <= 0) {
      this.gameOver()
    }
  }

  placePipe(uPipe, lPipe) {
    const difficulty = this.difficulties[this.currentDifficulty]
    const rightMostX = this.getRightMostPipe()
    const pipeVerticalDistance = Phaser.Math.Between(...difficulty.pipeVerticalDistanceRange)
    const pipeVerticalPosition = Phaser.Math.Between(20, this.config.height - 20 - pipeVerticalDistance)
    const pipeHorizontalDistance = Phaser.Math.Between(...difficulty.pipeHorizontalDistanceRange)

    uPipe.x = rightMostX + pipeHorizontalDistance
    uPipe.y = pipeVerticalPosition

    lPipe.x = uPipe.x
    lPipe.y = uPipe.y + pipeVerticalDistance
  }

  recyclePipes() {
    const tempPipes = []
    this.pipes.getChildren().forEach(pipe => {
      if (!(pipe.getBounds().right > 0)) {
        // recycle pipe
        tempPipes.push(pipe)

        if (tempPipes.length === 2) {
          this.placePipe(...tempPipes)
          this.increaseScore()
          this.saveBestScore()
          this.increaseDifficulty()
        }
      }
    })
  }

  increaseDifficulty() {
    if (this.score === 4) {
      this.currentDifficulty = 'easy'
      this.bird.play('flyGreen')
    }

    if (this.score === 12) {
      this.currentDifficulty = 'normal'
      this.bird.play('flyGold')
    }

    if (this.score === 20) {
      this.currentDifficulty = 'hard'
    }
  }

  getRightMostPipe() {
    let rightMostX = 0
    this.pipes.getChildren().forEach(pipe => {
      rightMostX = Math.max(pipe.x, rightMostX)
    })

    return rightMostX
  }

  saveBestScore() {
    const bestScoreText = localStorage.getItem('bestScore')
    const bestScore = bestScoreText && parseInt(bestScoreText, 10)

    if (!bestScore || this.score > bestScore) {
      localStorage.setItem('bestScore', this.score)
    }
  }

  gameOver() {
    this.physics.pause()
    this.bird.setTint(0xEE4824)

    this.saveBestScore()

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart()
      },
      loop: false
    })
  }

  flap() {
    if (this.isPaused) {
      return
    }
    this.bird.body.velocity.y = -this.flapVelocity
  }

  increaseScore() {
    this.score++
    this.scoreText.setText(`Score: ${this.score}`)
  }
}

export default PlayScene