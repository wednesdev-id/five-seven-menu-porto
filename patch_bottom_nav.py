import re

with open('src/app/page.tsx', 'r') as f:
    page = f.read()

# 1. Remove .tabs from inside .menu-section
tabs_html = """        <div className="tabs" role="tablist" aria-label="Menu categories" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
          {categories.map((name) => <button key={name} className={category === name ? "tab active" : "tab"} onClick={() => setCategory(name)} role="tab" aria-selected={category === name} style={{ flexShrink: 0 }}>{name}</button>)}
        </div>
"""
page = page.replace(tabs_html, '')

# 2. Add .tabs right before the <AnimatePresence> or at the end of <main>
# We'll place it right before {count > 0 && <button className="cart-bar"...
new_tabs_html = """
      <nav className="bottom-nav-tabs" role="tablist" aria-label="Menu categories">
        {categories.map((name) => (
          <button key={name} className={category === name ? "tab active" : "tab"} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'}) || setCategory(name)} role="tab" aria-selected={category === name}>
            {name}
          </button>
        ))}
      </nav>

      {count > 0 && <button className="cart-bar" onClick={() => setOpen(true)}>
"""
page = page.replace('{count > 0 && <button className="cart-bar" onClick={() => setOpen(true)}>', new_tabs_html.strip() + '\n')

with open('src/app/page.tsx', 'w') as f:
    f.write(page)


with open('src/app/globals.css', 'r') as f:
    css = f.read()

# 3. Rename .tabs to .bottom-nav-tabs and style for bottom fixed
css = css.replace('.tabs {', '.tabs_old {') # disable old one

bottom_nav_css = """
.bottom-nav-tabs {
  display: flex;
  gap: var(--space-xs);
  padding: 12px var(--space-md);
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  border-top: 1px solid rgba(203, 168, 118, 0.15);
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  z-index: 29;
  background: rgba(10, 10, 10, 0.75);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  overflow-x: auto;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.bottom-nav-tabs::-webkit-scrollbar {
  display: none;
}
.bottom-nav-tabs .tab {
  flex-shrink: 0;
}
"""

css += bottom_nav_css

# 4. Adjust cart-bar position
css = css.replace('bottom: var(--space-md);', 'bottom: calc(75px + env(safe-area-inset-bottom));')

# 5. Adjust site-shell padding
css = css.replace('padding-bottom: calc(var(--space-xl) + 4rem);', 'padding-bottom: calc(var(--space-xl) + 120px + env(safe-area-inset-bottom));')

with open('src/app/globals.css', 'w') as f:
    f.write(css)
