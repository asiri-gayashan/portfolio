import { works } from "../data/portfolioData";

export default function SelectedWork({ openPanel }) {
  return (
    <section className="section">
      <h2 className="section-title">Selected work</h2>
      <ul className="work-list">
        {works.map((w, i) => (
          <li key={i} className="work-item" onClick={() => openPanel(w)}>
            <div className="work-left">
              <div className="work-title">{w.title}</div>
              <div className="work-sub">{w.company} - {w.desc}</div>
            </div>
            <div className={`work-icon ${w.iconClass}`}>
              <span>{w.iconText}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
