import './ContentCard.scss';

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
    <>
      <div className="wrapper">
        <h2 className="title">{title}</h2>
        <div className="content">
          <dl className="detail">
            <small className="detail-item">Authored by {author}</small>
            <small className="detail-item">Last updated {updateDate}</small>
          </dl>
          <button className="btn">Get started</button>
        </div>
      </div>
    </>
  );
}

export default ContentCard;
