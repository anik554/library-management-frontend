import App from "@/App";
import AddBook from "@/pages/add-book/AddBook";
import AllBooks from "@/pages/all-books/AllBooks";
import BorrowSummary from "@/pages/borrow-summary/BorrowSummary";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: AllBooks,
      },
      {
        path: "books",
        Component: AllBooks,
      },
      {
        path: "create-book",
        Component: AddBook,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);

export default router;
