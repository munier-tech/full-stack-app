import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRoute from './routes/user.route';
import articleRoute from './routes/article.route';
import commentRoute from './routes/comment.route';
import postRoute    from './routes/post.route'
import cors from "cors"

const app = express();
const PORT = process.env.PORT;

// Allows the data from the client
app.use(express.json());
app.use(cors({
  origin : ["http://localhost:5173"]
}))

app.use('/api/users', userRoute);
app.use('/api/articles', articleRoute);
app.use('/api/comment', commentRoute);
app.use('/api/post', postRoute);

app.listen(5000, () => {
  console.log(`Server is running on port ${5000}`);
});
