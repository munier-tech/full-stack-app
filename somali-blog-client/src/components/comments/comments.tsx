import { FormEvent, useEffect, useState } from "react"
import { Button, buttonVariants } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { getCommentFn, removeCommentFc } from "@/redux/slices/comment/commentSlice"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import Spinner from "@/pages/Spinner"

const Comments = ({articleId} : {articleId : number}) => {
  const [comment , setComment] = useState('')
  const stateData = useSelector((state : RootState) => state.commentSlice)
  const loginState = useSelector((state :  RootState ) => state.Login )
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(removeCommentFc())
  }, [])

  useEffect(() => {
     if (stateData.data.isSuccess) {
      toast.success('comment is sent')
     }
     if (stateData.error) {
      toast.error(stateData.error)
     }
  }, [stateData.data.isSuccess])


     

  const createComment = (e : FormEvent) => {
     e.preventDefault()
     
      
     dispatch(getCommentFn({
      articleId,
      comment
     }))

  }
  return !loginState.data.isSuccess ? <Link to="/auth/login" className={buttonVariants({variant : "link"})}>Please sign in before commenting</Link> :  (
    <div>
      <form onSubmit={createComment} className="my-5 relative">

        <h1>Add Comment</h1>
        <div className="flex gap-3 items-center justify-center">
        <div className="border-2 border-blue-800 h-[40px]  p-3 rounded-3xl flex items-center justify-center">
          <h1 className="font-bold ">
          {loginState.data.user.fullname[0].toUpperCase()}
          </h1>
        </div>
        <Textarea 
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Please enter your comment " />
       
        </div>
        <Button className="my-4 absolute right-1">
          {stateData.loading ? <Spinner/> : "comment"}
        </Button>
      </form>
    </div>
  )
}

export default Comments
