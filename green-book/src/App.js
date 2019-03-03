import './App.css'

import { Button, ButtonGroup, Col, Container, Form, Input, Progress, Row } from 'reactstrap'
import React, { Component } from 'react'

import SoundEffect from './SoundEffect'

class App extends Component {
  constructor() {
    super()
    this.state = {
      time: 0,
      isOn: false,
      start: 0,
      end: 10000,
      last3s: false,
      minute: '',
      message: 'Count',
    }

    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }

  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time,
    })

    this.timer = setInterval(() => {
      const time = Date.now() - this.state.start
      this.setState({
        time,
      })
      if (time > this.state.end - 7500) {
        this.setState({ isOn: false, last3s: true })
      }
      if (time > this.state.end) {
        this.setState({ isOn: false, last3s: false, time: 0 })
        clearInterval(this.timer)
      }
    }, 1)
  }

  stopTimer() {
    this.setState({ isOn: false })
    clearInterval(this.timer)
  }
  resetTimer() {
    this.setState({ time: 0, isOn: false })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Form>
              {this.state.last3s && <SoundEffect type="3s" />}
              <div className="control">
                <label>Seconds</label>
              </div>
              <ButtonGroup>
                <Input
                  bsSize="lg"
                  value={this.state.end / 1000}
                  onChange={e => this.setState({ end: e.target.value * 1000 })}
                />
                <Button onClick={this.startTimer}>Start</Button>
                <Button onClick={this.stopTimer}>Stop</Button>
                <Button onClick={this.startTimer}>Resume</Button>
                <Button onClick={this.resetTimer}>Rest</Button>
              </ButtonGroup>
              <p>{JSON.stringify(this.state, 2, null)}</p>
            </Form>

            <Progress value="463" max={500} />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
