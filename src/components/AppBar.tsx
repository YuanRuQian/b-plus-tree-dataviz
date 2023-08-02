import React from "react";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Button,
  TextField,
  Box,
  Tooltip,
} from "@mui/material";
import { isUndefined } from "../utils/utils";
import GitHubIcon from "@mui/icons-material/GitHub";
import TransitionDurationSlider from "./TransitionDurationSlider";

type AppBarProps = {
  handleInsert: (value: number) => void;
  handleDelete: (value: number) => void;
  handleFind: (value: number) => void;
  handleClearAll: () => void;
  transitionDuration: number;
  handleTransitionDurationChange: (value: number) => void;
};

type CustomButtonProps = {
  onClick: () => void;
  buttonLabel: string;
  tooltipTitle?: string;
};

const CustomButton = ({ onClick, buttonLabel, tooltipTitle }: CustomButtonProps) => (
  <Tooltip title={tooltipTitle} arrow>
    <span>
      <Button variant="outlined" color="success" onClick={onClick}>
        {buttonLabel}
      </Button>
    </span>
  </Tooltip>
);

type CustomNumberInputProps = {
  value: number | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputLabel: string;
};

const CustomNumberInput = ({
  value,
  onChange,
  inputLabel,
}: CustomNumberInputProps) => (
  <TextField
    color="success"
    type="number"
    label={inputLabel}
    value={isUndefined(value) ? "" : value}
    onChange={onChange}
  />
);

const GitHubLinkButton = () => {
  const handleOpenGithubRepo = () => {
    window.open(
      "https://github.com/YuanRuQian/red-black-tree-dataviz",
      "_blank",
    );
  };

  return (
    <Tooltip title="Click to view the source code on GitHub" arrow>
      <Button onClick={handleOpenGithubRepo}>
        <GitHubIcon fontSize="large" color="success" />
      </Button>
    </Tooltip>
  );
};

const AppBar: React.FC<AppBarProps> = ({
  handleInsert,
  handleDelete,
  handleFind,
  handleClearAll,
  handleTransitionDurationChange,
  transitionDuration,
}) => {
  const [input, setInput] = React.useState<number | undefined>(undefined);

  const handleInputChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(parseFloat(event.target.value));
  };

  const handleInsertButtonClick = () => {
    if (!isUndefined(input)) {
      handleInsert(input);
      setInput(undefined);
      console.log(`Inserting ${input}`);
    }
  };

  const handleDeleteButtonClick = () => {
    if (!isUndefined(input)) {
      handleDelete(input);
      setInput(undefined);
      console.log(`Deleting ${input}`);
    }
  };

  const handleFindButtonClick = () => {
    if (!isUndefined(input)) {
      handleFind(input);
      setInput(undefined);
      console.log(`Finding ${input}`);
    }
  };

  const InsertButtonWithInput = () => (
    <CustomButton onClick={handleInsertButtonClick} buttonLabel="Insert"
    tooltipTitle="Insert a node with the given value into the tree if not already present."
     />
  );

  const DeleteButtonWithInput = () => (
    <CustomButton onClick={handleDeleteButtonClick} buttonLabel="Delete"
    tooltipTitle="Delete the node with the given value from the tree if present."
    />
  );

  const FindButtonWithInput = () => (
    <CustomButton
      onClick={handleFindButtonClick}
      buttonLabel="Find"
      tooltipTitle="Highlight the path from root to target node in red if present."
    />
  );

  const ClearAllButton = () => (
    <CustomButton onClick={handleClearAll} buttonLabel="Clear All"
    tooltipTitle="Clear all nodes from the tree."
     />
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="sticky" color="transparent">
        <Toolbar
          disableGutters
          style={{
            margin: "0.5rem 3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CustomNumberInput
            value={input}
            onChange={handleInputChanges}
            inputLabel="Enter a number"
          />
          <InsertButtonWithInput />
          <DeleteButtonWithInput />
          <FindButtonWithInput />
          <ClearAllButton />
          <TransitionDurationSlider
            value={transitionDuration}
            onChange={handleTransitionDurationChange}
          />
          <GitHubLinkButton />
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};

export default AppBar;
