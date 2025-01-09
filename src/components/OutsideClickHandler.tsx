import React, { useEffect, useRef } from "react";

const OutsideClickHandler = ({ children, onOutsideClick }) => {
  const wrapperRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event:MouseEvent) => {
      // Check if click is outside the referenced element
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onOutsideClick();
      }
    };

  
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutsideClick]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideClickHandler;