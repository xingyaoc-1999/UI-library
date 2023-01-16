import { useEffect, useState } from "react";

export const useDataSource = (getResourceFunc: () => Promise<any>) => {
  const [resource, setResource] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getResourceFunc();
      setResource(response.data);
    })();
  }, [getResourceFunc]);

  return resource;
};
