import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import type { Book } from "@/interfaces/book/book-types";
import { Textarea } from "../ui/textarea";

interface IViewBookData {
  bookValue: Book | null;
  onclose: () => void;
}

const ViewBookInfo = ({ bookValue, onclose }: IViewBookData) => {
  return (
    <Sheet open onOpenChange={(open) => !open && onclose()}>
      <SheetContent
        side="right"
        className="w-full sm:w-[500px] max-w-full overflow-y-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Book Details</SheetTitle>
          <SheetDescription>
            {bookValue?.title} by {bookValue?.author}
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Title</Label>
            <Input
              id="sheet-demo-name"
              defaultValue={bookValue?.title}
              readOnly
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Author</Label>
            <Input
              id="sheet-demo-username"
              defaultValue={bookValue?.author}
              readOnly
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Genre</Label>
            <Input
              id="sheet-demo-username"
              defaultValue={bookValue?.genre}
              readOnly
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">ISBN</Label>
            <Input
              id="sheet-demo-username"
              defaultValue={bookValue?.isbn}
              readOnly
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Quantity</Label>
            <Input
              id="sheet-demo-username"
              defaultValue={bookValue?.copies}
              readOnly
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Description</Label>
            <Textarea
              id="sheet-demo-username"
              defaultValue={bookValue?.description}
              readOnly
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="default">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ViewBookInfo;
