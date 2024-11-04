import { useState } from 'react';
import { BsEmojiSmile, BsPaperclip } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';

const ChatSidebar = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'You', id: Date.now() }]);
      setNewMessage('');
    }
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage(newMessage + emoji.emoji);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages([...messages, { text: `📎 ${file.name}`, sender: 'You', id: Date.now() }]);
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-gray-900 text-white flex flex-col p-4 shadow-lg z-50">
      {/* Header */}
      <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Chat</h2>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto mb-4 space-y-2 pr-2">
        {messages.map((message) => (
          <div key={message.id} className="p-2 rounded-md bg-gray-800">
            <span className="text-blue-400 font-medium">{message.sender}: </span>
            <span>{message.text}</span>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex items-center relative">
        <input
          type="text"
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        
        {/* Emoji Picker */}
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-gray-400 mx-2">
          <BsEmojiSmile size={24} />
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-12 right-0">
            <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
          </div>
        )}

        {/* File Upload */}
        <label className="text-gray-400 mx-2 cursor-pointer">
          <BsPaperclip size={24} />
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>

        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;
