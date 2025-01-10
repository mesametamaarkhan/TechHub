import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { PORT, mongoDBCon } from './config.js';
import UserRoutes from './routes/UserRoutes.js';
import ProductRoutes from './routes/ProductRoutes.js';
import CategoryRoutes from './routes/CategoryRoutes.js';
import CartRoutes from './routes/CartRoutes.js';
import OrderRoutes from './routes/OrderRoutes.js';
import SupportTicketRoutes from './routes/SupportTicketRoutes.js';

const app = express();

//middleware
app.use(express.json());

//handling all cors (alternative is to use custom origins)
app.use(cors()); 

//other custom middleware (route handling)
app.use('/user', UserRoutes);
app.use('/products', ProductRoutes);
app.use('/categories', CategoryRoutes);
app.use('/cart', CartRoutes);
app.use('/orders', OrderRoutes);
app.use('/support', SupportTicketRoutes);

//landing page
app.get('/', (req, res) => {
    console.log('Hello');
    return res.status(234).send('Welcome');
});

//connect database
mongoose.connect(mongoDBCon)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });