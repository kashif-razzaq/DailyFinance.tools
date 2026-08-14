const fs = require('fs');
const path = require('path');
function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (full.endsWith('page.tsx')) {
      let text = fs.readFileSync(full, 'utf8');
      if (text.includes('<ToolLayout') && !text.includes('faqs=')) {
        text = text.replace(/slug="([^"]+)"/g, 'slug="$1"\n      faqs={[]}');
        fs.writeFileSync(full, text);
      }
    }
  }
}
walk('src/app');
