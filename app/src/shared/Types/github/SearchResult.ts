import { RepositoryDto } from '../../models/github/RepositoryDto';
import { UserDto } from '../../models/github/UserDto';

export type ItemDto = UserDto | RepositoryDto;

export type SearchResult = ItemDto[] | null;
