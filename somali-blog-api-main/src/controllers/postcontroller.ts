import { Request, Response } from "express";
import { iCreatePost } from "../../types/post";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../../types/request";
const prisma = new PrismaClient()


export const createPost = async(req: AuthRequest, res: Response) => {
   try {
     const data = req.body as iCreatePost

     const createdPost  = await prisma.post.create({
      data : {
        title : data.title,
        content : data.content,
        desc : data.desc,
        user_id: req.userId!
      }
     }) 

     res.status(201).json({
      message : "post created successfully",
      isSuccess : true,
      createdPost
     })
    
   } catch (error) {
    console.log(error)
    res.status(500).json({
      message : "something went wrong please try again",
      isSuccess : false
    })
   }
}



export const listPost = async (req:Request, res: Response) => {
  try {
      
    const listPosts = await prisma.post.findMany({
      include : {
        user : {
          select : {
            id : true,
            fullname : true,
            email :  true
          }
        }
      }
    })


    res.status(200).json({
      message : "posts fetched successfully",
      isSuccess : true,
      listPosts
    })


  } catch (error) {
    console.log(error)
    res.status(500).json({
      message : "something went wrong please try again",
      isSuccess : false
    })
  }
}


export const deletePost = async (req: Request , res: Response) => {
  try {
    const postId  = req.params.postId

    if (!postId) {
      res.status(404).json({
        message : "post Id not found",
        isSuccess : false
      })
      return 
    }

    const deletedPost = await prisma.post.delete({
      where : {
        id : +postId
      }
    })


    if (!deletedPost) {
      res.status(404).json({
        message : "the post you are looking for doesnt exist",
        isSuccess : false
      })
      return 
    }

    res.status(200).json({
      message : "post deleted successfully",
      isSuccess : true
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message : "something went wrong please try again",
      isSuccess : false
    })
  }
}