export default function GetResponse() {
  
  const generateResponse = async (messages) => {
    
    const apiMessages = messages.map((modifiedMessage) =>
      modifiedMessage.sender === "ChatGPT"
        ? { role: "assistant", content: modifiedMessage.message }
        : { role: "user", content: modifiedMessage.message }
    );

    const systemMessage = {
      role: "system",
      content: "explain to  a college student",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    }).then((data) => data.json());

    return response.choices[0].message.content;
  };

  return { generateResponse };
}

const API_KEY = "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";
