interface Injector {
  mapValue: (cls: any, instance: any) => void;
  mapSingleton: (cls: any) => void;
  unmap: (cls: any) => void;
  createChildInjector: () => Injector;
}
declare function createInjector(): Injector;
