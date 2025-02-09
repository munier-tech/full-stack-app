import Spinner from "@/pages/Spinner"
import { removeCommentFc } from "@/redux/slices/comment/commentSlice"
import { getArticleCommentFn } from "@/redux/slices/comment/listCommentsSLice"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import DeleteComments from "@/pages/deleteComments"

const CommentsList = () => {
  const commentListState = useSelector((state : RootState) => state.ArticleCommentSlice)
  const commentCreateState = useSelector((state : RootState) => state.commentSlice)
  const dispatch = useDispatch<AppDispatch>()
  const { articleId }  = useParams()
  console.log(commentListState)
  dayjs.extend(relativeTime)

  useEffect(() => {
    if (commentCreateState.data.isSuccess) {
      dispatch(getArticleCommentFn({
        articleId : +articleId!,
        page : 1,
        size : 10
      }))
      dispatch(removeCommentFc())
    }
  } , [commentCreateState.data])

  useEffect(() => {
    dispatch(getArticleCommentFn({
      articleId : +articleId!,
      page : 1,
      size : 10
    }))
  }, [])

  return (
    <div >
      <div className="my-10">
      <h1 className="font-bold">Comments</h1>
      </div>
      
      {commentListState.loading ? <Spinner/> :  <div className="author grid gap-5">
        {commentListState?.data?.comments?.map((comment) => (
  <div  key={comment.id} className="flex gap-5 border py-3 px-4 rounded-md relative">
    
    {/* Profile Picture Section */}
    <div className="border-2 bg-violet-600 text-white flex items-center justify-center border-blue-950 rounded-3xl w-12 h-12 flex-shrink-0">
      <h1 className="font-bold text-lg">
        {comment?.users?.fullname?.[0]?.toUpperCase() || "?"}
      </h1>
    </div>

    {/* Comment Section */}
    <div className="grid flex-grow">
      <div className="flex gap-3">
        <h1 className="font-bold">{comment.users?.fullname || "Anonymous"}</h1>
        <p className=" text-sm">
          {dayjs(comment.created_at).fromNow(true)} ago
          </p>
      </div>

      {/* Ensure long text stays inside */}
      <div className="w-full break-words overflow-hidden">
        <h1 className="font-500  ">{comment.comment}</h1>
      </div>
    </div>
    <div className="absolute right-1 top-1">
     <DeleteComments/>
    </div>
  </div>
))}    
         
      </div>}
     
    </div>
  )
}

export default CommentsList
