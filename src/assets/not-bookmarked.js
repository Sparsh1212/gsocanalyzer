import React from "react";

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="36.687"
      fill="#000"
      version="1.1"
      viewBox="0 0 26 36.687"
      className={props.className}
      onClick={props.onClick}
    >
      <path
        strokeWidth="0.893"
        d="M.813 0C.336.072-.007.408 0 .797v35.085c-.004.287.188.552.496.695.309.146.692.146 1.004.003L13 31.223l11.5 5.357c.313.143.695.143 1.004-.003.309-.143.5-.408.496-.695V.797C26 .358 25.55 0 25 0H.813zM2 1.595h22v32.892l-10.5-4.884a1.217 1.217 0 00-1 0L2 34.487z"
      ></path>
    </svg>
  );
}

export default Icon;
