import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import VehicleDetailsModal from "../EVTable/VehicleDetailsCard"


const VehicleTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (Array.isArray(data)) {
      setFilteredData(data);
    }
  }, [data]);

  const handleRowClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedVehicle(null);
    setIsModalOpen(false);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const filtered = data.filter(
      (vehicle) =>
        vehicle.County && vehicle.County.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  console.log("Check",selectedVehicle)

  return (
    <div>
      <TextField
        label="Filter by Country"
        variant="outlined"
        fullWidth
        margin="normal"
        value={filter}
        onChange={handleFilterChange}
        sx={{padding:"10px"}}
      />
      <Paper sx={{ width: "98%", overflow: "hidden", m: "16px", p: "10px" }}>
        <TableContainer sx={{ maxHeight: 400, width: "100%" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {["Country", "Make", "Model Year", "Electric Range"].map(
                  (column) => (
                    <TableCell key={column} style={{ minWidth: 170 }}>
                      {column}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    key={index}
                    onClick={() => handleRowClick(row)}
                  >
                    <TableCell>{row.County || "N/A"}</TableCell>
                    <TableCell>{row.Make || "N/A"}</TableCell>
                    <TableCell>{row["Model Year"] || "N/A"}</TableCell>
                    <TableCell>{row["Electric Range"] || "N/A"}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
          }}
        />
      </Paper>

      <VehicleDetailsModal
        vehicle={selectedVehicle}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default VehicleTable;
