import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

const VehicleDetailsModal = ({ vehicle, open, onClose }) => {
  if (!vehicle) return null; 

  const getValue = (key) => vehicle[key] || "N/A"; 

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {getValue("Make")} {getValue("Model Year")}
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">
          <strong>Country:</strong> {getValue("Country")}
        </Typography>
        <Typography variant="body1">
          <strong>Electric Range:</strong> {getValue("Electric Range")}
        </Typography>
        <Typography variant="body1">
          <strong>Electric Type:</strong> {getValue("Electric Vehicle Type")}
        </Typography>
        <Typography variant="body1">
          <strong>CAFV Eligibility:</strong> {getValue("Clean Alternative Fuel Vehicle (CAFV) Eligibility")}
        </Typography>
        <Typography variant="body1">
          <strong>Electric Utility:</strong> {getValue("Electric Utility")}
        </Typography>
        <Typography variant="body1">
          <strong>Base MSRP:</strong> {getValue("Base MSRP")}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleDetailsModal;
