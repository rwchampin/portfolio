// useBaseEffect.js
import { useEffect, useRef } from 'react';

const useBaseEffect = () => {
  const baseRef = useRef(null);

  useEffect(() => {
    // Base effect initialization logic
    console.log('Base effect initialized');

    // Cleanup logic
    return () => {
      console.log('Base effect cleanup');
    };
  }, []);

  return { baseRef };
};

export default useBaseEffect;
