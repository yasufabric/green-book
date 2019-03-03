import React, { Component } from "react";
import "./App.css";
import AnalogClock, { Themes } from "react-analog-clock";
import { Form, Input } from "reactstrap";

class App extends Component {
  constructor() {
    super();
    this.state = {
      minute: ""
    };
  }
  render() {
    return (
      <div className="App">
        <AnalogClock theme={Themes.dark} />
        <Form>
          <Input
            placeholder="lg"
            bsSize="lg"
            value={this.state.minute}
            onChange={e => this.setState({ minute: e.target.value })}
          />
        </Form>
      </div>
    );
  }
}

export default App;
