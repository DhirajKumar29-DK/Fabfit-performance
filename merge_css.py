import os

admin_css_path = r'C:\Users\dhira\OneDrive\Desktop\FabFit_App\src\app\globals.css'
ui_css_path = r'C:\Users\dhira\OneDrive\Desktop\Fittness_ui\src\app\globals.css'

with open(ui_css_path, 'r', encoding='utf-8') as f:
    ui_css = f.read()

# For admin, we will just wrap its styles in a scope if needed, but since it's just basic tailwind,
# appending UI css is fine as long as we prefix the body styles.
# UI's body sets dark theme. We should only apply it to .dark-theme or to the public layout body.
# Instead of globally applying to body, let's change "body {" in UI css to "body.ui-theme {"

modified_ui_css = ui_css.replace('body {', 'body.ui-theme {')

final_css = """@import "tailwindcss";

/* Admin Default Variables */
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body.admin-theme {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}

/* Fittness_ui Variables & Styles */
""" + modified_ui_css

with open(admin_css_path, 'w', encoding='utf-8') as f:
    f.write(final_css)

print("globals.css merged!")
