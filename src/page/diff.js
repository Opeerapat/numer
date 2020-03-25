import React, { Component } from 'react';
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import { evaluate, compile, abs, pow, derivative } from 'mathjs'
import api from '../api/index';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);

class diff extends Component {
  constructor(props) {
    super(props);
    this.state = { sd: '', count: 0, value: '', fxl: [], fxr: [], xl:[],xr:[],x: [], h: [], level: '', fx: '', oh: '', movie: '', err: [], task: '', showtable: false, showgra: false, showdata: false, showoh: false ,showexd:false,showfx:false};
    this.onChangeXL = this.onChangeXL.bind(this);
    this.onChangeXR = this.onChangeXR.bind(this);
    this.onChangeSub = this.onChangeSub.bind(this);
    this.onChangeFX = this.onChangeFX.bind(this);
    this.onChangeEX = this.onChangeEX.bind(this);
    this.onChangefor = this.onChangefor.bind(this);
    this.onChangeback = this.onChangeback.bind(this);
    this.onChangecen = this.onChangecen.bind(this);
    this.onChangeoh = this.onChangeoh.bind(this);
    this.onChangelevel = this.onChangelevel.bind(this);
  }

  componentDidMount = async () => {
    await api.getMovieById("5e7aebb9724efb00194b3f35").then(db => {
      this.setState({
        fx: db.data.data.fx,
        level:db.data.data.level,
        oh:db.data.data.oh,
        task:db.data.data.task
      })
      this.state.x[0] = parseFloat(db.data.data.x);
      this.state.h[0] = parseFloat(db.data.data.h);
    })
    console.log(this.state.fx + this.state.level + this.state.oh +this.state.task + this.state.x + this.state.h);
  }
  onChangefor() {
    this.setState({ task: 'forward' });
    this.state.showoh = false;
    this.state.showdata = true;
    console.log(this.state.task);
  }
  onChangeback() {
    this.setState({ task: 'backward' });
    this.state.showoh = false;
    this.state.showdata = true;
    console.log(this.state.task);
  }
  onChangecen() {
    this.setState({ task: 'central' });
    this.state.showoh = true;
    this.state.showdata = true;
    console.log(this.state.task);
  }
  onChangeFX({ target: { value } }) {
    this.setState({ fx: value });
    console.log(this.state.fx);
  }
  onChangeoh({ target: { value } }) {
    this.setState({ oh: value });
    console.log(this.state.oh);
  }
  onChangeXR({ target: { value } }) {
    this.state.h[0] = parseFloat(value);
    console.log(this.state.h);
  }
  onChangeXL({ target: { value } }) {
    this.state.x[0] = parseFloat(value);
    console.log(this.state.x);
  }
  onChangelevel({ target: { value } }) {
    this.setState({ level: value });
    console.log(this.state.level);
  }
  onChangeEX() {
    this.state.showoh=false;
    this.state.showdata = false;
    this.state.showexd = true;
    this.state.showfx = true;
    this.onChangeSub();
  }
  onChangeSub() {
    var i = 0, k = 0, errord = 0, che = 0, chf = 0;
    var fxd = this.state.fx;
    var x = parseFloat(this.state.x);
    var h = parseFloat(this.state.h);
    var xd = parseFloat(parseFloat(this.state.level));
    console.log(fxd + x + h + this.state.level + this.state.oh + this.state.task + xd);
    var errordi = 0;
    var errori = 0;
    if (this.state.task == 'forward') {
      if (this.state.oh == '1') {
        if (this.state.level == '1') {
          errordi = (this.functionfx({ x: x + h }) - this.functionfx({ x: x })) / h;
          console.log(errordi);
        }
        else if (this.state.level == '2') {
          errordi = (this.functionfx({ x: x + h + h }) - (2 * this.functionfx({ x: x + h })) + this.functionfx({ x: x })) / pow(h, 2);
          console.log(errordi);
        }
        else if (this.state.level == '3') {
          errordi = (this.functionfx({ x: x + h + h + h }) - (3 * this.functionfx({ x: x + h + h })) + (3 * this.functionfx({ x: x + h })) - this.functionfx({ x: x })) / pow(h, 3);
          console.log(errordi);
        }
        else if (this.state.level == '4') {
          errordi = (this.functionfx({ x: x + h + h + h + h }) - (4 * this.functionfx({ x: x + h + h + h })) + (6 * this.functionfx({ x: x + h + h })) - (4 * this.functionfx({ x: x + h })) - this.functionfx({ x: x })) / pow(h, 4);
          console.log(errordi);
        }
      }
      else if (this.state.oh == '2') {
        if (this.state.level == '1') {
          errordi = (-(this.state.fx({ x: x + h + h })) + (4 * this.functionfx({ x: x + h })) - this.functionfx({ x: x })) / (2 * h);
          console.log(errordi);
        }
        else if (this.state.level == '2') {
          errordi = (-(this.functionfx({ x: x + h + h + h })) - (4 * this.functionfx({ x: x + h + h })) - (5 * this.functionfx({ x: x + h })) + (2 * this.functionfx({ x: x }))) / pow(h, 2);
          console.log(errordi);
        }
        else if (this.state.level == '3') {
          errordi = (-(3 * this.functionfx({ x: x + h + h + h + h })) + (14 * this.functionfx({ x: x + h + h + h })) - (24 * this.functionfx({ x: x + h + h })) + (18 * this.functionfx({ x: x + h })) - (5 * this.functionfx({ x: x }))) / (2 * pow(h, 3));
          console.log(errordi);
        }
        else if (this.state.level == '4') {
          errordi = (-(2 * this.functionfx({ x: x + h + h + h + h + h })) + (11 * this.functionfx({ x: x + h + h + h + h })) - (24 * this.functionfx({ x: x + h + h + h })) + (26 * this.functionfx({ x: x + h + h })) - (14 * this.functionfx({ x: x + h })) + (3 * this.functionfx({ x: x }))) / pow(h, 4);
          console.log(errordi);
        }
      }
    }
    else if (this.state.task == 'backward') {
      if (this.state.oh == '1') {
        if (this.state.level == '1') {
          errordi = (this.functionfx({ x: x }) - this.functionfx({ x: x - h })) / h;
          console.log(errordi);
        }
        else if (this.state.level == '2') {
          errordi = (this.functionfx({ x: x }) - (2 * this.functionfx({ x: x - h })) + this.functionfx({ x: x - h - h })) / pow(h, 2);
          console.log(errordi);
        }
        else if (this.state.level == '3') {
          errordi = (this.functionfx({ x: x }) - (3 * this.functionfx({ x: x - h })) + (3 * this.functionfx({ x: x - h - h })) - this.functionfx({ x: x - h - h - h })) / pow(h, 3);
          console.log(errordi);
        }
        else if (this.state.level == '4') {
          errordi = (this.functionfx({ x: x }) - (4 * this.functionfx({ x: x - h })) + (6 * this.functionfx({ x: x - h - h })) - (4 * this.functionfx({ x: x - h - h - h })) - this.functionfx({ x: x - h - h - h - h })) / pow(h, 4);
          console.log(errordi);
        }
      }
      else if (this.state.oh == '2') {
        if (this.state.level == '1') {
          errordi = ((3 * this.state.fx({ x: x })) - (4 * this.functionfx({ x: x - h })) - this.functionfx({ x: x - h - h })) / (2 * h);
          console.log(errordi);
        }
        else if (this.state.level == '2') {
          errordi = ((2 * this.functionfx({ x: x })) - (5 * this.functionfx({ x: x - h })) + (4 * this.functionfx({ x: x - h - h })) - (this.functionfx({ x: x - h - h - h }))) / pow(h, 2);
          console.log(errordi);
        }
        else if (this.state.level == '3') {
          errordi = ((5 * this.functionfx({ x: x })) - (18 * this.functionfx({ x: x - h })) + (24 * this.functionfx({ x: x - h - h })) - (14 * this.functionfx({ x: x - h - h - h })) - (3 * this.functionfx({ x: x - h - h - h - h }))) / (2 * pow(h, 3));
          console.log(errordi);
        }
        else if (this.state.level == '4') {
          errordi = ((3 * this.functionfx({ x: x })) - (14 * this.functionfx({ x: x - h })) + (26 * this.functionfx({ x: x - h - h })) - (24 * this.functionfx({ x: x - h - h - h })) + (11 * this.functionfx({ x: x - h - h - h - h })) - (2 * this.functionfx({ x: x - h - h - h - h - h }))) / pow(h, 4);
          console.log(errordi);
        }
      }
    }
    else if (this.state.task == 'central') {
      if (this.state.oh == '2') {
        if (this.state.level == '1') {
          errordi = (this.functionfx({ x: x + h }) - this.functionfx({ x: x - h })) / (2 * h);
          console.log(errordi);
        }
        else if (this.state.level == '2') {
          errordi = (this.functionfx({ x: x + h }) - (2 * this.functionfx({ x: x })) + this.functionfx({ x: x - h })) / pow(h, 2);
          console.log(errordi);
        }
        else if (this.state.level == '3') {
          errordi = (this.functionfx({ x: x + h + h }) - (2 * this.functionfx({ x: x + h })) + (2 * this.functionfx({ x: x - h })) - this.functionfx({ x: x - h - h })) / (2 * pow(h, 3));
          console.log(errordi);
        }
        else if (this.state.level == '4') {
          errordi = (this.functionfx({ x: x + h + h }) - (4 * this.functionfx({ x: x + h })) + (6 * this.functionfx({ x: x })) - (4 * this.functionfx({ x: x - h })) + this.functionfx({ x: x - h - h })) / pow(h, 4);
          console.log(errordi);
        }
      }
      else if (this.state.oh == '4') {
        if (this.state.level == '1') {
          errordi = (-(this.functionfx({ x: x + h + h })) + (8 * this.functionfx({ x: x + h })) - (8 * this.functionfx({ x: x - h })) + this.functionfx({ x: x - h - h })) / (12 * h);
          console.log(errordi);
        }
        else if (this.state.level == '2') {
          errordi = (-(this.functionfx({ x: x + h + h })) + (8 * this.functionfx({ x: x + h })) - (30 * this.functionfx({ x: x })) + (16 * this.functionfx({ x: x - h })) - this.functionfx({ x: x - h - h })) / (12 * pow(h, 2));
          console.log(errordi);
        }
        else if (this.state.level == '3') {
          errordi = (-(this.functionfx({ x: x + h + h + h })) + (8 * this.functionfx({ x: x + h + h })) - (13 * this.functionfx({ x: x + h })) + (13 * this.functionfx({ x: x - h })) - (8 * this.functionfx({ x: x - h - h })) + (this.functionfx({ x: x - h - h - h }))) / (8 * pow(h, 3));
          console.log(errordi);
        }
        else if (this.state.level == '4') {
          errordi = (-(this.functionfx({ x: x + h + h + h })) + (12 * this.functionfx({ x: x + h + h })) - (39 * this.functionfx({ x: x + h })) + (56 * this.functionfx({ x: x })) - (39 * this.functionfx({ x: x - h })) + (12 * this.functionfx({ x: x - h - h })) - (this.functionfx({ x: x - h - h - h }))) / (6 * pow(h, 4));
          console.log(errordi);
        }
      }
    }
    while(i<parseFloat(this.state.level))
    {
       fxd = derivative(fxd,'x').toString();
       console.log(fxd);
       i++;
    }
    errori =evaluate(fxd,{x:x});
    this.state.xl[0] =  errori;
    this.state.xr[0] = errordi;
    this.state.err[0] = abs((errori-errordi)/errori);
    console.log(errori + ' ' + errordi);
    console.log(this.state.err[0]);
    this.setState({
      sd: ''

    })
    this.state.showtable = true;
    this.state.showgra = true;
  };
  functionfx = (x) => {
    return evaluate(this.state.fx, x);
  };
  errors = (xo, xn) => {
    return abs((xn - xo) / xn);
  };
  render() {
    return (
      <div>
        <h2>Differentiation</h2>
        <Button variant="outline-warning" type="submit" onClick={this.onChangefor}>
          Forward
              </Button>
        <Button variant="outline-warning" type="submit" onClick={this.onChangeback}>
          backward
              </Button>
        <Button variant="outline-warning" type="submit" onClick={this.onChangecen}>
          Central
              </Button>
              
          <Button variant="outline-warning" type="submit" onClick={this.onChangeEX}>
            Example
              </Button>
        <br /><br /><br />
        {this.state.showdata &&
          <Form.Group as={Row} >
            <Form.Label column sm="2">
              F(X)
              </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Enter" onChange={this.onChangeFX} />
            </Col>
          </Form.Group>}
        {(this.state.showdata && !this.state.showoh) &&
          <Form.Group as={Row} >
            <Form.Label column sm="2">
              oh
              </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="1 or 2" onChange={this.onChangeoh} />
            </Col>
          </Form.Group>}
        {(this.state.showdata && this.state.showoh) &&
          <Form.Group as={Row} >
            <Form.Label column sm="2">
              oh
              </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="2 or 4" onChange={this.onChangeoh} />
            </Col>
          </Form.Group>}
        {this.state.showdata &&
          <Form.Group as={Row} >
            <Form.Label column sm="2">
              level Differentiation
              </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="1,2,3,4" onChange={this.onChangelevel} />
            </Col>
          </Form.Group>}
        {this.state.showdata &&
          <Form.Group as={Row} >
            <Form.Label column sm="2">
              X
              </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Enter" onChange={this.onChangeXL} />
            </Col>
          </Form.Group>}
        {this.state.showdata &&
          <Form.Group as={Row} >
            <Form.Label column sm="2">
              h
              </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Enter" onChange={this.onChangeXR} />
            </Col>
          </Form.Group>}
        {this.state.showdata &&
          <Button variant="outline-primary" type="submit" onClick={this.onChangeSub}>
            Submit
              </Button>}
        {this.state.showfx&&
           <h1>fx={this.state.fx}    x= {this.state.x[0]}    h = {this.state.h[0]} task ={this.state.n}  oh = {this.state.oh} level Differentiation = {this.state.level} </h1>
        }
        {this.state.showexd &&
             <Table striped bordered hover size="sm" striped bordered hover variant="dark">
             <thead>
               <tr>
                 <th>i</th>
                 <th>h</th>
                 <th>error</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td>{this.state.xl.map((num, index) => {
                   return <div>{num.toFixed(6)}</div>
                 })}
                 </td>
                 <td>{this.state.xr.map((num, index) => {
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


      </div>
    );
  }
}

export default diff;