import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import home from '../images/home.png'
import {Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/css/bundle';
import {Navigation} from 'swiper/modules';
import SwiperCore from 'swiper';
import ListingItem from '../components/ListingItem';
import {motion} from 'framer-motion';
import CountUp from "react-countup";
import Footer from '../components/Footer';


export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings]= useState([]);
  const [rentListings, setRentListings]= useState([]);
  SwiperCore.use([Navigation]);

  console.log(offerListings);

  useEffect(()=>{
    const fetchOfferListings = async ()=>{

      try {
        const res= await fetch (`/api/listing/get?offer=false&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
        
      }

    }

    const fetchRentListings = async ()=>{
      try {
        const res= await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListing();
      } catch (error) {
        console.log(error); 
      }
    }

    const fetchSaleListing = async () =>{
      try {
        const res = await fetch (`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    }
    fetchOfferListings();
  },  []);
  return (
    <div>
      <div className="white-gradient w-80 h-80 rounded-full filter blur-4xl absolute"/>
    <section className=" bg-black text-white box-border">
      <div className=" flex justify-around items-end  max-w-screen-sm mx-auto">
      
        {/* left side */}
        <div className="flex flex-col justify-start container space-x-3rem ">
          <div className=" flex relative z-10">
            <div className="h-16 w-16 bg-gradient-to-br from-orange-500 to-orange-300 rounded-full  absolute right-28 -top-10 z-negative"/>
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, type: "ease-in" }}
              className="font-semibold text-6xl leading-16"
            >
              Discover <br />
              Most Suitable
              <br /> Property
            </motion.h1>
          </div>
          <div className="flex flex-col gap-1 secondaryText">
            <span>Find a variety of properties that suit you very easily</span>
            <span>Forget all difficulties in finding a residence for you</span>
          </div>
          <div className=" flex flex-center w-full justify-between  gap-6 font-semibold max-w-screen-sm mx-auto">
            <div className=" flex flex-col items-center justify-center text-2xl max-w-screen-sm  mx-auto">
              <span>
                <CountUp start={8800} end={9000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Premium Product</span>
            </div>
            <div className="flex flex-col items-center justify-center text-2xl max-w-screen-sm  mx-auto">
              <span>
                <CountUp start={1950} end={2000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Happy Customer</span>
            </div>
            <div className="flex flex-col items-center text-orange-500">
              <span>
                <CountUp end={28} /> <span>+</span>
              </span>
              <span className="secondaryText">Awards Winning</span>
            </div>
          </div>
        </div>
        {/* right side */}
       
        <div className="flex justify-between items-center ">
          <motion.div
            initial={{ x: "8rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, type: "ease-in" }}
            className="flex  w-35 h-35 overflow-hidden rounded-t-full border-8 border-solid border-gray-900 custom-border-8 ">
            <img className='w-full h-full' src={home} alt="houses"/>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Swiper */}
    <Swiper navigation>
      {offerListings &&
        offerListings.length > 0 &&
        offerListings.map((listing) => (
          <SwiperSlide key={listing._id}>
            <div className="h-screen">
              <div style={{ backgroundImage: `url(${listing.imageUrls[0]})`, backgroundSize: "cover", backgroundPosition: "center" }} className="h-full" />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>

    {/* Listing results for offer, sale, and rent */}
    <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
      {/* Render Offer Listings */}
      {offerListings && offerListings.length > 0 && (
        <div className="">
          <div className="my-3">
            <h2 className="text-2xl font-semibold text-slate-600">Recent Offers </h2>
            <Link className="text-sm text-blue-800 hover:underline" to="/search?offer=true">
              show more Offers
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {offerListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}

      {/* Render Rent Listings */}
      {rentListings && rentListings.length > 0 && (
        <div className="">
          <div className="my-3">
            <h2 className="text-2xl font-semibold text-slate-600">Recent places for rent </h2>
            <Link className="text-sm text-blue-800 hover:underline" to="/search?type=rent">
              show more places for rent
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {rentListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}

      {/* Render Sale Listings */}
      {saleListings && saleListings.length > 0 && (
        <div className="">
          <div className="my-3">
            <h2 className="text-2xl font-semibold text-slate-600">Recent places for sale </h2>
            <Link className="text-sm text-blue-800 hover:underline" to="/search?type=sale">
              show more places for sale
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {saleListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
    </div>
    {/* Footer */}
    <Footer />
  </div>
);
}
