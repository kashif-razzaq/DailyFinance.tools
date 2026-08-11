const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '../src/app/tools');
const dirs = fs.readdirSync(toolsDir);

for (const dir of dirs) {
  if (dir === 'hourly-rate-reverse-engineer-calculator' || dir === 'quarterly-estimated-taxes-calculator') {
    continue; // Already fixed
  }

  const filePath = path.join(toolsDir, dir, 'CalculatorClient.tsx');
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // We want to replace the div opening that causes the horizontal layout:
  // <div className="bg-card border rounded-2xl p-6 flex flex-col sm:flex-row gap-3 mt-auto">
  // OR similar variants, with:
  // <div className="bg-card border rounded-2xl p-6 space-y-3">
  
  // Let's use a regex that matches the opening of this container
  content = content.replace(
    /<\!-- Action Buttons -->\s*<div className="bg-card border rounded-2xl p-6[^>]*>/,
    `{/* Action Buttons */}\n        <div className="bg-card border rounded-2xl p-6 space-y-3">`
  );

  content = content.replace(
    /\{\/\* Action Buttons \*\/}\s*<div className="bg-card border rounded-2xl p-6[^>]*>/,
    `{/* Action Buttons */}\n        <div className="bg-card border rounded-2xl p-6 space-y-3">`
  );
  
  // We also need to fix the Save button styling inside this block.
  // It currently has: className="flex-1 justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white"
  // We want it to be full width: className="w-full justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white transition-all"
  
  // Wait, let's just do a targeted replace for the Save button if it has flex-1.
  content = content.replace(
    /<Button onClick=\{handleSave\} disabled=\{isSaving\} className="flex-1/g,
    `<Button onClick={handleSave} disabled={isSaving} className="w-full`
  );

  fs.writeFileSync(filePath, content);
  console.log(`Fixed layout in ${dir}`);
}
