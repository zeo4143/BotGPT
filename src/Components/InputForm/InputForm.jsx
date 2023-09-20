/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { MdSend } from "react-icons/md";
import "./InputForm.css";

export default function InputForm({ useEffectInvoke }) {
  const [input, setInput] = useState("");

  const isButtonDisabled = input.trim().length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    
    useEffectInvoke(input);
    setInput("");
  };
  return (
    <>
      <div className="textModeForm-container">
        <form onSubmit={handleSubmit} className="textMode-form">
          <input
            className="textMode-formInput"
            type="text"
            placeholder="Type here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="textMode-formBtn"
            style={{
              backgroundColor: `${isButtonDisabled ? "#40414F" : "#19C37D"}`,
            }}
            disabled={isButtonDisabled}
          >
            <MdSend className="textMode-formBtn-icon" />
          </button>
        </form>
        
      </div>
    </>
  );
}
