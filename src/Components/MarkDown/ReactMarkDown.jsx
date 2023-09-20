/* eslint-disable react/prop-types */
import ReactMarkdown from "react-markdown";
import CodeSnippet from "../CodeSnippet/CodeSnippet";

export default function ReactMarkDown({message}) {
  return (
    <ReactMarkdown
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <CodeSnippet codeString={children} language={match[1]} />
          ) : (
            <code {...props} className={className} style={{color : "white", fontFamily : "monospace", paddingInline : "1rem"}}>
              {children}
            </code>
          );
        },
      }}
    >
      {message}
    </ReactMarkdown>
  );
}
