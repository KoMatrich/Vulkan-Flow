export default {
  // TypeScript, JavaScript, and Vue files
  '*.{js,jsx,ts,tsx,vue}': [
    'eslint --fix',
  ],

  // JSON and YAML files only (markdown handled separately)
  '*.{json,yml,yaml}': [
    'eslint --fix',
  ],
}
