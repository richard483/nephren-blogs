import ContentCard from '@/component/ContentCard/ContentCard';
import useContentList from '@/hooks/useContentList';
import './HomePage.scss';
import { NavLink } from 'react-router-dom';
import { apiBaseResponse } from '@/types/commonApi.types.ts';
import { ContentPreview } from '@/types';

function HomePage() {
  const contents: apiBaseResponse<ContentPreview[]> = useContentList();
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
            to={`https://github.com/richard483/blogs-content/tree/master/${item.path}/id.md`}
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
