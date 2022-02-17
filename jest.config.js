module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', "vue"],
  transform: {
    "\\.js$": "babel-jest",
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!lib-to-transform|other-lib)'],
};
