import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { fetchRecipient } from "../../hooks/fetchRecipient";  // Import the refactored fetchRecipient
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const [textMessage, setTextMessage] = useState("");  // Make sure it's an empty string initially
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  // Effect to fetch recipient data when currentChat or user changes
  useEffect(() => {
    const fetchRecipientData = async () => {
      try {
        const recipient = await fetchRecipient(currentChat, user); // Call the function
        setRecipientUser(recipient); // Set recipient data
        setError(null); // Reset any previous errors
      } catch (err) {
        setError(err.message); // Set error if fetching fails
        setRecipientUser(null); // Reset recipientUser
      }
    };

    if (currentChat && user) {
      fetchRecipientData(); // Fetch the recipient when currentChat or user changes
    }
  }, [currentChat, user]); // Only depend on currentChat and user

  // Error and loading handling
  if (isMessagesLoading) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Chat is loading...</p>
    );
  }

  if (error) {
    return <p style={{ textAlign: "center", width: "100%" }}>{error}</p>;
  }

  if (!recipientUser) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversations selected
      </p>
    );
  }

  // Handle send button click
  const handleSend = () => {
    if (textMessage.trim()) {
      sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
    }
  };

  return (
    <Stack gap={5} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={4} className="messages">
        {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <Stack
              key={index}
              className={`${
                message?.senderId === user?._id
                  ? "message self align-self-end flex-grow-0"
                  : "message align-self-start flex-grow-0"
              }`}
            >
              <span>{message.text}</span>
              <span className="message-footer">
                {moment(message.createdAt).calendar()}
              </span>
            </Stack>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No messages yet. Start the conversation!</p>
        )}
      </Stack>
      <Stack direction="horizontal" gap={4} className="chat-input flex-grow-0">
        <InputEmoji
          value={textMessage}  // Bind textMessage to InputEmoji value
          onChange={setTextMessage}  // Update textMessage when input changes
          fontFamily="Inter"
          borderColor="10, 10, 12, 0.3"
          aria-label="Type your message"
        />
      </Stack>
      <button
        className="send-btn"
        onClick={handleSend}  // Send the message on click
        disabled={!textMessage.trim()}  // Disable if message is empty or only spaces
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-send"
          viewBox="0 0 16 16"
        >
          <path d="M14.5 7.5l-10 3a.5.5 0 0 0 0 .9l10 3a.5.5 0 0 0 .7-.5v-6a.5.5 0 0 0-.7-.5z" />
        </svg>
      </button>
    </Stack>
  );
};

export default ChatBox;






/*import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { fetchRecipient } from "../../hooks/fetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const [textMessage, setTextMessage] = useState("");
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  // Make sure currentChat exists
  useEffect(() => {
    if (!currentChat) return;
    
    const { recipientUser, error } = fetchRecipient(currentChat, user);
    if (error) {
      setError(error);
    } else {
      setRecipientUser(recipientUser);
    }
  }, [currentChat, user]);

  // Error or loading states handling
  if (isMessagesLoading) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Chat is loading...</p>
    );
  }

  if (error) {
    return <p style={{ textAlign: "center", width: "100%" }}>{error}</p>;
  }

  if (!currentChat) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>No chat selected</p>
    );
  }

  if (!recipientUser) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversations selected
      </p>
    );
  }

  // Handle the case where no messages are found
  if (!messages || messages.length === 0) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No messages yet. Start the conversation!
      </p>
    );
  }

  return (
    <Stack gap={5} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={4} className="messages">
        {messages.map((message, index) => (
          <Stack
            key={index}
            className={`${
              message?.senderId === user?._id
                ? "message self align-self-end flex-grow-0"
                : "message align-self-start flex-grow-0"
            }`}
          >
            <span>{message.text}</span>
            <span className="message-footer">
              {moment(message.createdAt).calendar()}
            </span>
          </Stack>
        ))}
      </Stack>
      <Stack direction="horizontal" gap={4} className="chat-input flex-grow-0">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="Inter"
          borderColor="10, 10, 12, 0.3"
          aria-label="Type your message"
        />
      </Stack>
      <button
        className="send-btn"
        onClick={() =>
          sendTextMessage(textMessage, user, currentChat._id, setTextMessage)
        }
        disabled={!textMessage.trim()}  // Disable if empty
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-send"
          viewBox="0 0 16 16"
        >
          <path d="M14.5 7.5l-10 3a.5.5 0 0 0 0 .9l10 3a.5.5 0 0 0 .7-.5v-6a.5.5 0 0 0-.7-.5z" />
        </svg>
      </button>
    </Stack>
  );
};

export default ChatBox;
*/



/*import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { fetchRecipient } from "../../hooks/fetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const [textMessage, setTextMessage] = useState("");

  // Ensure that currentChat is available before proceeding
  if (!currentChat) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>No chat selected</p>
    );
  }

  const { recipientUser, error } = fetchRecipient(currentChat, user);

  if (error) {
    return <p style={{ textAlign: "center", width: "100%" }}>{error}</p>;
  }

  if (!recipientUser) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversations selected
      </p>
    );
  }

  if (isMessagesLoading) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Chat is loading...</p>
    );
  }

  return (
    <Stack gap={5} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={4} className="messages">
        {messages &&
          messages.map((message, index) => (
            <Stack
              key={index}
              className={`${
                message?.senderId === user?._id
                  ? "message self align-self-end flex-grow-0"
                  : "message align-self-start flex-grow-0"
              }`}
            >
              <span>{message.text}</span>
              <span className="message-footer">
                {moment(message.createdAt).calendar()}
              </span>
            </Stack>
          ))}
      </Stack>
      <Stack direction="horizontal" gap={4} className="chat-input flex-grow-0">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="Inter"
          borderColor="10, 10, 12, 0.3"
        />
      </Stack>
      <button
        className="send-btn"
        onClick={() =>
          sendTextMessage(textMessage, user, currentChat._id, setTextMessage)
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-back"
          viewBox="0 0 16 16"
        >
          <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
        </svg>
      </button>
    </Stack>
  );
};

export default ChatBox;
*/

/*import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { fetchRecipient } from "../../hooks/fetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading } = useContext(ChatContext);
  const { recipientUser } = fetchRecipient(currentChat, user);

  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversations selected
      </p>
    );

  if (!isMessagesLoading)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Chat is loading...</p>
    );

  return (
    <Stack gap={5} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={4} className="messages">
        {messages &&
          messages.map((message, index) => (
            <Stack
              key={index}
              className={`${
                message?.senderId === user?._id
                  ? "message self align-self-end flex-grow-0"
                  : "message align-self-start flex-grow-0"
              }`}
            >
              <span>{message.text}</span>
              <span className="message-footer">
                {moment(message.createdAt).calendar()}
              </span>
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
};

export default ChatBox;

*/
