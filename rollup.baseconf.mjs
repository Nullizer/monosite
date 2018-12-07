export default {
  input: [
    'src/scripts/main.tsx'
  ],
  output: [
    {
      dir: 'temp/dist/esm',
      format: 'es',
      // sourcemap: true
    },
    {
      dir: 'temp/dist/sys',
      format: 'system',
      // sourcemap: true
    }
  ],
  experimentalCodeSplitting: true,
}
