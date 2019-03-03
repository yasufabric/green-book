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
          <Col lg={12}>
            <Form>
              {this.state.last3s && <SoundEffect type="3s" />}
              {this.state.end - this.state.remind < this.state.time && <SoundEffect type="jazz" />}
              <h3>Cartier Timer</h3>
              <FormGroup>
                <ButtonGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Timer</InputGroupText>
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

                  <Button color="primary" onClick={this.startTimer}>
                    Start
                  </Button>
                  <Button color="danger" onClick={this.stopTimer}>
                    Stop
                  </Button>
                  <Button onClick={this.startTimer}>Resume</Button>
                  <Button color="warning" onClick={this.resetTimer}>
                    Rest
                  </Button>

                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Remind</InputGroupText>
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
                </ButtonGroup>
              </FormGroup>
            </Form>
            <Progress value={this.state.progress} max={this.state.end}>
              {_.round((this.state.end - this.state.progress) / 1000)} s
            </Progress>
            <img src={require('./images/watch.jpg')} alt="honmono" />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
