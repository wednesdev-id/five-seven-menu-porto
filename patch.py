import re

with open('src/app/globals.css', 'r') as f:
    css = f.read()

# Make topbar sticky and glass
css = css.replace('.topbar {\n  display: flex;', '.topbar {\n  position: sticky;\n  top: 0;\n  z-index: 30;\n  background: rgba(10, 10, 10, 0.65);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n  display: flex;')

# Make cart-bar glass
cart_bar_old = """
.cart-bar {
  position: fixed;
  bottom: var(--space-md);
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - var(--space-md)*2);
  max-width: calc(480px - var(--space-md)*2);
  background: var(--color-ink);
  color: var(--color-paper);
  padding: 1rem 1.2rem;
  border-radius: 99px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  box-shadow: 0 8px 30px rgba(0,0,0,0.5);
  cursor: pointer;
  z-index: 40;
}
"""
cart_bar_new = """
.cart-bar {
  position: fixed;
  bottom: var(--space-md);
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - var(--space-md)*2);
  max-width: calc(480px - var(--space-md)*2);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: var(--color-ink);
  padding: 1rem 1.2rem;
  border-radius: 99px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  cursor: pointer;
  z-index: 40;
}
"""
if cart_bar_old.strip() in css:
    css = css.replace(cart_bar_old.strip(), cart_bar_new.strip())

# Make cart-sheet glass
sheet_old = """
.cart-sheet {
  background: var(--color-surface);
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  padding: var(--space-lg) var(--space-md);
  overflow-y: auto;
}
"""
sheet_new = """
.cart-sheet {
  background: rgba(20, 20, 20, 0.65);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  padding: var(--space-lg) var(--space-md);
  overflow-y: auto;
}
"""
if sheet_old.strip() in css:
    css = css.replace(sheet_old.strip(), sheet_new.strip())

with open('src/app/globals.css', 'w') as f:
    f.write(css)
