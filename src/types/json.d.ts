declare module "*.json" {
  const content: {
    [key: string]: any;
    version: string;
  };
  export default content;
}