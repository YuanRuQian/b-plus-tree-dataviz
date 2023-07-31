import React, { useContext, useState } from "react";
import AppBar from "./AppBar";
import { TreeNodeJSON } from "../utils/RedBlackTreeNode";
import { RedBlackTreeContext } from "../context/RedBlackTreeContext";
import { isNull, isUndefined } from "../utils/utils";
import Graph from "./Graph";
import { Alert, Snackbar } from "@mui/material";

const ControlPanel = () => {
  const context = useContext(RedBlackTreeContext);

  const [redBlackTreeData, setRedBlackTreeData] = useState<TreeNodeJSON>(
    {} as TreeNodeJSON,
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
      context.redBlackTree.insert(value);
      setRedBlackTreeData(
        context.redBlackTree.getInOrderTraversalPath() || ({} as TreeNodeJSON),
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
      context.redBlackTree.getInOrderTraversalPath() || ({} as TreeNodeJSON),
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
      setRedBlackTreeData(newRedBlackTreeData || ({} as TreeNodeJSON));
    }
  };

  const handleClearAll = () => {
    if (!isNull(context)) {
      context.redBlackTree.clear();
      setRedBlackTreeData(
        context.redBlackTree.getInOrderTraversalPath() || ({} as TreeNodeJSON),
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
      <Graph data={redBlackTreeData} />
    </div>
  );
};

export default ControlPanel;
