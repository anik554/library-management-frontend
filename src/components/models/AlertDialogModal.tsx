import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import toast from "react-hot-toast";

interface AlertDataType{
  bookId: string;
  onclose: () => void;
  refetch: () => void;
}

export function AlertDialogModal({bookId,onclose,refetch}:AlertDataType) {
  const [deleteBook]=useDeleteBookMutation()
  const handleDelete =async()=>{
    const res = await deleteBook(bookId)
    if(res){
      refetch()
      toast.success("Book Delete Successfully")
    }else{
      toast.error("Failed to Delete Book")
    }
  }

  return (
    <AlertDialog open onOpenChange={(open)=> !open && onclose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure want to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the book.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
