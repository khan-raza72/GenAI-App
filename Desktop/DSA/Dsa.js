import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";


loadEnvFile();

const PORT = Number(process.env.PORT || 5173);
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3-flash-preview";

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_INSTRUCTION = `
You are DSA Coach, a focused data structures and algorithms instructor.
Answer only questions about DSA, programming logic, complexity analysis,
problem solving, and code explanations.
If a user asks something unrelated to DSA, reply exactly:
"Please ask a question related to DSA."
Keep answers clear, practical, and beginner friendly. Use examples and steps
when they help, and include code only when useful.
`;

function loadEnvFile() {
  const envPath = resolve(process.cwd(), ".env");

  if (!existsSync(envPath)) {
    return;
  }

  const envText = readFileSync(envPath, "utf8");

  for (const line of envText.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const [key, ...valueParts] = trimmed.split("=");
    const value = valueParts.join("=").trim().replace(/^["']|["']$/g, "");

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
  });
  response.end(JSON.stringify(payload));
}

function readJsonBody(request) {
  return new Promise((resolveBody, rejectBody) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        rejectBody(new Error("Request body is too large."));
        request.destroy();
      }
    });

    request.on("end", () => {
      if (!body) {
        resolveBody({});
        return;
      }

      try {
        resolveBody(JSON.parse(body));
      } catch {
        rejectBody(new Error("Invalid JSON request."));
      }
    });

    request.on("error", rejectBody);
  });
}

function buildConversation(history, message) {
  const safeHistory = Array.isArray(history) ? history : [];
  const recentHistory = safeHistory.slice(-10).filter((item) => {
    return item && typeof item.text === "string" && item.text.trim();
  });

  const contents = recentHistory.map((item) => ({
    role: item.role === "assistant" ? "model" : "user",
    parts: [{ text: item.text.slice(0, 4000) }],
  }));

  contents.push({
    role: "user",
    parts: [{ text: message }],
  });

  return contents;
}

async function handleChat(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Only POST requests are supported." });
    return;
  }

  try {
    const body = await readJsonBody(request);
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      sendJson(response, 400, { error: "Please enter a DSA question." });
      return;
    }

    if (!ai) {
      sendJson(response, 500, {
        error: "Missing GEMINI_API_KEY. Add it to a .env file, then restart npm run dev.",
      });
      return;
    }

    const result = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: buildConversation(body.history, message),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.35,
      },
    });

    sendJson(response, 200, {
      reply: result.text || "I could not generate a response. Please try again.",
    });
  } catch (error) {
    sendJson(response, 500, {
      error: error.message || "Something went wrong while contacting the chatbot.",
    });
  }
}

const vite = await createViteServer({
  appType: "spa",
  server: {
    hmr: false,
    middlewareMode: true,
  },
});

const server = createServer(async (request, response) => {
  if (request.url?.startsWith("/api/chat")) {
    await handleChat(request, response);
    return;
  }

  if (request.url?.startsWith("/api/health")) {
    sendJson(response, 200, { ok: true, hasApiKey: Boolean(apiKey) });
    return;
  }

  vite.middlewares(request, response, (error) => {
    if (error) {
      vite.ssrFixStacktrace(error);
      response.statusCode = 500;
      response.end(error.message);
      return;
    }

    response.statusCode = 404;
    response.end("Not found");
  });
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Set PORT to another value and restart.`);
    process.exit(1);
  }

  throw error;
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`DSA chatbot is running at http://127.0.0.1:${PORT}`);
});
