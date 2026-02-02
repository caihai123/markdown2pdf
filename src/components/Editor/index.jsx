import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import styles from "./style.module.css";
import "./userWorker";

export default function Editor(props) {
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    props.onChange?.(props.defaultValue);
    if (!containerRef.current) return;

    // 避免重复创建
    if (!editorRef.current) {
      editorRef.current = monaco.editor.create(containerRef.current, {
        value: props.defaultValue,
        language: "markdown",
        minimap: { enabled: false },
        wordWrap: "on",
        automaticLayout: true,
        scrollBeyondLastLine: false,
        placeholder: "",
        overviewRulerLanes: 0,
        renderLineHighlight: "none", // 去掉光标周围线条
        padding: {
          top: 24,
          bottom: 24,
        },
      });

      editorRef.current.onDidChangeModelContent(() => {
        props.onChange?.(editorRef.current.getValue());
      });
    }

    return () => {
      editorRef.current?.dispose();
      editorRef.current = null;
    };
  });

  return <div className={styles.editor} ref={containerRef} />;
}
