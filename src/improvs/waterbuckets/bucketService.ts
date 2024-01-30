export interface IBucketData {
  bucketLimit: number;
  currentWaterLevel: number;
}

export const bucketsConfig = {
  BUCKET_LIMIT_LITERS: 1000,
  TOTAL_BUCKETS: 4,
  DISTRIBUTION_RATE: 25,
};

export const generateBuckets = (numBuckets: number) => {
  const buckets: Array<IBucketData> = Array.from(
    { length: numBuckets },
    () => ({
      bucketLimit: bucketsConfig.BUCKET_LIMIT_LITERS,
      currentWaterLevel: 0,
    })
  );

  return buckets;
};

export const getMaximumWaterLevelInBuckets = (buckets: Array<IBucketData>) => {
  return buckets.reduce((acc, current) => {
    return Math.max(acc, current.currentWaterLevel);
  }, 0);
};

export const isWaterLevelSameInEveryBucket = (
  buckets: Array<IBucketData>,
  averageWater: number
) => {
  return buckets.every((bucket) => bucket.currentWaterLevel === averageWater);
};
