with open('src/app/globals.css', 'r') as f:
    css = f.read()

# Enhance menu-card with glassmorphism
old_card = """.menu-card {
  display: flex;
  flex-direction: column;
}"""

new_card = """.menu-card {
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
}"""

css = css.replace(old_card, new_card)

# Let's adjust tab styling to have a glass pill effect
old_tabs = """.tabs {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
  padding: 0 var(--space-md);
  border-bottom: 1px solid var(--color-divider);
  padding-bottom: 2px;
}
.tab {
  background: none;
  border: none;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--color-muted);
  padding: 0 0 var(--space-xs) 0;
  cursor: pointer;
  position: relative;
}
.tab.active {
  color: var(--color-ink);
}
.tab.active::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-ink);
}"""

new_tabs = """.tabs {
  display: flex;
  gap: var(--space-xs);
  margin-bottom: var(--space-md);
  padding: var(--space-xs) var(--space-md);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: sticky;
  top: 73px;
  z-index: 29;
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
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
}"""

if old_tabs in css:
    css = css.replace(old_tabs, new_tabs)

# Adjust padding inside site-shell for grid
css = css.replace('.menu-grid {\n  display: grid;\n  gap: var(--space-xl);\n}', '.menu-grid {\n  display: grid;\n  gap: var(--space-md);\n  padding: 0 var(--space-md);\n}')

with open('src/app/globals.css', 'w') as f:
    f.write(css)
