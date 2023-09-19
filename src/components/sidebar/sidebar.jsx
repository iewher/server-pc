import React, { useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";

export default function Sidebar({ onClick }) {
  const [state, setState] = useState(false);
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setState(!state);
  };

  const handleActive = () => {
    setActive(!active);
    onClick(active);
  };

  return (
    <div className="sidebar">
      <button onClick={handleClick}>
        CMDB <AiOutlineArrowDown height={"10px"} width={"10px"} />
      </button>
      <p className={state ? "text-active" : "text"} onClick={handleActive}>
        Серверы и пк
      </p>
    </div>
  );
}
