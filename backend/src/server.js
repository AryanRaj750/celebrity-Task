import  express from 'express';
import { PORT } from './config';
import errorHandler from './middlewares/errorHandler';
import userRoute from './routers';
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(cors())

// ****************** Search routes ******************************************
app.get('/test', (req, res) => {
    res.json({test: 'test success !!!'})
})

// ************************************* User routes *********************************************
app.use('/user', userRoute);

app.use(errorHandler)
app.listen(PORT, () =>console.log(`\nServer Listening on port ${PORT} !!!`));
