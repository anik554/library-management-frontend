import { useGetBooksQuery } from "@/redux/api/baseApi";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDownIcon, Eye, ImageUpscale, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { genreOptions } from "@/components/constant/bookContant";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Book } from "@/interfaces/book/book-types";
import { BookUpdateModal } from "@/components/models/BookUpdateModal";
import { AlertDialogModal } from "@/components/models/AlertDialogModal";
import { BorrowBookModal } from "@/components/models/BorrowBookModal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IFilterData {
  genre: string;
  date: Date | undefined;
}

const AllBooks = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openBook, setOpenBook] = useState(false);
  const [openBookView, setOpenBookView] = useState(false);
  const [openBookDelete, setOpenBookDelete] = useState(false);
  const [openBookBorrow, setOpenBookBorrow] = useState(false);
  const [bookId, setBookId] = useState({ id: "", quentity: "" });
  const [bookValue, setBookValue] = useState<Book | null>(null);
  const [filterData, setFilterData] = useState<IFilterData>({
    genre: "",
    date: undefined,
  });
  const pageLimit = 10;

  console.log(filterData);

  const { data, isLoading, isError, refetch } = useGetBooksQuery({
    filter: filterData.genre || "",
    sortBy: filterData.date?.toISOString() || "",
    limit: pageLimit,
  });

  console.log(data);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleOpen = (bookData: Book) => {
    setOpenBook(true);
    setBookValue(bookData);
  };
  const handleOpenView = (bookData: Book) => {
    setOpenBookView(true);
    setBookValue(bookData);
  };
  const handleViewClose = () => {
    setOpenBookView(false);
    setBookValue(null);
  };

  const handleClose = () => {
    setOpenBook(false);
    setBookValue(null);
  };

  const handleOpenDelete = (id: string) => {
    setBookId({ id: id, quentity: "" });
    setOpenBookDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenBookDelete(false);
  };
  const handleOpenBorrow = (id: string, quantity: number) => {
    setBookId({ id: id, quentity: String(quantity) });
    setOpenBookBorrow(true);
  };
  const handleCloseBorrow = () => {
    setOpenBookBorrow(false);
  };

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
      <div className="flex justify-between items-center">
        <h2 className="text-bold text-2xl">Book List</h2>
        <div className="flex gap-2">
          <Select
            value={filterData.genre}
            onValueChange={(value) =>
              setFilterData((prev) => ({ ...prev, genre: value }))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Genre" />
            </SelectTrigger>
            <SelectContent>
              {genreOptions?.map((item) => (
                <SelectItem key={item.id} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-48 justify-between font-normal"
              >
                {filterData?.date
                  ? filterData?.date.toLocaleDateString()
                  : "Filter by Date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={filterData?.date}
                captionLayout="dropdown"
                onSelect={(date) =>
                  setFilterData((prev) => ({ ...prev, date }))
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table className="border-1 mt-2">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Book Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
              )?.map((bookData) => (
                <TableRow key={bookData._id}>
                  <TableCell className="font-medium">
                    {bookData.title}
                  </TableCell>
                  <TableCell>{bookData.author}</TableCell>
                  <TableCell>{bookData.genre}</TableCell>
                  <TableCell>{bookData.isbn}</TableCell>
                  <TableCell>{bookData.description}</TableCell>
                  <TableCell>{bookData.copies}</TableCell>
                  <TableCell>
                    {bookData.available ? "Available" : "Unavailable"}
                  </TableCell>
                  <TableCell>
                    {new Date(bookData.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            variant={"link"}
                            onClick={() => handleOpenView(bookData)}
                          >
                            <Eye className="text-sky-700" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            variant={"link"}
                            onClick={() => handleOpen(bookData)}
                          >
                            <Pencil color="green" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Update Book</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            variant={"link"}
                            onClick={() => handleOpenDelete(bookData._id)}
                          >
                            <Trash2 color="red" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete Book</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            variant={"link"}
                            onClick={() =>
                              handleOpenBorrow(bookData._id, bookData.copies)
                            }
                          >
                            <ImageUpscale color="blue" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Borrow Book</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
      <Pagination>
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
      {openBook && (
        <BookUpdateModal
          bookValue={bookValue}
          onclose={handleClose}
          refetch={refetch}
        />
      )}
      {openBookDelete && (
        <AlertDialogModal
          bookId={bookId.id}
          onclose={handleCloseDelete}
          refetch={refetch}
        />
      )}
      {openBookBorrow && (
        <BorrowBookModal
          borrowValue={bookId}
          onclose={handleCloseBorrow}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AllBooks;
