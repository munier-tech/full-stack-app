import TextEditor from "@/components/TextEditor"
import { Input } from "@/components/ui/input"
import { FormEvent, useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { createArticleThunk, removeExistedArticle } from "@/redux/slices/articles/articleSlice"
import { Button } from "@/components/ui/button"
import Spinner from "../Spinner"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"


const Article = () => {
  const getArticleState = useSelector((state : RootState) => state.article)
  const dispatch = useDispatch<AppDispatch>()

  const [content , setContent] = useState("")
  const [title, setTitle] = useState("")
  const [isPublished , setIsPublished] = useState(false)
  const navigate = useNavigate()
  const toastId = "creating"

  const handleSubmit = (e : FormEvent) => {
    e.preventDefault()

    toast.loading("creating article", {id:toastId})
    dispatch(createArticleThunk({
      content,
      title,
      isPublished
    }))
    
    
  }
  useEffect(() => {
    if (getArticleState.data?.isSuccess) {
      navigate("/articleDetailPage")
    }
    if (getArticleState.data?.isSuccess) {
        toast.success("article successfully created", {id:toastId})
    }
    if (getArticleState.error) {
      toast.error("content or title is too short", {id:toastId} )
    }
    dispatch(removeExistedArticle())
  }, [getArticleState.data?.isSuccess, getArticleState.error])
  return (
    <div className="w-[80%] md:w-[60%] lg:w-[40%] my-5 mx-auto">
      <h1 className="text-center text-4xl font-bold">Create new article</h1>
      <form onSubmit={handleSubmit} className="border border-gray-300 p-3 my-4 rounded-md ">
        <label htmlFor="title">Title</label>
        <Input 
        value={title}
        onChange={(e) => setTitle(e.target.value) }
        placeholder="Enter your article title " />
        <label htmlFor="desc">Description</label>
        <TextEditor setContent={setContent}/>
        <div className="my-3 flex gap-3">
        <Switch 
        onCheckedChange={v => setIsPublished(v) }/>
        <label htmlFor="content">published</label>
        </div>
        <Button> 
          {getArticleState.loading ? <Spinner/> : "save article"}
        </Button>
      </form>
    </div>
  )
}

export default Article
