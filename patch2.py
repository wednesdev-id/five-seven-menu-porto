import re

with open('src/app/page.tsx', 'r') as f:
    code = f.read()

# Add images to items missing them
code = code.replace('{ id: "regular-beans", name: "Regular Beans", category: "Filter", price: 25000, note: "Filter coffee" },', '{ id: "regular-beans", name: "Regular Beans", category: "Filter", price: 25000, note: "Filter coffee", image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=600&h=480&fit=crop" },')
code = code.replace('{ id: "specialty-beans", name: "Specialty Beans", category: "Filter", price: 30000, note: "Filter coffee" },', '{ id: "specialty-beans", name: "Specialty Beans", category: "Filter", price: 30000, note: "Filter coffee", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=480&fit=crop" },')
code = code.replace('{ id: "english-breakfast", name: "ENGLISH BREAKFAST", category: "Tea", price: 20000, note: "Hot / Ice. Dilmah base. Ice with sugar, hot no sugar." },', '{ id: "english-breakfast", name: "ENGLISH BREAKFAST", category: "Tea", price: 20000, note: "Hot / Ice.", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&h=480&fit=crop" },')
code = code.replace('{ id: "lychee-tea", name: "LYCHEE", category: "Tea", price: 28000, note: "Hot / Ice. Dilmah base. Ice with sugar, hot no sugar." },', '{ id: "lychee-tea", name: "LYCHEE", category: "Tea", price: 28000, note: "Hot / Ice.", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=480&fit=crop" },')

# For the generic items that might be using `.css-neutral-placeholder`, we also update page.tsx to render image tag if present, else placeholder.
# Wait, let's check how image is rendered in page.tsx
with open('src/app/page.tsx', 'w') as f:
    f.write(code)
