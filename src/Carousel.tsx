import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { motion } from "framer-motion";
import { FunctionComponent, useState } from "react";
import creepy from "./media/creepy.png";
import dancin from "./media/dancin.png";
import layingdown from "./media/layingdown.png";
import nice from "./media/nice.png";
import peace from "./media/peace.png";
import spooopiwer from "./media/spooopiwer.png";

interface CarouselProp {
  height: number;
  width: number;
  gap: number;
  padding: number;
  contents: string[];
}

const Carousel: FunctionComponent<CarouselProp> = (
  {
    width = 300,
    height = 100,
    gap = 10,
    contents = [creepy, dancin, spooopiwer, peace, layingdown, nice],
    padding = 4,
  },
  prop
) => {
  const boxWidth =
    (width - gap * (contents.length - 3)) / (contents.length - 2);
  const positions: number[] = [];
  const imgNum = contents.length - 2;
  for (let i = 0; i < imgNum; i++) {
    // if (i == 0) {
    //   positions.push(0);
    //   continue;
    // }
    // if (i == imgNum - 1) {
    //   positions.push(imgNum - 2);
    //   continue;
    // }

    positions.push((boxWidth + gap) * i);
  }

  const [pos, setPos] = useState(0);
  // const [leftHide, setLeftHide] = useState(0);
  // const [rightHide, setRightHide] = useState(contents.length - 1);
  const limit = (boxWidth + gap) * contents.length;

  const rotateRight = () => {
    const change = boxWidth + gap;
    setPos((pos + 1 + contents.length) % contents.length);
  };

  const rotateLeft = () => {
    setPos((pos - 1 + contents.length) % contents.length);
  };

  console.log(positions);
  console.log(pos);

  const isOpaque = (p: number) => {
    if (p == 0 || p == positions.length - 1) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Box
        position="relative"
        width={width}
        height={height}
        bgcolor={"red"}
        padding={padding + "px"}
        {...prop}
      >
        {contents.map((bg, idx) => {
          // console.log((pos + idx + positions.length) % positions.length);
          // console.log(
          //   "pos: " +
          //     positions[(pos + idx + positions.length) % positions.length]
          // );
          let posIdx = (pos + idx + contents.length) % contents.length;
          if (posIdx == contents.length - 1) {
            console.log("haa" + posIdx);
            posIdx = contents.length - 3;
          } else if (posIdx != 0) {
            posIdx--;
          }
          console.log(idx + " -> " + posIdx);

          return (
            <motion.div
              animate={{
                x: positions[posIdx],
                opacity: isOpaque(posIdx) ? 1 : 0.2,
              }}
            >
              <Box position="absolute" height={height} width={boxWidth}>
                {/* {idx} */}
                {/* <img height={"100px"} width={"100px"} src={creepy} /> */}
                <img src={bg} alt="fireSpot" height="100%" width="100%" />
              </Box>
            </motion.div>
          );
        })}
      </Box>
      <Box
        width={width}
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Button
          sx={{
            flexGrow: 1,
          }}
          onClick={rotateLeft}
        >
          {"<"}
        </Button>
        <Button
          sx={{
            flexGrow: 1,
          }}
          onClick={rotateRight}
        >
          {">"}
        </Button>
      </Box>
      {/* <image src="https://upload.wikimedia.org/wikipedia/commons/8/8a/P%26W_4006_Baltic_CT.jpg" /> */}
    </>
  );
};

export { Carousel };
