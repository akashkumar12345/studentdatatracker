import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

// Responsive Border Frame
const BorderFrame = styled("div")(({ theme }) => ({
  width: "100%",
  padding: "40px",
  backgroundImage: "url('/tableborder3.png')",
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  // 📱 Mobile / Tablet Responsive
  [theme.breakpoints.down("md")]: {
    padding: "20px",
    backgroundSize: "cover",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
    backgroundSize: "contain",
  },
}));

// Responsive Paper
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "14px",
  overflow: "hidden",
  width: "85%",
  background: "white",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",

  // 📱 Responsive width
  [theme.breakpoints.down("md")]: {
    width: "95%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

// Header styling
const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  background: "linear-gradient(90deg, #6a30de, #1f7dca)",
  color: "#fff",
  fontWeight: 700,
  fontSize: "15px",

  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
    padding: "8px",
  },
}));

// Hover row
const StyledRow = styled(TableRow)(({ theme }) => ({
  transition: "0.2s",
  "&:hover": {
    backgroundColor: "rgba(58,150,189,0.12)",
  },
}));

export default function StudyTable({ columns = [], rows = [] }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  return (
    <BorderFrame>
      <StyledPaper>
        {/* ⭐ Horizontal scroll auto for small screens */}
        <TableContainer sx={{ maxHeight: 450, overflowX: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledHeaderCell key={column.id} align={column.align || "left"}>
                    {column.label}
                  </StyledHeaderCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (
                  <StyledRow key={idx}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align || "left"}
                          sx={{
                            whiteSpace: "nowrap",
                            fontSize: { xs: "12px", sm: "14px" },
                            padding: { xs: "6px", sm: "10px" },
                          }}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </StyledRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </StyledPaper>
    </BorderFrame>
  );
}
