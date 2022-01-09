import { Button } from "@mui/material";
import { MouseEventHandler, FunctionComponent } from "react";

interface InternalButtonProp {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const RightRotate: FunctionComponent<InternalButtonProp> = ({ onClick }) => {
  return (
    <Button
      sx={{
        flexGrow: 1,
      }}
      onClick={onClick}
    >
      {">"}
    </Button>
  );
};
const LeftRotate: FunctionComponent<InternalButtonProp> = ({ onClick }) => {
  return (
    <Button
      sx={{
        flexGrow: 1,
      }}
      onClick={onClick}
    >
      {"<"}
    </Button>
  );
};

export { LeftRotate, RightRotate };
