import './Main.css';

export function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <span className="loading-text">Loading...</span>
    </div>
  );
}
