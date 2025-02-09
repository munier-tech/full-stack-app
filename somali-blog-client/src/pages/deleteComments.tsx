import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { deleteArticleFn } from "@/redux/slices/articles/deleteArticleSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

const DeleteComments = () => {
  const deleteCommentState = useSelector(
    (state: RootState) => state.deleteCommentSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  const { commentId } = useParams();

  const handleDelete = () => {

    if (deleteArticleFn) {
      dispatch(deleteArticleFn(+commentId!))
    }
    ;
  };

  if (deleteCommentState.loading) return <Spinner />;

  if (deleteCommentState.loading) return toast.error(deleteCommentState.loading);

  
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <img
            className="w-[40px]"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAS1BMVEX///9iYmJfX1/6+vr29vZnZ2fNzc2zs7NZWVny8vKvr6+goKC3t7fAwMB1dXXV1dWLi4umpqZ/f3/g4OBubm5UVFSVlZXHx8eBgYGIP4/pAAABJUlEQVR4nO3YW1KDQBAF0MwgCZCn0aj7X6l8WJrKNynkcs4KuosuuuduNgAAAAAAAAAAAAAAAAAAAAAAwLP1u2u9tZdjM3chT9LsaldLKbV7/4zssd/fyo9ahpe5y5les6/lV20PeV/x2N51WOrpPHdBU+sv9w2OLb6mzen29NDh9W3ukiZ2KA/atDEd6kOH3XbukiaW32H+lOb/afK3Rf7GX8HVtuk//i7vmnh5r+D1NOqH8QVcvxInFABYEan+wkn1Fy/+jZ+f0+Rnbfl5aX7mnd9h/pTm/2nyt0X+xl/B1SbVzyDVBwASSPUXTqq/ePFv/PycJj9ry89L8zPv/A7zpzT/T5O/LfI3/gquNql+Bqk+AAAAAAAAAAAAAAAAAAAA/A/fLdANwGbA1SQAAAAASUVORK5CYII="
            alt=""
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DeleteComments;
