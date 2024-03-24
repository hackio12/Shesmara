import { Link } from "react-router-dom";
import { MdLocationOn } from 'react-icons/md';
import { FaBath, FaBed } from 'react-icons/fa';

export default function ListingItem({ listing }) {
  return (
    <Link to={`/listing/${listing._id}`} className="block">
      <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[300px] h-full sm:h-[350px] mb-4 sm:mb-0 sm:mr-4">
        <div className="relative w-full h-[200px] sm:h-[150px] overflow-hidden">
          <img src={listing.imageUrls[0]} alt="listing cover" className="w-full h-full object-cover hover:scale-105 transition-scale duration-300" />
          <div className="absolute inset-0 hover:bg-black opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
        </div>
        <div className="p-3 flex flex-col justify-between h-[150px]">
          <div>
            <p className="truncate text-lg font-semibold text-slate-700">{listing.name}</p>
            <div className="flex items-center gap-1">
              <MdLocationOn className="h-4 w-4 text-green-700" />
              <p className="text-sm text-gray-600 truncate">{listing.address}</p>
            </div>
            <p className="text-sm text-gray-600 line-clamp-3">{listing.description}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-slate-500 font-semibold">
              ${' '}
              {(listing.offer && listing.discountPrice) ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice?.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <div className="flex gap-2 text-slate-700"> 
              <div className="flex items-center gap-1">
                <FaBed className="h-4 w-4 text-green-700" />
                <div className="font-bold text-sm">
                  {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <FaBath className="h-4 w-4 text-green-700" />
                <div className="font-bold text-sm">
                  {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
