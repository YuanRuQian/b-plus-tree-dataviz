import React from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { ThemeColor } from "../utils/constants";

const SliderWithValueTooltip = styled(Slider)({
  color: ThemeColor,
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: "1rem",
    width: "1rem",
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: "0.6rem",
    background: "unset",
    padding: 0,
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "50% 50% 50% 0",
    backgroundColor: ThemeColor,
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

type TransitionDurationSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

const TransitionDurationSlider = ({
  value,
  onChange,
}: TransitionDurationSliderProps) => {
  const onSliderValueChange = (event: Event, value: number | number[]) => {
    onChange(value as number);
  };
  return (
    <Box sx={{ width: "15rem" }}>
      <Typography variant="subtitle2" color={ThemeColor} gutterBottom>
        Adjust Animation Speed: {value}ms
      </Typography>
      <SliderWithValueTooltip
        min={1}
        max={2000}
        valueLabelDisplay="auto"
        aria-label="transition duration (ms)"
        defaultValue={1000}
        value={value}
        onChange={onSliderValueChange}
      />
    </Box>
  );
};

export default TransitionDurationSlider;
