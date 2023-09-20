/* eslint-disable react/prop-types */
import "./TextMode.css"
import ReactMarkDown from "../MarkDown/ReactMarkDown";

export default function TextMode({messages}) {
  return (
    <div className="textMode-container">
          <div className="textMode-messagesContainer">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`textMode-messages-${message.sender}`}
              >
                <div className="textMode-messages">
                  {message.sender === "User" ? (
                    <p>{message.message}</p>
                  ) : (
                    <ReactMarkDown message={message.message}/>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* <TextMode useEffectInvoke={useEffectInvoke} /> */}
        </div>
  )
}


