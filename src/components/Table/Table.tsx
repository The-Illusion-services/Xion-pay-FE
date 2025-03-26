import React from 'react'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


type TableValue = {
  [key: string]: string | number;
};

type tableValues = TableValue[];
interface ComponentProps {
  tableHeaders: string[];
  tableValues: tableValues;
}
const TableComp: React.FC<ComponentProps> = ({tableHeaders, tableValues}) => {
  return (
    <TableContainer component={Paper} className="mt-4 bg-gray_primary">
    <Table sx={{backgroundColor: "#1A1A1A", color: ""}}>
      <TableHead sx={{backgroundColor: "black", color: ""}}>
        <TableRow>
          {tableHeaders.map((header, index) => (
            <TableCell key={index} align="center" sx={{color: "#949494"}}>
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {tableValues.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            sx={{ "&:last-child td, &:last-child th, &first-child td &first-child th": { border: 0 }, borderColor: "#47474780" }}
          >
            {Object.keys(row).map((key, index) => {
              
              return (
                <TableCell
                  key={index}
                  sx={{color: "#F2F2F2"}}
                  title="Click to view details"
                  className={` ${row[key as keyof typeof row] === "successful" ? "text-green-500 bg-[#4a89571a]  " : row[key as keyof typeof row] === "failed" ? "text-red-400" : ""} cursor-pointer`}
                  align="center"
                >
                  {row[key as keyof typeof row]}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default TableComp