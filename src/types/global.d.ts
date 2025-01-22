export {};

declare global {
  interface Window {
    configurator: {
      clearStorage: () => void;
      instance: DogConfigurator;
    };
  }
}
