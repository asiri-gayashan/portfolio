import { experience } from "../data/portfolioData";

export default function Experience({ openPanel }) {
  return (
    <section className="section">
      <h2 className="section-title">Experience</h2>
      <ul className="exp-list">
        {experience.map((e, i) => (
          <li key={i} className="exp-item" onClick={() => openPanel(e)}>
            <div className="exp-company">{e.company}</div>
            <div className="exp-row">
              <div className="exp-role">{e.role}</div>
              <div className="exp-years">{e.years}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
