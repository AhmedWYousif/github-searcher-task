/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import SearchArea from './SearchAraea';
import { UserDto } from './UserDto';

export class RepositoryDto {
  id: number;
  name: string;
  description: string;
  private: boolean;
  url: string;
  html_url: string;
  type: string;
  location?: string;
  owner: UserDto;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;

  area: string = SearchArea.REPOSITORIES;

  constructor(obj: any) {
    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.private = obj.private;
    this.type = obj.type;
    this.url = obj.url;
    this.html_url = obj.html_url;
    this.location = obj.location;
    this.owner = obj.owner;
    this.stargazers_count = obj.stargazers_count;
    this.watchers_count = obj.watchers_count;
    this.forks_count = obj.forks_count;
    this.open_issues_count = obj.open_issues_count;
  }
}
