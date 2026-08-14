const fs = require('fs');
const path = require('path');

const baseDir = 'src/app/freelance';
const folders = fs.readdirSync(baseDir);

for (const folder of folders) {
  const pagePath = path.join(baseDir, folder, 'page.tsx');
  if (!fs.existsSync(pagePath)) continue;

  let content = fs.readFileSync(pagePath, 'utf8');

  // Match: }); followed by a comma, spaces, openGraph: { ... } up to the closing } of the original metadata object
  const fixRegex = /\}\);\s*,\s*openGraph:\s*\{[\s\S]*?twitter:\s*\{[\s\S]*?\}\s*,\s*\}\s*/g;
  
  if (content.match(fixRegex)) {
    content = content.replace(fixRegex, '});\n\n');
    fs.writeFileSync(pagePath, content);
    console.log(`Fixed ${pagePath}`);
  }
}
