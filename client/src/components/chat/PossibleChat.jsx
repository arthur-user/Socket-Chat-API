import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PossibleChats = () => {
  const { user } = useContext(AuthContext);
  const { possibleChats, createChat, onlineUsers } = useContext(ChatContext);

  return (
    <>
      <div className="all-users">
        {possibleChats &&
          possibleChats.map((u, index) => {
            return (
              <div
                className="single-user"
                key={index}
                onClick={() => createChat(user._id, u._id)}
              >
                {u.name}
                <span 
                className={
                  onlineUsers?.some((user) => user?.userId === u._id) 
                  ? "user-online" 
                  : ""
                }
                ></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PossibleChats;





/*import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PossibleChats = () => {
  const { user } = useContext(AuthContext);
  const { possibleChats, createChat } = useContext(ChatContext);

  return (
    <>
      <div className="all-users">
        {possibleChats &&
          possibleChats.map((u, index) => {
            return (
              <div
                className="single-user"
                key={index}
                onClick={() => createChat(user._id, u._id)}
              >
                {u.name}
                <span className="user-online"></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PossibleChats;
<></>;
*/