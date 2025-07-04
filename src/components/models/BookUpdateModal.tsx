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
import type { Book } from "@/interfaces/book/book-types";
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
import { Textarea } from "../ui/textarea";
import { useUpdatebookMutation } from "@/redux/api/baseApi";
import toast from "react-hot-toast";

interface IBookData {
  bookValue: Book | null;
  onclose: () => void;
  refetch: () => void;
}

export function BookUpdateModal({ bookValue, onclose, refetch }: IBookData) {
  const [updatebook] = useUpdatebookMutation();
  const form = useForm({
    defaultValues: {
      title: bookValue?.title || "",
      description: bookValue?.description || "",
      author: bookValue?.author || "",
      genre: bookValue?.genre || "",
      isbn: bookValue?.isbn || "",
      copies: bookValue?.copies || "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const updateData = {
      ...data,
      id: bookValue?._id,
      copies: Number(data.copies),
    };
    form.reset();
    const res = await updatebook(updateData).unwrap();
    if (res) {
      onclose();
      refetch();
      toast.success("Update Book Successfully");
      form.reset();
    } else {
      toast.error("Faild to Update Book");
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
            <DialogTitle>Update Book Data</DialogTitle>
            <DialogDescription>
              Please update book data from library
            </DialogDescription>
          </DialogHeader>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Enter Task Title"
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Enter Book Author"
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Enter Book Genre"
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="isbn"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>ISBN</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Please Enter Book isbn"
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="copies"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Please Enter Book Copies"
                          value={field.value || ""}
                          type="number"
                          min={0}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Please Enter Book Description"
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
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
