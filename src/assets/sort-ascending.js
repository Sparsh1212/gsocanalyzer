import React from "react";

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 16 16"
      className={props.className}
      onClick={props.onClick}
    >
      <path
        style={{
          lineHeight: "normal",
          WebkitTextIndent: "0",
          textIndent: "0",
          WebkitTextAlign: "start",
          textAlign: "start",
          WebkitTextDecorationLine: "none",
          textDecorationLine: "none",
          WebkitTextDecorationStyle: "solid",
          textDecorationStyle: "solid",
          WebkitTextDecorationColor: "#000",
          textDecorationColor: "#000",
          WebkitTextTransform: "none",
          textTransform: "none",
          blockProgression: "tb",
          isolation: "auto",
          mixBlendMode: "normal",
        }}
        fill="#fff"
        d="M1 1v1h1V1H1zm10 1v9.043L8.729 8.771l-.708.708 3.479 3.478 3.479-3.478-.708-.708L12 11.043V2h-1zM1 3v1h2V3H1zm0 2v1h3V5H1zm0 2v1h4V7H1zm0 2v1h5V9H1zm0 2v1h6v-1H1zm0 2v1h7v-1H1z"
      ></path>
    </svg>
  );
}

export default Icon;
