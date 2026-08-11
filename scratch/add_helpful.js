const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '../src/app/tools');
const dirs = fs.readdirSync(toolsDir);

for (const dir of dirs) {
  const filePath = path.join(toolsDir, dir, 'CalculatorClient.tsx');
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Add import if missing
  if (!content.includes('import { HelpfulWidget }')) {
    content = content.replace(
      /import { ProUpgradeModal } from "@\/components\/shared\/ProUpgradeModal"/,
      'import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"\nimport { HelpfulWidget } from "@/components/shared/HelpfulWidget"'
    );
  }

  // 2. Add HelpfulWidget below the ShareCalculatorModal block ONLY
  if (!content.includes('<HelpfulWidget slug=')) {
    content = content.replace(
      /<\/ShareCalculatorModal>\r?\n\s*<\/div>\r?\n\s*<\/div>/,
      `</ShareCalculatorModal>\n            </div>\n          </div>\n          <HelpfulWidget slug="${dir}" />`
    );
  }

  fs.writeFileSync(filePath, content);
  console.log(`Added HelpfulWidget to ${dir}`);
}
