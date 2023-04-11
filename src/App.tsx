import PSPDFKit, { Instance } from "pspdfkit";
import { useRef, useState } from "react";
import "./App.css";
import { instantJson } from "./instantJson";

const PSPDFKIT_REQUIRED_HEIGHT = "100%";
const PSPDFKIT_REQUIRED_WIDTH = "100%";
const BASE_URL = `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`;

function App() {
  const pdfContainer = useRef<HTMLDivElement>(null);
  const [pdfInstance, setPdfInstance] = useState<Instance>();
  return (
    <div className="App">
      <div>
        <button
          onClick={async () => {
            const instance = await loadPdf(instantJson, pdfContainer);
            setPdfInstance(instance);
          }}
        >
          Load PDF with Instant JSON
        </button>
        {pdfInstance && (
          <button
            onClick={async () => {
              const buffer = await pdfInstance.exportPDF({
                flatten: true,
                incremental: false,
                excludeAnnotations: false,
              });
              const supportsDownloadAttribute =
                HTMLAnchorElement.prototype.hasOwnProperty("download");
              const blob = new Blob([buffer], { type: "application/pdf" });
              if (supportsDownloadAttribute) {
                const objectUrl = window.URL.createObjectURL(blob);
                downloadPdf(objectUrl);
                window.URL.revokeObjectURL(objectUrl);
              } else {
                console.error("Download not supported");
              }
            }}
          >
            Export PDF
          </button>
        )}
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

async function loadPdf(
  instantJSON: any,
  pdfContainer: React.RefObject<HTMLDivElement>
) {
  if (pdfContainer.current === null) return;
  if (pdfContainer.current) {
    PSPDFKit.unload(pdfContainer.current);
  }
  const instance = await PSPDFKit.load({
    document: BASE_URL + "/example.pdf",
    container: pdfContainer.current,
    baseUrl: BASE_URL,
    instantJSON,
  });

  return instance;
}

function downloadPdf(blob: string) {
  const a = document.createElement("a");
  a.href = blob;
  a.style.display = "none";
  a.download = "download.pdf";
  a.setAttribute("download", "download.pdf");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
