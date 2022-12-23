function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="38"
      version="1.1"
      viewBox="0 0 26 38"
      className={props.className}
      onClick={props.onClick}
    >
      <path
        fill="#f44336"
        d="M26 38l-13-6-13 6V4c0-2.2 1.8-4 4-4h18c2.2 0 4 1.8 4 4z"
      ></path>
    </svg>
  );
}

export default Icon;
