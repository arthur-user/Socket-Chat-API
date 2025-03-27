import { createContext, useState, useEffect, useCallback } from "react";
import { baseUrl, getRequest, postRequest } from "../../utils/services";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]); // Initialize as empty array
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [possibleChats, setPossibleChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  console.log("onlineUsers", onlineUsers);
  // initial socket

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); //cleanup function
    };
  }, [user]);

    // new online user
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (response) => {
      // Registers listener for online users update
      setOnlineUsers(response);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  // send message

  useEffect(() => {
    if (socket === null) return;
   
    const recipientId = currentChat?.members.find((id) => id !== user?._id);

    socket.emit("sendMessage", {...newMessage, recipientId})
  }, [newMessage]);

  // received message

  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", res => {
      if(currentChat?._id !== res.chatId) return  // prevents updating wrong chat

      setMessages((prev)=>[...prev, res])
    })

    return () => {
      socket.off("getMessage")
    }
  }, [socket, currentChat])



  // useCallback to memoize the getUsers function
  const getUsers = useCallback(async () => {
    if (!user?._id) return; // Ensure the user is logged in

    try {
      const response = await getRequest(`${baseUrl}/users`);
      if (response.error) {
        console.error("Error retrieving users:", response);
        return;
      }

      // Filter out the logged-in user and users who are already in a chat
      const uChats = response.filter((u) => {
        if (user._id === u._id) return false;

        const isChatCreated = userChats.some((chat) =>
          chat.members.includes(u._id)
        );

        return !isChatCreated;
      });

      setPossibleChats(uChats);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [user?._id, userChats]); // Only re-run if user._id or userChats change

  useEffect(() => {
    getUsers(); // Fetch users whenever user or userChats change
  }, [getUsers]);

  // Fetch user chats on component mount or when the user changes
  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null); // Reset error state before fetching data

        try {
          const response = await getRequest(`${baseUrl}/chats/${user._id}`);
          if (response.error) {
            setUserChatsError(response.error);
            setIsUserChatsLoading(false);
            return;
          }

          setUserChats(response);
        } catch (error) {
          setUserChatsError(error);
          setIsUserChatsLoading(false);
          console.error("Error fetching user chats:", error);
        } finally {
          setIsUserChatsLoading(false);
        }
      }
    };

    getUserChats();
  }, [user]); // Only runs when `user` changes

  useEffect(() => {
    const getMessages = async () => {
      setMessagesLoading(true);
      setMessagesError(null);

      const response = await getRequest(
        `${baseUrl}/messages/${currentChat?._id}`
      );

      setMessagesLoading(false);

      if (response.error) {
        return setMessagesError(response);
      }
      setMessages(response);
    };
    if (currentChat) getMessages();
  }, [currentChat]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) {
        return console.log("Input required");
      }

      const response = await postRequest(`${baseUrl}/messages`, {
        chatId: currentChatId,
        senderId: sender._id,
        text: textMessage,
      });

      if (response.error) {
        return setSendTextMessageError(response); // if error, return message error
      }

      setNewMessage(response); // if no error, send to db
      setMessages((prev) => [...prev, response]); //update messages array
      setTextMessage(""); //clear input
    },
    []
  );

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    try {
      const response = await postRequest(`${baseUrl}/chats`, {
        firstId,
        secondId,
      });

      if (response.error) {
        console.error("Error creating chat:", response);
        return;
      }

      // Add new chat to the list and update the currentChat state
      setUserChats((prevChats) => {
        const updatedChats = [...prevChats, response];
        setCurrentChat(response); // Set the newly created chat as the current chat
        return updatedChats;
      });
    } catch (error) {
      console.error("Error initializing chat:", error);
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        possibleChats,
        createChat,
        updateCurrentChat,
        currentChat, // Expose currentChat to other components
        messages,
        isMessagesLoading,
        messagesError,
        sendTextMessage,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

/*import { createContext, useState, useEffect, useCallback } from "react";
import { baseUrl, getRequest, postRequest } from "../../utils/services";

export const ChatContext = createContext();

export const ChatProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [possibleChats, setPossibleChats] = useState([]);

  useEffect(() => {
    //if chat is created, user is added, otherwise not
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users`);
      if (response.error) {
        return console.log("Error retrieving users", response);
      }
      const uChats = response.filter((u) => {
        //array of users that can chat
        let isChatCreated = false;

        if (user._id === u._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.member[1] === u._id;
          });
        }
        return !isChatCreated;
      });
      setPossibleChats(uChats);
    };
    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null); // Reset error state before fetching data

        const response = await getRequest(`${baseUrl}/chats/${user?._id}`); // Fetch user chats

        setIsUserChatsLoading(false); // Set loading to false after fetching data

        if (response.error) {
          return setUserChatsError(response);
        }

        setUserChats(response);
      }
    };
    getUserChats();
  }, [user]);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({
        firstId,
        secondId,
      })
      
    );
    if(response.error){
      return console.log("Error initializing...", response)
    }

    setUserChats((prev)=>[...prev, response]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        possibleChats,
        createChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

*/
