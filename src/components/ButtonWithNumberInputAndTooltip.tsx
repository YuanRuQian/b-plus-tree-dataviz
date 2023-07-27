import React from "react";
import { Button, Box, Grid, Tooltip } from "@mui/material";
import { TextField } from "@mui/material";

type ButtonWithNumberInputAndTooltipProps = {
  buttonLabel: string;
  inputLabel: string;
  tooltipTitle?: string;
  value: number | undefined;
  minValue?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};

// TODO: fix min value input issue ( still could input value smaller than min value)
const ButtonWithNumberInputAndTooltip = ({
  buttonLabel,
  inputLabel,
  tooltipTitle,
  value,
  minValue,
  onChange,
  onClick,
}: ButtonWithNumberInputAndTooltipProps) => {
  return (
    <Box m={1}>
      <Grid container spacing={1} alignItems="center">
        <Grid item style={{ flexGrow: 1 }}>
          <TextField
            type="number"
            label={inputLabel}
            value={value}
            onChange={onChange}
            fullWidth
            inputProps={{ inputMode: "numeric", min: minValue }}
          />
        </Grid>
        <Grid item>
          <Tooltip title={tooltipTitle}>
            <Button variant="outlined" onClick={onClick}>
              {buttonLabel}
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ButtonWithNumberInputAndTooltip;
