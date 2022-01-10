import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import { Box, BoxTypeMap } from "@mui/system";
import { motion } from "framer-motion";
import { FunctionComponent, MouseEventHandler, useState } from "react";
import { LeftRotate, RightRotate } from "./Controls";
import creepy from "./media/creepy.png";
import dancin from "./media/dancin.png";
import layingdown from "./media/layingdown.png";
import nice from "./media/nice.png";
import peace from "./media/peace.png";
import spooopiwer from "./media/spooopiwer.png";

interface CarouselProp extends DefaultComponentProps<BoxTypeMap<{}, "div">> {
  height: number;
  width: number;
  gap: number;
  contents: string[];
  innerBorderRadius?: string;
  controlBackgroundColor?: string;
  show?: number;
  inverseIndicator?: boolean;
}

/**
 * Indicates which part of the gallery is currently selected
 * @param pos Position of current index
 * @param total Total number of positions available
 * @returns
 */
const generateIndicator = (pos: number, total: number, inverse?: boolean) => {
  let res = "";
  for (let i = 0; i < total; i++) {
    if (i == pos) {
      res += inverse ? "◯" : "⬤";
    } else {
      res += inverse ? "⬤" : "◯";
    }
  }
  return res;
};

/**
 * Calculates how many images are hidden
 */
const hiddenImages = (total: number, requested?: number) => {
  if (requested) {
    return total - requested;
  } else {
    return 2;
  }
};

interface InnerImageProp {
  height: number;
  width: number;
  position: number;
  opacity: number;
  imgSrc: string;
  innerBorderRadius: string;
}

/**
 * Individual images in gallery
 */
const InnerImage: FunctionComponent<InnerImageProp> = ({
  height,
  width,
  position,
  opacity,
  imgSrc,
  innerBorderRadius,
}) => {
  return (
    <motion.div
      animate={{
        x: position,
        opacity: opacity,
      }}
    >
      <Box
        position="absolute"
        height={height}
        width={width}
        overflow={"hidden"}
        sx={{
          borderRadius: innerBorderRadius,
        }}
      >
        <img src={imgSrc} alt="fireSpot" height="100%" width="100%" />
      </Box>
    </motion.div>
  );
};

/**
 * Image gallery component
 */
const Carousel: FunctionComponent<CarouselProp> = (prop) => {
  const {
    width = 300,
    height = 100,
    gap = 10,
    contents = [creepy, dancin, spooopiwer, peace, layingdown, nice],
    innerBorderRadius = "50%",
    show,
    inverseIndicator,
  } = prop;

  const hidden = hiddenImages(contents.length, show);

  const boxWidth =
    (width - gap * (contents.length - 1 - hidden)) / (contents.length - hidden);
  const positions: number[] = [];
  const imgNum = contents.length - hidden;
  for (let i = 0; i < imgNum; i++) {
    positions.push((boxWidth + gap) * i);
  }
  const [pos, setPos] = useState(0);

  const rotateRight = () => {
    setPos((pos + 1 + contents.length) % contents.length);
  };

  const rotateLeft = () => {
    setPos((pos - 1 + contents.length) % contents.length);
  };

  const isOpaque = (p: number) => {
    if (p == 0 || p >= contents.length - (hidden - 1)) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Box display="flow" width={width}>
        <Box position="relative" width={width} height={height} {...prop}>
          {contents.map((imgSrc, idx) => {
            let posIdx = (pos + idx + contents.length) % contents.length;
            const ogIdx = posIdx;
            if (posIdx != 0) {
              posIdx--;
            }
            if (posIdx >= positions.length) {
              posIdx = positions.length - 1;
            }
            return (
              <InnerImage
                height={height}
                width={boxWidth}
                position={positions[posIdx]}
                imgSrc={imgSrc}
                innerBorderRadius={innerBorderRadius}
                opacity={isOpaque(ogIdx) ? 1 : 0.0}
              />
            );
          })}
        </Box>
        <Box
          width={"100%"}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: prop.paddingLeft ? prop.paddingLeft : prop.padding,
            paddingRight: prop.paddingLeft ? prop.paddingRight : prop.padding,
          }}
        >
          <LeftRotate onClick={rotateLeft} />
          {generateIndicator(pos, contents.length, inverseIndicator)}
          <RightRotate onClick={rotateRight} />
        </Box>
      </Box>
    </>
  );
};

export { Carousel };
