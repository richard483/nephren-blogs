import './HeroSection.scss';
import './HeroSection.tablet.scss';
import './HeroSection.tablet-portrait.scss';
import './HeroSection.phone.scss';

function HeroSection() {
  return (
    <>
      <div className="content-wrapper">
        <span id="box-grey" />
        <span id="box-blue" />
        <h1 className="title">RICHARD WILLIAM Blogs</h1>
        <div className="items"></div>
        <div className="sub-content">
          <span className="sub-content-desc">Yes, I code</span>
          <div className="sub-content-nephren">
            <span className="sub-content-nephren-bar-code">nephren</span>
            <span className="sub-content-nephren-desc">nephren</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
