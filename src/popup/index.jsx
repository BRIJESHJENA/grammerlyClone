import { useEffect, useState } from "react";
import { analyzeText } from "../api";
import "../popup/index.css";

const Popup = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("Type Something");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (text) => {
    const result = await analyzeText(text);

    if (result && result.suggestions) {
      setSuggestions(result.suggestions);
      setLoading(false);
    } else {
      setError("No Suggestions");
      setLoading(false);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (text === "" && text.length < 3) {
      setError("Type Something");
      setLoading(false);
    }
  }, [text]);

  const onChange = (e) => {
    setText(e.target.value);
    setLoading(true);
    handleAnalyze(e.target.value);
  };

  const applySuggestion = (original, suggestion) => {
    setText(suggestion);
    setSuggestions(suggestions.filter((sug) => sug.original !== original));
  };

  return (
    <div className="popup">
      <div className="textArea">
        <h2>Text </h2>
        <textarea
          value={text}
          onChange={(e) => onChange(e)}
          placeholder="Type text here..."
          rows="4"
        />
      </div>
      {loading && <p>loading..</p>}
      {!loading && suggestions.length > 0 && (
        <div className="suggestions">
          <h2>Text Suggestions</h2>

          {suggestions.map((sug, idx) => (
            <div key={idx} className="suggestion">
              <p>
                <strong>Original:</strong> {sug.original}
              </p>
              <p>
                <strong>Suggestion:</strong> {sug.suggestion}
              </p>
              <p>
                <em>Reason: {sug.reason}</em>
              </p>
              <button
                onClick={() => applySuggestion(sug.original, sug.suggestion)}
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      )}
      {error && !loading && suggestions.length === 0 && (
        <div>
          <div className="error">
            <p>
              <strong> {error}</strong>
            </p>
            <button
              disabled
              style={{ cursor: "unset", backgroundColor: "#8c8c8c" }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
