import React from "react";
import Main from "./Main";
import { useLayout } from "../../../components/Layout/context/layoutContext";
import "./style.scss";
import { useMediaQuery } from "react-responsive";
import { Modal } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function Register() {

  const { registerModalShow, setRegisterModalShow } = useLayout();
  const isDesktopOrTablet = useMediaQuery({ query: "(min-width: 768px)" });
  const searchParams = useQuery();
  const promoCode = searchParams.get("promo");
  if (promoCode && promoCode.length > 0) {
    setRegisterModalShow(true);
  }
  return (
    <Modal
      show={registerModalShow}
      onHide={() => setRegisterModalShow(false)}
      centered
    >
      <Main promoCode={promoCode} />
    </Modal>
  );
}
