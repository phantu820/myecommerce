const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const stripe = require('stripe')("sk_test_51OMrBNCarYPlPvSfJEKXRWBQGIpA34ed2dwofwY4oDwr98CeslepY8Uv3EbwYdn6loadXXGmYSfsatl8hCqVpqND00yF6J2aQt");
require('./connection')
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', "DELETE"]
})

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', require("./routes"));



app.post('/create-payment', async (req, res) => {
  const { amount } = req.body;
  console.log(amount);
  const a = amount * 100;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: a,
      currency: 'usd',
      payment_method_types: ['card']
    });
    res.status(200).json(paymentIntent)
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
  }
})


server.listen(8080, () => {
  console.log('server running at port', 8080)
})

app.set('socketio', io);
