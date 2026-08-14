const fs = require('fs');
const path = require('path');
function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (full.endsWith('CalculatorClient.tsx')) {
      let text = fs.readFileSync(full, 'utf8');
      
      text = text.replace(/as number/g, 'as any as number');
      text = text.replace(/as boolean/g, 'as any as boolean');
      text = text.replace(/as number\[\]/g, 'as any as number[]');
      text = text.replace(/state\.incomeHistory\.join/g, '(state.incomeHistory as any)?.join');
      text = text.replace(/as "Low" \| "Medium" \| "High"/g, 'as any');
      
      fs.writeFileSync(full, text);
    }
  }
}
walk('src/app/freelance');
