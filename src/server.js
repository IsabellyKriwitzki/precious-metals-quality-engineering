const express = require('express');

const app = express();
app.use(express.json());

const products = [
  { id: 'GOLD-1OZ', metal: 'Gold', name: 'Gold Bar 1 oz', unit: 'oz', price: 2350.00, available: true },
  { id: 'SILVER-1KG', metal: 'Silver', name: 'Silver Bar 1 kg', unit: 'kg', price: 980.00, available: true }
];

const orders = new Map();

app.get('/health', (_req, res) => res.json({ status: 'UP' }));

app.get('/api/products', (_req, res) => {
  res.json({ products, currency: 'EUR', priceTimestamp: new Date().toISOString() });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'PRODUCT_NOT_FOUND' });
  res.json({ product, currency: 'EUR', priceTimestamp: new Date().toISOString() });
});

app.post('/api/orders', (req, res) => {
  const { userId, productId, quantity, paymentStatus = 'APPROVED' } = req.body;
  const product = products.find(p => p.id === productId);

  if (!userId || !productId || !Number.isInteger(quantity)) {
    return res.status(400).json({ error: 'INVALID_ORDER_DATA' });
  }
  if (quantity <= 0) return res.status(400).json({ error: 'INVALID_QUANTITY' });
  if (!product || !product.available) return res.status(409).json({ error: 'PRODUCT_UNAVAILABLE' });
  if (paymentStatus === 'DECLINED') return res.status(402).json({ error: 'PAYMENT_DECLINED' });

  const order = {
    id: `ORD-${Date.now()}`,
    userId,
    productId,
    quantity,
    unitPrice: product.price,
    total: Number((product.price * quantity).toFixed(2)),
    status: 'CONFIRMED',
    createdAt: new Date().toISOString()
  };

  orders.set(order.id, order);
  res.status(201).json(order);
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) return res.status(404).json({ error: 'ORDER_NOT_FOUND' });

  const requestedUser = req.header('x-user-id');
  if (requestedUser && requestedUser !== order.userId) {
    return res.status(403).json({ error: 'FORBIDDEN' });
  }

  res.json(order);
});

app.get('/', (_req, res) => {
  res.send(`<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AurumVault Demo</title>
<style>
body{font-family:Inter,Arial,sans-serif;max-width:900px;margin:40px auto;padding:0 20px;background:#f7f7f5;color:#202020}
.card{background:white;border:1px solid #ddd;border-radius:12px;padding:24px;margin:16px 0}
button{padding:11px 18px;border:0;border-radius:8px;cursor:pointer;background:#222;color:#fff}
.price{font-size:30px;font-weight:700}.muted{color:#666}.success{color:#16733a}
</style>
</head>
<body>
<h1>AurumVault</h1>
<p class="muted">Independent demo application for QA/Quality Engineering testing.</p>
<div class="card">
  <h2>Gold Bar 1 oz</h2>
  <p id="price" class="price">€2,350.00</p>
  <label for="quantity">Quantity</label><br>
  <input id="quantity" type="number" min="1" value="1">
  <p>Total: <strong id="total">€2,350.00</strong></p>
  <button id="buy">Place order</button>
  <p id="message"></p>
</div>
<script>
const productId='GOLD-1OZ';
const priceEl=document.getElementById('price');
const totalEl=document.getElementById('total');
const qtyEl=document.getElementById('quantity');
const msg=document.getElementById('message');
let price=2350;
function money(v){return new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR'}).format(v);}
function update(){const q=Number(qtyEl.value); totalEl.textContent=money(price*q);}
qtyEl.addEventListener('input',update);
fetch('/api/products/'+productId).then(r=>r.json()).then(d=>{
 price=d.product.price; priceEl.textContent=money(price); update();
});
document.getElementById('buy').addEventListener('click',async()=>{
 const quantity=Number(qtyEl.value);
 const response=await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},
 body:JSON.stringify({userId:'user-100',productId,quantity})});
 const data=await response.json();
 if(response.ok){msg.className='success';msg.textContent='Order '+data.id+' confirmed.';}
 else{msg.textContent=data.error;}
});
</script>
</body></html>`);
});

app.listen(3000, '0.0.0.0', () => console.log('AurumVault running on http://127.0.0.1:3000'));