import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "../carousel.css";
import { Button } from "./Button";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import { arrowLeftIcon, arrowRightIcon } from "./svg.jsx";


const data = [
  {
    id: 1,
    image: "./phone-001.png",
  },
  {
    id: 2,
    image: "./phone-002.png",
  },
  {
    id: 3,
    image: "./phone-003.png",
  },
  {
    id: 4,
    image: "./phone-004.png",
  },
  {
    id: 5,
    image: "./phone-005.png",
  },
  {
    id: 6,
    image: "./phone-006.png",
  },
];

export function Carousel() {
  const options = {
    containScroll: false,
    loop: true,
  };
  const plugins = [
    Fade(),
    Autoplay({ delay: 1400, stopOnInteraction: true }),
    // emblaCarouselAutoplay, // optional if you're customizing autoplay behavior
  ];
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect(); // initialize on mount
  }, [emblaApi, onSelect]);

  return (
    <div className="embla bg-slate-50 max-w-xl relative" ref={emblaRef}>
      <div className="embla__container">
        {data.map((item) => (
          <div key={item.id} className="embla__slide relative">
            <img className="w-full h-screen" src={item.image} alt="images" />
          </div>
        ))}
      </div>
      <div className="absolute z-20 flex items-center justify-center w-full h-full top-[28%]">
        <div>
          <Button />
        </div>
      </div>
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`size-2 rounded-full ${
              index === selectedIndex ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      <div className="absolute z-30 flex gap-2 bottom-4 right-10">
        <button
          onClick={scrollPrev}
        >
        <span>{arrowLeftIcon}</span>
        </button>

        <button
          onClick={scrollNext}
        >
        <span>{arrowRightIcon}</span>
        </button>
      </div>
    </div>
  );
}



