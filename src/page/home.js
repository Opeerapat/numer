import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap';
import a1 from '../asset/a1.png'
import a2 from '../asset/a2.jpeg'
import a3 from '../asset/a3.png'
import a5 from '../asset/a5.png'
import a6 from '../asset/a6.png'

class home extends Component
{
    render()
    {
        
        return(
          <div>
            <Carousel>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={a1}
                width = "800"
                height = "400"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={a2}
                width = "1000"
                height = "400"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={a3}
                width = "1000"
                height = "400"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={a5}
                width = "1000"
                height = "400"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={a6}
                width = "1000"
                height = "400"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>

          <h1>Welcome to  Numer Website</h1>
          </div>
        );
    }
}
 
export default home;