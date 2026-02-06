import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import styles from "./style.module.css";
import "./userWorker";

const Editor = forwardRef(function (props, ref) {
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

      // 内容变化时触发
      editorRef.current.onDidChangeModelContent(() => {
        props.onChange?.(editorRef.current.getValue());
      });

      // 滚动条位置变化时触发
      editorRef.current.onDidScrollChange((...args) => {
        props.onDidScrollChange?.(...args);
      });
    }

    return () => {
      editorRef.current?.dispose();
      editorRef.current = null;
    };
  });

  useImperativeHandle(ref, () => ({
    // 更新滚动条位置
    setScrollTop: (...args) => editorRef.current?.setScrollTop(...args),
  }));

  return <div className={styles.editor} ref={containerRef} />;
});

export default Editor;
