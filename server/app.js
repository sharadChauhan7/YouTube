import express from 'express'
import cors from 'cors'
const app = express();
import Video from './routes/Video.js';
import Auth from './routes/auth.js';
import Comments from './routes/comments.js'


app.use(express.urlencoded({extended:true}));
app.use(express.json());

const corsOptions={
    origin:"http://localhost:5173",
    withCredential:true,
}
app.use(cors(corsOptions));

app.use('/',Video);
app.use('/auth',Auth);
app.use('/comments',Comments);
app.listen(8080,()=>{
    console.log("Server is listening")
});