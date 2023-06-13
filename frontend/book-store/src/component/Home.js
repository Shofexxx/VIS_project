import React from 'react';
import SearchComponent from './SearchComponent';

const Home = () => {
  return (
   
      <div>
      <div className="container mx-auto py-8">
      <SearchComponent />
        
        <h2 className="text-xl font-bold mb-4">Top Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-bold mb-2">Book 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-bold mb-2">Book 2</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-bold mb-2">Book 3</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Home;
