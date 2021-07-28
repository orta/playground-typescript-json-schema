import typescript from "@rollup/plugin-typescript";
import node from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import ignore from "rollup-plugin-ignore";
import builtins from 'rollup-plugin-node-builtins';

// You can have more root bundles by extending this array
const rootFiles = ["index.ts"];
import externalGlobals from "rollup-plugin-external-globals";

export default rootFiles.map(name => {
  /** @type { import("rollup").RollupOptions } */
  const options = {
    input: `src/${name}`,
    external: ['typescript'],
    output: {
      paths: {
        "typescript":"typescript-sandbox/index",
        "fs.js":"typescript-sandbox/index",
        "path.js":"typescript-sandbox/index",
      },
      name,
      dir: "dist",
      format: "amd"
    },
    plugins: [  typescript({ tsconfig: "tsconfig.json" }), json(), ignore([ "ts-node", "fs"]) , externalGlobals({ typescript: "window.ts" }), commonjs(), node()]
  };

  return options;
});