import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StateContext } from "../../context/StateContext";
import ActivityIndicator from "../utils/ActivityIndicator";

function Message() {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState({});
  const { setAlertData, hideAlert, setIsAlertVisible, decodeJwtToken } =
    useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userContacts, setUserContacts] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  //get all contacts of user
  const getUserContacts = async () => {
    const userId = await decodeJwtToken()._id;
    fetch(`http://localhost:2000/message/get-user-contacts/${userId}`).then(
      async (res) => {
        const data = await res.json();
        setUserContacts(data.data);
        console.log(userContacts);
      }
    );
  };
  //get all messages of user
  const getUserMessages = async () => {
    setIsLoading(true);
    fetch(
      `http://localhost:2000/message/get-messages/${selectedChat.conId}`
    ).then(async (res) => {
      const data = await res.json();
      setUserMessages(data.messages);
      console.log(userMessages);
      setIsLoading(false);
    });
  };

  //handle clicked on chat
  const handleClickOnChats = (contact) => {
    setSelectedChat({
      conId: getConId(contact.userId, contact.contact._id),
      userId: contact.userId,
      reciverId: contact.contact._id,
      reciverPicture: contact.contact.picture,
      reciverName: contact.contact.name,
      lastActive: contact.contactAnalytics.lastActive,
    });
  };

  //create conId by comparison
  const getConId = (sender, reciver) => {
    if (sender < reciver) return sender + "-" + reciver;
    else return reciver + "-" + sender;
  };

  const handleSendButtonClick = async () => {
    const d = new Date();
    const time = `${d.getHours()}:${d.getMinutes()}`;
    const payload = {
      conId: getConId(selectedChat.userId, selectedChat.reciverId),
      sender: await decodeJwtToken()._id,
      reciver: selectedChat.reciverId,
      message: inputMessage,
      time,
    };
    console.log(payload);
    //save message
    fetch(`http://localhost:2000/message/save-messages`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const data = await res.json();

      const renderPayload = {
        ...payload,
        sender: {
          _id: payload.sender,
          picture: await decodeJwtToken().picture,
        },
      };
      console.log(renderPayload);
      setUserMessages((prev) => [...prev, renderPayload]);
    });
  };

  //get messages of selected chat
  useEffect(() => {
    if (selectedChat) getUserMessages();
  }, [selectedChat]);

  useEffect(() => {
    getUserContacts();
  }, []);
  return (
    <>
      <div className="flex h-[80vh] w-[96vw] gap-2 m-auto overflow-hidden my-4 gap-2 ">
        <div className="w-1/4 bg-white border rounded">
          <header className="p-4 border-b flex justify-between items-center">
            <h1 className="text-md font-semibold">Messages</h1>
          </header>
          <div className="overflow-y-auto h-full p-3 mb-9 pb-20">
            {userContacts &&
              userContacts.length &&
              userContacts.map((contact) => {
                return (
                  <button
                    onClick={() => {
                      handleClickOnChats(contact);
                    }}
                    className="text-left w-full h-fit"
                  >
                    <div
                      className={`flex items-center cursor-pointer p-2 rounded-md ${
                        selectedChat.reciverId === contact.contact._id
                          ? "bg-gray-200 "
                          : "hover:bg-gray-100 "
                      }`}
                    >
                      <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                        <img
                          src={`http://localhost:2000/${contact.contact.picture}`}
                          alt="User Avatar"
                          className="w-12 h-12 rounded-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-md font-semibold">
                          {contact.contact.name}
                        </h2>
                        <p className="text-gray-600 text-md"></p>
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
        <div className="flex-1 relative border rounded overflow-hidden">
          {selectedChat.reciverId ? (
            <>
              <header className="bg-white p-4 text-gray-700 border-b drop-shadow-sm flex items-center gap-2">
                <img
                  src={`http://localhost:2000/${selectedChat.reciverPicture}`}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <a href="/workers/alice" className="text-xl font-semibold">
                    {selectedChat.reciverName}
                  </a>
                  <p className="text-xs">{selectedChat.lastActive}</p>
                </div>
              </header>

              <div className="h-screen overflow-y-auto p-4 pb-[185px]">
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  userMessages.map((message) => {
                    return message.sender._id === decodeJwtToken()._id ? (
                      <div className="flex justify-end mb-2">
                        <div className="max-w-96 bg-brandcolor text-md px-3 text-black rounded-md pr-10 relative">
                          <p>{message.message}</p>
                          <p className="text-xs text-gray-600 absolute bottom-0 right-1">
                            {message.time}
                          </p>
                        </div>
                        <div className="rounded-full ml-2">
                          <img
                            src={`http://localhost:2000/${message.sender.picture}`}
                            alt="My Avatar"
                            className="w-6 h-6 rounded-full"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex mb-2">
                        <div className="rounded-full ml-2">
                          <img
                            src={`http://localhost:2000/${message.sender.picture}`}
                            alt="User Avatar"
                            className="w-6 h-6 rounded-full"
                          />
                        </div>
                        <div className="max-w-96 bg-gray-200 text-md px-3 text-black rounded-md pr-10 relative">
                          <p>{message.message}</p>
                          <p className="text-xs text-gray-600 absolute bottom-0 right-1">
                            {message.time}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <footer className="bg-white px-4 absolute bottom-0 w-full">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => {
                      setInputMessage(e.target.value);
                    }}
                    placeholder="Type a message..."
                    className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-brandcolor"
                  />
                  <button
                    onClick={handleSendButtonClick}
                    className="bg-black text-white font-bold px-4 py-2 rounded-md ml-2"
                  >
                    Send
                  </button>
                </div>
              </footer>
            </>
          ) : (
            <div className="font-bold text-3xl flex items-center justify-center h-full">
              <div>
                {userContacts && userContacts.length
                  ? " Select a chat to start conversation"
                  : " No Conversations"}
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  );
}

export default Message;
