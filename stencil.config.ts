import { Config } from '@stencil/core';
import { distDirs } from './package.json';

export const config: Config = {
  namespace: 'wc-typeit',
  outputTargets: [
    {
      type: 'dist',
      dir: distDirs.stencil,
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      dir: distDirs.stencil,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: 'new',
  },
};
