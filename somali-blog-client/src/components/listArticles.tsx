import Spinner from "@/pages/Spinner"
import { listArticlesFn } from "@/redux/slices/articles/listArticleSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Badge } from "@/components/ui/badge"
import articlePic from "../assets/undraw_articles_visl.png"
import { useNavigate } from "react-router-dom"

const ListArticles = () => {
  const dispatch = useDispatch<AppDispatch>()
  const articleData = useSelector((state : RootState) => state.listArticelsSlice)
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(listArticlesFn())
  } , [])

 

  if (articleData.loading) return <div className="flex items-center justify-center my-5"><Spinner/></div>
  if (articleData.error) return <p className="text-center text-rose-500 font-bold">
    {articleData.error}
  </p>
  return (
    <div  className="w-[80] md:w-[70%] lg:w-[60%] mx-auto">
      <div className="my-10 ">
         <h1 className="flex justify-center items-center mx-auto text-2xl font-bold border rounded-md w-[50%] bg-black text-white p-3">
          All Articles
          </h1>
          <div className="flex items-center justify-center">
          <img className="w-[100px]" src={articlePic} alt="article" />
          </div>
      </div>
     
      <div className="grid my-10 " >
        {articleData.data?.articles?.map((articles) => <div className="relative my-3  border shadow-lg p-8 hover:bg-black hover:text-white transition-all cursor-pointer" onClick={() =>
           navigate(`/articles/${articles.id}`)} >
          <h1 className="text-3xl w-[45rem] font-bold">
            {articles.title}
          </h1>
          <div className="my-2 absolute right-3 top-2">
          {articles.is_published ? <Badge> published </Badge> :  <Badge variant={"destructive"}> Unpublished </Badge> }
          </div>
         </div>
      )}
      </div>
    </div>
  )
}

export default ListArticles
