require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

const Stripe = require("stripe")(process.env.Secret_key)

app.disable('x-powered-by');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post('/payment', async (req, res) => {
    let status, error;
    const { token, amount } = req.body;
    try {
        await Stripe.charges.create({
            source: token.id,
            amount,
            currency: 'usd',
        });
        status = 'success';
    } catch (error) {
        console.log(error);
        status = 'Failure';
    }
    res.json({ error, status });
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`server is run 5000`);
})

