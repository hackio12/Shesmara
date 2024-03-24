import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    setSidebardata({
      type: typeFromUrl || 'all',
      parking: parkingFromUrl === 'true',
      furnished: furnishedFromUrl === 'true',
      offer: offerFromUrl === 'true',
      sort: sortFromUrl || 'created_at',
      order: orderFromUrl || 'desc',
    });

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'sort_order') {
      const [sort, order] = value.split('_');
      setSidebardata({ ...sidebardata, sort, order });
    } else {
      const type = e.target.type;
      const checked = e.target.checked;
      if (type === 'checkbox') {
        setSidebardata({ ...sidebardata, [id]: checked });
      }
    }
  };

  const applyFilters = () => {
    const urlParams = new URLSearchParams();
    Object.entries(sidebardata).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        urlParams.set(key, value.toString());
      } else {
        urlParams.set(key, value);
      }
    });
    navigate(`/search?${urlParams.toString()}`);
  };

  const clearFilters = () => {
    setSidebardata({
      type: 'all',
      parking: false,
      furnished: false,
      offer: false,
      sort: 'created_at',
      order: 'desc',
    });
  
    // Navigate to search page with default parameters
    navigate('/search');
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className='flex flex-col md:flex-row'>
          <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
              <div className='flex flex-col gap-8'>
                  <div className='flex gap-2 flex-wrap items-center'>
                      <label className='font-semibold'>Type:</label>
                      {/* Add your type filter checkboxes */}
                      <div className='flex gap-2'>
                          <input
                              type='checkbox'
                              id='all'
                              className='w-5'
                              onChange={handleChange}
                              checked={sidebardata.type === 'all'} />
                          <span>Rent & Sale</span>
                      </div>
                      <div className='flex gap-2'>
                          <input
                              type='checkbox'
                              id='rent'
                              className='w-5'
                              onChange={handleChange}
                              checked={sidebardata.type === 'rent'} />
                          <span>Rent</span>
                      </div>
                      <div className='flex gap-2'>
                          <input
                              type='checkbox'
                              id='sale'
                              className='w-5'
                              onChange={handleChange}
                              checked={sidebardata.type === 'sale'} />
                          <span>Sale</span>
                      </div>
                      <div className='flex gap-2'>
                          <input
                              type='checkbox'
                              id='offer'
                              className='w-5'
                              onChange={handleChange}
                              checked={sidebardata.offer} />
                          <span>Offer</span>
                      </div>
                  </div>
                  <div className='flex gap-2 flex-wrap items-center'>
                      <label className='font-semibold'>Amenities:</label>
                      {/* Add your amenities filter checkboxes */}
                      <div className='flex gap-2'>
                          <input
                              type='checkbox'
                              id='parking'
                              className='w-5'
                              onChange={handleChange}
                              checked={sidebardata.parking} />
                          <span>Parking</span>
                      </div>
                      <div className='flex gap-2'>
                          <input
                              type='checkbox'
                              id='furnished'
                              className='w-5'
                              onChange={handleChange}
                              checked={sidebardata.furnished} />
                          <span>Furnished</span>
                      </div>
                  </div>
                  <div className='flex items-center gap-2'>
                <label className='font-semibold'>Sort:</label>
                <select
                    onChange={handleChange}
                    defaultValue={'createdAt_desc'}
                    id='sort_order'
                    className='border rounded-lg p-3'
                >
                    <option value='regularPrice_desc'>Price high to low</option>
                    <option value='regularPrice_asc'>Price low to high</option>
                    <option value='createdAt_desc'>Latest</option>
                    <option value='createdAt_asc'>Oldest</option>
                </select>
                </div>

              <div className='flex justify-between gap-4'>
                  <button
                      onClick={clearFilters}
                      className='bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-95'
                  >
                      Clear Filters
                  </button>
                  <button
                      onClick={applyFilters}
                      className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
                  >
                      Apply Filters
                  </button>
              </div>
          </div>
      </div><div className='flex-1'>
              {/* Listing results */}
              <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
                  Listing results:
              </h1>
              <div className='p-7 flex flex-wrap gap-4'>
                  {!loading && listings.length === 0 && (
                      <p className='text-xl text-slate-700'>No listing found!</p>
                  )}
                  {loading && (
                      <p className='text-xl text-slate-700 text-center w-full'>
                          Loading...
                      </p>
                  )}

                  {!loading &&
                      listings &&
                      listings.map((listing) => (
                          <ListingItem key={listing._id} listing={listing} />
                      ))}

                  {showMore && (
                      <button
                          onClick={onShowMoreClick}
                          className='text-green-700 hover:underline p-7 text-center w-full'
                      >
                          Show more
                      </button>
                  )}
              </div>
          </div><div
              className='fixed bottom-10 right-10 bg-white p-3 rounded-full cursor-pointer shadow-lg'
              onClick={toggleFilter}
          >
              <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-slate-700'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
              >
                  <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4 6h16M4 12h16m-7 6h7' />
              </svg>
          </div>
          {isFilterOpen && (
  <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
    <div className='bg-white p-7 rounded-lg'>
      <div className='flex flex-col gap-4'>
        {/* Type filter */}
        <label className='font-semibold'>Type:</label>
        <div className='flex gap-2 items-center'>
          <input
            type='checkbox'
            id='rent'
            checked={sidebardata.type === 'rent'}
            onChange={handleChange}
          />
          <label htmlFor='rent'>Rent</label>
        </div>
        <div className='flex gap-2 items-center'>
          <input
            type='checkbox'
            id='sale'
            checked={sidebardata.type === 'sale'}
            onChange={handleChange}
          />
          <label htmlFor='sale'>Sale</label>
        </div>

        {/* Amenities filter */}
        <label className='font-semibold'>Amenities:</label>
        <div className='flex gap-2 items-center'>
          <input
            type='checkbox'
            id='parking'
            checked={sidebardata.parking}
            onChange={handleChange}
          />
          <label htmlFor='parking'>Parking</label>
        </div>
        <div className='flex gap-2 items-center'>
          <input
            type='checkbox'
            id='furnished'
            checked={sidebardata.furnished}
            onChange={handleChange}
          />
          <label htmlFor='furnished'>Furnished</label>
        </div>

        {/* Sort options */}
        <label className='font-semibold'>Sort:</label>
        <select
          id='sort_order'
          onChange={handleChange}
          defaultValue={`${sidebardata.sort}_${sidebardata.order}`}
        >
          <option value='regularPrice_desc'>Price high to low</option>
          <option value='regularPrice_asc'>Price low to high</option>
          <option value='createdAt_desc'>Latest</option>
          <option value='createdAt_asc'>Oldest</option>
        </select>

        {/* Apply and Clear buttons */}
        <div className='flex justify-between'>
          <button
            onClick={applyFilters}
            className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
          >
            Apply Filters
          </button>
          <button
            onClick={clearFilters}
            className='bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-95'
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  </div>
      )}
    </div>
  );
}
