import React from "react";
import { AppBar as MuiAppBar, Toolbar, Button, Container } from "@mui/material";
import ButtonWithNumberInputAndTooltip from "./ButtonWithNumberInputAndTooltip";

type AppBarProps = {
  insertValue: number | undefined;
  deleteValue: number | undefined;
  findValue: number | undefined;
  setInsertValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setDeleteValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFindValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInsert: () => void;
  handleDelete: () => void;
  handleFind: () => void;
  handleClearAll: () => void;
};

const AppBar: React.FC<AppBarProps> = ({
  insertValue,
  deleteValue,
  findValue,
  setInsertValue,
  setDeleteValue,
  setFindValue,
  handleInsert,
  handleDelete,
  handleFind,
  handleClearAll,
}) => {
  const InsertButtonWithInput = () => (
    <ButtonWithNumberInputAndTooltip
      buttonLabel="Insert"
      inputLabel="Insert Value"
      value={insertValue}
      onChange={setInsertValue}
      onClick={handleInsert}
    />
  );

  const DeleteButtonWithInput = () => (
    <ButtonWithNumberInputAndTooltip
      buttonLabel="Delete"
      inputLabel="Delete Value"
      value={deleteValue}
      onChange={setDeleteValue}
      onClick={handleDelete}
    />
  );

  const FindButtonWithInput = () => (
    <ButtonWithNumberInputAndTooltip
      buttonLabel="Find"
      inputLabel="Find Value"
      value={findValue}
      onChange={setFindValue}
      onClick={handleFind}
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
          <ClearAllButton />
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};

export default AppBar;
