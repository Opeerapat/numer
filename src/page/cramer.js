import React, { Component } from 'react';
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import { evaluate, compile, abs } from 'mathjs'
import api from '../api/index';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);

class cramer extends Component {
  constructor(props) {
    super(props);
    this.state = { sd: '', value: '', fxl: [],  xr: [], xl: [],movie: '', showtable: false, showgra: false,showmartrix:false };
    
    this.onChangeSub = this.onChangeSub.bind(this);
    this.onChangeFX = this.onChangeFX.bind(this);
    this.onChangeEX = this.onChangeEX.bind(this);

  }

  componentDidMount = async () => {
    await api.getMovieById("5e68e732e4fff62e5c5bdc6f").then(db => {
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
  onChangeEX() {
    this.onChangeSub();
  }
  onChangeSub(){
  
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
          color: '#ff6d00'
        },
        name: 'XL'
      },
      {
        type: 'scatter',
        x: xr_plot,
        y: yr_plot,
        marker: {
          color: '#ffab00'
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
        <h2>Bisection</h2>
        <Form.Group as={Row} >
          <Form.Label column sm="2">
            F(X)
              </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Enter" onChange={this.onChangeFX} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} >
          <Form.Label column sm="2">
            X(l)
              </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Enter" onChange={this.onChangeXL} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} >
          <Form.Label column sm="2">
            X(r)
              </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Enter" onChange={this.onChangeXR} />
          </Col>
        </Form.Group>
        
        <Button variant="outline-primary" type="submit" onClick={this.onChangeSub}>
          Submit
              </Button>

        <Button variant="outline-warning" type="submit" onClick={this.onChangeEX}>
          Example
              </Button>


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

export default cramer;