import Navbar from "./Components/Navbar";
import "./App.css";
import { useState } from "react";
import VoiceMode from "./Components/VoiceMode/VoiceMode";
import TextMode from "./Components/TextMode/TextMode";
import InputForm from "./Components/InputForm/InputForm";
import GetResponse from "./Hooks/GetResponse";
// import CopyRights from "./Components/CopyRights";

export default function App() {
  const [changeModeToVoice, setchangeModeToVoice] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello How may i assist you",
      sender: "ChatGPT",
    },
  ]);

  const { generateResponse } = GetResponse()

  
  const useEffectInvoke = async (input) => {
    const newMessage = {
      message: input,
      sender: "User",
    };

    const newMessages = [...messages, newMessage]; //all the old messages, + the new messages

    //update our message state and empty the input
    setMessages(newMessages);

    //set atyping indicator
    // setTyping(true)

    //process message to chatGpt and get response
    const response = await generateResponse(newMessages);
    setMessages([
      ...newMessages,
      {
        message: response,
        sender: "ChatGPT",
      },
    ]);

    console.log(messages);

    return response;
  };

  return (
    <div className="container">
      <Navbar
        changeModeToVoice={changeModeToVoice}
        setchangeModeToVoice={setchangeModeToVoice}
      />
      {!changeModeToVoice ? (
        <>
          <TextMode   messages={messages} />
          <InputForm  useEffectInvoke = {useEffectInvoke}/>
        </>
      ) : (
        <VoiceMode useEffectInvoke={useEffectInvoke} />
      )}
      {/* <CopyRights/> */}
    </div>
  );
}


