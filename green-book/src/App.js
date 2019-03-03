import './App.css'

import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Progress,
  Row,
} from 'reactstrap'
import React, { Component } from 'react'

import SoundEffect from './SoundEffect'
import _ from 'lodash'

class App extends Component {
  constructor() {
    super()
    this.state = {
      time: 0,
      isOn: false,
      start: 0,
      end: 15000,
      last3s: false,
      minute: '',
      message: 'Count',
      progress: 0,
      remind: 10000,
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
        progress: time,
      })
      if (time > this.state.end - 7500) {
        this.setState({ isOn: false, last3s: true })
      }
      if (time > this.state.end) {
        this.setState({ isOn: false, last3s: false, time: 0 })
        clearInterval(this.timer)
      }
    }, 1000)
  }

  stopTimer() {
    this.setState({ isOn: false, last3s: false })
    clearInterval(this.timer)
  }
  resetTimer() {
    this.setState({ time: 0, isOn: false, last3s: false, progress: 0 })
    clearInterval(this.timer)
  }

  render() {
    return (
      <Container className="p-4">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <Form>
              {this.state.last3s && <SoundEffect type="3s" />}
              {this.state.end - this.state.remind < this.state.time && <SoundEffect type="jazz" />}
              <div className="clearfix pb-2">
                <div className="float-left">
                  <h4 className="text-white font-weight-bold">Cartier Timer</h4>
                </div>
              </div>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <span class="lnr lnr-clock pr-2 pl-1" /> Timer
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Please enter seconds"
                    bsSize="lg"
                    value={this.state.end / 1000}
                    onChange={e => this.setState({ end: e.target.value * 1000 })}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>Sec</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Remind at</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Please enter seconds"
                    bsSize="lg"
                    value={this.state.remind / 1000}
                    onChange={e => this.setState({ remind: e.target.value * 1000 })}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>Sec</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <ButtonGroup className="btn-block">
                  <Button onClick={this.startTimer}>Start</Button>
                  <Button outline onClick={this.stopTimer}>
                    Stop
                  </Button>
                  <Button outline onClick={this.resetTimer}>
                    Reset
                  </Button>
                </ButtonGroup>
              </FormGroup>
            </Form>
            <Progress color="secondary" style={{ height: '40px' }} value={this.state.progress} max={this.state.end}>
              <span className="pl-2">{_.round((this.state.end - this.state.progress) / 1000)} s</span>
            </Progress>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
