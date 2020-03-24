import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import a1 from '../asset/a1.png';

const Styles = styled.div`
  .jumbo {
    background: url(${a1}) no-repeat fixed bottom;
    background-size: cover;
    color: 	#FFFFFF;
    height: 600px;
    position: relative;
    z-index: -2;
  }
  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

export const Jumbotron = () => (
  <Styles>
    <Jumbo fluid className="jumbo">
      <div className="overlay"></div>
      <Container>
        <p>ระเบิดเวลา</p>
        <p>Ahhhhhhhhhhhh</p>
      </Container>
    </Jumbo>
  </Styles>
)