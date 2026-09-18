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
      
    </section>
  );
}
