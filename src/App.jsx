import { useState } from "react";
import BioSection from "./components/BioSection";
import SelectedWork from "./components/SelectedWork";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import DetailPanel from "./components/DetailPanel";
import ThemeToggle from "./components/ThemeToggle";
import { MOCK_SCREENS } from "./data/portfolioData";
import "./styles/global.css";

export default function App() {
  const [dark, setDark] = useState(false);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  function openPanel(item) {
    setSelected(item);
    setOpen(true);
  }

  function closePanel() {
    setOpen(false);
    setTimeout(() => setSelected(null), 560);
  }

  const screens = selected ? (MOCK_SCREENS[selected.imgKey] || []) : [];

  return (
    <div className={`site${open ? " panel-open" : ""}`} data-dark={dark.toString()}>
      {/* ── LEFT PANE ── */}
      <div className="left-pane">
        <div className="container">

          <BioSection />
          <SelectedWork openPanel={openPanel} />
          <Experience openPanel={openPanel} />

          <Footer />
        </div>
      </div>

      {/* ── DETAIL PANEL ── */}
      {/* ── DETAIL PANEL ── */}
      <DetailPanel
        open={open}
        selected={selected}
        closePanel={closePanel}
        screens={screens}
      />

      {/* ── THEME TOGGLE ── */}
      {/* ── THEME TOGGLE ── */}
      <ThemeToggle dark={dark} setDark={setDark} />
    </div>
  );
}
