import React, { Component } from 'react';
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import { evaluate, compile, abs } from 'mathjs'
import api from '../api/index';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);

class falseposit extends Component {
  constructor(props) {
    super(props);
    this.state = {sd: '', count: 0, value: '', fxl: [], fxr: [], fxm: [], xr: [], xl: [], fx: '', movie: '', xm: [], err: [], showtable: false, showgra: false,showfx:false };
    this.onChangeXL = this.onChangeXL.bind(this);
    this.onChangeXR = this.onChangeXR.bind(this);
    this.onChangeSub = this.onChangeSub.bind(this);
    this.onChangeFX = this.onChangeFX.bind(this);
    this.onChangeEX = this.onChangeEX.bind(this);
  }

  componentDidMount = async () => {
    await api.getMovieById("5e68f47ae4fff62e5c5bdc70").then(db => {
      this.setState({
        fx: db.data.data.fx
      })
      this.state.xl[0] = parseFloat(db.data.data.xl);
      this.state.xr[0] = parseFloat(db.data.data.xr);
    })
    console.log(this.state.fx + this.state.xl + this.state.xr);
  }
  onChangeFX({ target: { value } }) {
    this.setState({ fx: value });
    console.log(this.state.fx);
  }
  onChangeXR({ target: { value } }) {
    this.state.xr[0] = parseFloat(value);
    console.log(this.state.xr);
  }
  onChangeXL({ target: { value } }) {
    this.state.xl[0] = parseFloat(value);
    console.log(this.state.xl);
  }
  onChangeEX()
  {
    this.state.showfx = true;
    this.onChangeSub();
  }
  onChangeSub() {
    var i = 1, k = 0, errord = 0, che = 0, chf = 0;
    var fxd = this.state.fx;
    var xl = parseFloat(this.state.xl);
    var xr = parseFloat(this.state.xr);
    var xm = ((xl*this.functionfx({x:xr}))-(xr*this.functionfx({x:xl})))/(this.functionfx({x:xr})-this.functionfx({x:xl}));
    this.state.fxl[chf] = this.functionfx({ x: xl });
    this.state.fxr[chf] = this.functionfx({ x: xr });
    this.state.fxm[chf] = this.functionfx({ x: xm });


    if ((this.functionfx({ x: xm }) * this.functionfx({ x: xr })) > 0) {
      xr = xm;
      this.state.xm[k] = xm;
      this.state.xr[i] = xr;
      this.state.xl[i] = xl;

    }
    else {
      xl = xm;
      this.state.xm[k] = xm;
      this.state.xl[i] = xl;
      this.state.xr[i] = xr;
    }
    i++;
    chf++;
    k++;
    do {//x^4-13
        xm = ((xl*this.functionfx({x:xr}))-(xr*this.functionfx({x:xl})))/(this.functionfx({x:xr})-this.functionfx({x:xl}));
      this.state.fxl[chf] = this.functionfx({ x: xl });
      this.state.fxr[chf] = this.functionfx({ x: xr });
      this.state.fxm[chf] = this.functionfx({ x: xm });
      if ((this.functionfx({ x: xm }) * this.functionfx({ x: xr })) > 0) {
        xr = xm;
        this.state.xm[k] = xm;
        this.state.xr[i] = xr;
        this.state.xl[i] = xl;

      }
      else {
        xl = xm;
        this.state.xm[k] = xm;
        this.state.xl[i] = xl;
        this.state.xr[i] = xr;
      }
      errord = this.errors(this.state.xm[k - 1], this.state.xm[k]);
      this.state.err[che] = errord;

      i++;
      che++;
      chf++;
      k++;
    } while (errord >= 0.000001);
    this.setState({
      sd: ''

    })
    this.state.showtable = true;
    this.state.showgra = true;
    console.log(this.state.showtable);
    console.log(this.state.showgra);
    console.log("xl = ", this.state.xl, "xr = ", this.state.xr, "xm = ", this.state.xm, "error = ", this.state.err)
    console.log('i:' + i + 'k:' + k + 'che:' + che + 'chf' + chf)
  };
  functionfx = (x) => {
    return evaluate(this.state.fx, x);
  };
  errors = (xo, xn) => {
    return abs((xn - xo) / xn);
  };
  plot() {
    const xl_plot = this.state.xl;
    const yl_plot = this.state.fxl;
    const xr_plot = this.state.xr;
    const yr_plot = this.state.fxr;
    var data = [
      {
        type: 'scatter',
        x: xl_plot,
        y: yl_plot,
        marker: {
          color: '#7D6608'
        },
        name: 'XL'
      },
      {
        type: 'scatter',
        x: xr_plot,
        y: yr_plot,
        marker: {
          color: '#1B2631'
        },
        name: 'XR'
      },

    ];
    console.log(data);
    return data
  }
  render() {
    var i = 0;
    let data = this.plot()
    let layout = {
      title: '',
      xaxis: {
        title: '',
      },
    };
    return (
      <div>
        <h2>False-position</h2>
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
            X(l)
              </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="" onChange={this.onChangeXL} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} >
          <Form.Label column sm="2">
            X(r)
              </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="" onChange={this.onChangeXR} />
          </Col>
        </Form.Group>

        <Button variant="outline-primary" type="submit" onClick={this.onChangeSub}>
          Submit
              </Button>

        <Button variant="outline-warning" type="submit" onClick={this.onChangeEX}>
          Example
              </Button>
              {this.state.showfx &&
           <h1>fx={this.state.fx}    xl= {this.state.xl[0]}    xr = {this.state.xr[0]}</h1>
        }

        {this.state.showtable &&
          <Table striped bordered hover size="sm" striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>iteration</th>
                <th>xl</th>
                <th>xr</th>
                <th>xm</th>
                <th>fxl</th>
                <th>fxr</th>
                <th>fxm</th>
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
                <td>{this.state.xr.map((num, index) => {
                  return <div>{num.toFixed(6)}</div>
                })}
                </td>
                <td>{this.state.xm.map((num, index) => {
                  return <div>{num.toFixed(6)}</div>
                })}
                </td>
                <td>{this.state.fxl.map((num, index) => {
                  return <div>{num.toFixed(6)}</div>
                })}
                </td>
                <td>{this.state.fxr.map((num, index) => {
                  return <div>{num.toFixed(6)}</div>
                })}
                </td>
                <td>{this.state.fxm.map((num, index) => {
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
          <PlotlyComponent className="whatever" data={data} layout={layout} />
        </div>
        }
      </div>
    );
  }
}

export default falseposit;