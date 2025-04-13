import styles from './ContentPage.module.scss';
import { ApiBaseResponse } from '@/types/commonApi.types.ts';
import useArticleData from '../../hooks/useArticleData';
import Markdown from 'react-markdown';
import { NavLink, useParams } from 'react-router-dom';
import { denormalizedPath, extractKeywordFromTitle } from '../../util';
import { fetchModifyData } from '../../services/githubApi';
import { GithubAuthorDetail } from '../../types';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import remarkGfm from 'remark-gfm';

function ContentPage() {
  const { article } = useParams();
  const [authorDetail, setAuthorDetail] = useState<{
    lastModified: string;
    author: string;
    author_detail: GithubAuthorDetail;
  }>();
  const contents: ApiBaseResponse<string> = useArticleData(article as string);
  const title = denormalizedPath(article as string)
    .split(' - ')
    .slice(1)
    .join(': ');

  useEffect(() => {
    fetchModifyData(`blogs/${article as string}`)
      .then(
        (data: {
          lastModified: string;
          author: string;
          author_detail: GithubAuthorDetail;
        }) => {
          setAuthorDetail(data);
        },
      )
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.error(
            '#ContentPage error on fetch modify data - ',
            error.message,
          );
          return;
        }
        console.error('#ContentPage error on fetch modify data - ', error);
      });
  }, [article]);
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta property="og:url" content={window.location.href} />
        <meta
          name="description"
          content={
            title +
            ', ' +
            'written by ' +
            (authorDetail?.author_detail.login as string) +
            ' last updated at ' +
            (authorDetail?.lastModified as string)
          }
        />
        <meta
          name="og:description"
          content={
            title +
            ', ' +
            'written by ' +
            (authorDetail?.author_detail.login as string) +
            ' last updated at ' +
            (authorDetail?.lastModified as string)
          }
        />
        <meta name="keywords" content={extractKeywordFromTitle(title)} />
        <meta name="type" content="article" />
        <meta name="og:type" content="article" />
        <meta
          name="article:author"
          content={
            'https://github.com/' +
            (authorDetail?.author_detail.login as string)
          }
        />
        <meta
          name="article:publisher"
          content={
            'https://github.com/' +
            (authorDetail?.author_detail.login as string)
          }
        />
      </Helmet>
      {contents.loading && <div>Loading...</div>}
      {contents.error && <div>Error: {contents.error}</div>}
      <div className={styles['content-wrapper']}>
        <h1>{title}</h1>
        <NavLink
          className={styles['author-info']}
          to={`https://github.com/${authorDetail?.author_detail.login}`}
        >
          <div className={styles['author-info-content']}>
            <img
              className={styles['author-info-img']}
              src={authorDetail?.author_detail.avatar_url}
              alt={authorDetail?.author}
            />
            <span className={styles.divider} />
            <div className={styles['author-info-detail']}>
              <span>Author: {authorDetail?.author}</span>
              <span>Last updated: {authorDetail?.lastModified}</span>
            </div>
          </div>
        </NavLink>
        <hr />
        <div className={styles['content-page']}>
          <Markdown remarkPlugins={[remarkGfm]}>{contents.data}</Markdown>
        </div>
      </div>
    </>
  );
}

export default ContentPage;
