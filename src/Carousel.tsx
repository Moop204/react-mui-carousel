import { Button } from "@mui/material";
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
  // padding?: number;
  innerBorderRadius?: string;
  outerBorderRadius?: string;
  outerBackgroundColor?: string;
  controlBackgroundColor?: string;
}

const Carousel: FunctionComponent<CarouselProp> = (prop) => {
  const {
    width = 300,
    height = 100,
    gap = 10,
    contents = [creepy, dancin, spooopiwer, peace, layingdown, nice],
    innerBorderRadius = "50%",
    outerBorderRadius = "0px",
    outerBackgroundColor = "none",
  } = prop;

  const boxWidth =
    (width - gap * (contents.length - 3)) / (contents.length - 2);
  const positions: number[] = [];
  const imgNum = contents.length - 2;
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
    if (p == 0 || p == contents.length - 1) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Box display="flow" width={width}>
        <Box
          position="relative"
          width={width}
          height={height}
          bgcolor={outerBackgroundColor}
          borderRadius={outerBorderRadius}
          {...prop}
        >
          {contents.map((imgSrc, idx) => {
            let posIdx = (pos + idx + contents.length) % contents.length;
            const ogIdx = posIdx;
            if (posIdx == contents.length - 1) {
              posIdx = contents.length - 3;
            } else if (posIdx != 0) {
              posIdx--;
            }
            return (
              <motion.div
                animate={{
                  x: positions[posIdx],
                  opacity: isOpaque(ogIdx) ? 1 : 0.0,
                }}
              >
                <Box
                  position="absolute"
                  height={height}
                  width={boxWidth}
                  overflow={"hidden"}
                  sx={{
                    borderRadius: innerBorderRadius,
                  }}
                >
                  <img src={imgSrc} alt="fireSpot" height="100%" width="100%" />
                </Box>
              </motion.div>
            );
          })}
        </Box>
        <Box
          width={"100%"}
          sx={{
            // width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: prop.paddingLeft ? prop.paddingLeft : prop.padding,
            paddingRight: prop.paddingLeft ? prop.paddingRight : prop.padding,
          }}
        >
          <LeftRotate onClick={rotateLeft} />
          <RightRotate onClick={rotateRight} />
        </Box>
      </Box>
    </>
  );
};

export { Carousel };
