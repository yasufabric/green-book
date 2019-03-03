import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import AnalogClock, { Themes } from "react-analog-clock";
import { Form, Input } from "reactstrap";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AnalogClock theme={Themes.dark} />
        <Form>
          <Input placeholder="lg" bsSize="lg" />
          <Input placeholder="default" />
          <Input placeholder="sm" bsSize="sm" />
          <Input type="select" bsSize="lg">
            <option>Large Select</option>
          </Input>
          <Input type="select">
            <option>Default Select</option>
          </Input>
          <Input type="select" bsSize="sm">
            <option>Small Select</option>
          </Input>
        </Form>
      </div>
    );
  }
}

export default App;
