import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import NoData from "@/src/assets/no-data/empty-img-gray.png";
import Image from "next/image";
import { Typography, Box } from "@mui/material";
type results = {
  [key: string]: string
}
type TableValue = {
  [key: string]: string | number;
  currency: string;
  blockchain_transaction_data: any

};

type tableValues = TableValue[];
interface ComponentProps {
  tableHeaders: string[];
  tableValues: tableValues;
}

const formattedAmount = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
  }).format(amount);
};

const TableComp: React.FC<ComponentProps> = ({ tableHeaders, tableValues }) => {
  return (
    <TableContainer component={Paper} className="mt-4 bg-gray_primary">
      <Table sx={{ backgroundColor: "#1A1A1A", color: "" }}>
        <TableHead sx={{ backgroundColor: "black", color: "" }}>
          <TableRow>
            {tableHeaders.map((header, index) => (
              <TableCell key={index} align="center" sx={{ color: "#949494" }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableValues?.length < 1 ?
          <TableRow className=" ">
          <TableCell colSpan={9} align="center">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                padding: "100px 0",
              }}
            >
              <Image
                src={NoData}
                alt="No users"
                width={200}
                height={200}
              />
              <Typography sx={{color: "white"}}>
                No Transactions Found
              </Typography>
            </Box>
          </TableCell>
        </TableRow>
        :
          tableValues?.map((row, rowIndex) => {
            return (
              <TableRow
                key={rowIndex}
                sx={{
                  "&:last-child td, &:last-child th, &first-child td &first-child th":
                    { border: 0 },
                  borderColor: "#47474780",
                }}
              >
                {Object.keys(row).map((key, index) => {
                  if (
                    key !== "metadata" &&
                    key !== "updated_at" &&
                    key !== "failure_reason" &&
                    key !== "id" && key !== "payment_type" && key !== "token_type" && key !== "blockchain_transaction_data"
                  ) {
                    return (
                      <TableCell
                        key={index}
                        sx={{ color: "#F2F2F2" }}
                        title="Click to view details"
                        className={`  cursor-pointer`}
                        align="center"
                      >
                        {key === "created_at"
                          ? new Date(row.created_at).toLocaleString()
                          : key === "amount"
                          ? formattedAmount(Number(row.amount), row?.currency)
                          : key === "blockchain_transaction_data"
                          ? row.blockchain_transaction_data?.results
                              ?.transactionHash
                          :  key === "status" ? <span
                          className={` ${
                            row[key as keyof typeof row] === "completed"
                              ? "text-green-500 bg-[#4a89571a] p-2 rounded-[20px] "
                              : row[key as keyof typeof row] === "failed"
                              ? "text-red-400 p-2 rounded-[20px]" : row[key as keyof typeof row] === "pending" ?  "text-[orange] bg-[#8c7b271a] p-2 rounded-[20px]"
                              : ""
                          } cursor-pointer`}
                          >
                            {row.status}
                          </span> : row[key as keyof typeof row]}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            );
          })
        }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComp;
