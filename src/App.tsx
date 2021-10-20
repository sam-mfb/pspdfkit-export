import PSPDFKit from "pspdfkit";
import { useRef } from "react";
import "./App.css";

const PSPDFKIT_REQUIRED_HEIGHT = "100%";
const PSPDFKIT_REQUIRED_WIDTH = "100%";
const BASE_URL = `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`;

function App() {
  const loadPdf = (instantJSON?: any) => {
    if (pdfContainer.current === null) return;
    if (pdfContainer.current) {
      PSPDFKit.unload(pdfContainer.current);
    }
    PSPDFKit.load({
      document: BASE_URL + "noIDPdf.pdf",
      container: pdfContainer.current,
      baseUrl: BASE_URL,
      instantJSON,
    }).then((instance) =>
      instance.exportInstantJSON().then((ij) => console.log(ij))
    );
  };
  const pdfContainer = useRef<HTMLDivElement>(null);
  return (
    <div className="App">
      <div>
        <button onClick={() => loadPdf()}>Load InstantJSON</button>
      </div>
      <div
        className="pdf-viewer"
        ref={pdfContainer}
        style={{
          width: PSPDFKIT_REQUIRED_WIDTH,
          height: PSPDFKIT_REQUIRED_HEIGHT,
        }}
      ></div>
    </div>
  );
}

export default App;
