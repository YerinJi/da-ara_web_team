import { useState, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import axios from "axios";

const ChatWindow = ({ isVoiceEnabled }) => {
  const [messages, setMassages] = useState([]);
  const inputElem = useRef(null);
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/daara")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addMessage = (message, isUser) => {
    setMassages((prevMessages) => [...prevMessages, { text: message, isUser }]);
  };

  function speak(text) {
    if (isVoiceEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ko-KR"; //말하는 언어
      utterance.rate = 1; //말하는 속도
      speechSynthesis.speak(utterance);
    }
  }

  const handleSubmit = async (message) => {
    //사용자 메시지를 추가합니다.
    addMessage(message, true);
    if (inputElem.current) {
      inputElem.current.focus();
    }

    try {
      console.log("API 실행을 시작합니다.");
      fetch("http://127.0.0.1:5000/api/data")
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          console.log(myJson);
          console.log(myJson["text"]);
          localStorage.setItem("text", myJson["text"]);
          speak(myJson["text"]);
        });
      addMessage(localStorage.getItem("text"), false);
    } catch (error) {
      console.error("Error fetching GPT response:", error);
    }
  };

  return (
    <div className="chat-window">
      <video
        autoPlay
        loop
        muted
        width="100%"
        height="280px"
        className="chat-character"
        poster={`/spinnerImg.png`}
      >
        <source src="/video/newchar1.mp4" type="video/mp4" />
      </video>
      {data && data[0] ? (
          <>
            <form action="saveChatRecord" method="post" style={{ width: "100%" }}>
              <input name="cUser" style={{ display: "none" }}>{`${data[0]}`}</input>
              <div className="chat-messages">
                {messages.map((message, index) => (
                  <ChatMessage
                    key={index}
                    message={message.text}
                    isUser={message.isUser}
                  />
                ))}
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="chat-messages">
                {messages.map((message, index) => (
                  <ChatMessage
                    key={index}
                    message={message.text}
                    isUser={message.isUser}
                  />
                ))}
            </div>
          </>
        )
      }

      

      <ChatInput onSubmit={handleSubmit} />
    </div>
  );
};

export default ChatWindow;
