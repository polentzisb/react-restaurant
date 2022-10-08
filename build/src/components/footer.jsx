import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import '../styles/footer.css';

const Footer = () => {
  return (
    <div className='footer'>
        <div className='socialMedia'>
            <InstagramIcon />
            <FacebookIcon />
            <TwitterIcon />
            <PinterestIcon />
        </div>
        <p> &copy; 2022 wasabi sushi & bentos</p>
    </div>
  )
}

export default Footer