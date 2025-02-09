import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ICreateArtcile } from '../../types/article';
import { AuthRequest } from '../../types/request';
const prisma = new PrismaClient();

export const createArticle = async (req: AuthRequest, res: Response) => {
  try {
    const data: ICreateArtcile = req.body;

    const newArticle = await prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
        is_published: data.isPublished,
        user_id: req.userId!
      },
      include: {
        user: {
          select: {
            fullname: true,
            email: true
          }
        }
      }
    });

    res.status(200).json({
      isSuccess: true,
      message: 'New article is successfully created!',
      newArticle
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      isSuccess: false,
      message: 'Something went wrong!'
    });
  }
};

// TODO: Get all articles (only published ones)
export const getAllArticles = async (req: Request, res: Response) => {
  try {
    const articles = await prisma.article.findMany({
      where: {
        
      },include : {
        user : {
          select : {
            id : true,
            fullname : true
          }
        }
      }
    });

    res.status(200).json({
      isSuccess: true,
      articles
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      isSuccess: false,
      message: 'Something went wrong!'
    });
  }
};

// TODO: Get my articles (published/unpublished)
export const getMyArticles = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const myArticles = await prisma.article.findMany({
      where: {
        user_id: userId
      },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true
          }
        }
      }
    });

    res.status(200).json({
      isSuccess: true,
      articles: myArticles
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      isSuccess: false,
      message: 'Something went wrong!'
    });
  }
};

// export const deleteArticles = async (req : Request, res: Response) => {
//   try {
//     const articleId = req.params;
//     const article = await prisma.article.findUnique({
//       where : {
//         id : +articleId
//       }
//     })

//     if (!articleId) {
//       res.status(404).json({
//         message : "articleid not found",
//         isSuccess : false
//       })
//       return 
//     }

//     if (!article) {
//       res.status(404).json({
//         message : "article not found",
//         isSuccess : false
//       })
//       return 
//     }

//     await prisma.article.delete({
//       where : {
//         id : +articleId
//       }
//     })

//     res.status(200).json({
//       message : "article deleted successfully",
//       isSuccess : true
//     })


//   } catch (error) {
//    console.log(error)
//    res.status(500).json({
//      message : "server error",
//      isSuccess: false
//    })
//   }
//  }



export const deleteArticles = async (req: Request , res: Response) => {
  try {
   const articleId  = req.params.articleId
 
   if (!articleId) {
    res.status(400).json({
      message : "articles id is not found"
    })
    return
   }
   const article = await prisma.article.delete({
     where : {
       id : +articleId
     }
   })
 
   if (!article) {
     res.status(404).json({
       message: "article not found",
       isSuccess : false
     })
     return
   }
 
   res.status(201).json({
      message : "article is deleted successfully",
      article
   })
 
 
   
  } catch (error) {
   console.log(error)
   res.status(500).json({
     message: "something went wrong with your server",
     isSuccess : false
   })
  }
 }

export const getOneArticle = async (req: Request , res: Response) => {
 try {
  const articleId = req.params.articleId

  const article = await prisma.article.findFirst({
    where : {
      id : +articleId
    },
    include : {
      user : {
        select : {
          id : true,
          fullname : true
        }
      }
    }
  })

  if (!article) {
    res.status(404).json({
      message: "article not found",
      isSuccess : false
    })
    return
  }

  res.status(201).json({
     message : "articles is fetched successflly",
     article
  })


  
 } catch (error) {
  console.log(error)
  res.status(500).json({
    message: "something went wrong with your server",
    isSuccess : false
  })
 }
}