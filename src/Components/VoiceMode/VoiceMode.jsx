/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import "./VoiceMode.css";
import ReactMarkDown from "../MarkDown/ReactMarkDown";

// speechRecogniser global variable
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

// textToSpeeh Global Variables
const utterence = new SpeechSynthesisUtterance();

export default function VoiceMode({ useEffectInvoke }) {
  const [isListening, setIsListening] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  //text speech functionality

  const callBotToSpeak = (textToSpeak) => {
    console.log(textToSpeak);
    speechSynthesis.cancel();
    utterence.text = textToSpeak;
    speechSynthesis.speak(utterence);
    console.log("botSpeaked");
  };

  // Speech to text Functionality

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();

      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped mic On Click");
      };
    }

    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setUserInput(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  //event - Handlers

  const handleInput = (e) => {
    e.preventDefault();
    setIsListening(true);
  };

  const handleResult = async (e) => {
    e.preventDefault();
    setIsListening(false);
    const response = userInput
      ? await useEffectInvoke(userInput)
      : "Dear friend Please provide me a valid Input";

    callBotToSpeak(response);

    response == "Dear friend Please provide me a valid Input"
      ? ""
      : setResponse(response);
    console.log(userInput);
  };

  const handleStop = (e) => {
    e.preventDefault();
    callBotToSpeak("");
  };

  const handleReset = (e) => {
    e.preventDefault();
    setResponse("");
    callBotToSpeak("");
    setUserInput("");
  };

  console.log(response);

  return (
    <div className={`voiceMode-container ${response ? "hide-mic" : ""}`}>
      {!response ? (
        <>
          <button onMouseDown={handleInput} onMouseUp={handleResult}>
            <FaMicrophone className="voiceMode-Mic" />
          </button>
          {!userInput ? (
            <span>Hold the Mic & Ask Your Query</span>
          ) : (
            <p>{userInput}</p>
          )}
        </>
      ) : (
        <>
        <p className="voiceMode-query">{userInput}</p>
          <ReactMarkDown message={response} />
          <div className="voiceMode-bottomIcons">
            <button title="Click to Ask a new Query" onClick={handleReset} className="voiceMode-Btn">
              <FaMicrophone /> Reset
            </button>
            <button title="Stop Bot To Speak" onClick={handleStop} className="voiceMode-Btn">
              <FaStop /> Stop
            </button>
          </div>
        </>
      )}
    </div>
  );
}
