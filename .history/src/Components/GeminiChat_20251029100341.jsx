import { useState, useRef, useEffect } from 'react';

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ❌ remove TS type
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setError('');
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: messages
              .map((msg) => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }],
              }))
              .concat([{ role: 'user', parts: [{ text: input }] }]),
          }),
        }
      );

      if (!response.ok) throw new Error(`Request failed with ${response.status}`);

      const data = await response.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'No response from Gemini API.';

      const geminiMessage = { sender: 'gemini', text: reply };
      setMessages((prev) => [...prev, geminiMessage]);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
      setMessages((prev) => [
        ...prev,
        { sender: 'gemini', text: '⚠️ Error: ' + (err.message || 'Unknown error') },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h3 className="text-2xl font-semibold text-center mb-4">
        🤖 Gemini Chatbot
      </h3>

      <div className="border rounded-2xl p-4 bg-white shadow-md flex flex-col h-[70vh]">
        <div className="flex-1 overflow-y-auto space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`relative max-w-[75%] px-4 py-2 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
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
            className="flex-1 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeminiChat;
