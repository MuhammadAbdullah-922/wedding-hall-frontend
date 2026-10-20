import "../../styles/insights.css";

const POSTS = [
  {
    title: "5 Tips for a Flawless Baraat Night",
    excerpt: "Timing, lighting and entrance ideas that keep guests talking.",
    img: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Choosing the Right Hall Size",
    excerpt: "How guest count should shape your booking decision.",
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "The Ultimate Wedding Day Checklist",
    excerpt: "From vendor bookings to the final send-off, nothing missed.",
    img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Seasonal Menus Guests Love",
    excerpt: "Building a catering menu that fits the season and the crowd.",
    img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=500&q=80",
  },
];

export default function Insights() {
  return (
    <section className="section insights">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Helpful Insights</span>
          <h2 className="section__title">Ideas for Planning Your Day</h2>
        </div>

        <div className="insights__grid">
          {POSTS.map((post) => (
            <article className="insight-card" key={post.title}>
              <div className="insight-card__media">
                <img src={post.img} alt={post.title} />
              </div>
              <h3 className="insight-card__title">{post.title}</h3>
              <p className="insight-card__excerpt">{post.excerpt}</p>
            </article>
          ))}
        </div>

      
      </div>
    </section>
  );
}
