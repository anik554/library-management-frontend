import App from "@/App";
import AddBook from "@/pages/add-book/AddBook";
import AllBooks from "@/pages/all-books/AllBooks";
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
        path: "allbooks",
        Component: AllBooks,
      },
      {
        path: "addbook",
        Component: AddBook,
      },
    ],
  },
]);

export default router;
