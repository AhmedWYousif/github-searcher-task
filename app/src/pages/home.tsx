import React from 'react';
import SearchBar from '../component/search-bar';
import SearchResult from '../component/search-result';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
  return (
    <div className="wrapper">
      {/* SearchBar */}
      <SearchBar />
      {/* Result */}
      <SearchResult />
    </div>
  );
};

export default Home;
