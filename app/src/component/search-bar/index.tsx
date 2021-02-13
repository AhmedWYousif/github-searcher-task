import * as React from 'react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import SearchArea from '../../shared/models/github/SearchAraea';
import Logo from './logo';
import { debounce } from 'lodash';
//import { useStateSelector } from '../../redux/reducers';
import { useDispatch } from 'react-redux';
import { clearSearchGithubPage, searchGithub } from '../../redux/actions/githubActions';
import { minLengthToSearch, searchDelayTime } from '../../config';
import { useStateSelector } from '../../redux/reducers';

const SearchBar: React.FunctionComponent = () => {
  const [searchText, setSearchText] = useState('');
  const [searchArea, setSearchArea] = useState(SearchArea.USERS);
  const [listOpen, setListOpen] = useState(false);
  const dispatch = useDispatch();
  const { data, message } = useStateSelector((state) => state.github);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedSearch = useCallback(
    debounce((q: string, area: SearchArea) => dispatch(searchGithub(q, area)), searchDelayTime),
    [dispatch, searchGithub, debounce, searchDelayTime],
  );

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const onChangeArea = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, area: SearchArea) => {
    e.preventDefault();
    setSearchArea(area);
    setListOpen(false);
  };

  useEffect(() => {
    if (searchText.length >= minLengthToSearch) delayedSearch(searchText, searchArea);
    else dispatch(clearSearchGithubPage.action());
  }, [searchText, searchArea, delayedSearch, dispatch]);

  return (
    <div className="search-container">
      <Logo />
      <div className="search-box">
        {/* <!--   search field   --> */}
        <div className="search-box__search-field">
          <input
            id="search-field"
            type="text"
            onChange={onChangeText}
            value={searchText}
            placeholder="Start typing to search..."
          />
        </div>

        {/* <!--   Dropdown   --> */}
        <div className="dd_with_chkb">
          <label className="toogle" htmlFor="chkb" onClick={() => setListOpen((s) => !s)}>
            {searchArea}
          </label>
          <input className="chkb" type="checkbox" id="chkb" checked={listOpen} readOnly />
          <div className="arrow-icon" onClick={() => setListOpen((s) => !s)}></div>
          {[SearchArea.USERS, SearchArea.REPOSITORIES].map((area, i) => (
            <a key={i} className="dd_a" href="#" onClick={(e) => onChangeArea(e, area)}>
              {area}
            </a>
          ))}
        </div>
      </div>
      {data?.length === 0 && <div className="search-message">No Matched Result</div>}
      {!data && message?.type == 'error' && <div className="search-message">{message?.text}</div>}
    </div>
  );
};

export default SearchBar;
