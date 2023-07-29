import React from "react";
import { Button, Box, Grid } from "@mui/material";
import { TextField } from "@mui/material";

type ButtonWithNumberInputAndProps = {
  buttonLabel: string;
  inputLabel: string;
  value: number | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};

const ButtonWithNumberInput = ({
  buttonLabel,
  inputLabel,
  value,
  onChange,
  onClick,
}: ButtonWithNumberInputAndProps) => {
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
          />
        </Grid>
        <Grid item>
            <Button variant="outlined" onClick={onClick}>
              {buttonLabel}
            </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ButtonWithNumberInput;
