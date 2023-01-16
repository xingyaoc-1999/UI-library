import axios from "axios";
import React, { useEffect, useState } from "react";

const capitalize = (str: string) => str.charAt(0) + str.slice(1);

export const withEditableResource = (
  Component: React.FC,
  resourcePath: string,
  resourceName: string
) => {
  return (props: JSX.IntrinsicAttributes) => {
    const [originalData, setOriginalData] = useState(null!);
    const [data, setData] = useState<object>({});
    useEffect(() => {
      (async () => {
        const response = await axios.get(resourcePath);
        setOriginalData(response.data);
        setData(response.data);
      })();
    }, []);

    const onChange = (changes: React.SetStateAction<object>) => {
      setData({ ...data, ...changes });
    };
    const onSave = async () => {
      const response = await axios.post(resourcePath, { [resourceName]: data });
      setOriginalData(response.data);
      setData(response.data);
    };
    const onReset = () => {
      setData(originalData);
    };
    const resourceProps = {
      [resourceName]: data,
      [`onChange${capitalize(resourceName)}`]: onChange,
      [`onSave${capitalize(resourceName)}`]: onSave,
      [`onReset${capitalize(resourceName)}`]: onReset,
    };
    return <Component {...props} {...resourceProps} />;
  };
};
