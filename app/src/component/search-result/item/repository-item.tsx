import * as React from 'react';
import { RepositoryDto } from '../../../shared/models/github/RepositoryDto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RepositoryItemProps {
  repo: RepositoryDto;
}

const RepositoryItem: React.FunctionComponent<RepositoryItemProps> = ({
  repo,
}: RepositoryItemProps) => {
  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  if (repo)
    return (
      <div className="ripo-card" onClick={() => openInNewTab(repo.html_url)}>
        <div className="ripodetails">
          <h3>{repo.name}</h3>
          <p className="ripo-private">({repo.private ? 'Private' : 'Public'})</p>
          <p className="ripo-description" title={repo.description}>
            {repo.description || 'No Description'}
          </p>
        </div>
        <div className="ripo-owner">
          <img src={repo.owner.avatar_url} alt={repo.owner.name} />
          <div className="ownerdetails">
            <h3 title={repo.owner.name}>{repo.owner.name}</h3>
            <p>{repo.owner.location}</p>
          </div>
        </div>

        <div className="profile-card-inf">
          <div className="profile-card-inf__item">
            <div className="profile-card-inf__title">{repo.watchers_count}</div>
            <div className="profile-card-inf__txt">Watchers</div>
          </div>

          <div className="profile-card-inf__item">
            <div className="profile-card-inf__title">{repo.stargazers_count}</div>
            <div className="profile-card-inf__txt">Stars</div>
          </div>

          <div className="profile-card-inf__item">
            <div className="profile-card-inf__title">{repo.forks_count}</div>
            <div className="profile-card-inf__txt">Forks</div>
          </div>

          <div className="profile-card-inf__item">
            <div className="profile-card-inf__title">{repo.open_issues_count}</div>
            <div className="profile-card-inf__txt">Issues</div>
          </div>
        </div>
      </div>
    );

  return null;
};

export default RepositoryItem;
