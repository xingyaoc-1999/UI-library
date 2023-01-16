import RoughWrap from "../roughWrap";
import styles from "./index.module.scss";
import image from "../../assets/images/image.jpg";

import { useEffect, useMemo, useRef, useState } from "react";

export const FallFlow = () => {
  const getData = async () => {
    return { data: Array(4).fill(null) };
  };

  const [data, setData] = useState(Array(0));
  const [refArray, setRefArray] = useState(Array(0));

  let num = 1;

  const elRef = useRef<HTMLDivElement>(null!);

  const elObserver = useMemo(() => {
    return new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry.isIntersecting, entry);

        if (entry.isIntersecting) {
          setData([1, 2, 3]);
          elObserver.unobserve(elRef.current);
        }
      });
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (data.length === 0) {
        const response = await getData();
        const resMap = response.data.map((v, i) => {
          if (i === data.length - 1) return [v, elRef];
          return [v, null];
        });
        setRefArray(resMap);
      }

      // refArray.length !== 0 && elObserver.observe(elRef.current);
    })();
    // return () => elObserver.disconnect();
  }, [data.length]);

  useEffect(() => {
    console.log(2);
    const res = data.map((v, i) => {
      if (i === data.length - 1) return [v, elRef];
      return [v, null];
    });
    setRefArray((pre) => [...pre, ...res]);
  }, [data]);

  return (
    <>
      <RoughWrap
        className={styles.main}
        customElement="div"
        contentClassName={styles.content}
      >
        {refArray.map((v: any, i: number) => {
          return (
            <div
              ref={elRef}
              key={(Date.now() - i * 2).toString(16)}
            >
              <small
                className={` flex justify-center items-center ${styles.small}`}
              >
                {num++}
              </small>
              <img
                className={styles.image}
                src={image}
                alt=""
              />
              <span className={styles.text}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
            </div>
          );
        })}
      </RoughWrap>
    </>
  );
};
