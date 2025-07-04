import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap tracking-tighter leading-[0.8] m-0">
      <motion.div
        className="text-[64px] font-semibold uppercase flex whitespace-nowrap  font-serif font-sofia-pro "
        style={{ x }}
      >
        <span className="block mr-[30px]">{children}</span>
        <span className="block mr-[30px]">{children}</span>
        <span className="block mr-[30px]">{children}</span>
        <span className="block mr-[30px]">{children}</span>
      </motion.div>
    </div>
  );
}

export default function Scroll() {
  return (
    <section className="pt-[10vh] pb-[0.5vh] relative font-sans bg-black text-white">
      <ParallaxText baseVelocity={-5}>Express Youself</ParallaxText>
      <ParallaxText baseVelocity={5}>Through Talking</ParallaxText>
    </section>
  );
}


