import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  Binary,
  Bot,
  BrainCircuit,
  Braces,
  Clock3,
  Code2,
  Loader2,
  Network,
  RotateCcw,
  Send,
  Sparkles,
  Waypoints,
} from "lucide-react";

const quickPrompts = [
  "Explain binary search with time complexity.",
  "How do I reverse a linked list?",
  "Teach recursion using factorial.",
  "Solve two sum in JavaScript.",
];

const topics = [
  { label: "Arrays", icon: Binary },
  { label: "Trees", icon: Waypoints },
  { label: "Graphs", icon: Network },
  { label: "DP", icon: BrainCircuit },
  { label: "Code", icon: Code2 },
  { label: "Complexity", icon: Clock3 },
];

const createId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const currentTime = () =>
  new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());

const createWelcomeMessage = () => ({
  id: createId(),
  role: "assistant",
  text: "Hi, I am your DSA coach. Ask me about arrays, linked lists, recursion, trees, graphs, dynamic programming, time complexity, or a coding problem.",
  time: currentTime(),
  localOnly: true,
});

function App() {
  const [messages, setMessages] = useState(() => [createWelcomeMessage()]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const visibleHistory = useMemo(
    () =>
      messages
        .filter((message) => !message.localOnly)
        .map((message) => ({
          role: message.role,
          text: message.text,
        })),
    [messages],
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  async function sendMessage(text = input) {
    const userText = text.trim();

    if (!userText || isSending) {
      return;
    }

    const userMessage = {
      id: createId(),
      role: "user",
      text: userText,
      time: currentTime(),
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setError("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
          history: visibleHistory,
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "The chatbot could not answer right now.");
      }

      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          text: data.reply,
          time: currentTime(),
        },
      ]);
    } catch (requestError) {
      const message =
        requestError.message ||
        "The chatbot is not available right now. Please try again.";

      setError(message);
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          text: message,
          time: currentTime(),
          isError: true,
          localOnly: true,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function resetChat() {
    setMessages([createWelcomeMessage()]);
    setError("");
    setInput("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(120deg,#f8fafc_0%,#eefaf6_48%,#fff7ed_100%)] text-slate-950">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-4 px-3 py-3 sm:px-5 sm:py-5 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-5">
        <aside className="hidden min-h-[calc(100vh-40px)] flex-col rounded-lg border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur lg:flex">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal-700 text-white shadow-sm">
              <Braces size={24} strokeWidth={2.4} />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-normal text-slate-950">
                DSA Chatbot
              </h1>
              <p className="text-sm text-slate-500">Your algorithm coach</p>
            </div>
          </div>

          <div className="py-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Sparkles size={16} />
              Quick Prompts
            </div>
            <div className="space-y-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-left text-sm font-medium leading-5 text-slate-700 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-900 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isSending}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 py-5">
            <div className="mb-3 text-sm font-semibold text-slate-700">
              Topics
            </div>
            <div className="grid grid-cols-2 gap-2">
              {topics.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setInput(`Explain ${label} in DSA.`)}
                  className="flex min-h-12 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-900"
                >
                  <Icon size={17} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto rounded-lg border border-teal-200 bg-teal-50 p-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-teal-950">
              <Bot size={17} />
              DSA Only
            </div>
            <p className="mt-2 text-sm leading-6 text-teal-900">
              The assistant stays focused on data structures, algorithms, and
              coding logic.
            </p>
          </div>
        </aside>

        <section className="flex min-h-[calc(100vh-24px)] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70 sm:min-h-[calc(100vh-40px)]">
          <header className="border-b border-slate-200 bg-white/95 px-3 py-3 backdrop-blur sm:px-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-slate-950 text-white lg:hidden">
                  <Braces size={23} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate text-base font-semibold text-slate-950 sm:text-lg">
                      DSA Coach
                    </h2>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Online
                    </span>
                  </div>
                  <p className="truncate text-sm text-slate-500">
                    Algorithms, complexity, problem solving
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={resetChat}
                title="Reset chat"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                <RotateCcw size={16} />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="min-h-10 shrink-0 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 transition hover:border-teal-300 hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isSending}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </header>

          <div className="chat-scroll flex-1 space-y-4 overflow-y-auto bg-slate-50 px-3 py-4 sm:px-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isSending && <TypingMessage />}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-200 bg-white p-3 sm:p-4"
          >
            {error && (
              <div className="mb-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium leading-5 text-red-700">
                <AlertCircle size={17} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask a DSA question..."
                className="max-h-36 min-h-12 flex-1 resize-none rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
              />
              <button
                type="submit"
                title="Send message"
                disabled={!input.trim() || isSending}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-teal-700 text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {isSending ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <article
      className={`message-enter flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
            message.isError ? "bg-red-100 text-red-700" : "bg-teal-100 text-teal-800"
          }`}
        >
          {message.isError ? <AlertCircle size={18} /> : <Bot size={18} />}
        </div>
      )}

      <div className={`max-w-[84%] sm:max-w-[72%] ${isUser ? "order-first" : ""}`}>
        <div
          className={`rounded-lg px-4 py-3 text-sm leading-6 shadow-sm ${
            isUser
              ? "bg-slate-950 text-white"
              : message.isError
                ? "border border-red-200 bg-white text-red-700"
                : "border border-slate-200 bg-white text-slate-800"
          }`}
        >
          <p className="whitespace-pre-wrap  wrap-break-words">{message.text}</p>
        </div>
        <div
          className={`mt-1 text-xs text-slate-400 ${isUser ? "text-right" : "text-left"}`}
        >
          {message.time}
        </div>
      </div>

      {isUser && (
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-orange-100 text-orange-800">
          <span className="text-sm font-bold">You</span>
        </div>
      )}
    </article>
  );
}

function TypingMessage() {
  return (
    <article className="message-enter flex justify-start gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-teal-100 text-teal-800">
        <Bot size={18} />
      </div>
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-teal-600 [animation-delay:-0.2s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-teal-600 [animation-delay:-0.1s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-teal-600" />
        </div>
      </div>
    </article>
  );
}

export default App;
