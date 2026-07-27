const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../model/interviewReport.model.js");




/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
  try {
    const { selfDescription, jobDescription, title } = req.body;

    // 1. Resume Parsing Logic
    let resumeText = "";
    if (req.file && req.file.buffer) {
      try {
        if (typeof pdfParse === 'function') {
          const parsedData = await pdfParse(req.file.buffer);
          resumeText = parsedData.text || "";
        } else if (pdfParse && pdfParse.PDFParse) {
          const parsedData = await new pdfParse.PDFParse(Uint8Array.from(req.file.buffer)).getText();
          resumeText = parsedData.text || "";
        }
      } catch (pdfErr) {
        console.error("PDF Parsing Error:", pdfErr.message);
      }
    } else if (req.body.resume) {
      resumeText = req.body.resume;
    }

    // 2. AI Service Call
    const aiReport = await generateInterviewReport({
      resume: resumeText,
      selfDescription,
      jobDescription,
    });

    // 🟢 GUARANTEED TITLE CALCULATOR
    let finalTitle = "Full Stack MERN Interview Strategy";

    if (typeof title === "string" && title.trim() !== "") {
      finalTitle = title.trim();
    } else if (aiReport && typeof aiReport.title === "string" && aiReport.title.trim() !== "") {
      finalTitle = aiReport.title.trim();
    } else if (typeof jobDescription === "string" && jobDescription.trim() !== "") {
      finalTitle = jobDescription.trim().slice(0, 30) + "...";
    }

    // 3. Save to MongoDB
    const interviewReport = await interviewReportModel.create({
      user: req.user?._id || req.user?.id,
      title: finalTitle, // 👈 Guaranteed String
      resume: resumeText || "",
      selfDescription: selfDescription || "",
      jobDescription: jobDescription || "",
      matchScore: aiReport?.matchScore || 0,
      technicalQuestions: aiReport?.technicalQuestions || [],
      behavioralQuestions: aiReport?.behavioralQuestions || [],
      skillGaps: aiReport?.skillGaps || [],
      preparationPlan: aiReport?.preparationPlan || [],
    });

    return res.status(201).json({
      message: "Interview report generated successfully.",
      interviewReport,
    });

  } catch (error) {
    console.error("Error in generateInterViewReportController:", error);
    return res.status(500).json({ 
      message: error.message || "Failed to generate interview report" 
    });
  }
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}


/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}

module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController }