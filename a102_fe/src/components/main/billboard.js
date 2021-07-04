import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
} from "reactstrap";
import Usertotal from "./usertotal";
import Userrank from "./userrank";
// import Banner from "./banner";


function Billboard(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const items = [
    {
      id: 1,
      component: <Usertotal />,
    },
    {
      id: 2,
      component: <Userrank />,
    },
    // {
    //   id: 3,
    //   component: <Banner />,
    // },
  ];

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  // const goToIndex = (newIndex) => {
  //   if (animating) return;
  //   setActiveIndex(newIndex);
  // };

  const slides = items.map((item, index) => {
    return (
      <CarouselItem
        className="custom-tag col p-0"
        tag="div"
        key={item.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        {item.component}
      </CarouselItem>
    );
  });

  return (
    <Carousel
      className="billboard col p-0"
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      {/* <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      /> */}
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}

export default Billboard;