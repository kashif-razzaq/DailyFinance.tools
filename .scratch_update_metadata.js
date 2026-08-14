const fs = require('fs');
const path = require('path');

const baseDir = 'src/app/freelance';
const folders = fs.readdirSync(baseDir);

for (const folder of folders) {
  const pagePath = path.join(baseDir, folder, 'page.tsx');
  if (!fs.existsSync(pagePath)) continue;

  let content = fs.readFileSync(pagePath, 'utf8');

  // Skip if already using the helper
  if (content.includes('generateCalculatorMetadata')) continue;

  // Extract title
  const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
  // Extract description
  const descMatch = content.match(/description:\s*["']([^"']+)["']/);
  // Extract keywords
  const keywordsMatch = content.match(/keywords:\s*(\[[^\]]+\])/);

  if (!titleMatch || !descMatch) {
    console.log(`Could not find title or description in ${pagePath}`);
    continue;
  }

  const title = titleMatch[1];
  const description = descMatch[1];
  const keywordsStr = keywordsMatch ? keywordsMatch[1] : '[]';
  const slug = `freelance/${folder}`;

  // Find the entire export const metadata block
  const metaRegex = /export const metadata:\s*Metadata\s*=\s*\{([\s\S]*?)\};?/g;
  
  // Make sure we have the import
  if (!content.includes('generateCalculatorMetadata')) {
    content = content.replace(
      /import type \{ Metadata \} from ["']next["'];?/,
      `import type { Metadata } from 'next';\nimport { generateCalculatorMetadata } from '@/config/metadata';`
    );
  }

  content = content.replace(metaRegex, `export const metadata: Metadata = generateCalculatorMetadata({
  title: "${title.replace(' | DailyFinance', '')}",
  description: "${description}",
  keywords: ${keywordsStr},
  slug: "${slug}",
  category: "Freelance",
});`);

  fs.writeFileSync(pagePath, content);
  console.log(`Updated ${pagePath}`);
}
