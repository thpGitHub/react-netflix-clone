import {useState, useEffect} from "react";

export default function useDimension() {
  const [dimension, setDimension] = useState();

  useEffect(() => {
    window.onresize = resizeFunc;

    function resizeFunc() {
      /**
       * "window.screen.width" because "window.innerWidth" on mobile device
       *  can return a width more great of destop
       */
      setDimension(window.screen.width);
    }

    resizeFunc();

    /**
     * Clean up function
     */
    return () => {
      window.onresize = resizeFunc;
      /**
       * Another way we can use
       * window.addEventListener("resize", resizeFunc);
       */
    };
  }, []);

  return dimension;
}
