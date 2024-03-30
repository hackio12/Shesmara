import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'

export default function Footer() {
  return (
    <footer className="bg-white bg-opacity-90 w-full">
    <style>
      {`
        @media (max-width: 768px) {
          .f-container {
            flex-direction: column;
            align-items: center;
          }
          .f-container > div {
            align-items: center !important;
            text-align: center;
          }
          .f-right {
            justify-content: center;
          }
        }
      `}
    </style>
    <div className="f-wrapper">
      <div className="paddings innerWidth flex justify-between items-center f-container border-gray-300 border-t">
        {/* left side */}
        <div className="flex flex-col justify-start gap-4 f-left">
          <img src={logo} alt="" className="w-32" />
          <span className="secondaryText">
            Our vision is to make all people <br />
            the best place to live for them.
          </span>
        </div>

        <div className="flex flex-col justify-start f-right">
          <span className=" text-rose-950 font-bold text-2xl lg:text-4xl uppercase">Information</span>
          <span className="secondaryText">145 New York, FL 5467, USA</span>
          <div className="flex justify-center gap-6  mt-6 font-medium f-menu">
            <span>Property</span>
            <span>Services</span>
            <span>Product</span>
            <Link to={'/about'}><p>About Us</p></Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
};
