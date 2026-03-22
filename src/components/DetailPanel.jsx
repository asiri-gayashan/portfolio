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
