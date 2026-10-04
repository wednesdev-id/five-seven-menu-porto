"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { MinusIcon, PlusIcon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";

const menu = [
  { id: "espresso", name: "Espresso", category: "Classic", price: 20000, note: "Hot" },
  { id: "affogato", name: "Affogato", category: "Classic", price: 23000, note: "Ice" },
  { id: "americano-arabica", name: "Americano", variant: "Arabica", category: "Classic", price: 27000, note: "Hot / Ice" },
  { id: "americano-robusta", name: "Americano", variant: "Robusta", category: "Classic", price: 23000, note: "Hot / Ice" },
  { id: "cappucino-arabica", name: "Cappucino", variant: "Arabica", category: "Classic", price: 33000, note: "Hot" },
  { id: "cappucino-robusta", name: "Cappucino", variant: "Robusta", category: "Classic", price: 30000, note: "Hot" },
  { id: "cafe-latte", name: "Cafe Latte", category: "Classic", price: 25000, note: "Hot / Ice" },
  { id: "regular-beans", name: "Regular Beans", category: "Filter", price: 25000, note: "Filter coffee" },
  { id: "specialty-beans", name: "Specialty Beans", category: "Filter", price: 30000, note: "Filter coffee" },
];
const money = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;

type Cart = Record<string, number>;

export default function Home() {
  const [category, setCategory] = useState("Classic");
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
        <div className="brand-mark"><span>FIVE</span><strong>SEVEN</strong></div>
        <div className="table-badge">{table ? `TABLE ${table}` : "DEMO MENU"}</div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">COFFEE · FOOD · PEOPLE</p>
          <h1>Take your<br /><em>time.</em></h1>
          <p className="hero-copy">Small rituals, carefully made.<br />Order from your table.</p>
        </div>
        <div className="hero-orbit"><span>57</span><small>FIVE SEVEN</small></div>
      </section>

      <section className="menu-section" aria-labelledby="menu-title">
        <div className="section-heading"><p className="eyebrow">THE MENU</p><h2 id="menu-title">Choose your cup.</h2></div>
        <div className="tabs" role="tablist" aria-label="Menu categories">
          {["Classic", "Filter"].map((name) => <button key={name} className={category === name ? "tab active" : "tab"} onClick={() => setCategory(name)} role="tab" aria-selected={category === name}>{name}</button>)}
        </div>
        <div className="menu-grid">
          {items.map((item, index) => <motion.article key={item.id} className="menu-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
            <div className={`drink-art art-${index % 4}`} aria-hidden="true"><span>{item.name.slice(0, 1)}</span></div>
            <div className="card-info"><div><h3>{item.name}</h3>{item.variant && <p>{item.variant}</p>}<small>{item.note}</small></div><strong>{money(item.price)}</strong></div>
            <button className="add-button" onClick={() => add(item.id)} aria-label={`Add ${item.name}`}><PlusIcon width={20} /></button>
          </motion.article>)}
        </div>
      </section>

      <footer><p>FIVE SEVEN COFFEE</p><span>fiveseven.idn · Demo ordering experience</span></footer>

      {count > 0 && <button className="cart-bar" onClick={() => setOpen(true)}><span><ShoppingBagIcon width={20} /> {count} item{count > 1 ? "s" : ""}</span><strong>{money(total)}</strong></button>}
      
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
                    <strong>{money(item.price * cart[item.id])}</strong>
                  </div>
                ))}
              </div>
              <div className="total-line"><span>Total demo</span><strong>{money(total)}</strong></div>
              
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
                  <h3>Order noted for demo.</h3><p>{payment} · {money(total)}</p>
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
