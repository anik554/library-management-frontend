interface IBorrowBook {
  isbn: string;
  title: string;
}
interface BookResponse {
  book: IBorrowBook;
  totalQuantity: number;
}

export interface IBorrow {
  data: BookResponse[];
  totalData: number;
  message: string;
  success: boolean;
}
