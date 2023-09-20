/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiMiniCheck, HiOutlineClipboard } from "react-icons/hi2";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { solarizedDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./CodeSnippet.css"

export default function CodeSnippet({ codeString, language }) {
  const [copy, setCopy] = useState(false);


  const handleCopy = () => {
    navigator.clipboard.writeText(codeString)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 3000)
  }

  return (
    <div className="codeSnippet-container">
      <div className="codeSnippet-header">
        <small>{language}</small>
        {!copy ? (
          <button title="Copy code" className="codeSnippet-button" onClick={handleCopy}>
            <HiOutlineClipboard /> copy code
          </button>
        ) : (
          <button>
            <HiMiniCheck /> copied
          </button>
        )}
      </div>
      <SyntaxHighlighter
        language={language}
        style={solarizedDark}
        customStyle={{
          backgroundColor : "black",
          padding : "1.5rem"
        }}
        PreTag="div"
       
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}
