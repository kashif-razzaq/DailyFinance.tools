const fs = require('fs');
const path = require('path');

function cleanFile(slug) {
  const filePath = path.join(__dirname, '../src/app/tools', slug, 'CalculatorClient.tsx');
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Remove state vars
  content = content.replace(/const \[helpfulCount, setHelpfulCount\] = useState\(0\)\r?\n/g, '');
  content = content.replace(/const \[userVote, setUserVote\] = useState.*?\r?\n/g, '');

  // Remove handleVote block
  content = content.replace(/const handleVote = async .*?\{[\s\S]*?\}\s*\}\s*\n/g, '');

  // Remove getFeedbackAction from useEffect
  content = content.replace(/\/\/ Load feedback stats[\s\S]*?catch\(console\.error\)\r?\n\r?\n/g, '');

  // Remove the old UI block
  content = content.replace(/<div className="flex items-center gap-2 border-l border-border\/50 pl-4">[\s\S]*?<\/div>/, '');

  fs.writeFileSync(filePath, content);
  console.log(`Cleaned ${slug}`);
}

cleanFile('hourly-rate-reverse-engineer-calculator');
// Clean quarterly-estimated-taxes-calculator UI block (it might be slightly different)
function cleanTaxesFile() {
  const slug = 'quarterly-estimated-taxes-calculator';
  const filePath = path.join(__dirname, '../src/app/tools', slug, 'CalculatorClient.tsx');
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/const \[helpfulCount, setHelpfulCount\] = useState\(0\)\r?\n/g, '');
  content = content.replace(/const \[userVote, setUserVote\] = useState.*?\r?\n/g, '');
  content = content.replace(/const handleVote = async .*?\{[\s\S]*?\}\s*\}\s*\n/g, '');
  content = content.replace(/\/\/ Load feedback stats[\s\S]*?catch\(console\.error\)\r?\n\r?\n/g, '');
  
  // The UI block in quarterly is also next to the share button.
  // We'll just remove the whole 40-line chunk where it says "Helpful?" if it exists
  content = content.replace(/<div className="flex items-center gap-2 border-l border-border\/50 pl-4">[\s\S]*?<\/div>/, '');

  fs.writeFileSync(filePath, content);
  console.log(`Cleaned ${slug}`);
}
cleanTaxesFile();
