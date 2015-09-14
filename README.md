# debug decorator

## Install

```
npm install @mizchi/debug-decorator --save
```

## Usage

```js
class X {
  @debug
  get name() {
    return 'xxx';
  }

  @debug
  square(n: number){
    return n * n;
  }
}
const x = new X;
x.name;
const r = x.square(2);
```

output

```
debug: get name - xxx
debug: call square
        [args] 2
        [return] 4        
```

## LICENSE

MIT
