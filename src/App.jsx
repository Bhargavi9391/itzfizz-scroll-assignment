import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const car = carRef.current;
    const trail = trailRef.current;

    const ctx = gsap.context(() => {
      const letters = lettersRef.current;

      const getCarWidth = () => car.getBoundingClientRect().width;

      const carAnimation = gsap.to(car, {
        x: () => track.clientWidth - getCarWidth()+800,

        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",

          scrub: true,
          pin: track,

          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const currentX = gsap.getProperty(car, "x");
            const carWidth = getCarWidth();

            /*
              CAR POSITION
              0 → starting point
              1 → ending point
            */
            const maxX = track.clientWidth - carWidth;

            const carProgress = Math.max(
              0,
              Math.min(1, currentX / maxX)
            );

            /*
              GREEN TRAIL
            */
            gsap.set(trail, {
              width: Math.max(
                0,
                Math.min(
                  track.clientWidth,
                  currentX + carWidth
                )
              ),
            });

            /*
              WELCOME ITZFIZZ LETTER REVEAL
              Car position decides how many letters appear
            */
            const visibleCount = Math.floor(
              carProgress * letters.length
            );

            letters.forEach((letter, index) => {
              gsap.set(letter, {
                opacity: index < visibleCount ? 1 : 0,
              });
            });
          },
        },
      });

      /*
        BOX 1
      */
      gsap.to("#box1", {
        opacity: 1,
        y: 0,

        scrollTrigger: {
          trigger: section,
          start: "10% top",
          end: "20% top",
          scrub: true,
        },
      });

      /*
        BOX 2
      */
      gsap.to("#box2", {
        opacity: 1,
        y: 0,

        scrollTrigger: {
          trigger: section,
          start: "25% top",
          end: "35% top",
          scrub: true,
        },
      });

      /*
        BOX 3
      */
      gsap.to("#box3", {
        opacity: 1,
        y: 0,

        scrollTrigger: {
          trigger: section,
          start: "40% top",
          end: "50% top",
          scrub: true,
        },
      });

      /*
        BOX 4
      */
      gsap.to("#box4", {
        opacity: 1,
        y: 0,

        scrollTrigger: {
          trigger: section,
          start: "55% top",
          end: "70% top",
          scrub: true,
        },
      });

      ScrollTrigger.refresh();

      return () => {
        carAnimation.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-x-hidden bg-[#d1d1d1]">

      {/* LONG SCROLL AREA */}
      <section
        ref={sectionRef}
        className="relative h-[300vh]"
      >

        {/* PINNED HERO */}
        <div
          ref={trackRef}
          className="relative flex h-screen w-full items-center justify-center"
        >

          {/* ROAD */}
          <div className="relative h-[200px] w-screen overflow-hidden bg-[#1e1e1e]">

            {/* GREEN TRAIL */}
            <div
              ref={trailRef}
              className="absolute left-0 top-0 z-[1] h-full bg-[#45db7d]"
              style={{
                width: "0px",
              }}
            />

            {/* WELCOME ITZFIZZ */}
            <div
              id="welcomeText"
              className="
                absolute
                left-[8%]
                top-1/2
                z-[90]
                flex
                -translate-y-1/2
                items-center
                gap-[0.15rem]
                text-[clamp(2rem,8vw,7rem)]
                font-bold
                leading-none
              "
            >
              {"WELCOME ITZFIZZ".split("").map((char, index) => (
                <span
                  key={index}
                  ref={(element) => {
                    lettersRef.current[index] = element;
                  }}
                  className="text-black opacity-0"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>

            {/* CAR */}
            <img
              ref={carRef}
              src="https://paraschaturvedi.github.io/car-scroll-animation/McLaren%20720S%202022%20top%20view.png"
              alt="McLaren 720S"
              className="
                absolute
                left-0
                top-0
                z-[10]
                h-[200px]
                w-auto
                max-w-none
                object-contain
              "
            />
          </div>

          {/* 58% */}
          <div
            id="box1"
            className="
              absolute
              right-[30%]
              top-[5%]
              z-[20]
              w-[380px]
              rounded-xl
              bg-[#def54f]
              px-8
              py-6
              text-black
              opacity-0
            "
          >
            <div className="text-6xl font-semibold">
              58%
            </div>

            <div className="mt-2 text-lg">
              Increase in pick up point use
            </div>
          </div>

          {/* 23% */}
          <div
            id="box2"
            className="
              absolute
              bottom-[5%]
              right-[35%]
              z-[20]
              w-[380px]
              rounded-xl
              bg-[#6ac9ff]
              px-8
              py-6
              text-black
              opacity-0
            "
          >
            <div className="text-6xl font-semibold">
              23%
            </div>

            <div className="mt-2 text-lg">
              Decreased in customer phone calls
            </div>
          </div>

          {/* 27% */}
          <div
            id="box3"
            className="
              absolute
              right-[10%]
              top-[5%]
              z-[20]
              w-[380px]
              rounded-xl
              bg-[#333333]
              px-8
              py-6
              text-white
              opacity-0
            "
          >
            <div className="text-6xl font-semibold">
              27%
            </div>

            <div className="mt-2 text-lg">
              Increase in pick up point use
            </div>
          </div>

          {/* 40% */}
          <div
            id="box4"
            className="
              absolute
              bottom-[5%]
              right-[12.5%]
              z-[20]
              w-[380px]
              rounded-xl
              bg-[#fa7328]
              px-8
              py-6
              text-black
              opacity-0
            "
          >
            <div className="text-6xl font-semibold">
              40%
            </div>

            <div className="mt-2 text-lg">
              Decreased in customer phone calls
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default App;