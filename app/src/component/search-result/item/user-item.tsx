import * as React from 'react';
import { UserDto } from '../../../shared/models/github/UserDto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserItemProps {
  user: UserDto;
}

const UserItem: React.FunctionComponent<UserItemProps> = ({ user }: UserItemProps) => {
  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  if (user)
    return (
      <div className="card" onClick={() => openInNewTab(user.html_url)}>
        <img src={user.avatar_url} alt={user.name} />
        <h1 title={user.name}>{user.name}</h1>
        <h2>{user.type}</h2>
        <h2>{user.location}</h2>
      </div>
    );

  return null;
};

export default UserItem;
