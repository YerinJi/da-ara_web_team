// Header.jsx
import SideBar from "../pages/Menu/SideBar";
import styled from "styled-components";
import { GiSpeakerOff } from "react-icons/gi";
import { GiSpeaker } from "react-icons/gi";

const Container = styled.div`
  min-width: 360px;
  position: fixed;
  z-index: 50;
  width: 100%;
  background-color: white;
  top: 0;
  padding: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
`;
const Button = styled.button`
  position: absolute;
  border: 0;
  background-color: transparent;
  float: left;
  cursor: pointer;
  left: 60px;
`;
const Title = styled.h1`
  text-align: center;
`;

const Header = ({ toggleVoice, isVoiceEnabled }) => {
  return (
    <Container>
      <SideBar />
      <Button onClick={toggleVoice}>
        {isVoiceEnabled ? (
          <GiSpeakerOff size="40" color="#000" />
        ) : (
          <GiSpeaker size="40" color="#000" />
        )}
      </Button>
      <Title>DA-ARA</Title>
    </Container>
  );
};

export default Header;
