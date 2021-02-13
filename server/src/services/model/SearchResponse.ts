import { SearchResult } from '../../shared/Types/github/SearchResult';

export interface SearchResponse {
  total_count: number;
  items: SearchResult;
}
