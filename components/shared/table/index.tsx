import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Circle } from "lucide-react";

const DefaultTable = ({ children, tableHeaders }: any) => {
  return (
    <Table className="table-auto border-separate border-spacing-0 text-white">
      <TableHeader>
        <TableRow className="px-3 bg-primary-dark">
          <TableHead className="orders-table-head">
            <Circle />
          </TableHead>
          {Array.isArray(tableHeaders) &&
            tableHeaders.map((header: any, index: number) => (
              <TableHead key={index} className="orders-table-head">
                {header}
              </TableHead>
            ))}
        </TableRow>
      </TableHeader>
      {children}
    </Table>
  );
};

export default DefaultTable;
