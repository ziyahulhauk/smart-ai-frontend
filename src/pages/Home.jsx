import {
  useEffect,
  useRef,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import Message from "../components/Message";

import {
  sendMessage,
  getChats,
  getChat,
  deleteChat,
} from "../api/chatApi";

import {
  FaRobot,
} from "react-icons/fa";

function Home() {
  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [chatId, setChatId] =
    useState(null);

  const [chats, setChats] =
    useState([]);

  const messagesEndRef =
    useRef(null);

  /* AUTO SCROLL */

  const scrollToBottom =
    () => {
      messagesEndRef.current?.scrollIntoView(
        {
          behavior:
            "smooth",
        }
      );
    };

  /* LOAD ALL CHATS */

  useEffect(() => {
    loadChats();
  }, []);

  /* LOAD SAVED CHAT */

  useEffect(() => {
    const savedChatId =
      localStorage.getItem(
        "currentChatId"
      );

    const savedMessages =
      localStorage.getItem(
        "currentMessages"
      );

    if (savedChatId) {
      setChatId(savedChatId);
    }

    if (savedMessages) {
      setMessages(
        JSON.parse(
          savedMessages
        )
      );
    }
  }, []);

  /* AUTO SCROLL */

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /* SAVE CHAT */

  useEffect(() => {
    if (chatId) {
      localStorage.setItem(
        "currentChatId",
        chatId
      );
    }

    localStorage.setItem(
      "currentMessages",
      JSON.stringify(
        messages
      )
    );
  }, [chatId, messages]);

  /* LOAD CHATS */

  const loadChats =
    async () => {
      try {
        const data =
          await getChats();

        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };

  /* LOAD SINGLE CHAT */

  const loadChat =
    async (id) => {
      try {
        const data =
          await getChat(id);

        setMessages(
          data.messages
        );

        setChatId(id);

        localStorage.setItem(
          "currentChatId",
          id
        );

        localStorage.setItem(
          "currentMessages",
          JSON.stringify(
            data.messages
          )
        );

        scrollToBottom();
      } catch (error) {
        console.log(error);

        if (
          error.response
            ?.status ===
          401
        ) {
          localStorage.removeItem(
            "userInfo"
          );

          window.location.href =
            "/login";
        }
      }
    };

  /* SEND MESSAGE */

  const handleSend =
    async (
      text,
      image
    ) => {
      if (
        !text &&
        !image
      )
        return;

      const imageUrl =
        image
          ? URL.createObjectURL(
              image
            )
          : null;

      const userMessage =
        {
          role: "user",

          content:
            text ||
            "📷 Image Uploaded",

          image: imageUrl,

          timestamp:
            new Date().toLocaleTimeString(),
        };

      /* ADD USER MESSAGE */

      setMessages(
        (prev) => [
          ...prev,
          userMessage,
          {
            role:
              "assistant",

            content:
              "Thinking...",

            timestamp:
              new Date().toLocaleTimeString(),
          },
        ]
      );

      setLoading(true);

      try {
        const response =
          await sendMessage(
            text,
            chatId,
            null,
            image
          );

        /* REPLACE THINKING */

        setMessages(
          (prev) => {
            const updated =
              [...prev];

            updated[
              updated.length -
                1
            ] = {
              role:
                "assistant",

              content:
                response.reply,

              timestamp:
                new Date().toLocaleTimeString(),
            };

            return updated;
          }
        );

        /* SAVE NEW CHAT ID */

        if (
          response?.chatId
        ) {
          setChatId(
            response.chatId
          );

          localStorage.setItem(
            "currentChatId",
            response.chatId
          );
        }

        /* RELOAD SIDEBAR */

        await loadChats();

        scrollToBottom();
      } catch (error) {
        console.log(error);

        setMessages(
          (prev) => {
            const updated =
              [...prev];

            updated[
              updated.length -
                1
            ] = {
              role:
                "assistant",

              content:
                "❌ Error sending message",

              timestamp:
                new Date().toLocaleTimeString(),
            };

            return updated;
          }
        );
      }

      setLoading(false);
    };

  /* NEW CHAT */

  const newChat =
    () => {
      setMessages([]);

      setChatId(null);

      localStorage.removeItem(
        "currentChatId"
      );

      localStorage.removeItem(
        "currentMessages"
      );
    };

  /* DELETE CHAT */

  const removeChat =
    async (id) => {
      try {
        await deleteChat(id);

        /* IF CURRENT CHAT DELETED */

        if (
          chatId === id
        ) {
          newChat();
        }

        await loadChats();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div
      className="
        flex
        h-screen
        overflow-hidden
        bg-gradient-to-br
        from-[#021b1a]
        via-[#0f172a]
        to-[#111827]
      "
    >
      {/* SIDEBAR */}

      <Sidebar
        chats={chats}
        currentChat={
          chatId
        }
        setCurrentChat={
          loadChat
        }
        newChat={newChat}
        removeChat={
          removeChat
        }
      />

      {/* MAIN */}

      <div
        className="
          flex
          flex-col
          flex-1
          relative
        "
      >
        {/* HEADER */}

        <div
          className="
            border-b
            border-white/10
            backdrop-blur-xl
            bg-black/10
            px-6
            py-4
            flex
            items-center
            justify-between
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-gradient-to-br
                from-emerald-400
                to-cyan-500
                flex
                items-center
                justify-center
                shadow-lg
              "
            >
              <FaRobot
                className="
                  text-white
                  text-xl
                "
              />
            </div>

            <div>
              <h1
                className="
                  text-white
                  text-xl
                  font-bold
                "
              >
                Smart AI
              </h1>

              <p
                className="
                  text-gray-400
                  text-sm
                "
              >
                AI Powered Assistant
              </p>
            </div>
          </div>

          {/* STATUS */}

          <div
            className="
              hidden
              md:flex
              items-center
              gap-2
              text-sm
              text-emerald-400
            "
          >
            <span
              className="
                w-2
                h-2
                rounded-full
                bg-emerald-400
                animate-pulse
              "
            />

            Online
          </div>
        </div>

        {/* CHAT AREA */}

        <div
          className="
            flex-1
            overflow-y-auto
            custom-scrollbar
          "
        >
          {/* EMPTY SCREEN */}

          {messages.length ===
            0 && (
            <div
              className="
                h-full
                flex
                flex-col
                items-center
                justify-center
                text-center
                px-4
              "
            >
              <div
                className="
                  w-24
                  h-24
                  rounded-3xl
                  bg-gradient-to-br
                  from-emerald-400
                  to-cyan-500
                  flex
                  items-center
                  justify-center
                  shadow-2xl
                  mb-6
                "
              >
                <FaRobot
                  className="
                    text-white
                    text-5xl
                  "
                />
              </div>

              <h1
                className="
                  text-white
                  text-4xl
                  font-bold
                  mb-4
                "
              >
                Welcome Back 👋
              </h1>

              <p
                className="
                  text-gray-400
                  text-lg
                  max-w-xl
                  leading-8
                "
              >
                Ask coding,
                AI, images,
                projects,
                debugging,
                React,
                Node.js and
                anything you
                want.
              </p>
            </div>
          )}

          {/* MESSAGES */}

          {messages.map(
            (
              msg,
              index
            ) => (
              <Message
                key={index}
                role={
                  msg.role
                }
                content={
                  msg.content
                }
                image={
                  msg.image
                }
                timestamp={
                  msg.timestamp
                }
              />
            )
          )}

          <div
            ref={
              messagesEndRef
            }
          />
        </div>

        {/* CHAT INPUT */}

        <ChatBox
          onSend={
            handleSend
          }
          loading={
            loading
          }
        />
      </div>
    </div>
  );
}

export default Home;