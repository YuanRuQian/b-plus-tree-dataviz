import React from "react";
import { Button, TextField, Box, Grid } from "@mui/material";

type ButtonWithInputProps = {
  buttonLabel: string;
  inputLabel: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};

const ButtonWithInput = ({
  buttonLabel,
  inputLabel,
  value,
  onChange,
  onClick,
}: ButtonWithInputProps) => {
  return (
    <Box m={1}>
      <Grid container spacing={1} alignItems="center">
        <Grid item style={{ flexGrow: 1 }}>
          <TextField
            label={inputLabel}
            value={value}
            onChange={onChange}
            fullWidth // Ensures the TextField takes up the available space
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

export default ButtonWithInput;
