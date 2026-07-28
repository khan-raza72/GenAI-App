const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    console.log("🚀 AI API CALL START..."); // Terminal checking ke liye

    const prompt = `You are an expert technical interviewer. Analyze the details below and generate an interview report.
    
    
    Resume: ${resume || "N/A"}
    Self Description: ${selfDescription || "N/A"}
    Job Description: ${jobDescription || "N/A"}

    STRICT OUTPUT FORMAT: 
    You MUST return ONLY a valid JSON object matching the exact structure below. Do NOT wrap it in markdown blockticks like \`\`\`json.
    {
        "matchScore": 85,
        "technicalQuestions": [
            { "question": "Generate Q1 here", "intention": "Why ask this", "answer": "Ideal answer" }
        ],
        "behavioralQuestions": [
            { "question": "Generate Q1 here", "intention": "Why ask this", "answer": "Ideal answer" }
        ],
        "skillGaps": [
            { "skill": "Missing Skill 1", "severity": "medium" }
        ],
        "preparationPlan": [
            { "day": 1, "focus": "Day 1 Focus", "tasks": ["Task 1", "Task 2"] }
        ]
    }`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview", // Aapka working model
            contents: prompt,
            config: {
                responseMimeType: "application/json"
                // 🟢 FIX: responseSchema yahan se hata diya gaya hai!
            }
        });

        let cleanText = response.text || "";
        
        // 👇 YEH LINE TERMINAL MEIN DIKHAYEGI KI AI NE KYA BHEJA HAI
        console.log("👉 RAW AI OUTPUT:", cleanText); 

        // Clean any accidental markdown
        cleanText = cleanText.replace(/```json/gi, "").replace(/```/gi, "").trim();

        if (!cleanText) {
            console.log("⚠️ AI returned empty string!");
            return {};
        }

        return JSON.parse(cleanText);

    } catch (error) {
        console.error("🔥 Error in AI Report Generation:", error.message);
        throw error;
    }
}
async function generatePdfFromHtml(htmlContent) {
    // 🟢 FIX 4: Added args to prevent Puppeteer crashing on servers/windows
    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    })
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()
    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume || "N/A"}
                        Self Description: ${selfDescription || "N/A"}
                        Job Description: ${jobDescription || "N/A"}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `

    // 🟢 FIX 1: Generate schema and explicitly delete the $schema property
    const schema = zodToJsonSchema(resumePdfSchema);
    delete schema.$schema;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview", // 🟢 FIX 2: Used valid stable model
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: schema, // 🟢 FIX 1 applied here
        }
    })

    // 🟢 FIX 3: Sanitize potential markdown blockticks before parsing
    let cleanText = response.text || "";
    cleanText = cleanText.replace(/```json/gi, "").replace(/```/gi, "").trim();

    const jsonContent = JSON.parse(cleanText)
    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer
}

module.exports = { generateInterviewReport, generateResumePdf }
