with open('src/app/globals.css', 'r') as f:
    css = f.read()

nav_old = """
  overflow-x: auto;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
"""
nav_new = """
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x;
  scroll-behavior: smooth;
}
"""
css = css.replace(nav_old.strip(), nav_new.strip())

tab_old = """
.bottom-nav-tabs .tab {
  flex-shrink: 0;
}
"""
tab_new = """
.bottom-nav-tabs .tab {
  flex: 0 0 auto;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
}
"""
css = css.replace(tab_old.strip(), tab_new.strip())

with open('src/app/globals.css', 'w') as f:
    f.write(css)
