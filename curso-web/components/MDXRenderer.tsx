import type { ReactElement } from "react";
import { Prose } from "./Prose";

type MDXRendererProps = {
  content: ReactElement;
};

export function MDXRenderer({ content }: MDXRendererProps) {
  return <Prose className="mt-6">{content}</Prose>;
}
