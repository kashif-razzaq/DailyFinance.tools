const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '../src/app/tools');
const dirs = fs.readdirSync(toolsDir);

for (const dir of dirs) {
  const filePath = path.join(toolsDir, dir, 'CalculatorClient.tsx');
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Inject hooks using a function to avoid regex $ capture issues
  if (!content.includes('const { currency } = useGlobalSettingsStore()')) {
    content = content.replace(
      /const store = use(.*?)Store\(\)\s*\n\s*const metrics = store\.getDerivedMetrics\(\)/,
      (match) => `${match}\n  const { currency } = useGlobalSettingsStore()\n  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'`
    );
  }

  // Ensure import is there
  if (!content.includes('useGlobalSettingsStore')) {
    content = content.replace(
      /(import .* from 'react')/,
      (match) => `${match}\nimport { useGlobalSettingsStore } from '@/store/global-settings.store'`
    );
  }

  // Replace hardcoded `$` in JSX strings.
  content = content.replace(/>\$(<)/g, '>{currencySymbol}$1');
  content = content.replace(/>\$\s+(<)/g, '>{currencySymbol} $1');
  content = content.replace(/>\$\{Math\./g, '>{currencySymbol}{Math.');
  content = content.replace(/>\$\{store\./g, '>{currencySymbol}{store.');
  content = content.replace(/Quote: \$\$\{/g, 'Quote: ${currencySymbol}${');
  content = content.replace(/ \$\$\{Math/g, ' ${currencySymbol}${Math');
  content = content.replace(/ \$ \$\{store/g, ' ${currencySymbol} ${store');
  content = content.replace(/ \$\$\{store/g, ' ${currencySymbol}${store');
  content = content.replace(/rate of \$\$\{Math/g, 'rate of ${currencySymbol}${Math');
  
  // Extra replacement for text nodes that might have missed
  content = content.replace(/>\s*\$\s*\{/g, '>{currencySymbol}{');

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${dir}`);
}
