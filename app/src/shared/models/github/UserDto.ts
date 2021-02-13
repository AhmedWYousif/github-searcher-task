import SearchArea from './SearchAraea';

export class UserDto {
  id: number;
  name: string;
  avatar_url: string;
  url: string;
  html_url: string;
  type: string;
  location?: string;

  area: string = SearchArea.USERS;
  constructor(obj: any) {
    this.id = obj.id;
    this.name = obj.name || obj.login;
    this.avatar_url = obj.avatar_url;
    this.url = obj.url;
    this.html_url = obj.html_url;
    this.type = obj.type;
    this.location = obj.location;
  }
}
