export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BooksApiResponse {
  success: boolean;
  message: string;
  totalData: number;
  data: Book[];
}
