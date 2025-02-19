import ContentCard from '@component/ContentCard/ContentCard.tsx';
import useContentList from '@/hooks/useContentList.ts';
import styles from './HomePage.module.scss';
import { NavLink } from 'react-router-dom';
import { ApiBaseResponse } from '@/types/commonApi.types.ts';
import { ContentPreview } from '@/types';
import { Helmet } from 'react-helmet-async';

function HomePage() {
  const contents: ApiBaseResponse<ContentPreview[]> = useContentList();
  if (contents.loading) {
    return <div>Loading...</div>;
  }
  if (contents.error) {
    return <div>Error: {contents.error}</div>;
  }
  return (
    <>
      <Helmet>
        <title>Nephren.xyz | Articles - Blog</title>
        <meta name="og:title" content="Nephren.xyz | Articles - Blog" />
        <meta property="og:url" content={window.location.href} />
        <meta
          name="description"
          content="Nephren.xyz | Articles - Blog maintained by github.com/richard483"
        />
        <meta
          name="og:description"
          content="This is a blog content page, you can read the article here."
        />
        <meta
          name="keywords"
          content="Article, Blogs, Blog, Artikel, Tulisan, Guide, Tutorial"
        />
        <meta name="type" content="article" />
        <meta name="og:type" content="article" />
      </Helmet>
      <div className={styles['home-page']}>
        <h1>Content List</h1>
        <ul>
          {contents.data?.map((item: ContentPreview, index: number) => (
            <NavLink key={index} to={`/${item.path}`}>
              <ContentCard
                title={item.name}
                author={item.author}
                updateDate={item.lastModified}
              />
            </NavLink>
          ))}
        </ul>
      </div>
    </>
  );
}

export default HomePage;
