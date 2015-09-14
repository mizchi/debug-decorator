// injector
module.exports = function createInjector(parentInjector) {
  const wm = new WeakMap;
  function injector(manifest: any) {
    return (cls) => {
      for (let key of Object.keys(manifest)) {
        Object.defineProperty(cls.prototype, key, {
          get() {
            console.log('get property by injector');
            const cls = manifest[key];
            const ret = injector._resolve(cls);
            if (ret == null) {
              console.warn(cls.name + " is not mapped");
            }
            return ret;
          }
        })
      }
      return cls;
    };
  }

  injector.mapSingleton = (cls) => {
    if (wm.get(cls)) {
      console.warn(cls.name + ' is already mapped');
    }
    wm.set(cls, new cls);
  }
  injector.mapValue = (cls, instance) => {
    if (wm.get(cls)) {
      console.warn(cls.name + ' is already mapped');
    }
    wm.set(cls, instance);
  }

  injector.unmap = (cls) => {
    if (wm.get(cls)) {
      wm.delete(cls);
    } else {
      console.warn(cls.name + ' is not mapped');
    }
  }

  injector._resolve = (cls) => {
    return wm.get(cls) || (parentInjector && parentInjector._resolve(cls));
  }

  injector.createChildInjector = () => {
    return createInjector(injector);
  }
  return injector;
}

// Usage
// const rootInjector = createInjector();
// const injector = rootInjector.createChildInjector();
// class A {}
// class B {}
//
// injector.mapSingleton(A);
// injector.mapValue(B, new B);
// @injector({
//   a: A,
//   b: B
// })
// class T {
//   a: A;
//   b: B;
// }
// const t = new T();
// console.log('a', t.a) //=> instnace of A
// console.log('b', t.b) //=> instance of B
