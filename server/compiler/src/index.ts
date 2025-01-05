import express from 'express';
import { compilerRouter } from './routes/compilerRoutes';

const app = express();
app.use(express.json());

const router = express.Router();

compilerRouter(router)

app.use('/compiler' , router)

app.get('/compiler' , (req, res) => {
    res.json('compiler running')
})

app.get('/', (req, res)=> {
    res.json('Compiler service')
})

const PORT = process.env.PORT || 5004

app.listen(PORT, () => {
    console.log(`Compiler service is running on http://localhost:5004/`)
})