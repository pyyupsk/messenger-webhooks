declare module "*.ico" {
  const content: import("next/image").StaticImageData;
  export default content;
}
