import React, { useContext, useState } from "react";
import AppBar from "./AppBar";
import { RedBlackTreeContext } from "../context/RedBlackTreeContext";
import { isNull, isUndefined } from "../utils/utils";
import { Alert, Snackbar } from "@mui/material";
import { RawNodeDatum } from "react-d3-tree";
import TreeChart from "./TreeChart";

const ControlPanel = () => {
  const context = useContext(RedBlackTreeContext);

  const [redBlackTreeData, setRedBlackTreeData] = useState<RawNodeDatum>(
    {} as RawNodeDatum,
  );

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbarMessage = (event: React.SyntheticEvent | Event) => {
    setShowSnackbar(false);
    setSnackbarMessage("");
  };

  const showSnackbarMessage = (message: string) => {
    setShowSnackbar(true);
    setSnackbarMessage(message);
  };

  const handleInsert = (value: number) => {
    if (!isNull(context)) {
      const foundNode = context.redBlackTree.find(value);

      if (!isUndefined(foundNode)) {
        showSnackbarMessage(`Node ${value} already exists! Insert failed.`);
        return;
      }

      context.redBlackTree.insert(value);
      setRedBlackTreeData(
        context.redBlackTree.getInOrderTraversalPath() || ({} as RawNodeDatum),
      );
      console.log(`Tree size: ${context.redBlackTree.size}`);
    }
  };

  const handleDelete = (value: number) => {
    if (isNull(context)) {
      return;
    }

    const deleteResult = context.redBlackTree.delete(value);

    if (!deleteResult) {
      showSnackbarMessage(`Node ${value} does not exist, delete failed.`);
      return;
    }

    setRedBlackTreeData(
      context.redBlackTree.getInOrderTraversalPath() || ({} as RawNodeDatum),
    );
    console.log(`Tree size: ${context.redBlackTree.size}`);
  };

  const handleFind = (value: number) => {
    if (!isNull(context)) {
      const findResult = context.redBlackTree.find(value);

      // if value not found, show snackbar to notify user
      if (isUndefined(findResult)) {
        showSnackbarMessage(`Node ${value} is not found!`);
        return;
      }

      const newRedBlackTreeData =
        context.redBlackTree.getInOrderTraversalPathWithFindPath(value);
      setRedBlackTreeData(newRedBlackTreeData || ({} as RawNodeDatum));
    }
  };

  const handleClearAll = () => {
    if (!isNull(context)) {
      context.redBlackTree.clear();
      setRedBlackTreeData(
        context.redBlackTree.getInOrderTraversalPath() || ({} as RawNodeDatum),
      );
      console.log(`Tree size: ${context.redBlackTree.size}`);
    }
  };

  return (
    <div>
      <AppBar
        handleInsert={handleInsert}
        handleDelete={handleDelete}
        handleFind={handleFind}
        handleClearAll={handleClearAll}
      />
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbarMessage}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <TreeChart redBlackTreeData={redBlackTreeData} />
    </div>
  );
};

export default ControlPanel;
