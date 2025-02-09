import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../../types/request';
import { Request, Response } from 'express';
import { ICreateComment } from '../../types/comment';
const prisma = new PrismaClient();

export const createComment = async (req: AuthRequest, res: Response) => {
  try {
    const data: ICreateComment = req.body;
    const userId = req.userId;

    const article = await prisma.article.findUnique({
      where: {
        id: data.articleId
      }
    });

    if (!article) {
      res.status(404).json({
        isSuccess: false,
        message: 'Article not found '
      });

      return;
    }

    if (!article.is_published) {
      res.status(400).json({
        isSuccess: false,
        message: 'Article is not published yet!'
      });

      return;
    }

    const comment = await prisma.comments.create({
      data: {
        comment: data.comment,
        article_id: data.articleId,
        user_id: userId!
      }
    });

    res.status(201).json({
      isSuccess: true,
      message: 'Success',
      comment
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      isSuccess: false,
      message: 'Something went wrong with the server'
    });
  }
};

export const getArticleComments = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;
    // @ts-ignore
    const { page, size }: { page: number; size: number } = req.query;

    const skip = (+page - 1) * +size;

    const comments = await prisma.comments.findMany({
      where: {
        article_id: +articleId
      },
      skip: skip,
      take: +size,
      include : {
        users : {
          select : {
            id : true,
            fullname : true,
          }
        }
      }
    });

    res.status(200).json({
      isSuccess: true,
      comments,
      page,
      size
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      isSuccess: false,
      message: 'Something went wrong with the server'
    });
  }
};



export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params

    const comment = await prisma.comments.findUnique({
      where : {
        id : +commentId
      }
    })

    
    const id = parseInt(commentId, 10);
    
    if (!comment) {
      res.status(404).json({
        message : "comment not found",
        isSuccess : false
      })
      return
    }
    
  const deletedComment = await prisma.comments.delete({
    where :  { id }
  })

  res.status(201).json({
    message : "comment deleted successfully",
    isSuccess : true,
    deletedComment
  })
    

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message : "something went wrong with your server",
      isSuccess : false
    })
  }
}