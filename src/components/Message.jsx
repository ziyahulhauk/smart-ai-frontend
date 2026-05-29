import ReactMarkdown from "react-markdown";

import {
  FaUser,
  FaRobot,
  FaCopy,
  FaCheck,
  FaClock,
} from "react-icons/fa";

import { useState } from "react";

function Message({
  role,
  content,
  image,
  timestamp,
}) {
  const isUser =
    role === "user";

  const [copied, setCopied] =
    useState(false);

  /* COPY MESSAGE */

  const copyMessage =
    async () => {
      try {
        await navigator.clipboard.writeText(
          content
        );

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div
      className={`
        w-full
        px-4
        py-6
        transition-all
        duration-300
        ${
          isUser
            ? "bg-[#0f172a]"
            : "bg-[#020617]"
        }
      `}
    >
      <div
        className="
          max-w-5xl
          mx-auto
          flex
          gap-4
        "
      >
        {/* AVATAR */}

        <div
          className={`
            min-w-[50px]
            h-[50px]
            rounded-2xl
            flex
            items-center
            justify-center
            shadow-xl
            border
            border-white/10
            ${
              isUser
                ? `
                  bg-gradient-to-br
                  from-blue-500
                  to-cyan-500
                `
                : `
                  bg-gradient-to-br
                  from-emerald-500
                  to-teal-500
                `
            }
          `}
        >
          {isUser ? (
            <FaUser
              className="
                text-white
                text-lg
              "
            />
          ) : (
            <FaRobot
              className="
                text-white
                text-lg
              "
            />
          )}
        </div>

        {/* MESSAGE AREA */}

        <div className="flex-1">
          {/* HEADER */}

          <div
            className="
              flex
              items-start
              justify-between
              gap-3
              mb-3
            "
          >
            <div>
              <h3
                className="
                  text-white
                  font-semibold
                  text-[15px]
                  tracking-wide
                "
              >
                {isUser
                  ? "You"
                  : "Smart AI"}
              </h3>

              {timestamp && (
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-gray-400
                    text-xs
                    mt-1
                  "
                >
                  <FaClock
                    className="
                      text-[10px]
                    "
                  />

                  {timestamp}
                </div>
              )}
            </div>

            {/* COPY BUTTON */}

            {!isUser &&
              content && (
                <button
                  onClick={
                    copyMessage
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-gray-300
                    hover:text-white
                    bg-[#111827]
                    hover:bg-[#1e293b]
                    border
                    border-white/10
                    px-3
                    py-2
                    rounded-xl
                    transition-all
                    duration-300
                  "
                >
                  {copied ? (
                    <>
                      <FaCheck
                        className="
                          text-emerald-400
                        "
                      />

                      Copied
                    </>
                  ) : (
                    <>
                      <FaCopy />

                      Copy
                    </>
                  )}
                </button>
              )}
          </div>

          {/* IMAGE */}

          {image && (
            <div
              className="
                overflow-hidden
                rounded-3xl
                mb-4
                border
                border-white/10
                bg-black/20
                shadow-2xl
                w-fit
              "
            >
              <img
                src={image}
                alt="uploaded"
                className="
                  max-h-[340px]
                  object-cover
                  transition-all
                  duration-500
                  hover:scale-[1.02]
                "
              />
            </div>
          )}

          {/* MESSAGE BOX */}

          <div
            className={`
              relative
              overflow-hidden
              rounded-[28px]
              border
              px-5
              py-4
              shadow-xl
              backdrop-blur-xl
              ${
                isUser
                  ? `
                    bg-[#172554]
                    border-blue-500/20
                  `
                  : `
                    bg-[#111827]
                    border-white/10
                  `
              }
            `}
          >
            {/* TOP LIGHT */}

            <div
              className="
                absolute
                top-0
                left-0
                w-full
                h-[1px]
                bg-gradient-to-r
                from-transparent
                via-cyan-400/30
                to-transparent
              "
            />

            {/* CONTENT */}

            <div
              className="
              prose
prose-invert
max-w-none
overflow-x-auto

text-[15px]
md:text-[16px]
leading-8

text-gray-100

prose-p:text-gray-200
prose-p:leading-8

prose-headings:text-white
prose-headings:font-bold
prose-headings:tracking-wide

prose-strong:text-cyan-300

prose-li:text-gray-300

prose-a:text-cyan-400
prose-a:no-underline
hover:prose-a:text-cyan-300

prose-code:text-emerald-300
prose-code:bg-[#0f172a]
prose-code:px-2
prose-code:py-1
prose-code:rounded-lg
prose-code:border
prose-code:border-white/10

prose-pre:bg-[#020617]
prose-pre:border
prose-pre:border-[#1e293b]
prose-pre:rounded-2xl
prose-pre:text-gray-100
prose-pre:shadow-2xl

prose-blockquote:text-gray-300
prose-blockquote:border-cyan-500
prose-blockquote:bg-[#0f172a]
prose-blockquote:px-4
prose-blockquote:py-2
prose-blockquote:rounded-r-xl

prose-table:text-gray-200

prose-th:text-white
prose-th:border-white/10

prose-td:border-white/10

selection:bg-cyan-500/30
selection:text-white
              "
            >
              <ReactMarkdown>
                {content}
              </ReactMarkdown>
            </div>

            {/* AI STATUS */}

            {!isUser &&
              content && (
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mt-4
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

                  <p
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    Smart AI generated response
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;