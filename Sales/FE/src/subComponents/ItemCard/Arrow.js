import React , { forwardRef, useRef }from "react";

import { VisibilityContext } from "react-horizontal-scrolling-menu";
import arrow from "../../assests/arrow.png"
import './arrowsOnBottomOrTop.css'


const Arrow = forwardRef(({children,
  disabled,
  onClick} , ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        userSelect: "none",
        backgroundColor:'white',
        border:'none'
      }}
    >
      {children}
    </button>
  );
})



export function LeftArrow() {
  const ref = useRef(null);
  const {
    isFirstItemVisible,
    scrollPrev,
    visibleItemsWithoutSeparators,
    initComplete
  } = React.useContext(VisibilityContext);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={() => scroll(-20)}>
      <img src={arrow} alt='icon' style={{width:'60px' , height:'60px'}}/>
    </Arrow>
  );
}

export function RightArrow() {
  const ref = useRef(null);
  const {
    isLastItemVisible,
    scrollNext,
    visibleItemsWithoutSeparators
  } = React.useContext(VisibilityContext);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  // console.log({ isLastItemVisible });
  const [disabled, setDisabled] = React.useState(
    !visibleItemsWithoutSeparators.length && isLastItemVisible
  );
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow ref={ref} disabled={disabled} onClick={() => scrollNext()}>
       <img src={arrow} alt='icon' style={{width:'60px' , height:'60px'}} className="rightArrow"/>
    </Arrow>
  );
}
