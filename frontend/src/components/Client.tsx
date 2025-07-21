import { useState, useEffect, useRef } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1,sender: "bot", text: "message from bot user." }
  ]);
  const [input, setInput] = useState("");

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080/");

    ws.current.onerror = console.error;

    ws.current.onopen = () => {
      ws.current?.send("new user connected");
    };

    ws.current.onmessage = (event: MessageEvent) => {
      const msg = event.data;
      setMessages(prev => [...prev, { id: Date.now(), sender: "bot", text: msg }]);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), sender: "user", text: input }]);
    ws.current?.send(input);
    setInput("");
  };

  return (
    <div className="bg-gray-200 p-6 pt-24 min-h-screen">
      <div className="text-center font-bold text-2xl text-black pb-12">chat.</div>

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg flex flex-col h-[70vh]">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-xs sm:max-w-sm px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-100 text-black self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300 p-4 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
