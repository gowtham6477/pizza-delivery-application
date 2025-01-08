import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: 'rzp_test_wRRcjbZESJz17',
  key_secret: 'TgdpDsPKTqRcWSyvnQQUUTnt',
});

export default async function handler(req, res) {
  // Ensure only POST method is accepted
  if (req.method === 'POST') {
    const { amount } = req.body; // Amount in INR (not in paise)

    // Razorpay order creation options
    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: 'order_receipt_1',
    };

    try {
      const order = await razorpay.orders.create(options);
      res.status(200).json(order); // Send back the order details
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    // If method is not POST, return 405 Method Not Allowed
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
