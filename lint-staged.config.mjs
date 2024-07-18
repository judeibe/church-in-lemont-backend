import path from 'path';

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;

const config = {
  '{src,apps,libs,test}/**/*.ts': [buildEslintCommand],
};

export default config;
