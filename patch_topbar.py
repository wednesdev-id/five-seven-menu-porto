with open('src/app/globals.css', 'r') as f:
    css = f.read()

# Replace topbar padding
old_padding = "  padding: var(--space-xl) var(--space-md) var(--space-md) var(--space-md);"
new_padding = "  padding: 16px 20px;"

if old_padding in css:
    css = css.replace(old_padding, new_padding)
else:
    print("WARNING: Could not find exact old padding string.")

with open('src/app/globals.css', 'w') as f:
    f.write(css)
