// Usage: npm run new -- "Rice Cooker Chicken and Broccoli" 2026-11-05
// Creates src/content/recipes/<slug>/index.md as a draft. Add cover.jpg to the same folder.
import fs from 'node:fs';
import path from 'node:path';

const [title, date = new Date().toISOString().slice(0, 10)] = process.argv.slice(2);
if (!title) { console.error('Usage: npm run new -- "Recipe Title" [YYYY-MM-DD]'); process.exit(1); }
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const dir = path.join('src/content/recipes', slug);
if (fs.existsSync(dir)) { console.error(`Already exists: ${dir}`); process.exit(1); }
fs.mkdirSync(dir, { recursive: true });
const template = fs.readFileSync('scripts/post-template.md', 'utf8')
  .replace('{{TITLE}}', title.replace(/"/g, '\\"'))
  .replace('{{DATE}}', date);
fs.writeFileSync(path.join(dir, 'index.md'), template);
console.log(`Created ${dir}/index.md\nNext: add ${dir}/cover.jpg, fill in the template, set draft: false.`);
