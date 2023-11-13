import Markdown from 'react-markdown';
import { PrismLight } from 'react-syntax-highlighter';
import { coldarkCold as prismTheme } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ts from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';

PrismLight.registerLanguage('ts', ts);

const markdownComponents = {
  h1: (props) => <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900" {...props} />,
  h2: (props) => <h2 className="font-black tracking-tight text-slate-900 mt-10 pb-1 text-3xl" {...props} />,
  h3: (props) => <h3 className="font-black tracking-tight text-slate-900 mt-10 pb-1 text-2xl" {...props} />,
  h4: (props) => <h4 className="font-black tracking-tight text-slate-900 mt-10 pb-1 text-xl" {...props} />,
  p: (props) => <p className="mt-4 leading-7 first:mt-0" {...props} />,
  a: (props) => <a className="text-primary hover:underline" {...props} />,
  pre: (props) => (
    <pre {...props}>
      <PrismLight style={prismTheme} language="ts">
        {props.children?.props?.children}
      </PrismLight>
    </pre>
  ),
  code: (props) => <code {...props} />,
};

const options = {};

function MarkdownTab({ markdown }: { markdown: string }) {
  return <Markdown components={markdownComponents}>{markdown}</Markdown>;
}

export default MarkdownTab;
