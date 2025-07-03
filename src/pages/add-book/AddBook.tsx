import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [createBook] = useCreateBookMutation();
  const navigate = useNavigate()
  const form = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    form.reset();
    const res = await createBook(data).unwrap();
    if (res.success) {
      toast.success("Create Book Successfully");
      navigate("/allbooks")
    } else {
      toast.error("Faild to Create Book");
    }
  };
  return (
    <div className="container mx-auto py-3">
      <h2 className="text-bold text-2xl mb-2">Add New Book</h2>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Please Enter Task Title"
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Please Enter Book Author"
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Please Enter Book Genre"
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem className="w-1/2 mb-4">
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Please Enter Book isbn"
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="copies"
              render={({ field }) => (
                <FormItem className="w-1/2 mb-4">
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
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Please Enter Book Description"
                    value={field.value || ""}
                    rows={8}
                    className="min-h-[150px] text-base p-4"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-2 items-center justify-end">
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Add Book</Button>
          </div>
          {/* <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter> */}
        </form>
      </FormProvider>
    </div>
  );
};

export default AddBook;
