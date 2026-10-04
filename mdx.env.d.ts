declare module "*.mdx" {
  import type { JSX } from "react";
  const component: (props: Record<string, unknown>) => JSX.Element;
  export default component;
}
