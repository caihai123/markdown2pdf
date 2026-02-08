import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Editor from "@/components/Editor/index";
import { SplitPane, Pane, usePersistence } from "react-split-pane";
import Header from "./components/Header";
import Footer from "./components/Footer";
import readme from "/README.md";
import "./split-pane.css";
import { useRef } from "react";
import md from "@/utils/markdown-it";

const HostMessaging = class {
  constructor(port2) {
    this.port2 = port2;

    this.handlers = new Map();

    this.port2.onmessage = (e) => {
      const channel = e.data.channel;
      const handlers = this.handlers.get(channel);
      if (handlers) {
        for (const handler of handlers) {
          handler(e, e.data.data);
        }
      } else {
        console.log("no handler for ", e);
      }
    };
  }

  postMessage(channel, data, transfer) {
    this.port2.postMessage({ channel, data }, transfer);
  }

  onMessage(channel, handler) {
    let handlers = this.handlers.get(channel);
    if (!handlers) {
      handlers = [];
      this.handlers.set(channel, handlers);
    }
    handlers.push(handler);
  }
};

export default function Home() {
  const [sizes, setSizes] = usePersistence({ key: "my-layout" });
  const [resizeing, setResizeing] = useState(); // 是否在拖动

  const hostMessaging = useRef();

  const updateIframePreview = function (value) {
    const html = md.render(value);
    hostMessaging.current?.postMessage("content", html);
  };

  useEffect(() => {
    const handleMessage = (event) => {
      const { origin } = new URL(location.toString());
      if (event.origin !== origin) {
        return;
      }
      if (event.ports && event.ports[0]) {
        hostMessaging.current = new HostMessaging(event.ports[0]);

        updateIframePreview(readme);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Header onPrint={() => hostMessaging.current?.postMessage("print")} />
      <Toolbar />
      <Box component="main" flex={1}>
        <SplitPane
          direction="horizontal"
          onResize={setSizes}
          onResizeStart={() => setResizeing(true)}
          onResizeEnd={() => setResizeing(false)}
          style={{ overflow: "visible" }}
        >
          <Pane
            size={sizes[0]}
            style={{ position: "static", overflow: "visible" }}
          >
            <Editor defaultValue={readme} onChange={updateIframePreview} />
          </Pane>
          <Pane
            size={sizes[1]}
            minSize={400}
            maxSize={980}
            defaultSize="600px"
            style={{ position: "static", overflow: "visible" }}
          >
            <iframe
              src={`${import.meta.env.BASE_URL}/preview.html`}
              className={resizeing ? "pointer-events-disabled" : ""}
              style={{ border: "none", width: "100%", height: "100%" }}
            />
          </Pane>
        </SplitPane>
      </Box>
      <Footer />
    </Box>
  );
}
