import { getArticleFn } from "@/redux/slices/articles/articleDetailSlice";
import { deleteArticleFn } from "@/redux/slices/articles/deleteArticleSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import Spinner2 from "../spinner2";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Comments from "@/components/comments/comments";
import CommentsList from "@/components/comments/commentsList";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"

const ArticlesDetail = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const articleDetailState = useSelector((state: RootState) => state.articleDetailSlice);
  const loginState = useSelector((state : RootState) => state.Login)
  dayjs.extend(relativeTime)

  useEffect(() => {
    
      dispatch(getArticleFn(+articleId!));
    
  }, [dispatch]);

  if (articleDetailState.loading) {
    return <div className="flex items-center justify-center my-[4rem] animate-spin"><Spinner2 /></div>;
  }

  if (articleDetailState.error) {
    return <p className="text-red-500 my-5 font-bold text-center">{articleDetailState.error}</p>;
  }

  

  const deleteHandle = async () => {
    try {
      const result = await dispatch(deleteArticleFn(+articleId!))


    if (deleteArticleFn.fulfilled.match(result)) {
      toast.success("article successfully deleted")
      navigate("/")
    }
    if (articleDetailState.error) {
      toast.error(articleDetailState.error)
    }
      
    } catch (error) {
      console.log(error)
      toast.error("something went wrong with your network")
    }
  }

  return (
    <div className="w-[50%] mx-auto">
      <div className="my-6">
        <Badge>Articles</Badge>
        <div>
          <div className="flex gap-4 items-center">
            <div>
              <h1 className="font-bold text-xl my-2">
                {articleDetailState?.data?.article?.user?.fullname}
              </h1>
              <p>
                Last updated_at {dayjs(articleDetailState?.data?.article?.updated_at).fromNow(true)} <strong>ago</strong>
                </p>
            </div>
            <div className="mb-5">
              <Badge variant={"outline"}>Author</Badge>
            </div>
          </div>
          <div className="my-5">
            <h1 className="font-bold my-5 text-4xl">
              {articleDetailState?.data?.article?.title}
            </h1>
            <p dangerouslySetInnerHTML={{
              __html: articleDetailState?.data?.article?.content
            }}>
            </p>
          </div>
          <Button onClick={deleteHandle} className="mt-4 bg-red-500 hover:bg-red-700">Delete</Button>
        </div>
        <div>
         <Comments articleId={+articleId!}/>
        </div>
        {!loginState.data.isSuccess ? "" : <div className="my-10" >
        <CommentsList/>
        </div> }
        
      </div>
    </div>
  );
};

export default ArticlesDetail;
