import { useState } from "react";
import { works } from "../data/portfolioData";

export default function SelectedWork({ openPanel }) {
  const [activeTab, setActiveTab] = useState("development");
  const filteredWorks = works.filter(w => w.category === activeTab);

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title" style={{ marginBottom: 0 }}>Selected work</h2>
        <div className="work-tabs">
          <button 
            className={`tab-btn ${activeTab === 'development' ? 'active' : ''}`}
            onClick={() => setActiveTab('development')}
          >
            Development
          </button>
          <button 
            className={`tab-btn ${activeTab === 'graphic-design' ? 'active' : ''}`}
            onClick={() => setActiveTab('graphic-design')}
          >
            Designing 
          </button>
        </div>
      </div>
      <ul className="work-list">
        {filteredWorks.map((w, i) => (
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
