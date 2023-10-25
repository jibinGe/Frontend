import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import mypdf from "../assets/report.pdf";

const ReportGenerator = async () => {
  console.log("hi");
  const patientInfo = JSON.parse(localStorage.getItem("patient"));
  console.log(patientInfo);
  // const url = "../assets/report.pdf";
  // const existingPdfBytes = await fetch(mypdf)
  //   .then((res) => {
  //     console.log(res);
  //     res.arrayBuffer();
  //   })
  //   .catch((res) => {
  //     console.log(res);
  //   });
  const existingPdfBytes = await fetch(
    "https://out-genysis.s3.ap-south-1.amazonaws.com/report.pdf"
  ).then((res) => {
    // console.log("jijiji");
    res.arrayBuffer();
  });
  // var bytes = new Uint8Array(existingPdfBytes);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Get the first page of the PDF
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Add text to the first page
  firstPage.drawText("Hello, World!", {
    x: 50,
    y: 50,
    size: 24,
    color: rgb(0, 0, 0), // black color
  });
  const modifiedPdfBytes = await pdfDoc.save();
  // Save the modified PDF
  const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
  saveAs(blob, "modified_pdf.pdf");
};

export { ReportGenerator };
