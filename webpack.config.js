export const resolve = {
  fallback: {
    fs: false,
    stream: require.resolve('stream-browserify'),
    util: require.resolve('util/'),
    buffer: require.resolve('buffer/'),
    assert: require.resolve('assert/'),
  }
};