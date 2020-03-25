import React, { Component } from 'react';
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import { evaluate, compile, abs } from 'mathjs'
import api from '../api/index';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);
const { create, all, parse } = require("mathjs");
const mathjs = create(all)
mathjs.import(require("mathjs-simple-integral"));
class composittrap extends Component {
    constructor(props) {
        super(props);
        this.state = { sd: '', count: 0, value: '', fxl: [], fxr: [], xr: [], xl: [], fx: '', movie: '', n: '', err: [], showtable: false, showgra: false, showfx: false };
        this.onChangeXL = this.onChangeXL.bind(this);
        this.onChangeXR = this.onChangeXR.bind(this);
        this.onChangeSub = this.onChangeSub.bind(this);
        this.onChangeFX = this.onChangeFX.bind(this);
        this.onChangeEX = this.onChangeEX.bind(this);
        this.onChangeN = this.onChangeN.bind(this);
    }

    componentDidMount = async () => {
        await api.getMovieById("5e7adb71819e5800194a432f").then(db => {
            this.setState({
                fx: db.data.data.fx,
                n : db.data.data.n
            })
            this.state.xl[0] = parseFloat(db.data.data.xl);
            this.state.xr[0] = parseFloat(db.data.data.xr);
        })
        console.log(this.state.fx + this.state.xl + this.state.xr+this.state.n);
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
    onChangeN({ target: { value } }) {
        this.setState({ n: value });
        console.log(this.state.n);

    }
    onChangeEX() {
        this.state.showfx = true;
        this.onChangeSub();
    }
    onChangeSub() {
        this.state.showfx = true;
        var p = 0, k = 0, errord = 0, che = 0, chf = 0;
        var fxd = this.state.fx;
        var xl = parseFloat(this.state.xl);
        var xr = parseFloat(this.state.xr);
        var nx = parseFloat(this.state.n);
        console.log("n:" + nx);
        var xlo = xl;
        var xro = xr;
        var sum = 0;
        var fxx = mathjs.integral(fxd, 'x').toString();
        console.log(fxx);
        var i = evaluate(fxx, { x: xr }) - evaluate(fxx, { x: xl });
        console.log(i);
        var id = ((xr - xl) / nx);
        console.log("id:"+id);
        for(p=0;p<=nx;p++) {
            console.log("xl:"+xl);
            if(xl==xlo||xl==xro)
            {
                sum = sum + (this.functionfx({ x: xl }));
            }
            else
            {
                sum = sum + (2*this.functionfx({ x: xl }));
            }
            console.log("sum:"+sum);
            xl = xl + id;
           
        }
        console.log(sum);
        var h = (id / 2) * sum;
        console.log(h);
        this.state.fxl[0] = h;
        this.state.fxr[0] = i;
        errord = abs((i - h) / i);
        this.state.err[0] = errord;
        console.log(this.state.err[0]);
        this.setState({
            sd: ''

        })
        this.state.showtable = true;
        this.state.showgra = true;
        console.log(this.state.showtable);
        console.log(this.state.showgra);
       
    };
    functionfx = (x) => {
        return evaluate(this.state.fx, x);
    };
    errors = (xo, xn) => {
        return abs((xn - xo) / xn);
    };
    render() {
        var i = 0;
        return (
            <div>
                <h2>Composite Trapezoidal Rule</h2>
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
                <Form.Group as={Row} >
                    <Form.Label column sm="2">
                        N
              </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Enter" onChange={this.onChangeN} />
                    </Col>
                </Form.Group>
                <Button variant="outline-primary" type="submit" onClick={this.onChangeSub}>
                    Submit
              </Button>

                <Button variant="outline-warning" type="submit" onClick={this.onChangeEX}>
                    Example
              </Button>

                {this.state.showfx &&
                    <h1>fx={this.state.fx}    xl= {this.state.xl[0]}    xr = {this.state.xr[0]} n = {this.state.n[0]}</h1>
                }
                {this.state.showtable &&
                    <Table striped bordered hover size="sm" striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>xl</th>
                                <th>xr</th>
                                <th>h</th>
                                <th>i</th>
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
                                <td>{this.state.fxl.map((num, index) => {
                                    return <div>{num.toFixed(6)}</div>
                                })}
                                </td>
                                <td>{this.state.fxr.map((num, index) => {
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

export default composittrap;