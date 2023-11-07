import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";

export default [
  {
    input: "src/index.js", // your entry point
    output: {
      name: "swes-js-sdk", // package name
      dir: 'dist',
      format: "es",
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: ["node_modules/**"],
      }),
    ],
  },
  {
    input: "src/index.js", // your entry point
    output: {
      dir: 'dist', // Diretório de saída
      format: 'es',
    },
    plugins: [
      babel({
        exclude: ["node_modules/**"],
      }),
    ],
  },
];