"use client";

import {
  Animation,
  Animator,
  batch,
  Fade,
  FadeIn,
  Move,
  MoveIn,
  MoveOut,
  ScrollContainer,
  ScrollPage,
  Sticky,
  StickyIn,
  ZoomIn,
} from "@/components/react-scroll-motion";

function ScrollMotion() {
  const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
  const FadeUp = batch(Fade(), Move(), Sticky());

  const Spin = (cycle: number, direction: "in" | "out" | "both" = "both") =>
    ({
      in:
        direction === "in" || direction === "both"
          ? { style: { transform: (p: number) => `rotate(${p * 360 * cycle}deg)` } }
          : {},
      out:
        direction === "out" || direction === "both"
          ? { style: { transform: (p: number) => `rotate(${p * 360 * cycle}deg)` } }
          : {},
    }) as Animation;

  return (
    <div className="text-white-2">
      <ScrollContainer>
        <ScrollPage>
          <Animator animation={batch(Sticky(), Fade(), Spin(1, "out"))}>
            <h3 className="text-5xl">Hello</h3>
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
            <span className="text-3xl">Scroll to move this line</span>
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <Animator animation={ZoomInScrollOut}>
            <span className="text-4xl">Zoom, then fade</span>
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <Animator animation={FadeUp}>
            <span className="text-4xl">Fade up</span>
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <div className="flex h-full items-center justify-center text-center text-3xl">
            <span>
              <Animator animation={MoveIn(-1000, 0)}>Hello</Animator>
              <Animator animation={MoveIn(1000, 0)}>Nice to meet you</Animator>
              <Animator animation={MoveOut(1000, 0)}>Good bye</Animator>
              <Animator animation={MoveOut(-1000, 0)}>See you</Animator>
            </span>
          </div>
        </ScrollPage>
        <ScrollPage>
          <Animator animation={batch(Fade(), Sticky())}>
            <span className="text-4xl">Done</span>
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </div>
  );
}

export { ScrollMotion };
export default ScrollMotion;
