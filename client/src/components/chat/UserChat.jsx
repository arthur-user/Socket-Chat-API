/*import { Stack } from "react-bootstrap";
import { fetchRecipient } from "../../hooks/fetchRecipient";

const UserChat = ({ chat, user }) => {
  const { recipientUser, error } = fetchRecipient(chat, user);

  // Debugging logs
  console.log("recipientUser in UserChat:", recipientUser);  // Check if recipientUser is populated

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipientUser) {
    return <div>Loading recipient...</div>;  // Ensure the "loading" state is showing when data is being fetched
  }

  return (
    <div>
      <h3>{recipientUser.name}</h3>
      <p>{recipientUser.email}</p>
    </div>
  );
};

export default UserChat;
*/

import { fetchRecipient } from "../../hooks/fetchRecipient";
import avatar from "../../assets/avatar.png";
import { Stack } from "react-bootstrap";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const UserChat = ({ chat, user }) => {
  // Call the fetchRecipient hook to get recipientUser data
  const { recipientUser, error } = fetchRecipient(chat, user);
  
  // Get onlineUsers from ChatContext
  const { onlineUsers } = useContext(ChatContext);

  // You can add some error handling here if needed
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Stack
      direction="horizontal"
      gap={4}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} height="32px" alt="User Avatar" />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">Text Message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">2/2/2025</div>
        <div className="this-user-notifications">3</div>
        <span
          className={
            onlineUsers?.some((onlineUser) => onlineUser?.userId === recipientUser?._id)
              ? "user-online"
              : ""
          }
        ></span>
      </div>
    </Stack>
  );
};

export default UserChat;

