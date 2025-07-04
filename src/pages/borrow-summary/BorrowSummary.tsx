import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetBorrowSummaryQuery } from "@/redux/api/borrowApi";

const BorrowSummary = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const pageLimit = 5;

  const { data, isLoading, isError, refetch } = useGetBorrowSummaryQuery(pageLimit);

  console.log(data);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleChangeRowsPerPage = (value: string) => {
    setRowsPerPage(parseInt(value));
    setPage(0);
  };

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const totalPages = Math.ceil((data?.data.length || 0) / rowsPerPage);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.error(isError);
    return <p className="text-red-500">Failed to load books.</p>;
  }

  return (
    <div className="container mx-auto py-3">
      <h2 className="text-bold text-2xl mb-2">Borrow Book Summary</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table className="border-1">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Book Title</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Total Quantity Borrowed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              (rowsPerPage > 0
                ? data?.data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data?.data
              )?.map((borrowData,index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {borrowData.book.title}
                  </TableCell>
                  <TableCell>{borrowData.book.isbn}</TableCell>
                  <TableCell>{borrowData.totalQuantity}</TableCell>
                  
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
      <Pagination >
        <PaginationContent className="ml-auto mt-2">
          <PaginationItem>
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <Select
                onValueChange={handleChangeRowsPerPage}
                defaultValue={rowsPerPage.toString()}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 25, 50].map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePrevious();
              }}
              className={page === 0 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          <PaginationItem>
            <span className="px-4">
              Page {page + 1} of {data?.totalData}
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNext();
              }}
              className={
                page >= totalPages - 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default BorrowSummary;
