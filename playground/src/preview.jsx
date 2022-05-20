import React, { useRef, useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime.js";
import { compile, run } from "@mdx-js/mdx";
import { remarkCodeHike } from "@code-hike/mdx";
import { CH } from "@code-hike/mdx/components";
import "@code-hike/mdx/styles.css";
import { ErrorBoundary } from "react-error-boundary";

export function Preview(props) {
  return (
    <div className="preview">
      <ErrorBoundary resetKeys={[props.code]} FallbackComponent={ErrorFallback}>
        <InnerPreview {...props} />
      </ErrorBoundary>
    </div>
  );
}
function ErrorFallback({ error }) {
  return (
    <div className="preview-error">
      <p>Something went wrong:</p>
      <pre>{String(error)}</pre>
    </div>
  );
}

function InnerPreview({ code }) {
  const [Content, setContent] = useState(undefined);
  const [error, setError] = useState(undefined);
  useEffect(() => {
    compile(code, {
      outputFormat: "function-body",
      remarkPlugins: [[remarkCodeHike, { autoImport: false }]],
    })
      .then((c) => {
        return run(String(c), runtime);
      })
      .then((x) => {
        setContent(() => x.default);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
        console.error({ e });
      });
  }, [code]);
  // console.log(error);
  return (
    <>
      {Content ? Content({ components: { CH } }) : null}
      {error ? <div className="preview-error">{error}</div> : null}
    </>
  );
}