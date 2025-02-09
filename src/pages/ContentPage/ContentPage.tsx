import './ContentPage.scss';
import { ApiBaseResponse } from '@/types/commonApi.types.ts';
import useArticleData from '../../hooks/useArticleData';
import Markdown from 'react-markdown';
import { NavLink, useParams } from 'react-router-dom';
import { denormalizedPath } from '../../util';
import { fetchModifyData } from '../../services/githubApi';
import { GithubAuthorDetail } from '../../types';
import { useEffect, useState } from 'react';

function ContentPage() {
  const { article } = useParams();
  const [authorDetail, setAuthorDetail] = useState<{ lastModified: string; author: string; author_detail: GithubAuthorDetail }>();
  const contents: ApiBaseResponse<string> = useArticleData(article as string);
  const title = denormalizedPath(article as string).split(' - ').slice(1).join(': ');

  useEffect(() => {
    fetchModifyData(`blogs/${article as string}`).then((data: { lastModified: string; author: string; author_detail: GithubAuthorDetail }) => {
      setAuthorDetail(data);
    }).catch((error: unknown) => {
      if (error instanceof Error) {
        console.error('#ContentPage error on fetch modify data - ', error.message);
        return;
      }
      console.error('#ContentPage error on fetch modify data - ', error);
    });
  }, [article])



  if (contents.loading) {
    return <div>Loading...</div>;
  }
  if (contents.error) {
    return <div>Error: {contents.error}</div>;
  }
  return (
    <div className='content-wrapper'>
      <h1>{title}</h1>
      <NavLink className="author-info" to={`https://github.com/${authorDetail?.author_detail.login}`}>
        <div className='author-info-content'>
          <img className='author-info-img' src={authorDetail?.author_detail.avatar_url} alt={authorDetail?.author} />
          <span id='divider' />
          <div className='author-info-detail'>
            <span>Author: {authorDetail?.author}</span>
            <span>Last updated: {authorDetail?.lastModified}</span>
          </div>
        </div>
      </NavLink>
      <hr />
      <div className="content-page">
        <Markdown>{contents.data}</Markdown>
      </div >
    </div>

  );
}

export default ContentPage;
