import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa6";
import { useSpeechRecognition } from "react-speech-kit";
import styled from "styled-components";

const Button = styled.button`
  margin-right: 5px;
`;

const Input = styled.input`
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
`;

function requestToAPI(){
  console.log("API 실행을 시작합니다.");
  fetch('http://127.0.0.1:5000/api/data').then(function(response){
      return response.json();
  })
  .then(function(myJson){
      console.log(myJson);
      console.log(myJson['text']);
  })
}


// eslint-disable-next-line react/prop-types
const ChatInput = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <Button onMouseDown={listen} onMouseUp={stop}>
        <FaMicrophone size={35} color="#000" />
      </Button>
      {listening && <div>듣는중입니다🎧</div>}
      <Input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="질문을 입력해주세요."
      />

      <Button type="submit" onClick={requestToAPI}>
        <IoSend size={35} color="black" />
      </Button>
    </form>
  );
};

export default ChatInput;
