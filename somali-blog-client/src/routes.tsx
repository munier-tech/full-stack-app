import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Article from "./pages/articles/article";
import ArticlesDetail from "./pages/articles/articlesDetail";
import DeleteComments from "./pages/deleteComments";
import ListArticles from "./components/listArticles";
import CreatePost from "./components/posts/createPost";


const router = createBrowserRouter([
  {
    path : '/',
    element : <MainPage/>,
    children : [
      {
        index : true,
        element : <HomePage/>
      },
      {
        path : "auth",
        children : [
          {
            path : "login",
            element : <LoginPage/>
          },
          {
            path : "register",
            element : <RegisterPage/>
          },
        ]
      },
      {
          path : "/articleDetailPage",
          element : <ListArticles/> 
      },
      {
        path : "new",
        element : <Article/>
      },
      {
        path : "createPost",
        element : <CreatePost/>
      },
      {
        path : "deleteComments",
        element : <DeleteComments/>
      },
      {
        path : "articles/:articleId",
        element : <ArticlesDetail/>
      },
      {
        path : "*",
        element : <NotFoundPage/>
      }
    ]
  }
])


export default router