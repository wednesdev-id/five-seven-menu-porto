"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { MinusIcon, PlusIcon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";

const menu = [
  // Signature
  { id: "cold-nitro", name: "COLD NITRO", category: "Signature", price: 28000, description: "Nitro coffee with a splash of Roun syrup and a squeeze of lemon for that perfect zin", image: "/cold-nitro.jpg" },
  { id: "mont-blanc", name: "MONT BLANC", category: "Signature", price: 30000, description: "Coffee brew with vanilla flavour- a zesty love story in a glass", image: "/mont-blanc.jpg" },
  { id: "baileys", name: "BAILEYS", category: "Signature", price: 28000, description: "A creamy blend of coffee milk, and the sweet touch of Roun & Butterscotch syrup. One sip, and you'll fall in love", image: "/baileys.jpg" },
  { id: "citrus-twist", name: "CITRUS TWIST", category: "Signature", price: 30000, description: "Bright, tangy, and refreshingly fun-like sunshine with a splash of sass", image: "/citrus-twist.jpg" },

  // Classic Coffee
  { id: "espresso", name: "Espresso", category: "Classic", price: 20000, note: "Hot", image: "/classic.jpg" },
  { id: "affogato", name: "Affogato", category: "Classic", price: 23000, note: "Ice", image: "/classic.jpg" },
  { id: "americano-arabica", name: "Americano", variant: "Arabica", category: "Classic", price: 27000, note: "Hot / Ice", image: "/classic.jpg" },
  { id: "americano-robusta", name: "Americano", variant: "Robusta", category: "Classic", price: 23000, note: "Hot / Ice", image: "/classic.jpg" },
  { id: "cappucino-arabica", name: "Cappucino", variant: "Arabica", category: "Classic", price: 33000, note: "Hot", image: "/classic.jpg" },
  { id: "cappucino-robusta", name: "Cappucino", variant: "Robusta", category: "Classic", price: 30000, note: "Hot", image: "/classic.jpg" },
  { id: "cafe-latte", name: "Cafe Latte", category: "Classic", price: 25000, note: "Hot / Ice", image: "/classic.jpg" },

  // Coffee Filter
  { id: "regular-beans", name: "Regular Beans", category: "Filter", price: 25000, note: "Filter coffee", image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=600&h=480&fit=crop" },
  { id: "specialty-beans", name: "Specialty Beans", category: "Filter", price: 30000, note: "Filter coffee", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=480&fit=crop" },

  // Flavor White
  { id: "sol-de-crema", name: "SOL DE CREMA", category: "Flavor White", price: 30000, description: "Using fine robusta coffee that we mix with vanilla and caramel,the balance is created with the addition of magic milk that we use. This drink is quite sweet with a medium coffee taste", image: "/sol-de-crema.jpg" },
  { id: "cafe-montana", name: "CAFE MONTANA", category: "Flavor White", price: 30000, description: "Like other traditional milk coffees, we use palm sugar which we infuse with double espresso. The uniqueness is on the top layer, we add soft cream so you can feel the difference in texture when enjoying it", image: "/cafe-montana.jpg" },
  { id: "ambar-de-cafe", name: "AMBAR DE CAFE", category: "Flavor White", price: 30000, description: "The sweet element of butterscotch that we combine with double espresso fine robusta and a little extr sweet cream makes this drink quite intense and certainly refreshing", image: "/ambar-de-cafe.jpg" },
  { id: "cold-white", name: "COLD WHITE", category: "Flavor White", price: 28000, description: "The character of this drink is quite light, we use cold brew full arabica and sweet from vanilla with a little addition of sweet cream. This drink is suitable for people who like to drink coffee milk but with coffee that is not too intense", image: "/cold-white.jpg" },

  // Flavor Black
  { id: "peach-americano", name: "PEACH AMERICANO", category: "Flavor Black", price: 28000, description: "Using double espresso fine robusta with an additional 15% flavor. Intense but refreshing.", image: "/peach-americano.jpg" },
  { id: "berrys-americano", name: "BERRYS AMERICANO", category: "Flavor Black", price: 28000, description: "Using double espresso fine robusta with an additional 15% flavor. Intense but refreshing.", image: "/berrys-americano.jpg" },
  { id: "floral-americano", name: "FLORAL AMERICANO", category: "Flavor Black", price: 32000, description: "Using double espresso fine robusta with an additional 15% flavor. Intense but refreshing.", image: "/floral-americano.jpg" },

  // Classic Non-Coffee
  { id: "chocoa-brust", name: "CHOCOA BRUST", category: "Non-Coffee", price: 28000, note: "Hot / Ice", description: "Milk base made from dark chocolate, and using full cream milk will produce a creamy drink with a low sweet taste.", image: "/non-coffee.jpg" },
  { id: "matcha", name: "MATCHA", category: "Non-Coffee", price: 28000, note: "Hot / Ice", description: "in this product we use matcha which has a medium sweet taste while maintaining the original matcha sensation. the addition of milk will make the texture creamier and softer", image: "/non-coffee.jpg" },

  // Frappe
  { id: "frappucino-crunch", name: "FRAPPUCINO CRUNCH", category: "Frappe", price: 35000, description: "Creamy. icy, and packed with a crunchy surprise - the ultimate cool treat!", image: "/frappe.jpg" },
  { id: "pink-happy", name: "PINK HAPPY", category: "Frappe", price: 35000, description: "Sweet, bubbly, and totality insta-worthy. Ship your way to happiness!", image: "/frappe.jpg" },

  // Matcha Series
  { id: "nutmelt", name: "NUTMELT", category: "Matcha Series", price: 35000, description: "we call it dirty matcha, using ceremonial matcha, espresso and macadamia syrup. This drink creates a harmony of taste between calmness and energy", image: "/nutmelt.jpg" },
  { id: "matcha-latte", name: "MATCHA LATTE", category: "Matcha Series", price: 30000, description: "An elegant blend of pure ceremonial-grade matcha and selected fresh milk, resulting in a taste that is smooth yet rich in character.", image: "/matcha-latte.jpg" },
  { id: "aruna", name: "ARUNA", category: "Matcha Series", price: 35000, description: "This unique blend of sweet matcha, fresh pineapple juice, and a touch of cream, this drink offers a creamy texture and a pleasantly sweet flavor", image: "/aruna.jpg" },
  { id: "shiocha", name: "SHIOCHA", category: "Matcha Series", price: 35000, description: "The combination of pure ceremonial grade matcha and sea salt cream delivers a balanced umami taste", image: "/shiocha.jpg" },
  { id: "hana", name: "HANA", category: "Matcha Series", price: 35000, description: "Pure matcha mixed with milk and strawberry cream delivers a layered, balanced flavor. It is creamy, fruity, and distinctly matcha, just like a dessert in a cup.", image: "/hana.jpg" },

  // Freshly Juice
  { id: "sour-blast", name: "SOUR BLAST", category: "Juice", price: 35000, description: "Fresh apple, pineapple, and dragon fruit juice - a zesty, fruity explosion in every sip!", image: "/juices.jpg" },
  { id: "tropical-breeze", name: "TROPICAL BREEZE", category: "Juice", price: 35000, description: "A smooth blend of pineapple, and orange juice-your tropical getaway in a glass.", image: "/juices.jpg" },
  { id: "green-flag", name: "GREEN FLAG", category: "Juice", price: 35000, description: "A crisp and refreshing blend that balances of fresh greens with the bright tartness of green apple, finished with a gentle warmth from ginger for a revitalizing", image: "/juices.jpg" },

  // Tea
  { id: "english-breakfast", name: "ENGLISH BREAKFAST", category: "Tea", price: 20000, note: "Hot / Ice.", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&h=480&fit=crop" },
  { id: "lychee-tea", name: "LYCHEE", category: "Tea", price: 28000, note: "Hot / Ice.", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=480&fit=crop" },

  // Salad
  { id: "japanese-salad", name: "JAPANESE SALAD", category: "Salad", price: 45000, description: "Crunchy greens, fresh vibes, and that nutty sesame zing. It's like a spa day...but for your taste buds", image: "/japanese-salad.jpg" },
  { id: "caesar-salad", name: "CAESAR SALAD", category: "Salad", price: 45000, description: "Crisp romaine, juicy chiken, and a perfectly chill boiled egg-because even salads deserve to feel like royalty", image: "/caesar-salad.jpg" },

  // Steak
  { id: "tenderloin-wagyu", name: "Tenderloin Wagyu Meltique", category: "Steak", price: 135000, description: "Off-grilled Wagyu steak. Tender, marbled, and juicy. Sauce: Mushroom/Blackpaper. Side: Fries/Wedges/Mashed Potato.", image: "/tenderloin.jpg" },
  { id: "norwegian-salmon", name: "Norwegian Salmon", category: "Steak", price: 135000, description: "Crispy, juicy, and just a little bit fancy. Sauce: Mushroom/Blackpaper. Side: Fries/Wedges/Mashed Potato.", image: "/salmon.jpg" },
  { id: "chiken-steak", name: "Chiken Steak", category: "Steak", price: 40000, description: "Marinated, grilled, crispy outside, and juicy inside. Variant: Breast/Thigh. Sauce: Mushroom/Blackpaper. Side: Fries/Wedges/Mashed Potato.", image: "/chicken-steak.jpg" },

  // Soup
  { id: "soup-iga", name: "SOUP IGA", category: "Soup", price: 50000, description: "Beef Rib Soup - A hearty Indonesian-style soup made with tender beef ribs, slow cooked in a savory broth with rich spices, creating a warm and comforting dish.", image: "/soup-iga.jpg" },

  // Main Course
  { id: "nasi-goreng-57", name: "NASI GORENG 57", category: "Main Course", price: 40000, description: "Fried rice with a kecombrang kick, chicken satay on the side—your taste buds won't know what hit 'em.", image: "/nasi-goreng-57.jpg" },
  { id: "nasi-goreng-seafood", name: "NASI GORENG SEAFOOD", category: "Main Course", price: 38000, description: "Shrimps, squid, and a whole lotta flavor. It's like the ocean got wok-fried for you.", image: "/nasi-goreng-seafood.jpg" },
  { id: "nasi-ayam-rempah", name: "NASI AYAM REMPAH", category: "Main Course", price: 35000, description: "Juicy chicken, bold spices, and fluffy rice. Like a warm hug... with a little spicy slap.", image: "/nasi-ayam-rempah.jpg" },
  { id: "beef-yakiniku", name: "RICEBOWL BEEF YAKINIKU", category: "Main Course", price: 38000, description: "Sweet-savory beef, steamy rice, and a soft egg on top. Comfort food just got a glow-up.", image: "/beef-yakiniku.jpg" },
  { id: "beef-teriyaki", name: "RICEBOWL BEEF TERIYAKI", category: "Main Course", price: 38000, description: "Sticky, saucy teriyaki beef with rice and egg—simple, sweet, and seriously good.", image: "/beef-teriyaki.jpg" },

  // Pasta
  { id: "spicy-tuna", name: "SPICY TUNA", category: "Pasta", price: 38000, note: "Level Hot", description: "Tuna with attitude. Spicy, savory, and totally not sorry for the kick!", image: "/spicy-tuna.jpg" },
  { id: "aglio-o-elio", name: "AGLIO O ELIO", category: "Pasta", price: 38000, description: "Garlic, chili, olive oil—so simple, yet so dramatically delicious. Pasta in its purest form.", image: "/aglio-elio.jpg" },
  { id: "carbonara", name: "CARBONARA", category: "Pasta", price: 38000, description: "Creamy, cheesy, and full of love (and maybe a little guilt).", image: "/carbonara.jpg" },
  { id: "mac-n-cheese", name: "MAC N CHEESE", category: "Pasta", price: 38000, description: "Cheesy, gooey, and made to make you smile. Like a warm blanket... but edible.", image: "/mac-n-cheese.jpg" },

  // Light Meals
  { id: "mix-platter", name: "MIX PLATTER", category: "Light Meals", price: 40000, image: "/light-meals.jpg" },
  { id: "special-nachos", name: "SPECIAL NACHOS", category: "Light Meals", price: 25000, image: "/light-meals.jpg" },
  { id: "churos", name: "CHUROS", category: "Light Meals", price: 25000, image: "/light-meals.jpg" },
  { id: "chiken-wings", name: "CHIKEN WINGS", category: "Light Meals", price: 35000, image: "/light-meals.jpg" },
  { id: "tahu-cabai-garam", name: "TAHU CABAI GARAM", category: "Light Meals", price: 25000, image: "/light-meals.jpg" },
  { id: "french-fries", name: "FRENCH FRIES", category: "Light Meals", price: 20000, image: "/light-meals.jpg" },
  { id: "banana-friters", name: "BANANA FRITERS", category: "Light Meals", price: 25000, image: "/light-meals.jpg" },
  { id: "cireng", name: "CIRENG", category: "Light Meals", price: 25000, image: "/light-meals.jpg" },
  { id: "fish-n-chips", name: "FISH N CHIPS", category: "Light Meals", price: 35000, image: "/light-meals.jpg" },

  // Dessert
  { id: "creme-brullee", name: "CREME BRULLEE", category: "Dessert", price: 30000, image: "/creme-brullee.jpg" },
  { id: "cheesecuit-strawberry", name: "CHEESECUIT STRAWBERRY", category: "Dessert", price: 35000, image: "/cheesecuit-strawberry.jpg" },
  { id: "panacota", name: "PANACOTA", category: "Dessert", price: 25000, image: "/panacota.jpg" },

  // Pizza
  { id: "papperoni-beef-pizza", name: "PAPPERONI BEEF PIZZA", category: "Pizza", price: 60000, image: "/papperoni-beef-pizza.jpg" }
];

const categories = Array.from(new Set(menu.map(item => item.category)));

const money = (value: number) => {
  const numStr = (value / 1000).toString();
  return `${numStr}K`;
};
const fullMoney = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;

type Cart = Record<string, number>;

export default function Home() {
  const [category, setCategory] = useState("Signature");
  const [cart, setCart] = useState<Cart>({});
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [table, setTable] = useState("");
  const [payment, setPayment] = useState("QRIS");
  const [ready, setReady] = useState(false);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get("table") || "";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTable(/^\d{1,2}$/.test(value) && Number(value) > 0 ? value : "");
    try {
      const saved = JSON.parse(localStorage.getItem("five-seven-cart") || "{}");
      if (saved && typeof saved === "object") setCart(Object.fromEntries(Object.entries(saved).filter(([id, qty]) => menu.some(item => item.id === id) && Number.isInteger(qty) && Number(qty) > 0 && Number(qty) <= 99)) as Cart);
    } catch {}
    setReady(true);
    const sync = () => setOffline(!navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    navigator.serviceWorker?.register("/sw.js").catch(() => undefined);
    return () => { window.removeEventListener("online", sync); window.removeEventListener("offline", sync); };
  }, []);
  useEffect(() => { if (ready) { try { localStorage.setItem("five-seven-cart", JSON.stringify(cart)); } catch {} } }, [cart, ready]);

  const items = menu.filter((item) => item.category === category);
  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const total = useMemo(() => menu.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0), [cart]);
  const add = (id: string) => setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  const remove = (id: string) => setCart((current) => { const next = { ...current, [id]: Math.max((current[id] || 0) - 1, 0) }; if (!next[id]) delete next[id]; return next; });

  return (
    <MotionConfig reducedMotion="user"><main className="site-shell">
      <p className="demo-banner">Demo — no orders sent, no payments processed.{offline ? " Offline: saved menu only." : ""}</p>
      <header className="topbar">
        <div className="brand-mark"><span>FIVE</span><strong> SEVEN</strong></div>
        <div className="table-badge">{table ? `TABLE ${table}` : "DEMO MENU"}</div>
      </header>

      <section className="menu-section" aria-label="Menu">
        <div className="tabs" role="tablist" aria-label="Menu categories" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
          {categories.map((name) => <button key={name} className={category === name ? "tab active" : "tab"} onClick={() => setCategory(name)} role="tab" aria-selected={category === name} style={{ flexShrink: 0 }}>{name}</button>)}
        </div>
        <div className="menu-grid">
          {items.map((item, index) => <motion.article key={item.id} className="menu-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
            <div className="card-image-wrapper">
              {item.image ? (
                <Image src={item.image} alt={item.name} className="card-image" fill style={{ objectFit: "cover" }} unoptimized priority={index < 4} />
              ) : (
                <div className="css-neutral-placeholder" aria-hidden="true">
                  <span>No photo</span>
                </div>
              )}
            </div>
            <div className="card-body">
              <div className="card-text">
                <h3>{item.name}</h3>
                <p className="card-desc">{item.description || item.variant || item.note}</p>
                <div className="card-divider" aria-hidden="true"></div>
              </div>
              <div className="card-price-action">
                <strong>{money(item.price)}</strong>
                <button className="add-button" onClick={() => add(item.id)} aria-label={`Add ${item.name}`}><PlusIcon width={20} /></button>
              </div>
            </div>
          </motion.article>)}
        </div>
      </section>

      <footer>
        <div className="footer-divider" aria-hidden="true"></div>
        <div className="social-links">
          <a href="https://www.tiktok.com/@fiveseven.idn" aria-label="TikTok fiveseven.idn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.24-2.61.94-5.26 3.15-6.67.92-.58 1.98-.94 3.09-1.02V13.6c-.66.08-1.31.33-1.87.71-1.1.75-1.78 2.05-1.71 3.4.06 1.1.6 2.12 1.48 2.75.9.64 2.1.88 3.17.65 1.53-.33 2.65-1.66 2.75-3.23.04-3.57.02-7.14.02-10.71C12.525.68 12.525.35 12.525.02z" />
            </svg>
            <span>fiveseven.idn</span>
          </a>
          <a href="https://www.instagram.com/fiveseven.idn/" aria-label="Instagram fiveseven.idn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span>fiveseven.idn</span>
          </a>
        </div>
      </footer>

      {count > 0 && <button className="cart-bar" onClick={() => setOpen(true)}><span><ShoppingBagIcon width={20} /> {count} item{count > 1 ? "s" : ""}</span><strong>{fullMoney(total)}</strong></button>}
      
      <AnimatePresence>
        {open && (
          <motion.div className="sheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.section className="cart-sheet" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", bounce: 0, duration: 0.4 }} onClick={(event) => event.stopPropagation()} aria-label="Cart">
              <div className="sheet-head">
                <div><p className="eyebrow">YOUR ORDER</p><h2>{table ? `Table ${table}` : "Demo table"}</h2></div>
                <button onClick={() => setOpen(false)} aria-label="Close cart"><XMarkIcon width={24} /></button>
              </div>
              {!table && <p className="notice">Table number not detected. Demo only — select a table before a real order.</p>}
              
              <div className="cart-lines">
                {menu.filter((item) => cart[item.id]).map((item) => (
                  <div className="cart-line" key={item.id}>
                    <div><strong>{item.name}</strong><small>{item.variant || item.note}</small></div>
                    <div className="quantity">
                      <button onClick={() => remove(item.id)} aria-label="Remove one"><MinusIcon width={16} /></button>
                      <span>{cart[item.id]}</span>
                      <button onClick={() => add(item.id)} aria-label="Add one"><PlusIcon width={16} /></button>
                    </div>
                    <strong>{fullMoney(item.price * cart[item.id])}</strong>
                  </div>
                ))}
              </div>
              <div className="total-line"><span>Total demo</span><strong>{fullMoney(total)}</strong></div>
              
              {!done ? (
                <>
                  <p className="payment-label">PAYMENT METHOD</p>
                  <div className="payment-options">
                    <button aria-pressed={payment === "QRIS"} onClick={() => setPayment("QRIS")} className={`payment ${payment === "QRIS" ? "selected" : ""}`}>QRIS <small>Placeholder only</small></button>
                    <button aria-pressed={payment === "Cashier"} onClick={() => setPayment("Cashier")} className={`payment ${payment === "Cashier" ? "selected" : ""}`}>Cashier <small>Demo counter</small></button>
                  </div>
                  <button className="confirm" disabled={!count} onClick={() => setDone(true)}>Place demo order</button>
                </>
              ) : (
                <div className="confirmation">
                  <div className="check-ring">✓</div>
                  <h3>Order noted for demo.</h3><p>{payment} · {fullMoney(total)}</p>
                  <p>No order sent to cashier or kitchen. No payment processed.</p>
                  <button className="confirm" onClick={() => { setCart({}); setDone(false); setOpen(false); }}>Start again</button>
                </div>
              )}
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </main></MotionConfig>
  );
}
