const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '../src/app/tools');
const dirs = fs.readdirSync(toolsDir);

const currencyKeys = [
  'Income', 'Expense', 'Cost', 'Savings', 'Profit', 'Buffer Amount', 'Gap', 'Target', 
  'Relocation', 'Rate', 'ROI Estimate', 'Floor', 'Price Anchor', 'Fee', 'Tax', 'Payment', 
  'Salary', 'Distribution', 'Revenue', 'LTV', 'CAC', 'Spend', 'Retainer', 'Value', 'Earned'
];

const nonCurrencyKeys = [
  'Hours', 'Pct', '%', 'Multiplier', 'Months', 'Level', 'Category', 'Worth', 'Ratio', 'Rate %', 'Tax Rate'
];

function isCurrency(key) {
  // If it matches non-currency, return false
  for (let nc of nonCurrencyKeys) {
    if (key.includes(nc)) return false;
  }
  // If it matches currency, return true
  for (let c of currencyKeys) {
    if (key.includes(c)) return true;
  }
  return false;
}

for (const dir of dirs) {
  const filePath = path.join(toolsDir, dir, 'CalculatorClient.tsx');
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Find the exportData block
  const blockRegex = /const exportData = \[\{\r?\n([\s\S]*?)\r?\n\s*\}\]/;
  const match = content.match(blockRegex);
  
  if (match) {
    const lines = match[1].split(/\r?\n/);
    const newLines = lines.map(line => {
      // e.g. "Estimated Base Hours": store.estimatedHours,
      const kv = line.split(':');
      if (kv.length < 2) return line;
      
      const keyRaw = kv[0].trim();
      const key = keyRaw.replace(/"/g, ''); // strip quotes
      const val = kv.slice(1).join(':').trim(); // everything after first colon
      
      // If it already has currency formatting, skip
      if (val.includes('`${currency}')) return line;
      
      // Strip trailing comma
      let cleanVal = val;
      let hasComma = false;
      if (val.endsWith(',')) {
        cleanVal = val.slice(0, -1);
        hasComma = true;
      }

      if (isCurrency(key)) {
        // Wrap the value in template literal with currency
        const newVal = `\`\${currency} \${${cleanVal}}\`` + (hasComma ? ',' : '');
        return `    ${keyRaw}: ${newVal}`;
      }
      
      return line;
    });

    const newBlock = `const exportData = [{\n${newLines.join('\n')}\n  }]`;
    content = content.replace(blockRegex, newBlock);
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated exportData in ${dir}`);
  }
}
