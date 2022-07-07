export const getStats = async () =>
  await fetch("https://wegotrip.com/api/v2/stats/plot").then((res) =>
    res.json()
  );
