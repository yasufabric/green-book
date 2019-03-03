import './App.css'

import AnalogClock, { Themes } from 'react-analog-clock'
import { Button, ButtonGroup, Col, Container, Form, Input, Row } from 'reactstrap'
import React, { Component } from 'react'

import moment from 'moment'

class App extends Component {
  constructor() {
    super()
    this.state = {
      time: 0,
      isOn: false,
      start: 0,
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
      this.setState({
        time: Date.now() - this.state.start,
      })
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
              <Input bsSize="lg" value={this.state.minute} onChange={e => this.setState({ minute: e.target.value })} />

              <ButtonGroup>
                <Button onClick={this.startTimer}>Start</Button>
                <Button onClick={this.stopTimer}>Stop</Button>
                <Button onClick={this.startTimer}>Resume</Button>
                <Button onClick={this.resetTimer}>Rest</Button>
              </ButtonGroup>
              <p>{JSON.stringify(this.state, 2, null)}</p>
            </Form>
            <AnalogClock theme={Themes.dark} />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
