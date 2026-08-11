const fs = require('fs');
const path = require('path');

function processFile(slug, exportFilename, pdfComponentString) {
  const filePath = path.join(__dirname, '../src/app/tools', slug, 'CalculatorClient.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // The new standard block we want to inject
  const standardBlock = `        <div className="bg-card border rounded-2xl p-6 space-y-3">
          <Button onClick={handleSave} disabled={isSaving} className="w-full justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white transition-all" size="lg">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin shrink-0" /> : <Save className="h-4 w-4 shrink-0" />} 
            Save to Dashboard
            {!isPro && <Lock className="h-4 w-4 text-white/70 ml-auto shrink-0" />}
          </Button>
          <div className="flex-1 flex gap-3">
            <div className="flex-1">
              <ExportEngine 
                data={exportData} 
                filename="${exportFilename}" 
                pdfDocument={${pdfComponentString}} 
                isPro={isPro}
                onRequirePro={() => setShowProModal(true)}
              />
            </div>
            <div className="flex-1">
            <ShareCalculatorModal url={shareUrl} slug="${slug}" isPro={isPro}>
              <Button variant="outline" className="w-full flex gap-2 justify-center">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </ShareCalculatorModal>
            </div>
          </div>
          <HelpfulWidget slug="${slug}" />
        </div>
      </div>

      <ProUpgradeModal`;

  // Both files have `{/* Desktop Save Actions` followed by the messy mobile block, ending at `<ProUpgradeModal`
  content = content.replace(/        \{\/\* Desktop Save Actions[\s\S]*?<ProUpgradeModal/, standardBlock);

  // Add HelpfulWidget import if missing
  if (!content.includes('import { HelpfulWidget }')) {
    content = content.replace(
      /import { ProUpgradeModal } from "@\/components\/shared\/ProUpgradeModal"/,
      'import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"\nimport { HelpfulWidget } from "@/components/shared/HelpfulWidget"'
    );
  }

  // Remove the old handleVote and stats state if it exists
  content = content.replace(/const \[helpfulCount, setHelpfulCount\] = useState\(0\)\r?\n/g, '');
  content = content.replace(/const \[userVote, setUserVote\] = useState.*?\r?\n/g, '');
  content = content.replace(/const handleVote = async .*?\{[\s\S]*?\}\s*\}\s*\n/g, '');
  content = content.replace(/\/\/ Load feedback stats[\s\S]*?catch\(console\.error\)\r?\n\r?\n/g, '');

  fs.writeFileSync(filePath, content);
  console.log(`Standardized ${slug}`);
}

processFile('hourly-rate-reverse-engineer-calculator', 'HourlyRate', '<RateReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />');
processFile('quarterly-estimated-taxes-calculator', 'QuarterlyTaxes', '<TaxReportPDF data={{...store, ...metrics}} currencySymbol={currencySymbol} />');
