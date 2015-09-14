# Injector for typescript decorator

## Install

```
npm install @mizchi/injector --save
```

## Usage

```js
const createInjector = require('@mizchi/injector');
const rootInjector = createInjector();
const injector = rootInjector.createChildInjector(); // can search parents
class A {}
class B {}

injector.mapSingleton(A);
injector.mapValue(B, new B);
// injector.unmap(B); // to remove
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
```

## LICENSE

MIT
