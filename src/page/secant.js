import React, { Component } from 'react';
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import { evaluate, compile, abs, derivative } from 'mathjs'
import api from '../api/index';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);

class secant extends Component {
  constructor(props) {
    super(props);
    this.state = { sd: '', count: 0, value: '', fxl: [], xl: [], fx: '', movie: '', err: [], showtable: false, showgra: false, showfx: false };
    this.onChangeXL = this.onChangeXL.bind(this);
    this.onChangeSub = this.onChangeSub.bind(this);
    this.onChangeFX = this.onChangeFX.bind(this);
    this.onChangeXLL = this.onChangeXLL.bind(this);
    this.onChangeEX = this.onChangeEX.bind(this);
  }

  componentDidMount = async () => {
    await api.getMovieById("5e68f88776315626e44a6034").then(db => {
      this.setState({
        fx: db.data.data.fx
      })
      this.state.xl[0] = parseFloat(db.data.data.xl);
      this.state.xl[1] = parseFloat(db.data.data.xr);
    })
    console.log(this.state.fx + this.state.xl + this.state.xr);
  }
  onChangeFX({ target: { value } }) {
    this.setState({ fx: value });
    console.log(this.state.fx);
  }
  onChangeXL({ target: { value } }) {
    this.state.xl[0] = parseFloat(value);
    console.log(this.state.xl);
  }
  onChangeXLL({ target: { value } }) {
    this.state.xl[1] = parseFloat(value);
    console.log(this.state.xl);
  }
  onChangeEX() {
    this.state.showfx = true;
    this.onChangeSub();
  }

  onChangeSub() {
    var i = 2, errord = 0, che = 0, chf = 0;
    var xl = parseFloat(this.state.xl);
    var xr = parseFloat(this.state.xl[1]);
    console.log(xl + " " + xr);
    this.state.fxl[chf] = this.functionfx({ x: xl });
    chf++;
    this.state.fxl[chf] = this.functionfx({ x: xr });
    chf++;
    do {
      this.state.xl[i] = xr - ((this.functionfx({ x: xr }) * (xl - xr)) / (this.functionfx({ x: xl }) - this.functionfx({ x: xr })));
      this.state.fxl[chf] = this.functionfx({ x: this.state.xl[i] });
      errord = this.errors(this.state.xl[i - 1], this.state.xl[i]);
      this.state.err[che] = errord;
      xl = this.state.xl[i - 1];
      xr = this.state.xl[i];
      i++;
      che++;
      chf++;
    } while (errord >= 0.000001);
    this.setState({
      sd: ''

    })
    this.state.showtable = true;
    this.state.showgra = true;
    console.log(this.state.showtable);
    console.log(this.state.showgra);
    console.log("xl = " + this.state.xl + "fxl = " + this.state.fxl + "error = " + this.state.err)
    console.log('i:' + i + 'che:' + che + 'chf' + chf)


  };
  functionfx = (x) => {
    return evaluate(this.state.fx, x);
  };
  functiondif = (x) => {
    return derivative(this.state.fx, 'x').evaluate(x);
  }
  errors = (xo, xn) => {
    return abs((xn - xo) / xn);
  };
  grap() {
    const xl_plot = this.state.xl;
    const yl_plot = this.state.fxl;
    var data = [
      {
        type: 'scatter',
        x: xl_plot,
        y: yl_plot,
        marker: {
          color: '#1B2631'
        },
        name: 'XL'
      },
    ];
    console.log(data);
    return data
  }
  render() {
    var i = 0;
    let layout = {
      title: '',
      xaxis: {
        title: '',
      },
    };
    return (
      <div>
        <h2>Secant</h2>
        <Form.Group as={Row} >
          <Form.Label column sm="2">
            F(X)
              </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="" onChange={this.onChangeFX} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} >
          <Form.Label column sm="2">
            X(0)
              </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="" onChange={this.onChangeXL} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} >
          <Form.Label column sm="2">
            X(1)
              </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="" onChange={this.onChangeXLL} />
          </Col>
        </Form.Group>

        <Button variant="outline-primary" type="submit" onClick={this.onChangeSub}>
          Submit
              </Button>

        <Button variant="outline-warning" type="submit" onClick={this.onChangeEX}>
          Example
              </Button>
        {this.state.showfx &&
          <h1>fx={this.state.fx}    x0= {this.state.xl[0]}    x1 = {this.state.xl[1]}</h1>
        }

        {this.state.showtable &&
          <Table striped bordered hover size="sm" striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>iteration</th>
                <th>x</th>
                <th>fx</th>
                <th>error</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.xl.map((num, index) => {
                  return <div>{++index}</div>
                })}
                </td>
                <td>{this.state.xl.map((num, index) => {
                  return <div>{num.toFixed(6)}</div>
                })}
                </td>
                <td>{this.state.fxl.map((num, index) => {
                  return <div>{num.toFixed(6)}</div>
                })}
                </td>
                <td>{this.state.err.map((num, index) => {
                  return <div>{num.toFixed(6)}</div>
                })}
                </td>
              </tr>
            </tbody>
          </Table>
        }
        {this.state.showgra && <div>
          <PlotlyComponent className="whatever" data={this.grap()} layout={layout} />
        </div>
        }
      </div>
    );
  }
}

export default secant;