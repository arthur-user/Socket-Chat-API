import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PossibleChats from "../components/chat/PossibleChat";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat } = useContext(ChatContext);

  if (isUserChatsLoading) {
    return (
      <Container>
        <p>Loading chats...</p>
      </Container>
    );
  }

  if (userChatsError) {
    return (
      <Container>
        <div>Error loading chats: {userChatsError}</div>
      </Container>
    );
  }

  if (userChats?.length === 0) {
    return (
      <Container>
        <p>No chats available.</p>
      </Container>
    );
  }

  return (
    <Container>
      <PossibleChats />
      <Stack direction="horizontal" gap={5} className="align-items-start">
        <Stack className="message-box flex-grow-0 pe-3" gap={3}>
          {userChats?.map((chat, index) => (
            <div key={index} onClick = {() => updateCurrentChat(chat)}>
              <UserChat chat={chat} user={user} />
            </div>
          ))}
        </Stack>
        <ChatBox/>
      </Stack>
    </Container>
  );
};

export default Chat;






/*
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";

const Chat = () => {
  const { user } = useContext(AuthContext);

  const { userChats, isUserChatsLoading, userChatsError } =
    useContext(ChatContext);


  return (
    <Container>
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={5} className="align-items-start">
          <Stack className="message-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading...</p>}
            {userChats?.map((chat, index) => {
              return (
                <div key={index}>
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
          <p>ChatBox</p>
        </Stack>
      )}
    </Container>
  );
};

export default Chat;

*/