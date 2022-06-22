import React from "react";
import Main from "./Main";
import { useLayout } from "../../../components/Layout/context/layoutContext";
import "./style.scss";
import { useMediaQuery } from "react-responsive";
import { Modal } from "react-bootstrap";

export default function Login() {

  const { loginModalShow, setLoginModalShow } = useLayout();
  const isDesktopOrTablet = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <Modal
      show={loginModalShow}
      onHide={() => setLoginModalShow(false)}
      centered
    >
      <Main />
    </Modal>
  );
}
