import './ContentPage.scss';
import { ApiBaseResponse } from '@/types/commonApi.types.ts';
import useArticleData from '../../hooks/useArticleData';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';

function ContentPage() {
  const { article } = useParams();
  const contents: ApiBaseResponse<string> = useArticleData(article as string);
  if (contents.loading) {
    return <div>Loading...</div>;
  }
  if (contents.error) {
    return <div>Error: {contents.error}</div>;
  }
  return (
    <div className="home-page">
      <Markdown>{contents.data}</Markdown>
    </div>
  );
}

export default ContentPage;
