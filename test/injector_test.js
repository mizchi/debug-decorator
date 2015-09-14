const createInjector = require('../src/injector');
const assert = require('power-assert');

describe('injector', () => {
  it('createInjector', () => {
    const rootInjector = createInjector();
    const injector = rootInjector.createChildInjector();
    class A {}
    class B {}

    injector.mapSingleton(A);
    injector.mapValue(B, new B);
    @injector({
      a: A,
      b: B
    })
    class T {
      a: A;
      b: B;
    }
    const t = new T();
    assert.ok(t.a instanceof A);
    assert.ok(t.b instanceof B);
  });
});
