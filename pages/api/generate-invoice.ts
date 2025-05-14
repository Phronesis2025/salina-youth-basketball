import { NextApiRequest, NextApiResponse } from "next";
import PDFDocument from "pdfkit";
import blobStream from "blob-stream";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    first_name,
    last_name,
    parent_email,
    age_group,
    team_gender,
    payment_option,
    payment_status,
    created_at,
    amount,
    payment_id,
  } = req.body;

  try {
    // Create a new PDF document
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const stream = doc.pipe(blobStream());

    // Add content to the PDF
    doc
      .fontSize(20)
      .text("Salina Youth Basketball Club - Invoice", { align: "center" });
    doc.moveDown(1);

    doc.fontSize(12).text(`Invoice Number: ${payment_id}`, { align: "left" });
    doc.text(`Date: ${new Date(created_at).toLocaleDateString()}`, {
      align: "left",
    });
    doc.moveDown(1);

    doc.text("To:", { align: "left" });
    doc.text(`${first_name} ${last_name}`, { align: "left" });
    doc.text(`${parent_email}`, { align: "left" });
    doc.moveDown(1);

    doc.text("Registration Details:", { align: "left", underline: true });
    doc.text(`Name: ${first_name} ${last_name}`, { align: "left" });
    doc.text(`Age Group: ${age_group}`, { align: "left" });
    doc.text(`Team Gender: ${team_gender}`, { align: "left" });
    doc.text(
      `Payment Option: ${
        payment_option === "full"
          ? "Pay in Full ($360.00)"
          : "Monthly Installments ($30.00 x 12)"
      }`,
      { align: "left" }
    );
    doc.text(`Amount: $${(amount / 100).toFixed(2)}`, { align: "left" });
    doc.text(
      `Payment Status: ${
        payment_status.charAt(0).toUpperCase() + payment_status.slice(1)
      }`,
      { align: "left" }
    );
    doc.moveDown(1);

    doc.text("Thank You", { align: "left", underline: true });
    doc.text(
      "Thank you for joining the Salina Youth Basketball Club! We look forward to seeing you on the court.",
      { align: "left" }
    );

    // Finalize the PDF
    doc.end();

    // Convert the stream to a buffer
    const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on("data", (chunk: Buffer) => chunks.push(chunk));
      stream.on("end", () => resolve(Buffer.concat(chunks)));
      stream.on("error", reject);
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${payment_id}.pdf`
    );
    res.status(200).send(pdfBuffer);
  } catch {
    // Error handling without unused variable
    res.status(500).json({ error: "Failed to generate invoice" });
  }
}
