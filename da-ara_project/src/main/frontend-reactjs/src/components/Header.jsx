// Header.jsx
import SideBar from "../pages/Menu/SideBar";
import styled from "styled-components";
import { HiMiniSpeakerXMark } from "react-icons/hi2";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import "../assets/fonts/fonts.css";

const Container = styled.div`
  min-width: 360px;
  position: fixed;
  z-index: 50;
  width: 100%;
  background-color: #152552;
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
  color: white;
  font-family: "BagleFatOne";
  align-items: center;
`;
const Header = ({ toggleVoice, isVoiceEnabled }) => {
  return (
    <>
      <Container>
        <SideBar />
        <Button onClick={toggleVoice}>
          {isVoiceEnabled ? (
            <HiMiniSpeakerXMark size="40" color="#fff" />
          ) : (
            <HiMiniSpeakerWave size="40" color="#fff" />
          )}
        </Button>

        <Title>DA-ARA</Title>
      </Container>
    </>
  );
};

export default Header;
