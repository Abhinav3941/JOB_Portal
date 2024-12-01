import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom'; // Using react-router-dom for routing
import image1 from './images/1.png'; // Adjust the filename as necessary
import image2 from './images/2.png'; // Adjust the filename as necessary
import image3 from './images/3.png'; // Adjust the filename as necessary
import image4 from './images/4.png'; // Adjust the filename as necessary
import image5 from './images/5.png'; // Adjust the filename as necessary

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-200 py-8">
      
    <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row justify-between items-center">

           <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Job Hunt</h2>
            <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
          </div>

     
        <div className="flex space-x-4 mt-4 md:mt-0">
          <div className={styles.imgwrap}>
            <Link to="https://www.facebook.com/profile.php?id=100007152017429">
              <img src={image1} alt="Facebook logo" style={{ width: '100%', height: 'auto' }} />
            </Link>
          </div>

          <div className={styles.imgwrap}>
            <Link to="https://www.instagram.com/01abhiinav/">
              <img src={image2} alt="Instagram logo" style={{ width: '100%', height: 'auto' }} />
            </Link>
          </div>

          <div className={styles.imgwrap}>
            <Link to="https://x.com/01Abhiinav">
              <img src={image3} alt="X logo" style={{ width: '100%', height: 'auto' }} />
            </Link>
          </div>

          <div className={styles.imgwrap}>
            <Link to="https://www.youtube.com/channel/UCTenzH7X1Rhpgm0z2858-7w">
              <img src={image4} alt="YouTube logo" style={{ width: '100%', height: 'auto' }} /> {/* Adjust this path as necessary */}
            </Link>

            
          </div>
          <div className={styles.imgwrap}>
            <Link to="https://www.linkedin.com/feed/">
              <img src={image5} alt="Linkdin logo" style={{ width: '100%', height: 'auto' 
               
                 }} /> {/* Adjust this path as necessary */}
            </Link>
                 

            
          </div>
        </div>
      </div>
      </div>
      </footer>
  );
};

export default Footer;