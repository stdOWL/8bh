import React from "react";
import LoadingIcon from "../../assets/imgs/Loading Icon.svg";
import "./style.scss";
import { useSelector } from "react-redux";
export default function Loader() {
  const { loadingState } = useSelector(({ general }) => ({
    loadingState: general.loadingState,
  }));

  return (loadingState && 
    <div className={`container-div`}>
      <div className="over">
        <div className="wrapper">
          <img src={LoadingIcon} alt="" />
          <p>{loadingState}...</p>
        </div>
      </div>
    </div>
  );
}

