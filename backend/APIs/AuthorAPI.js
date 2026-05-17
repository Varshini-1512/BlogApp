import exp from 'express'
import { UserTypeModel } from '../models/UserModel.js'
import { ArticleModel } from '../models/ArticleModel.js'
import { register, authenticate } from '../services/authService.js'
import { checkAuthor } from '../middlewares/checkAuthor.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import { upload } from '../config/multer.js'
import cloudinary from '../config/cloudinary.js'
import { uploadToCloudinary } from '../config/cloudnariFile.js'

export const authorRoute = exp.Router()

// Register author(public)
authorRoute.post("/users",
  upload.single("profileImageUrl"),
  async (req, res, next) => {
    let cloudinaryResult;
    try {
      let userObj = req.body;
      //  Step 1: upload image to cloudinary from memoryStorage (if exists)
      if (req.file) {
        cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      }
      // Step 2: call existing register()
      const newUserObj = await register({
        ...userObj,
        role: "AUTHOR",
        profileImageUrl: cloudinaryResult?.secure_url,
      });
      res.status(201).json({
        message: "author created",
        payload: newUserObj,
      });
    } catch (err) {
      // Step 3: rollback 
      if (cloudinaryResult?.public_id) {
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);
      }
      next(err); // send to your error middleware
    }
  }
);

// cteate article(protected)
authorRoute.post('/articles', verifyToken("AUTHOR"), async (req, res) => {
  // get article from req
  let articleObj = req.body
  // check for the author exist or not
  /*const author=await UserTypeModel.findById(articleObj.author)
  if(!author || author.role!=="AUTHOR"){
      res.status(401).json({message:"Invalid author"})
  }*/
  // create article documnet
  let newArticleDoc = new ArticleModel(articleObj)
  // save
  let createdArticleDoc = await newArticleDoc.save()
  // send res
  res.status(201).json({ messgae: "article created", payload: createdArticleDoc })
})

// read article of author(protected)
authorRoute.get("/article/:authorid", verifyToken("AUTHOR"), async (req, res) => {
  // get author id
  let authorid = req.params.authorid
  // read article by this author
  const articleObj = await ArticleModel.find({ author: authorid }).populate("author").populate("comments.user", "email firstname")
  // send res
  res.status(201).json({ message: "articles", payload: articleObj })
})

// edit article(protected)
authorRoute.put('/articles', verifyToken("AUTHOR"), async (req, res) => {
  // get modified article from req
  let { articleid, title, category, content } = req.body;
  // find article
  let article = await ArticleModel.findOne({ _id: articleid });
  if (!article)
    return res.status(401).json({ message: "article not found" })
  // check if the article is published by the aythor or not

  // update the article
  let updatedArticle = await ArticleModel.findByIdAndUpdate(articleid, { $set: { title, category, content } }, { new: true })
  // send res
  res.status(201).json({ message: "updated the article", payload: updatedArticle })
})

// delete article(protected)
authorRoute.delete('/article/:articleid/author/:authorid', verifyToken("AUTHOR"), async (req, res) => {
  // read article id
  const { articleid, authorid } = req.params
  // find article 
  let article = await ArticleModel.findOne({ _id: articleid, author: authorid });
  if (!article)
    return res.status(401).json({ message: "article not found" })
  // delete the article
  let deletedArticle = await ArticleModel.findByIdAndDelete(articleid)
  // send res
  res.status(201).json({ message: "article deleted", payload: deletedArticle })
})

//delete(soft delete) article(Protected route)
authorRoute.patch("/articles/:id/status", verifyToken("AUTHOR"), async (req, res) => {
  const { id } = req.params;
  const { isArticleActive } = req.body;
  // Find article
  const article = await ArticleModel.findById(id); //.populate("author");
  //console.log(article)
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }
  //console.log(req.user.userId,article.author.toString())
  // AUTHOR can only modify their own articles
  if (req.user.role === "AUTHOR" &&
    article.author.toString() !== req.user.userId) {
    return res.status(403).json({ message: "Forbidden. You can only modify your own articles" });
  }
  // Already in requested state
  if (article.isArticleActive === isArticleActive) {
    return res.status(400).json({
      message: `Article is already ${isArticleActive ? "active" : "deleted"}`,
    });
  }

  //update status
  article.isArticleActive = isArticleActive;
  await article.save();

  //send res
  res.status(200).json({
    message: `Article ${isArticleActive ? "restored" : "deleted"} successfully`,
    article,
  });
});
