import FakePhone from "./FakePhone";

export default function DetailPanel({ open, selected, closePanel, screens }) {
  return (
    <div className={`detail-panel${open ? " open" : ""}`}>
      {/* text column — click anywhere to close */}
      <div className="panel-text" onClick={closePanel}>
        {selected && (
          <div style={{ maxWidth: 440, width: '100%', margin: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
              <div className={`panel-icon ${selected.iconClass || "icon-savr"}`} style={{ marginBottom: 0 }}>
                {selected.iconText || "◈"}
              </div>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6, cursor: 'pointer' }}>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <h2 className="panel-heading">{selected.heading}</h2>
            <div className="panel-body">
              {(selected.body || []).map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        )}
      </div>

      {/* images column — scrolls normally, doesn't close panel */}
      <div className="panel-images">
        {screens.map((s, i) => (
          <FakePhone key={i} bg={s.bg} label={s.label} index={i} />
        ))}
      </div>
    </div>
  );
}
