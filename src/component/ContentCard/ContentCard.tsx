import './ContentCard.scss';
import './ContentCard.tablet.scss';
import './ContentCard.tablet-portrait.scss';
import './ContentCard.phone.scss';

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
        </div>
      </div>
    </>
  );
}

export default ContentCard;
