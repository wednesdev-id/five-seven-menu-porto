import re

with open('src/app/globals.css', 'r') as f:
    css = f.read()

# 1. Update the color palette to include a gold accent
if '--color-gold:' not in css:
    css = css.replace(':root {', ':root {\n  --color-gold: #cba876;\n  --color-gold-muted: rgba(203, 168, 118, 0.3);')

# 2. Upgrade the Topbar
topbar_old = """
.topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  background: rgba(10, 10, 10, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
"""
topbar_new = """
.topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  background: rgba(10, 10, 10, 0.5);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(203, 168, 118, 0.15);
  display: flex;
  transition: background 0.3s ease;
"""
css = css.replace(topbar_old.strip(), topbar_new.strip())

# 3. Upgrade Tabs
tabs_old = """
.tab {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 99px;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 0.95rem;
  color: var(--color-muted);
  padding: 6px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.tab.active {
  color: var(--color-ink);
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
}
"""
tabs_new = """
.tab {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 99px;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 0.95rem;
  color: var(--color-muted);
  padding: 6px 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.tab:active {
  transform: scale(0.95);
}
.tab.active {
  color: var(--color-gold);
  background: rgba(203, 168, 118, 0.1);
  border-color: rgba(203, 168, 118, 0.3);
  box-shadow: 0 0 12px rgba(203, 168, 118, 0.1);
}
"""
css = css.replace(tabs_old.strip(), tabs_new.strip())

# 4. Upgrade Menu Card (Interactive + Gold accent on hover)
card_old = """
.menu-card {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-md);
  overflow: hidden;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding-bottom: var(--space-md);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
"""
card_new = """
.menu-card {
  display: flex;
  flex-direction: column;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-md);
  overflow: hidden;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding-bottom: var(--space-md);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.menu-card:active {
  transform: scale(0.98);
  border-color: rgba(203, 168, 118, 0.4);
  box-shadow: 0 0 20px rgba(203, 168, 118, 0.15);
}
@media (hover: hover) {
  .menu-card:hover {
    transform: translateY(-4px);
    border-color: rgba(203, 168, 118, 0.3);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 15px rgba(203, 168, 118, 0.1);
  }
}
"""
css = css.replace(card_old.strip(), card_new.strip())

# 5. Upgrade Cart Bar (Luxury Float)
cartbar_old = """
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
cartbar_new = """
.cart-bar {
  position: fixed;
  bottom: var(--space-md);
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - var(--space-md)*2);
  max-width: calc(480px - var(--space-md)*2);
  background: rgba(203, 168, 118, 0.15);
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  color: var(--color-gold);
  padding: 1rem 1.2rem;
  border-radius: 99px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(203, 168, 118, 0.4);
  box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(203, 168, 118, 0.2);
  cursor: pointer;
  z-index: 40;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.cart-bar:active {
  transform: translate(-50%, 2px) scale(0.98);
}
"""
css = css.replace(cartbar_old.strip(), cartbar_new.strip())

# 6. Make ADD button interactive & subtle gold
btn_old = """
.add-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--color-divider);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-ink);
}
"""
btn_new = """
.add-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-ink);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.add-button:active {
  transform: scale(0.9);
  background: var(--color-gold);
  color: var(--color-paper);
  border-color: var(--color-gold);
}
@media (hover: hover) {
  .add-button:hover {
    background: rgba(203, 168, 118, 0.15);
    color: var(--color-gold);
    border-color: rgba(203, 168, 118, 0.4);
  }
}
"""
css = css.replace(btn_old.strip(), btn_new.strip())

# 7. Add gold to Brand Mark & Table Badge
css = css.replace('.brand-mark strong { font-weight: 800; }', '.brand-mark strong { font-weight: 800; color: var(--color-gold); }')
css = css.replace('background: var(--color-ink);\n  color: var(--color-paper);', 'background: rgba(203, 168, 118, 0.15);\n  color: var(--color-gold);\n  border: 1px solid rgba(203, 168, 118, 0.3);')

with open('src/app/globals.css', 'w') as f:
    f.write(css)
