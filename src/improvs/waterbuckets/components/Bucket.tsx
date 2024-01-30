import React from "react";
import "./Bucket.css"; // Import the CSS file for styling

export interface IBucketProps {
  waterLevel: number;
  maxCapacity: number;
}

const Bucket = ({ waterLevel, maxCapacity }: IBucketProps) => {
  const clampedWaterLevel = Math.min(waterLevel, maxCapacity);
  const waterLevelScaled = `${(clampedWaterLevel / 2) * 100}`;
  return (
    <>
      <div className="water-label">{`${waterLevelScaled}L`}</div>
      <div className="bucket">
        <div className="handle"></div>
        <div
          className="water"
          style={{ height: `${clampedWaterLevel * 20}px` }}
        ></div>
      </div>
    </>
  );
};

export default Bucket;
