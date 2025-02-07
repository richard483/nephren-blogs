import ContentCard from '@/component/ContentCard/ContentCard';
import useContentList from '@/hooks/useContentList';
import './HomePage.scss';

function HomePage() {
  const contents = useContentList();
  if (contents.loading) {
    return <div>Loading...</div>;
  }
  if (contents.error) {
    return <div>Error: {contents.error.message}</div>;
  }
  return (
    <div className="home-page">
      <h1>Content List</h1>
      <ul>
        {contents.data?.map((item: any, index: number) => (
          <ContentCard
            key={index}
            title={item.name}
            author={item.author}
            updateDate={item.lastModified}
          />
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
