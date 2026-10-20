import "../../styles/brands.css";

const PARTNERS = [
  "Sana Caterers",
  "Royal Decor Studio",
  "Prime Sound & Light",
  "City Florists",
  "Grand Valet Co.",
];

export default function Brands() {
  return (
    <section className="brands">
      <div className="container brands__row">
        {PARTNERS.map((name) => (
          <span className="brands__logo" key={name}>
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
