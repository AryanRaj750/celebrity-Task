import mongoose from 'mongoose';
import { DB_URL } from '../config';

const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

mongoose.connect(DB_URL+'admin', opts);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database Connected...');
});


const dbs = () =>{
    try {
        mongoose.UsersData = mongoose.createConnection(DB_URL + 'UsersData', opts),
        mongoose.User = mongoose.createConnection(DB_URL + 'CS', opts),
        mongoose.Transaction = mongoose.createConnection(DB_URL + 'Transactions', opts)

    } catch(errr) {
        console.log(err);
    }
}

const connect = async () => {
    return await (dbs())
}

connect();

export default mongoose;