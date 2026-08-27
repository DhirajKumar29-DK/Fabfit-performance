import os

admin_layout = r'C:\Users\dhira\OneDrive\Desktop\FabFit_App\src\app\(admin)\layout.tsx'
ui_layout = r'C:\Users\dhira\OneDrive\Desktop\FabFit_App\src\app\(public)\layout.tsx'

with open(admin_layout, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace body className with one including admin-theme
if 'admin-theme' not in content:
    new_content = content.replace('<body className={`', '<body className={`admin-theme ')
    new_content = new_content.replace('<body\n        className={`', '<body\n        className={`admin-theme ')
    with open(admin_layout, 'w', encoding='utf-8') as f:
        f.write(new_content)

with open(ui_layout, 'r', encoding='utf-8') as f:
    content2 = f.read()

if 'ui-theme' not in content2:
    new_content2 = content2.replace('<body className={`', '<body className={`ui-theme ')
    new_content2 = new_content2.replace('<body className="', '<body className="ui-theme ')
    with open(ui_layout, 'w', encoding='utf-8') as f:
        f.write(new_content2)

print("Layout bodies updated!")
