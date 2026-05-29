import {
  FaTrash,
  FaSignOutAlt,
  FaPlus,
  FaRobot,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import {
  useState,
} from "react";

function Sidebar({
  chats,
  currentChat,
  setCurrentChat,
  newChat,
  removeChat,
}) {
  const [open, setOpen] =
    useState(false);

  const [search,
    setSearch,
  ] = useState("");

  const userInfo =
    JSON.parse(
      localStorage.getItem(
        "userInfo"
      )
    );

  const logout = () => {
    localStorage.removeItem(
      "userInfo"
    );

    window.location.href =
      "/login";
  };

  const filteredChats =
    chats.filter((chat) =>
      chat.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <>
      {/* MOBILE MENU */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          md:hidden
          fixed
          top-4
          left-4
          z-50
          bg-[#111827]
          text-white
          p-3
          rounded-xl
          shadow-lg
          border
          border-white/10
        "
      >
        {open ? (
          <FaTimes />
        ) : (
          <FaBars />
        )}
      </button>

      {/* SIDEBAR */}

      <div
        className={`
          fixed
          md:relative
          top-0
          left-0
          h-screen
          z-40
          w-[300px]
          flex
          flex-col
          bg-gradient-to-b
          from-[#021b1a]
          via-[#0f172a]
          to-[#111827]
          border-r
          border-white/10
          backdrop-blur-xl
          shadow-2xl
          transition-all
          duration-300
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* HEADER */}

        <div
          className="
            p-5
            border-b
            border-white/10
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
                w-14
                h-14
                rounded-3xl
                bg-gradient-to-br
                from-emerald-400
                to-cyan-500
                flex
                items-center
                justify-center
                shadow-2xl
              "
            >
              <FaRobot
                className="
                  text-white
                  text-2xl
                "
              />
            </div>

            <div>
              <h1
                className="
                  text-white
                  font-bold
                  text-xl
                "
              >
                Smart AI
              </h1>

              <p
                className="
                  text-gray-400
                  text-xs
                "
              >
                GPT Powered Workspace
              </p>
            </div>
          </div>

          {/* TOTAL CHATS */}

          <div
            className="
              mt-4
              bg-white/5
              border
              border-white/10
              rounded-2xl
              p-3
              flex
              justify-between
              items-center
            "
          >
            <span
              className="
                text-gray-300
                text-sm
              "
            >
              Total Chats
            </span>

            <span
              className="
                text-cyan-400
                font-bold
              "
            >
              {chats.length}
            </span>
          </div>
        </div>

        {/* NEW CHAT */}

        <div className="p-4">
          <button
            onClick={() => {
              newChat();
              setOpen(false);
            }}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3
              bg-gradient-to-r
              from-emerald-400
              to-cyan-500
              hover:scale-[1.02]
              transition-all
              duration-300
              text-white
              font-semibold
              rounded-2xl
              py-4
              shadow-lg
            "
          >
            <FaPlus />

            New Chat
          </button>
        </div>

        {/* SEARCH */}

        <div className="px-4 pb-3">
          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-4
              py-3
              text-sm
              text-white
              outline-none
              placeholder:text-gray-500
            "
          />
        </div>

        {/* CHAT LIST */}

        <div
          className="
            flex-1
            overflow-y-auto
            px-3
            space-y-2
            scrollbar-thin
            scrollbar-thumb-gray-700
          "
        >
          {filteredChats.length ===
          0 ? (
            <div
              className="
                text-center
                text-gray-400
                mt-20
              "
            >
              <div
                className="
                  flex
                  justify-center
                  mb-4
                "
              >
                <div
                  className="
                    w-16
                    h-16
                    rounded-3xl
                    bg-white/5
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FaRobot
                    className="
                      text-2xl
                      text-cyan-400
                    "
                  />
                </div>
              </div>

              <p
                className="
                  text-lg
                  text-white
                  mb-2
                "
              >
                No chats yet
              </p>

              <span
                className="
                  text-sm
                "
              >
                Start your AI
                conversation 🚀
              </span>
            </div>
          ) : (
            filteredChats.map(
              (chat) => (
                <div
                  key={
                    chat._id
                  }
                  className={`
                    group
                    relative
                    flex
                    items-center
                    gap-3
                    p-4
                    rounded-3xl
                    cursor-pointer
                    transition-all
                    duration-300
                    border
                    overflow-hidden
                    ${
                      currentChat ===
                      chat._id
                        ? `
                          bg-gradient-to-r
                          from-cyan-500/10
                          to-emerald-500/10
                          border-cyan-400/30
                          shadow-xl
                        `
                        : `
                          border-transparent
                          hover:bg-white/5
                        `
                    }
                  `}
                >
                  {/* CLICK */}

                  <div
                    onClick={() => {
                      setCurrentChat(
                        chat._id
                      );

                      setOpen(
                        false
                      );
                    }}
                    className="
                      flex-1
                      overflow-hidden
                    "
                  >
                    <h3
                      className="
                        text-white
                        font-medium
                        truncate
                        text-sm
                      "
                    >
                      {chat.title}
                    </h3>

                    <p
                      className="
                        text-gray-400
                        text-xs
                        truncate
                        mt-1
                      "
                    >
                      AI conversation
                    </p>
                  </div>

                  {/* DELETE */}

                  <button
                    onClick={() =>
                      removeChat(
                        chat._id
                      )
                    }
                    className="
                      opacity-0
                      group-hover:opacity-100
                      transition
                      text-red-400
                      hover:text-red-500
                      p-2
                    "
                  >
                    <FaTrash
                      size={14}
                    />
                  </button>
                </div>
              )
            )
          )}
        </div>

        {/* FOOTER */}

        <div
          className="
            p-4
            border-t
            border-white/10
            space-y-3
          "
        >
          {/* USER CARD */}

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-4
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
                  relative
                "
              >
                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-gradient-to-br
                    from-cyan-500
                    to-blue-600
                    flex
                    items-center
                    justify-center
                    text-white
                    text-lg
                    font-bold
                    shadow-xl
                  "
                >
                  {
                    userInfo?.name
                      ?.charAt(0)
                      ?.toUpperCase()
                  }
                </div>

                <span
                  className="
                    absolute
                    bottom-0
                    right-0
                    w-4
                    h-4
                    bg-emerald-400
                    border-2
                    border-[#111827]
                    rounded-full
                  "
                />
              </div>

              <div
                className="
                  flex-1
                  overflow-hidden
                "
              >
                <h3
                  className="
                    text-white
                    text-sm
                    font-semibold
                    truncate
                  "
                >
                  {
                    userInfo?.name
                  }
                </h3>

                <p
                  className="
                    text-gray-400
                    text-xs
                    truncate
                  "
                >
                  {
                    userInfo?.email
                  }
                </p>
              </div>
            </div>

            {/* BADGE */}

            <div
              className="
                mt-4
                bg-gradient-to-r
                from-emerald-500/20
                to-cyan-500/20
                border
                border-cyan-400/20
                rounded-2xl
                p-3
                text-center
              "
            >
              <p
                className="
                  text-cyan-300
                  text-xs
                  font-semibold
                "
              >
                ✨ AI Premium Member
              </p>
            </div>
          </div>

          {/* LOGOUT */}

          <button
            onClick={logout}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3
              bg-red-500/10
              hover:bg-red-500/20
              border
              border-red-500/20
              text-red-400
              rounded-2xl
              py-4
              font-semibold
              transition-all
              duration-300
              hover:scale-[1.02]
            "
          >
            <FaSignOutAlt />

            Logout
          </button>
        </div>
      </div>

      {/* OVERLAY */}

      {open && (
        <div
          onClick={() =>
            setOpen(false)
          }
          className="
            fixed
            inset-0
            bg-black/50
            backdrop-blur-sm
            z-30
            md:hidden
          "
        />
      )}
    </>
  );
}

export default Sidebar;