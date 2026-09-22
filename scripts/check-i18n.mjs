import fs from "fs";
import path from "path";
import ts from "typescript";

const translationsPath = path.resolve("src/i18n/translations.ts");
const sourceCode = fs.readFileSync(translationsPath, "utf-8");

// Transpile TS to JS
const transpileResult = ts.transpileModule(sourceCode, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
});

// Evaluate the exported translations
const moduleContext = { exports: {} };
const evalFn = new Function("module", "exports", transpileResult.outputText);
evalFn(moduleContext, moduleContext.exports);

const { translations } = moduleContext.exports;

if (!translations || !translations.en || !translations.it) {
  console.error("❌ Failed to load translations object with 'en' and 'it' keys.");
  process.exit(1);
}

// 1. Check parity between EN and IT dictionaries
function getKeys(obj, prefix = "") {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      keys = keys.concat(getKeys(v, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const enKeys = new Set(getKeys(translations.en));
const itKeys = new Set(getKeys(translations.it));

let hasErrors = false;

const missingInIt = [...enKeys].filter(k => !itKeys.has(k));
const missingInEn = [...itKeys].filter(k => !enKeys.has(k));

if (missingInIt.length > 0) {
  console.error("❌ Keys present in EN but missing in IT:");
  missingInIt.forEach(k => console.error(`   - ${k}`));
  hasErrors = true;
}

if (missingInEn.length > 0) {
  console.error("❌ Keys present in IT but missing in EN:");
  missingInEn.forEach(k => console.error(`   - ${k}`));
  hasErrors = true;
}

// 2. Scan codebase for t("key") references
function scanCodebase(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(scanCodebase(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx"))) {
      files.push(fullPath);
    }
  }
  return files;
}

const allFiles = scanCodebase(path.resolve("src"));
const referencedKeys = new Map(); // key -> list of files

const tCallRegex = /\bt\(\s*["']([^"']+)["']\s*\)/g;

for (const file of allFiles) {
  const content = fs.readFileSync(file, "utf-8");
  let match;
  while ((match = tCallRegex.exec(content)) !== null) {
    const key = match[1];
    if (!referencedKeys.has(key)) {
      referencedKeys.set(key, []);
    }
    referencedKeys.get(key).push(path.relative(process.cwd(), file));
  }
}

const missingFromDict = [];
for (const [key, files] of referencedKeys.entries()) {
  if (!enKeys.has(key)) {
    missingFromDict.push({ key, files });
  }
}

if (missingFromDict.length > 0) {
  console.error("❌ Translation keys referenced in code but missing from dictionary:");
  missingFromDict.forEach(({ key, files }) => {
    console.error(`   - "${key}" in:`);
    files.forEach(f => console.error(`       ${f}`));
  });
  hasErrors = true;
}

if (hasErrors) {
  console.error("\n❌ I18N Check FAILED. Fix the missing translation keys listed above.");
  process.exit(1);
} else {
  console.log(`✅ I18N Check PASSED!`);
  console.log(`   - Dictionaries: ${enKeys.size} keys in EN, ${itKeys.size} keys in IT (100% match).`);
  console.log(`   - Code references: ${referencedKeys.size} distinct keys used in code, all valid.`);
  process.exit(0);
}
