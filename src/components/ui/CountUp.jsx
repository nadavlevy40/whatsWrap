import { useEffect, useState } from 'react';
import { animate } from 'framer-motion';

export default function CountUp({ to, duration = 2 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, to, {
      duration: duration,
      ease: "easeOut",
      onUpdate: (value) => setCount(Math.round(value)),
    });
    return controls.stop;
  }, [to, duration]);

  return <span>{count.toLocaleString()}</span>;
}