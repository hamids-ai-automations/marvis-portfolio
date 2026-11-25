#!/usr/bin/env node
/**
 * Build wrapper: `npm run build`.
 * The generator lives in src/build.js; this file exists so npm scripts and CI do not
 * depend on the internal path of the generator.
 */

import '../src/build.js';
