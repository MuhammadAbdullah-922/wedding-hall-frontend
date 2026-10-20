import "../../styles/pageHeader.css";

export default function PageHeader({ title, image, imageAlt }) {
  return (
    <section className="page-header">
      <div className="page-header__media">
        <img src={image} alt={imageAlt || ""} />
        <div className="page-header__overlay" />
      </div>

      <div className="container page-header__content">
        <div className="page-header__ornament" aria-hidden="true">
          <span className="page-header__line" />
          <span className="page-header__diamond" />
        </div>
        <h1 className="page-header__title">{title}</h1>
        <div className="page-header__ornament" aria-hidden="true">
          <span className="page-header__diamond" />
          <span className="page-header__line" />
        </div>
      </div>
    </section>
  );
}
