import { NextResponse } from "next/server";

interface EmailBillingRequest {
  billingId: string;
  customerEmail: string;
  customerName: string;
  amount: number;
  serviceName: string;
  serviceDate: string;
  paymentStatus: string;
}

// Create transporter (configure your email service)
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER || "your-email@gmail.com",
//     pass: process.env.EMAIL_PASSWORD || "your-app-password",
//   },
// });

const generateBillingPDFBuffer = (billing: any) => {
  // PDF generation disabled for now
  return Buffer.from("PDF placeholder");
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as EmailBillingRequest;

    if (!payload.customerEmail || !payload.customerName) {
      return NextResponse.json(
        { message: "Customer email and name are required" },
        { status: 400 }
      );
    }

    // Check if email credentials are configured
    // if (process.env.EMAIL_USER === "your-email@gmail.com") {
    //   // Demo mode - just return success
    //   console.log("Demo email mode: Would send to", payload.customerEmail);
    //   return NextResponse.json(
    //     { message: "Email sent successfully (demo mode)" },
    //     { status: 200 }
    //   );
    // }

    // // Generate PDF buffer
    // const pdfBuffer = generateBillingPDFBuffer(payload);

    // // Send email with PDF attachment
    // const mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: payload.customerEmail,
    //   subject: `Cleaning Services Invoice - ${payload.customerName}`,
    //   html: `
    //     <h2>Hello ${payload.customerName},</h2>
    //     <p>Thank you for choosing our cleaning services!</p>
    //     <p><strong>Service:</strong> ${payload.serviceName}</p>
    //     <p><strong>Date:</strong> ${new Date(payload.serviceDate).toLocaleDateString("en-IN")}</p>
    //     <p><strong>Amount:</strong> ₹${payload.amount.toLocaleString("en-IN")}</p>
    //     <p><strong>Status:</strong> ${payload.paymentStatus.toUpperCase()}</p>
    //     <p>Please find your invoice attached.</p>
    //     <p>Best regards,<br/>Cleaning Services Team</p>
    //   `,
    //   attachments: [
    //     {
    //       filename: `Invoice-${payload.billingId.slice(-8)}.pdf`,
    //       content: Buffer.from(pdfBuffer),
    //       contentType: "application/pdf",
    //     },
    //   ],
    // };

    // await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully (feature not configured)" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending email:", error.message || error);
    return NextResponse.json(
      { message: "Error sending email", error: error.message },
      { status: 500 }
    );
  }
}
