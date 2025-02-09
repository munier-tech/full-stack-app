import TextEditor2 from "@/components/textEditor2"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreatePostFn, removerPost } from "@/redux/slices/posts/postslice"
import { AppDispatch, RootState } from "@/redux/store"
import { FormEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Spinner from "../../pages/Spinner"
import toast from "react-hot-toast"

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [desc, setDesc] = useState("")
  const  postState = useSelector((state : RootState) => state.createPostSlice)
  const dispatch = useDispatch<AppDispatch>()


 

  const handleSumbit = (e : FormEvent) => {
   e.preventDefault()

   dispatch(CreatePostFn({
    title,
    content,
    desc
  }))



  if (postState.loading) return <Spinner/>

  if (postState.error) return toast.error(postState.error) 

    
  }


  useEffect(() => {
    if (postState.data.isSuccess) {
      toast.success("post created successfully")
    }
  } , [postState.data.isSuccess])

 
  useEffect(() => {
    if (postState.data.isSuccess) {
      dispatch(removerPost())
    }
  } , [postState.data.isSuccess])


  return (

    
    <div>
       <div className="w-[80%] md:w-[60%] lg:w-[40%] my-5 mx-auto">
      <h1 className="text-center text-4xl font-bold">Create new Post</h1>
      <form  onSubmit={handleSumbit} className="border border-gray-300 p-3 my-4 rounded-md ">
        <label htmlFor="title">Location</label>
        <Input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter your post location " />
        <label htmlFor="desc">Description</label>
        <TextEditor2 setContent={setContent}/>
        <div className="my-3 flex flex-col  justify-center gap-3">
        <label htmlFor="content">description</label>
         <Input 
         value={desc}
         onChange={(e) => setDesc(e.target.value)}
         placeholder="please enter your description"/>
        </div>
        <Button> 
          publish
        </Button>
      </form>
    </div>
    </div>
  )
}

export default CreatePost
