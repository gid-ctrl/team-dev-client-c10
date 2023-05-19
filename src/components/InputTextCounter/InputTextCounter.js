import { useState } from "react";

function InputTextCounter() {
  const [val, setVal] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (e) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/);
    const wordCount = words.length;

    if (wordCount <= 300) {
      setVal(text);
      setWordCount(wordCount);
    } else {
      alert("You can only type 300 words");
    }
  };

  return (
    <div>
      <textarea
        placeholder="Tell us about yourself, your professional and educational highlights to date..."
        spellCheck="false"
        value={val}
        onChange={handleChange}
      ></textarea>
      <small>{wordCount}/300</small>
    </div>
  );
}
export default InputTextCounter;
