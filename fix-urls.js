const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.{ts,tsx}');
let changedFiles = [];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace 'http://localhost:5000...' with \`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}...\`
  content = content.replace(/['"]http:\/\/localhost:5000(\/.*?)['"]/g, (match, p1) => {
    return `\`\${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${p1}\``;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    changedFiles.push(file);
  }
});

console.log('Modified frontend files:', changedFiles);
