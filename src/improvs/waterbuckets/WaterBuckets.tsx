import React, { useEffect, useState } from "react";
import "./WaterBuckets.css";
import Bucket from "./components/Bucket";
import Button from "./components/Button";
import {
  IBucketData,
  bucketsConfig,
  generateBuckets,
  isWaterLevelSameInEveryBucket,
} from "./bucketService";

const WaterBuckets = () => {
  const [totalWater, setTotalWater] = useState<number>(0);
  const [bucketsList, setBucketsList] = useState<Array<IBucketData>>(
    generateBuckets(bucketsConfig.TOTAL_BUCKETS)
  );

  const [isAddingWater, setIsAddingWater] = useState(false);

  useEffect(() => {
    const averageWater = totalWater / bucketsConfig.TOTAL_BUCKETS;
    const isWaterLevelSame = isWaterLevelSameInEveryBucket(
      bucketsList,
      averageWater
    );

    if (!isWaterLevelSame) {
      // mark true as we will need to distribute water
      setIsAddingWater(true);
    }
    // const maxWaterLevelInBucket = getMaximumWaterLevelInBuckets(bucketsList);
    const id = setInterval(() => {
      if (!isWaterLevelSame) {
        // const waterToDistribute = maxWaterLevelInBucket - averageWater;
        // const numUpdatesNeeded = Math.floor(waterToDistribute / 25);
        // const waterEachBucketGets =
        //   waterToDistribute / (bucketsConfig.TOTAL_BUCKETS - 1);
        // const waterDispatchRate = waterEachBucketGets / numUpdatesNeeded || 25;
        // console.log({ waterDispatchRate });

        for (let idx = 0; idx < bucketsConfig.TOTAL_BUCKETS; idx++) {
          let currentWaterLevel = bucketsList[idx].currentWaterLevel;
          if (currentWaterLevel > averageWater) {
            currentWaterLevel -= bucketsConfig.DISTRIBUTION_RATE;
            if (currentWaterLevel < averageWater) {
              currentWaterLevel = averageWater;
            }
          } else if (currentWaterLevel < averageWater) {
            currentWaterLevel += bucketsConfig.DISTRIBUTION_RATE;
            if (currentWaterLevel > averageWater) {
              currentWaterLevel = averageWater;
            }
          }

          bucketsList[idx].currentWaterLevel = currentWaterLevel;
        }

        setBucketsList([...bucketsList]);
      }

      clearInterval(id);
      setIsAddingWater(false);
    }, 1000);
  }, [bucketsList, totalWater]);

  const addWater = (idx: number) => {
    if (isAddingWater) return;
    const id = setTimeout(() => {
      const { currentWaterLevel } = bucketsList[idx];
      if (currentWaterLevel <= bucketsConfig.BUCKET_LIMIT_LITERS) {
        bucketsList[idx] = {
          ...bucketsList[idx],
          currentWaterLevel: currentWaterLevel + 200,
        };
        setBucketsList([...bucketsList]);
        setTotalWater((previousTotalWater) => previousTotalWater + 200);
      }
      clearTimeout(id);
    }, 1000);
  };

  const clearWater = (idx: number) => {
    const { currentWaterLevel } = bucketsList[idx];
    bucketsList[idx] = {
      ...bucketsList[idx],
      currentWaterLevel: 0,
    };

    setBucketsList([...bucketsList]);
    setTotalWater(
      (previousTotalWater) => previousTotalWater - currentWaterLevel
    );
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
