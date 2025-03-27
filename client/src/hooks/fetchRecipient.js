
// fetchRecipient.js - Remove hooks, just return the necessary data
import { baseUrl, getRequest } from "../../utils/services";

// Fetch recipient data based on chat and user, return recipient data or error message
export const fetchRecipient = async (chat, user) => {
  if (!chat || !chat.members || chat.members.length === 0) {
    throw new Error("Chat members not found or empty");
  }

  const recipientId = chat?.members.find((id) => id !== user?._id); // Calculate recipientId
  if (!recipientId) {
    throw new Error("Recipient ID is invalid");
  }

  try {
    const response = await getRequest(`${baseUrl}/users/get/${recipientId}`);
    return response;
  } catch (err) {
    throw new Error(err.message || "An error occurred while fetching the recipient.");
  }
};






/*import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../../utils/services";

export const fetchRecipient = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Ensure currentChat is not null and has members
    if (!chat || !chat.members || chat.members.length === 0) {
      setError('Chat members not found or empty');
      console.error('Chat members are empty or not available.');
      return;
    }

    // Log chat and members for debugging
    console.log("Chat object:", chat);
    console.log("Chat members:", chat.members);

    const recipientId = chat?.members.find((id) => id !== user?._id); // Calculate recipientId

    if (!recipientId) {
      setError('Recipient ID is invalid');
      console.error('Recipient ID is invalid or not found.');
      return;
    }

    console.log("Calculated recipientId:", recipientId);

    const getUser = async () => {
      try {
        const response = await getRequest(`${baseUrl}/users/get/${recipientId}`);
        
        if (response.error) {
          setError(response.error); // Set error state if there's an error
        } else {
          setRecipientUser(response); // Set recipient user if no error
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching the recipient.');
        console.error("Error fetching recipient:", err);
      }
    };

    getUser();
  }, [chat, user]); // Only depend on `chat` and `user` as dependencies

  return { recipientUser, error }; // Return both recipientUser and error
};

*/



/*import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../../utils/services";

export const fetchRecipient = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const recipientId = chat?.members.find((id) => id !== user?._id); // Calculate recipientId on every render

    if (!recipientId) {
      setError('Recipient ID is invalid');
      return;
    }

    const getUser = async () => {
      try {
        const response = await getRequest(`${baseUrl}/users/get/${recipientId}`);
        
        if (response.error) {
          setError(response.error); // Set error state if there's an error
        } else {
          setRecipientUser(response); // Set recipient user if no error
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching the recipient.');
        console.error("Error fetching recipient:", err);
      }
    };

    getUser();
  }, [chat, user]); //recipientId

  return { recipientUser, error }; // Return both recipientUser and error
};

*/



/*
import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../../utils/services";

export const fetchRecipient = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null); // Error state

  const recipientId = chat?.members.find((id) => id !== user?._id);

  console.log("chat", chat);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) {
        return null;
      }

      const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);

      if (response.error) {
        return setError(response);
      }
      setRecipientUser(response); // if no error, set the recipient user to be our response
    };

    getUser();
  }, []);

  return { recipientUser };
};

*/