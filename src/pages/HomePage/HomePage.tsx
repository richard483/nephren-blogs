import ContentCard from '@component/ContentCard/ContentCard.tsx';
import useContentList from '@/hooks/useContentList.ts';
import './HomePage.scss';
import './HomePage.tablet.scss';
import './HomePage.tablet-portrait.scss';
import './HomePage.phone.scss';
import { NavLink } from 'react-router-dom';
import { ApiBaseResponse } from '@/types/commonApi.types.ts';
import { ContentPreview } from '@/types';

function HomePage() {
  const contents: ApiBaseResponse<ContentPreview[]> = useContentList();
  if (contents.loading) {
    return <div>Loading...</div>;
  }
  if (contents.error) {
    return <div>Error: {contents.error}</div>;
  }
  return (
    <div className="home-page">
      <h1>Content List</h1>
      <ul>
        {contents.data?.map((item: ContentPreview, index: number) => (
          <NavLink
            key={index}
            to={`/${item.path}`}
          >
            <ContentCard
              title={item.name}
              author={item.author}
              updateDate={item.lastModified}
            />
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
