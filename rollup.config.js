import { terser } from 'rollup-plugin-terser';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    input: 'src/js/main.js',
    output: {
        file: '_site/js/bundle.js',
        format: 'iife'
    },
    plugins: [terser(), nodeResolve()]
};