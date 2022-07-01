import React from "react";
import LoadingIcon from "../../assets/imgs/Loading Icon.svg";
import "./style.scss";
function index({show = false}) {
  return (
    <div className={`container-div ${show? "": "d-none"}`}>
      <div className="over">
        <div className="wrapper">
          <img src={LoadingIcon} alt="" />
          <p>Withdraw...</p>
        </div>
      </div>
    </div>
  );
}

export default index;
