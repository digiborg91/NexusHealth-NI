export {};

declare global {
  interface Window {
    ethereum?: any; // You can also specify a more precise type if you want
  }
}
