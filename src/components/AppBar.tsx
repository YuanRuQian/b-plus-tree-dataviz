import React from "react";
import { AppBar as MuiAppBar, Toolbar, Button, Container } from "@mui/material";
import ButtonWithInput from "./ButtonWithInput";

type AppBarProps = {
  insertValue: string;
  deleteValue: string;
  findValue: string;
  maxDegree: string;
  setInsertValue: React.Dispatch<React.SetStateAction<string>>;
  setDeleteValue: React.Dispatch<React.SetStateAction<string>>;
  setFindValue: React.Dispatch<React.SetStateAction<string>>;
  setMaxDegree: React.Dispatch<React.SetStateAction<string>>;
  handleInsert: () => void;
  handleDelete: () => void;
  handleFind: () => void;
  handleClearAll: () => void;
  handleMaxDegreeChange: () => void;
};

const AppBar: React.FC<AppBarProps> = ({
  insertValue,
  deleteValue,
  findValue,
  maxDegree,
  setInsertValue,
  setDeleteValue,
  setFindValue,
  setMaxDegree,
  handleInsert,
  handleDelete,
  handleFind,
  handleClearAll,
  handleMaxDegreeChange,
}) => {
  const InsertButtonWithInput = () => (
    <ButtonWithInput
      buttonLabel="Insert"
      inputLabel="Insert Value"
      value={insertValue}
      onChange={(e) => setInsertValue(e.target.value)}
      onClick={handleInsert}
    />
  );

  const DeleteButtonWithInput = () => (
    <ButtonWithInput
      buttonLabel="Delete"
      inputLabel="Delete Value"
      value={deleteValue}
      onChange={(e) => setDeleteValue(e.target.value)}
      onClick={handleDelete}
    />
  );

  const FindButtonWithInput = () => (
    <ButtonWithInput
      buttonLabel="Find"
      inputLabel="Find Value"
      value={findValue}
      onChange={(e) => setFindValue(e.target.value)}
      onClick={handleFind}
    />
  );

  const ChooseMaxDegreeButtonWithInput = () => (
    <ButtonWithInput
      buttonLabel="Choose Max Degree"
      inputLabel="Max Degree"
      value={maxDegree}
      onChange={(e) => setMaxDegree(e.target.value)}
      onClick={handleMaxDegreeChange}
    />
  );

  const ClearAllButton = () => (
    <div>
      <Button variant="outlined" onClick={handleClearAll}>
        Clear All
      </Button>
    </div>
  );

  return (
    <MuiAppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <InsertButtonWithInput />
          <DeleteButtonWithInput />
          <FindButtonWithInput />
          <ChooseMaxDegreeButtonWithInput />
          <ClearAllButton />
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};

export default AppBar;
