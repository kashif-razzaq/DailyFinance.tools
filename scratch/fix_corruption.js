const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '../src/app/tools');
const dirs = fs.readdirSync(toolsDir);

for (const dir of dirs) {
  const filePath = path.join(toolsDir, dir, 'CalculatorClient.tsx');
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Find where the corruption starts and ends.
  const lines = content.split('\n');
  
  const startIdx = lines.findIndex(l => l.includes('const { currency } = useGlobalSettingsStore()'));
  // The captured group ($1) is 'const [showProModal, setShowProModal] = useState(false)'
  // We need to find the LAST occurrence of it, which represents the start of the original rest-of-file.
  let endIdx = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].includes('const [showProModal, setShowProModal] = useState(false)')) {
      endIdx = i;
      break;
    }
  }

  if (startIdx !== -1 && endIdx !== -1 && startIdx < endIdx) {
    const originalContent = lines.slice(0, startIdx).join('\n') + '\n  ' + lines.slice(endIdx).join('\n');
    fs.writeFileSync(filePath, originalContent);
    console.log(`Recovered ${dir}`);
  } else {
    console.log(`Could not recover ${dir}. Start: ${startIdx}, End: ${endIdx}`);
  }
}
