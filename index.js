import 'dotenv/config'
import express from 'express'
import  initApp from './src/app.router.js'
import Stripe from "stripe";


const stripe=new Stripe('sk_test_51PcXQBRt8HjPHaHb4HbH31wIZ0xEC5MCD6POGYh6OKYQ1FjMzbKNRslAGHqU73yNsQrPJNID3YCelTLMncp2zsKP003xI3wGhA');

const app = express();
const PORT = process.env.PORT || 3000 ;
initApp(app,express);

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig,  "whsec_38cdace8cb62edd32d95096c24f05dc893826c74fa2a28014a03fc059697f388");
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
 
    if(event.type== 'checkout.session.completed'){
       const checkoutSessionCompleted = event.data.object;
    }else{
       console.log(`Unhandled event type ${event.type}`);
    }
  
   
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });
 

app.listen(PORT, ()=>{
console.log(`server is running .... ${PORT}`);
})
