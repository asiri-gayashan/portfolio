export default function FakePhone({ bg, label, index }) {
  const colors = ["#1a6aff","#ff3d6a","#00c37a","#ff9500","#9b59b6","#00bcd4"];
  const c = colors[index % colors.length];
  return (
    <div style={{
      background: bg,
      borderRadius: 32,
      width: "100%",
      aspectRatio: "9/19.5",
      position: "relative",
      overflow: "hidden",
      border: "1px solid #2a2a2a",
      flexShrink: 0,
    }}>
      {/* status bar */}
      <div style={{ display:"flex", justifyContent:"space-between", padding:"12px 20px 0", fontSize:10, color:"#fff", opacity:0.7 }}>
        <span>9:41</span>
        <div style={{display:"flex",gap:4,alignItems:"center"}}>
          <span>▲▲▲</span><span>WiFi</span><span>■</span>
        </div>
      </div>
      {/* fake chart area */}
      <div style={{ margin:"24px 16px 0", height:120, position:"relative" }}>
        <svg width="100%" height="100%" viewBox="0 0 200 80" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke={c}
            strokeWidth="1.5"
            points="0,60 20,55 40,62 60,45 80,50 100,35 120,40 140,28 160,32 180,20 200,15"
          />
          <defs>
            <linearGradient id={`g${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={c} stopOpacity="0.3"/>
              <stop offset="100%" stopColor={c} stopOpacity="0"/>
            </linearGradient>
          </defs>
          <polygon
            fill={`url(#g${index})`}
            points="0,80 0,60 20,55 40,62 60,45 80,50 100,35 120,40 140,28 160,32 180,20 200,15 200,80"
          />
        </svg>
      </div>
      {/* label rows */}
      <div style={{ padding:"16px 16px 0" }}>
        {[1,2,3].map(r => (
          <div key={r} style={{ display:"flex", justifyContent:"space-between", marginBottom:10, alignItems:"center" }}>
            <div style={{ height:8, background:"#333", borderRadius:4, width:`${55 + r*10}%` }}/>
            <div style={{ height:8, background:"#2a2a2a", borderRadius:4, width:"20%" }}/>
          </div>
        ))}
      </div>
      {/* label overlay */}
      <div style={{
        position:"absolute", bottom:20, left:0, right:0, textAlign:"center",
        fontSize:10, color:"rgba(255,255,255,0.3)", fontFamily:"inherit",
      }}>{label}</div>
    </div>
  );
}
