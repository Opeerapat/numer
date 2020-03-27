import React, { Component } from 'react';
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import { evaluate, compile, abs, derivative } from 'mathjs'
import api from '../api/index';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);

class newton extends Component {
  constructor(props) {
    super(props);
    this.state = { sd: '', count: 0, value: '', fxl: [], xl: [], fx: '', movie: '', err: [], showtable: false, showgra: false, showfx: false };
    this.onChangeXL = this.onChangeXL.bind(this);
    this.onChangeSub = this.onChangeSub.bind(this);
    this.onChangeFX = this.onChangeFX.bind(this);
    this.onChangeEX = this.onChangeEX.bind(this);
    this.onChangeadd = this.onChangeadd.bind(this);
  }

  componentDidMount = async () => {
    await api.getMovieById("5e68f851cc007921083c50c9").then(db => {
      this.setState({
        fx: db.data.data.fx
      })
      this.state.xl[0] = parseFloat(db.data.data.xl);

    })
    console.log(this.state.fx + this.state.xl);
  }
  onChangeFX({ target: { value } }) {
    this.setState({ fx: value });
    console.log(this.state.fx);
  }
  onChangeXL({ target: { value } }) {
    this.state.xl[0] = parseFloat(value);
    console.log(this.state.xl);
  }
  onChangeEX() {
    this.state.showfx = true;
    this.onChangeSub();
  }
  onChangeadd = async () =>
  {
    var xl = this.state.xl[0].toString();
    const{fx} = this.state
    const payload =  {fx,xl}
   
    await api.insertMovie(payload).then(res=>{
      window.alert(`Movie inserted successfully`)
      console.log("Movie inserted successfully")
    })
  }
  onChangeSub() {
    var i = 1, errord = 0, che = 0, chf = 0;
    var xl = parseFloat(this.state.xl);
    this.state.fxl[chf] = this.functionfx({ x: xl });
    chf++;
    do {
      this.state.xl[i] = xl - (this.functionfx({ x: xl }) / this.functiondif({ x: xl }));
      this.state.fxl[chf] = this.functionfx({ x: this.state.xl[i] });
      errord = this.errors(this.state.xl[i - 1], this.state.xl[i]);
      this.state.err[che] = errord;
      xl = this.state.xl[i];
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
        <h2>Newton</h2>
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

        <Button variant="outline-primary" type="submit" onClick={this.onChangeSub}>
          Submit
              </Button>

        <Button variant="outline-warning" type="submit" onClick={this.onChangeEX}>
          Example
              </Button>
              <Button variant="outline-warning" type="submit" onClick={this.onChangeadd}>
              Add to database
              </Button>
        {this.state.showfx &&
          <h1>fx={this.state.fx}    xl= {this.state.xl[0]}  </h1>
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

export default newton;