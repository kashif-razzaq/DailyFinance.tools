const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '../src/app/tools');
const dirs = fs.readdirSync(toolsDir);

const symbolMap = `const currencySymbols: Record<string, string> = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' };`;

for (const dir of dirs) {
  const filePath = path.join(toolsDir, dir, 'CalculatorClient.tsx');
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Add import if missing
  if (!content.includes('useGlobalSettingsStore')) {
    content = content.replace(
      /(import .* from 'react')/,
      `$1\nimport { useGlobalSettingsStore } from '@/store/global-settings.store'`
    );
  }

  // 2. Inject hooks
  if (!content.includes('const { currency } = useGlobalSettingsStore()')) {
    content = content.replace(
      /export function CalculatorClient\([^)]*\)\s*\{\n(\s*const store = .*?\n)?(\s*const metrics = .*?\n)?/,
      `export function CalculatorClient({ isPro = false }: { isPro?: boolean }) {\n  const store = use${dir.replace(/-/g, '')}Store?.() || Object.values(arguments[0] || {})[0];\n  const { currency } = useGlobalSettingsStore();\n  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$';\n`
    );
    // Let's use a safer injection point
    content = content.replace(
      /(const \[showProModal, setShowProModal\] = useState\(false\))/,
      `const { currency } = useGlobalSettingsStore()\n  const currencySymbol = { USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹' }[currency as string] || '$'\n  $1`
    );
  }

  // 3. Replace hardcoded `$` in JSX strings.
  // Case 1: >$<
  content = content.replace(/>\$(<)/g, '>{currencySymbol}$1');
  
  // Case 2: >$ <
  content = content.replace(/>\$\s+(<)/g, '>{currencySymbol} $1');

  // Case 3: >${Math.
  content = content.replace(/>\$\{Math\./g, '>{currencySymbol}{Math.');

  // Case 4: >${store.
  content = content.replace(/>\$\{store\./g, '>{currencySymbol}{store.');
  
  // Case 5: `Quote: $${
  content = content.replace(/Quote: \$\$\{/g, 'Quote: ${currencySymbol}${');

  // Case 6: text = `... $${Math
  content = content.replace(/ \$\$\{Math/g, ' ${currencySymbol}${Math');
  
  // Case 7: `... $ {store
  content = content.replace(/ \$ \$\{store/g, ' ${currencySymbol} ${store');

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${dir}`);
}
