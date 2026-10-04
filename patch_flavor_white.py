import re

with open('src/app/page.tsx', 'r') as f:
    page = f.read()

page = page.replace('className="menu-card"', 'className={`menu-card ${item.category === "Flavor White" ? "flavor-white-card" : ""}`}')

with open('src/app/page.tsx', 'w') as f:
    f.write(page)

with open('src/app/globals.css', 'r') as f:
    css = f.read()

css += """
.flavor-white-card {
  background: #ebebeb !important;
  color: #111 !important;
}
.flavor-white-card h3, 
.flavor-white-card p.desc, 
.flavor-white-card .price {
  color: #111 !important;
}
.flavor-white-card .card-image-wrapper {
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
"""

with open('src/app/globals.css', 'w') as f:
    f.write(css)
