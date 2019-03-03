import React, { Component } from 'react'

import Sound from 'react-sound'

export default class SoundEffect extends Component {
  static defaultProps = {
    type: '3s',
    loop: false,
  }
  constructor() {
    super()
    this.state = {
      types: {
        '3s': '/sounds/3.mp3',
        rain: '/sounds/rain.mp3',
        jazz: '/sounds/jazz.mp3',
      },
    }
  }
  render() {
    return <Sound url={this.state.types[this.props.type]} loop={this.loop} playStatus={Sound.status.PLAYING} />
  }
}
