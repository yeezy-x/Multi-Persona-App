"use client";

import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from 
"react-syntax-highlighter";
import { oneDark } from 
"react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  content: string;
};

export function MarkdownRenderer({ 
  content, 
}: Props) {
  
  const components = {
    code(props: any) {
      const { children, className } = props;
      const match = /language-(\w+)/.exec(className || 
'');

      if (match) {
        return (
          <SyntaxHighlighter
            style={oneDark}
            language={match[1]}
            PreTag="div"
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        );
      }

      return (
        <code className="bg-zinc-800 px-1 py-0.5 
rounded">
          {children}
        </code>
      );
    },
  };

  return (
    <ReactMarkdown components={components}>
      {content}
    </ReactMarkdown>
  );
}