import React from "react";
import { AppBar as MuiAppBar, Toolbar, Button, Container } from "@mui/material";
import ButtonWithNumberInputAndTooltip from "./ButtonWithNumberInputAndTooltip";

type AppBarProps = {
  insertValue: number | undefined;
  deleteValue: number | undefined;
  findValue: number | undefined;
  treeOrder: number | undefined;
  setInsertValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setDeleteValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFindValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setTreeOrder: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInsert: () => void;
  handleDelete: () => void;
  handleFind: () => void;
  handleClearAll: () => void;
  handleTreeOrderChange: () => void;
};

const AppBar: React.FC<AppBarProps> = ({
  insertValue,
  deleteValue,
  findValue,
  treeOrder, // Changed the prop name from maxDegree to treeOrder
  setInsertValue,
  setDeleteValue,
  setFindValue,
  setTreeOrder, // Changed the prop name from setMaxDegree to setTreeOrder
  handleInsert,
  handleDelete,
  handleFind,
  handleClearAll,
  handleTreeOrderChange, // Changed the prop name from handleMaxDegreeChange to handleTreeOrderChange
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

  const ChooseTreeOrderButtonWithInput = () => (
    <ButtonWithNumberInputAndTooltip
      buttonLabel="Change Order"
      inputLabel="Tree Order"
      value={treeOrder}
      onChange={setTreeOrder}
      onClick={handleTreeOrderChange}
      minValue={3}
      tooltipTitle="Changing the tree order will clear all data and restart a new tree. Are you sure?"
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
          <ChooseTreeOrderButtonWithInput />
          <ClearAllButton />
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};

export default AppBar;
