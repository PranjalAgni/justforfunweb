import React, { useEffect, useState } from "react";
import "./WaterBuckets.css";
import Bucket from "./components/Bucket";
import Button from "./components/Button";
import {
  IBucketData,
  bucketsConfig,
  generateBuckets,
  getTotalWater,
  isWaterLevelSameInEveryBucket,
} from "./bucketService";

const MAX_BUCKETS = 4;

const WaterBuckets = () => {
  const [bucketsList, setBucketsList] = useState<Array<IBucketData>>(
    generateBuckets(MAX_BUCKETS)
  );

  useEffect(() => {
    const id = setInterval(() => {
      const totalWater = getTotalWater(bucketsList);
      const averageWater = totalWater / MAX_BUCKETS;
      const isWaterLevelSame = isWaterLevelSameInEveryBucket(
        bucketsList,
        averageWater
      );

      if (!isWaterLevelSame) {
        for (let idx = 0; idx < MAX_BUCKETS; idx++) {
          let currentWaterLevel = bucketsList[idx].currentWaterLevel;
          if (currentWaterLevel > averageWater) {
            currentWaterLevel -= 0.25;
            if (currentWaterLevel < averageWater) {
              currentWaterLevel = averageWater;
            }
          } else if (currentWaterLevel < averageWater) {
            currentWaterLevel += 0.25;
            if (currentWaterLevel > averageWater) {
              currentWaterLevel = averageWater;
            }
          }

          bucketsList[idx].currentWaterLevel = currentWaterLevel;
        }

        setBucketsList([...bucketsList]);
      }

      clearInterval(id);
    }, 1000);
  }, [bucketsList]);

  const addWater = (idx: number) => {
    const id = setTimeout(() => {
      const { currentWaterLevel } = bucketsList[idx];
      if (currentWaterLevel <= bucketsConfig.BUCKET_LIMIT_LITERS) {
        bucketsList[idx] = {
          ...bucketsList[idx],
          currentWaterLevel: currentWaterLevel + 2,
        };
        setBucketsList([...bucketsList]);
      }
      clearTimeout(id);
    }, 1000);
  };

  const clearWater = (idx: number) => {
    bucketsList[idx] = {
      ...bucketsList[idx],
      currentWaterLevel: 0,
    };

    setBucketsList([...bucketsList]);
  };

  return (
    <div className="container">
      <div className="heading-container">
        <h2 className="styled-heading">Water Buckets Challenge 🐬</h2>
      </div>
      <div className="buckets-container">
        {bucketsList.map((_bucket, idx) => (
          <div key={`bucket-${idx}`} className="bucket-separator">
            <Bucket
              waterLevel={bucketsList[idx].currentWaterLevel}
              maxCapacity={bucketsList[idx].bucketLimit}
            />
            <div>
              <Button
                key={`button-${idx}`}
                className="button-top-margin"
                onClick={() => addWater(idx)}
              >
                Add
              </Button>
            </div>
            <div>
              <Button
                key={`button-${idx}`}
                className="button-top-margin"
                color="red"
                onClick={() => clearWater(idx)}
              >
                Empty
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaterBuckets;
