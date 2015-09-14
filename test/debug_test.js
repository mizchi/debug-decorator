const debug = require('../src/debug');
describe('debug', () => {
  it('log internal info', () => {
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
  });
})
