import React from 'react'
import Button from 'react-bootstrap/Button';
import bannerImage from '../assets/img1.jpg';
import '../styles/home.css';

const Home = () => {
  return (
    <div className='home' style={{ backgroundImage: `url(${bannerImage})` }}>
        <div className='headerContainer'>
          <h1>Wasabi Sushi & Bento</h1>
          <p>Enjoy the best rolls and bentos to go</p>
          <Button variant="success">Order Now</Button>{' '}
        </div>
    </div>
  )
}

export default Home