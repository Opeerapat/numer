import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';

function Nabar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Numer</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Root of equations" id="basic-nav-dropdown">
            <NavDropdown.Item href="/bisec">Bisection</NavDropdown.Item>
            <NavDropdown.Item href="/falseposit">False-Position</NavDropdown.Item>
            <NavDropdown.Item href="/onepoint">One-point Iteration</NavDropdown.Item>

            <NavDropdown.Item href="/newton">Newton-Rapshon</NavDropdown.Item>
            <NavDropdown.Item href="/secant">Scant</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Linear algebraic equation" id="basic-nav-dropdown">
            <NavDropdown.Item href="/cramer">Cramer's Rule</NavDropdown.Item>
            <NavDropdown.Item href="/gausseli">Gauss Elimination </NavDropdown.Item>
            <NavDropdown.Item href="/gaussjordan">Gauss Jordan</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/lu">LU Decomposition </NavDropdown.Item>
            <NavDropdown.Item href="/jacobi">Jacobi Iteration</NavDropdown.Item>
            <NavDropdown.Item href="/gaussseidel">Gauss seidel Iteration  </NavDropdown.Item>
            <NavDropdown.Item href="/conjugate">Conjugate gradient</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Simple integral" id="basic-nav-dropdown">
            <NavDropdown.Item href="/singletrap">Trapezoidal Rule</NavDropdown.Item>
            <NavDropdown.Item href="/composittrap">Composite Trapezoidal </NavDropdown.Item>   
            <NavDropdown.Item href="/simpson">Simpson </NavDropdown.Item>   
            <NavDropdown.Item href="/compossim">Composite Simpson </NavDropdown.Item>   
          </NavDropdown>
          <NavDropdown title="Derivative" id="basic-nav-dropdown">
            <NavDropdown.Item href="/Diff">Differentiation</NavDropdown.Item>
          </NavDropdown>
        </Nav>

      </Navbar.Collapse>
    </Navbar>
  );
}

export default Nabar;
