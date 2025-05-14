declare module "latex" {
  function latex(
    content: string,
    callback: (err: Error | null, pdf: Buffer) => void
  ): void;
  export default latex;
}
