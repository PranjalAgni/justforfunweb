import React from "react";
import "./Bucket.css"; // Import the CSS file for styling

export interface IBucketProps {
  waterLevel: number;
  maxCapacity: number;
}

const Bucket = ({ waterLevel, maxCapacity }: IBucketProps) => {
  const clampedWaterLevel = Math.min(waterLevel, maxCapacity);
  return (
    <>
      <div className="water-label">{`${clampedWaterLevel.toFixed(2)}L`}</div>
      <div className="bucket">
        <div className="handle"></div>
        <div
          className="water"
          style={{ height: `${clampedWaterLevel * 0.2}px` }}
        ></div>
      </div>
    </>
  );
};

export default Bucket;
