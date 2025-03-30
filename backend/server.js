
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const invoiceRoutes = require('./routes/invoiceRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');


dotenv.config({ path: __dirname + '/.env' });



const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', authRoutes);
app.use('/api/invoices', invoiceRoutes);


console.log("✅ Auth routes loaded:", app._router.stack.map(r => r.route?.path).filter(Boolean));
// console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

const port = process.env.PORT || 5001;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});


app.get('/test', (req, res) => {
  res.send('Testing route is working');
});
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(' MongoDB connection failed:', err.message));

  
module.exports = app
