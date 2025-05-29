declare module "react-hubspot-form" {
  import { ComponentType, ReactNode } from "react";

  interface HubspotFormProps {
    portalId: string;
    formId: string;
    onReady?: () => void;
    onSubmit?: (data?: any) => void;
    onFormSubmitted?: (data?: any) => void;
    loading?: ReactNode;
    loadingSpinnerProps?: any;
    region?: string;
    target?: string;
    [key: string]: any;
  }

  const HubspotForm: ComponentType<HubspotFormProps>;
  export default HubspotForm;
}

declare module "react-slick" {
  import { ComponentType, ReactNode } from "react";

  interface SlickSettings {
    accessibility?: boolean;
    adaptiveHeight?: boolean;
    afterChange?: (index: number) => void;
    appendDots?: (dots: ReactNode) => ReactNode;
    arrows?: boolean;
    asNavFor?: any;
    autoplay?: boolean;
    autoplaySpeed?: number;
    beforeChange?: (current: number, next: number) => void;
    centerMode?: boolean;
    centerPadding?: string;
    className?: string;
    cssEase?: string;
    customPaging?: (index: number) => ReactNode;
    dots?: boolean;
    dotsClass?: string;
    draggable?: boolean;
    easing?: string;
    edgeFriction?: number;
    fade?: boolean;
    focusOnSelect?: boolean;
    infinite?: boolean;
    initialSlide?: number;
    lazyLoad?: "ondemand" | "progressive";
    nextArrow?: ReactNode;
    onEdge?: (direction: string) => void;
    onInit?: () => void;
    onLazyLoadError?: (error: any) => void;
    onReInit?: () => void;
    onSwipe?: (direction: string) => void;
    pauseOnDotsHover?: boolean;
    pauseOnFocus?: boolean;
    pauseOnHover?: boolean;
    prevArrow?: ReactNode;
    ref?: (slider: any) => void;
    respondTo?: "window" | "slider" | "min";
    responsive?: Array<{
      breakpoint: number;
      settings: SlickSettings;
    }>;
    rows?: number;
    rtl?: boolean;
    slide?: string;
    slidesPerRow?: number;
    slidesToScroll?: number;
    slidesToShow?: number;
    speed?: number;
    swipe?: boolean;
    swipeToSlide?: boolean;
    touchMove?: boolean;
    touchThreshold?: number;
    useCSS?: boolean;
    useTransform?: boolean;
    variableWidth?: boolean;
    vertical?: boolean;
    verticalSwiping?: boolean;
    waitForAnimate?: boolean;
    children?: ReactNode;
  }

  const Slider: ComponentType<SlickSettings>;
  export default Slider;
}

declare module "slick-carousel/slick/slick.css" {
  const css: string;
  export default css;
}

declare module "slick-carousel/slick/slick-theme.css" {
  const css: string;
  export default css;
}

declare module "react-facebook";
declare module "html-react-parser";

// Declaraciones para archivos CSS/SCSS
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.sass" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { [key: string]: string };
  export default classes;
}
