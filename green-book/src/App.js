import './App.css'

import AnalogClock, { Themes } from 'react-analog-clock'
import { Button, Col, Container, Form, Input, Row } from 'reactstrap'
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
    let start = this.state.time === 0 ? <button onClick={this.startTimer}>start</button> : null
    let stop = this.state.time === 0 || !this.state.isOn ? null : <button onClick={this.stopTimer}>stop</button>
    let resume = this.state.time === 0 || this.state.isOn ? null : <button onClick={this.startTimer}>resume</button>
    let reset = this.state.time === 0 || this.state.isOn ? null : <button onClick={this.resetTimer}>reset</button>

    return (
      <Container>
        <Row>
          <Col>
            <div className="App">
              <AnalogClock theme={Themes.dark} />
              <div style={{ width: 40, height: 40 }}>{this.state.minute}</div>
              <div style={{ width: 40, height: 40 }}>{this.state.message}</div>
              <h3>timer: {this.state.time}</h3>
              {start}
              {resume}
              {stop}
              {reset}
              <Form>
                <Input
                  bsSize="lg"
                  value={this.state.minute}
                  onChange={e => this.setState({ minute: e.target.value })}
                />
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
