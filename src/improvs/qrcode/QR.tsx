import React, { useState } from "react";
import QRCode from "qrcode.react";
import "./QR.css";

function QR() {
  const [text, setText] = useState<string>();
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleTextChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setText(String(event.currentTarget.value));
  };

  const handleTextFocusState = (isFocused: boolean) => {
    setIsInputFocused(isFocused);
  };

  const labelStyle = {
    top: isInputFocused || text ? "30%" : "55%",
    left: isInputFocused || text ? "1px" : "10px",
    transform:
      isInputFocused || text
        ? "translateY(-100%) scale(0.8)"
        : "translateY(-50%) scale(1)",
    color: isInputFocused ? "#007bff" : "#555",
    fontSize: isInputFocused || text ? "18px" : "20px",
  };

  return (
    <div
      className={`qrcode-generator-container ${
        isInputFocused ? "input-focused" : ""
      }`}
    >
      <div className="input-container">
        <label
          className={`input-label ${isInputFocused || text ? "visible" : ""}`}
          style={labelStyle}
        >
          QRify 🎨
        </label>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          onFocus={() => handleTextFocusState(true)}
          onBlur={() => handleTextFocusState(false)}
          className="input-box"
        />
      </div>
      {text && (
        <div className="qrcode-container">
          <QRCode value={text} size={400} />
        </div>
      )}
    </div>
  );
}

export default QR;
