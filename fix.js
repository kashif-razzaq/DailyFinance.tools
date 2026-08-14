const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('CalculatorClient.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src/app/freelance');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('state. as any')) {
    // We need to restore the property name. We can find it from the left side of the assignment or method call.
    // e.g. if (state.homeStatus !== undefined) store.setHomeStatus(state. as any)
    const newContent = content.replace(/if \(state\.([a-zA-Z0-9_]+) !== undefined\) (?:store\.)?set[a-zA-Z0-9_]+\(state\. as any\)/g, "if (state.$1 !== undefined) store.set$1(state.$1 as any)".replace(/set([a-zA-Z0-9_]+)\(state\.\1 as any\)/g, function(match, p1) {
      // Need to properly capitalize the setter name for zustand stores
      // Actually, wait, the original setter is already there. Let's just extract the setter.
      return ""; // Not a good approach
    }));
    // Better regex:
    const lines = content.split('\n');
    let modified = false;
    for (let i = 0; i < lines.length; i++) {
       if (lines[i].includes('state. as any')) {
          const match = lines[i].match(/if \(state\.([a-zA-Z0-9_]+) !== undefined\) (store\.)?([a-zA-Z0-9_]+)\(state\. as any\)/);
          if (match) {
             const prop = match[1];
             const storePrefix = match[2] || '';
             const setter = match[3];
             lines[i] = lines[i].replace(/state\. as any/, 'state.' + prop + ' as any');
             modified = true;
          }
       }
    }
    if (modified) {
      fs.writeFileSync(file, lines.join('\n'));
      console.log('Fixed ' + file);
    }
  }
});
