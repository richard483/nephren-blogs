import styles from './ContentCard.module.scss';

function ContentCard({
  title,
  author,
  updateDate,
}: {
  title: string;
  author: string;
  updateDate: string;
}) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>
        <dl className={styles.detail}>
          <small className={styles['detail-item']}>Authored by {author}</small>
          <small
            className={`${styles['detail-item']} ${styles['content-updated']}`}
          >
            Last updated {updateDate}
          </small>
        </dl>
      </div>
    </div>
  );
}

export default ContentCard;
