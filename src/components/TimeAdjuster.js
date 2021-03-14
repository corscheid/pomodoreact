export default function TimeAdjuster({ type, length, onChange }) {
  return (
    <div className="TimeAdjuster">
      <h2 id={`${type.toLowerCase()}-label`}>{type} Length</h2>

      <div className="control-group">
        <button
          id={`${type.toLowerCase()}-decrement`}
          className="btn"
          onClick={onChange}
          value="-"
        >
          <i className="fas fa-arrow-down"></i>
        </button>

        <div id={`${type.toLowerCase()}-length`}>{length}</div>

        <button
          id={`${type.toLowerCase()}-increment`}
          className="btn"
          onClick={onChange}
          value="+"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      </div>
    </div>
  );
}