import React from 'react';
import { useStateSelector } from '../../redux/reducers';
import { RepositoryDto } from '../../shared/models/github/RepositoryDto';
import SearchArea from '../../shared/models/github/SearchAraea';
import { UserDto } from '../../shared/models/github/UserDto';
import RepositoryItem from './item/repository-item';
import UserItem from './item/user-item';

//export interface ResultProps {}

const SearchResult: React.FunctionComponent = () => {
  const { data, isFetching } = useStateSelector((state) => state.github);

  if (isFetching)
    return (
      <div className="searchResult loading">
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
      </div>
    );

  if (data) {
    return (
      <div className="searchResult">
        {data.map((item) =>
          item.area == SearchArea.USERS ? (
            <UserItem key={item.id} user={item as UserDto} />
          ) : (
            <RepositoryItem key={item.id} repo={item as RepositoryDto} />
          ),
        )}
      </div>
    );
  }

  return null;
};

export default SearchResult;
