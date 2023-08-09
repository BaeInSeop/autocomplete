import React, { useEffect } from "react";
import "./Avatar.css";
import { calcBorderRadius } from "./CommonUtil";

const Skeleton = ({ size, round }) => {
  return (
    <div
      className="skeleton"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: calcBorderRadius(round),
      }}
    >
      <div className="skeleton-progress"></div>
    </div>
  );
};

export default Skeleton;
