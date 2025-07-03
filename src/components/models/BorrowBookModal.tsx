import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import toast from "react-hot-toast";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useBorrowBookMutation } from "@/redux/api/borrowApi";

interface IBorrowData {
  borrowValue: { id: string; quentity: string };
  onclose: () => void;
  refetch: () => void;
}

export function BorrowBookModal({ borrowValue, onclose, refetch }: IBorrowData) {
  const [borrowBook] = useBorrowBookMutation();
  const form = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const updateData = {
      book: borrowValue?.id,
      quantity: Number(data.copies),
      dueDate: data.dueDate.toISOString(),
    };

    form.reset();
    const res = await borrowBook(updateData).unwrap();
    if (res.success) {
      onclose();
      refetch();
      toast.success("Borrow Book Successfully");
    } else {
      toast.error("Faild to Borrow Book");
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onclose()}>
      <form>
        <DialogContent
          className="sm:max-w-[425px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Borrow the Book</DialogTitle>
            <DialogDescription>
              Please update book data from library
            </DialogDescription>
          </DialogHeader>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="copies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Enter Book Copies"
                        value={field.value || ""}
                        type="number"
                        min={0}
                        maxLength={Number(borrowValue?.quentity)}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          console.log(value);
                          console.log(Number(borrowValue?.quentity));
                          if (
                            !isNaN(value) &&
                            value <= Number(borrowValue?.quentity)
                          ) {
                            field.onChange(value);
                          } else if (e.target.value === "") {
                            field.onChange("");
                          } else {
                            toast.error("Quentity not grater then book copies");
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col mb-3">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>
                                Please Enter Date When You Back This Book
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </form>
    </Dialog>
  );
}
