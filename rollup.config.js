import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import json from '@rollup/plugin-json';

export default [
  {
    input: "src/index.js",
    output: {
      name: "swes-js-sdk",
      dir: 'dist',
      format: "es",
    },
    plugins: [
      resolve(),
      json(),
      commonjs(),
      babel({
        exclude: ["node_modules/**"],
      }),
    ],
  },
  {
    input: "src/index.js",
    output: {
      dir: 'dist',
      format: 'es',
    },
    plugins: [
      babel({
        exclude: ["node_modules/**"],
      }),
    ],
  },
];