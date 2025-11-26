require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser'); 

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const internshipRoutes = require('./routes/internships');
const taskRoutes = require('./routes/tasks');
const paymentRoutes = require('./routes/payments');
const { handleStripeWebhook } = require('./controllers/paymentController');

const app = express();
app.use(cors());

// For all non-webhook routes use JSON parsing
app.use(express.json({
  verify: (req, res, buf) => {
    // save raw body for Stripe webhook verification if needed
    req.rawBody = buf.toString();
  }
}));

// connect DB
connectDB(process.env.MONGO_URI);

// routes (normal)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/payments', paymentRoutes);

app.post('/webhook/stripe', express.raw({ type: 'application/json' }), (req, res, next) => {
  // attach rawBody required by controller
  req.rawBody = req.body.toString();
  return handleStripeWebhook(req, res, next).catch(next);
});

// health route
app.get('/', (req, res) => res.send({ status: 'ok', timestamp: new Date() }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));