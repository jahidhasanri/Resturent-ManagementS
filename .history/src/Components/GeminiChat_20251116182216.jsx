import { useState, useRef, useEffect } from "react";
import { MessageCircle } from "lucide-react"; // nice chat icon

const GeminiChat = () => {
  const [messages, setMessages] = useState([
    { sender: "gemini", text: "👋 Welcome to RestoBot! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setError("");
    const userMessage = { sender: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const contents = updatedMessages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents }),
        }
      );

      if (!response.ok) throw new Error(`Request failed with ${response.status}`);

      const data = await response.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from Gemini API.";

      setMessages((prev) => [...prev, { sender: "gemini", text: reply }]);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong!");
      setMessages((prev) => [
        ...prev,
        {
          sender: "gemini",
          text: "⚠️ Error: " + (err.message || "Unknown error"),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end "
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all"
        title="Chat with RestoBot"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[70vh] mt-4 border rounded-2xl p-4 bg-white shadow-2xl flex flex-col ml-[100px] pl-[30px]">
          <h3 className="text-xl font-semibold text-center mb-3 text-indigo-700">
            🤖 RestoBot
          </h3>

          <div className="flex-1 overflow-y-auto space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`relative max-w-[75%] px-4 py-2 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                  <span
                    className="absolute right-1 bottom-1 text-xs opacity-60 cursor-pointer"
                    onClick={() => navigator.clipboard.writeText(msg.text)}
                    title="Copy text"
                  >
                    📋
                  </span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
            {loading && <p className="text-center text-gray-500">Thinking...</p>}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}

          <form onSubmit={sendMessage} className="mt-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "..." : "Send"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GeminiChat;
