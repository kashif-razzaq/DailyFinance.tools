const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '../src/app/tools');
const dirs = fs.readdirSync(toolsDir);

for (const dir of dirs) {
  const filePath = path.join(toolsDir, dir, 'CalculatorClient.tsx');
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // We want to find the <ShareCalculatorModal ...> ... </ShareCalculatorModal> block
  // and wrap it in <div className="flex-1"> if it's not already.
  // BUT we also need to change the button inside it to have w-full.
  
  // This regex finds the ShareCalculatorModal and its contents
  const shareRegex = /<ShareCalculatorModal([^>]*)>([\s\S]*?)<\/ShareCalculatorModal>/;
  const match = content.match(shareRegex);
  
  if (match) {
    let inner = match[2];
    
    // Convert any Button classNames inside to have w-full and flex gap-2
    inner = inner.replace(/className="[^"]*"/, 'className="w-full flex gap-2 justify-center"');
    
    // Also remove any hardcoded h-full or shrink-0 just in case
    
    const newBlock = `<div className="flex-1">\n            <ShareCalculatorModal${match[1]}>${inner}</ShareCalculatorModal>\n            </div>`;
    
    // Replace only if it's not already wrapped in <div className="flex-1">
    // (A simple check is to look at 15 characters before the match)
    const matchIndex = match.index;
    const beforeMatch = content.substring(Math.max(0, matchIndex - 30), matchIndex);
    
    if (!beforeMatch.includes('flex-1')) {
      content = content.replace(shareRegex, newBlock);
      fs.writeFileSync(filePath, content);
      console.log(`Updated layout in ${dir}`);
    }
  }
}
