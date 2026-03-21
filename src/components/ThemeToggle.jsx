export default function ThemeToggle({ dark, setDark }) {
  return (
    <div className="theme-toggle">
      <button className={`theme-btn${!dark ? " active" : ""}`} onClick={() => setDark(false)}>✳︎</button>
      <button className={`theme-btn${dark ? " active" : ""}`} onClick={() => setDark(true)}>◑</button>
    </div>
  );
}
