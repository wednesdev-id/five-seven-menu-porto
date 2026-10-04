import re

with open('src/app/page.tsx', 'r') as f:
    page = f.read()

# 1. Remove banner
page = re.sub(r'\s*<p className="demo-banner">.*?</p>', '', page)

# 2. Change DEMO MENU to DINE IN
page = page.replace('{table ? `TABLE ${table}` : "DEMO MENU"}', '{table ? `TABLE ${table}` : "DINE IN"}')

# 3. Change Demo table to Dine In
page = page.replace('{table ? `Table ${table}` : "Demo table"}', '{table ? `Table ${table}` : "Dine In"}')

# 4. Remove notice
page = re.sub(r'\s*\{!table && <p className="notice">.*?</p>\}', '', page)

# 5. Total demo -> Total
page = page.replace('Total demo', 'Total')

# 6. QRIS Placeholder only -> Instant QRIS
page = page.replace('<small>Placeholder only</small>', '<small>Instant QRIS</small>')

# 7. Cashier Demo counter -> Pay at counter
page = page.replace('<small>Demo counter</small>', '<small>Pay at cashier</small>')

# 8. Place demo order -> Place Order
page = page.replace('Place demo order', 'Place Order')

# 9. Order noted for demo -> Order Received
page = page.replace('Order noted for demo.', 'Order Received!')

# 10. Disclaimer text replacement
page = page.replace('No order sent to cashier or kitchen. No payment processed.', 'Your order has been sent to the kitchen.')

with open('src/app/page.tsx', 'w') as f:
    f.write(page)
