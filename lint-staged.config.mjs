const buildEslintCommand = (filenames) => `eslint --fix ${filenames.join(' ')}`;

const config = {
  '*.{ts,mjs,js}': [buildEslintCommand],
};

export default config;
