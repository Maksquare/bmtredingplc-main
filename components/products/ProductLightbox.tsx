"use client";

import React from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

interface SlideItem {
  src: string;
  alt: string;
  title: string;
}

interface ProductLightboxProps {
  open: boolean;
  close: () => void;
  index: number;
  onIndexChange: (index: number) => void;
  slides: SlideItem[];
}

export function ProductLightbox({
  open,
  close,
  index,
  onIndexChange,
  slides,
}: ProductLightboxProps) {
  return (
    <Lightbox
      open={open}
      close={close}
      index={index}
      on={{
        view: ({ index: nextIdx }) => onIndexChange(nextIdx),
      }}
      slides={slides}
      plugins={[Zoom, Thumbnails, Fullscreen, Counter]}
      zoom={{
        maxZoomPixelRatio: 3.5,
        zoomInMultiplier: 1.6,
        doubleTapDelay: 250,
        doubleClickDelay: 250,
        doubleClickMaxStops: 2,
        keyboardMoveDistance: 50,
        wheelZoomDistanceFactor: 100,
        pinchZoomDistanceFactor: 100,
        scrollToZoom: true,
      }}
      thumbnails={{
        position: "bottom",
        width: 96,
        height: 68,
        border: 2,
        borderRadius: 10,
        padding: 4,
        gap: 10,
      }}
      counter={{
        container: {
          style: {
            top: "16px",
            left: "16px",
            bottom: "unset",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.02em",
          },
        },
      }}
      styles={{
        container: {
          backgroundColor: "rgba(11, 20, 17, 0.96)",
          backdropFilter: "blur(12px)",
        },
        thumbnailsContainer: {
          backgroundColor: "rgba(11, 20, 17, 0.92)",
        },
      }}
    />
  );
}
