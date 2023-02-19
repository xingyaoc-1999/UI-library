export const asyncPoo = async (
  poolLimit: number,
  array: Array<unknown>,
  iteratorFn: Function
) => {
  const pool: Promise<unknown>[] = [];
  const executing: Promise<unknown>[] = [];
  for (let item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    pool.push(p);
    if (poolLimit <= array.length) {
      const e: any = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length > poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(pool);
};
