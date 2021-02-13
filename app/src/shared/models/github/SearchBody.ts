import SearchArea from './SearchAraea';

export class SearchBody {
  searchText: string;
  searchArea: SearchArea;
  constructor(searchText: string, searchArea: SearchArea) {
    this.searchText = searchText;
    this.searchArea = searchArea;
  }
}
