module.exports = function debug(target, name, descriptor) {
  if (descriptor.value) {
    const original = descriptor.value.bind(target);
    descriptor.value = (...args) => {
      const val = original(...args);
      console.log(`debug: call ${name}\n\t[args]`, ...args, `\n\t[return] ${val}`)
      return val;
    }
  }
  if (descriptor.get) {
    const originalGet = descriptor.get.bind(target);
    descriptor.get = () => {
      const val = originalGet();
      console.log(`debug: get ${name} - ${val}`);
      return val;
    }
  }
  if (descriptor.set) {
    const originalSet = descriptor.set.bind(target);
    descriptor.set = (val) => {
      const r = originalSet(val);
      console.log(`debug: set ${name} - ${val}`);
      return r;
    }
  }
  return descriptor;
}
