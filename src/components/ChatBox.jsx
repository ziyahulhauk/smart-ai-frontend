import {
  useRef,
  useState,
  useEffect,
} from "react";

import {
  FaImage,
  FaPaperPlane,
  FaTimes,
  FaMicrophone,
  FaRobot,
  FaStop,
  FaMicrophoneSlash,
} from "react-icons/fa";

function ChatBox({
  onSend,
  loading,
}) {
  const [message, setMessage] =
    useState("");

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [
    showMicPopup,
    setShowMicPopup,
  ] = useState(false);

  const [
    listening,
    setListening,
  ] = useState(false);

  const textareaRef =
    useRef();

  const fileInputRef =
    useRef();

  const recognitionRef =
    useRef(null);

  /* AUTO HEIGHT */

  useEffect(() => {
    if (
      textareaRef.current
    ) {
      textareaRef.current.style.height =
        "auto";

      textareaRef.current.style.height =
        textareaRef.current
          .scrollHeight + "px";
    }
  }, [message]);

  /* SPEECH SUPPORT */

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window
        .webkitSpeechRecognition;

    if (
      SpeechRecognition
    ) {
      const recognition =
        new SpeechRecognition();

      recognition.continuous =
        true;

      recognition.interimResults =
        true;

      recognition.lang =
        "en-US";

      recognition.onresult =
        (event) => {
          let transcript =
            "";

          for (
            let i = 0;
            i <
            event.results.length;
            i++
          ) {
            transcript +=
              event.results[i][0]
                .transcript;
          }

          setMessage(
            transcript
          );
        };

      recognition.onerror =
        (event) => {
          console.log(
            event.error
          );

          setListening(
            false
          );

          if (
            event.error ===
              "not-allowed" ||
            event.error ===
              "service-not-allowed"
          ) {
            setShowMicPopup(
              true
            );
          }
        };

      recognition.onend =
        () => {
          setListening(
            false
          );
        };

      recognitionRef.current =
        recognition;
    }
  }, []);

  /* START LISTENING */

 const startListening =
  async () => {

    try {

      await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

      if (
        !SpeechRecognition
      ) {
        setShowMicPopup(
          true
        );

        return;
      }

      const recognition =
        new SpeechRecognition();

      recognition.lang =
        "en-US";

      recognition.continuous =
        true;

      recognition.interimResults =
        true;

      recognition.onstart =
        () => {
          setListening(
            true
          );
        };

      recognition.onresult =
        (event) => {

          let transcript =
            "";

          for (
            let i = 0;
            i <
            event.results.length;
            i++
          ) {

            transcript +=
              event.results[i][0]
                .transcript;
          }

          setMessage(
            transcript
          );
        };

      recognition.onerror =
        (event) => {

          console.log(
            event.error
          );

          setListening(
            false
          );

          setShowMicPopup(
            true
          );
        };

      recognition.onend =
        () => {
          setListening(
            false
          );
        };

      recognition.start();

      recognitionRef.current =
        recognition;

    } catch (error) {

      console.log(error);

      setShowMicPopup(
        true
      );
    }
  };

  /* STOP LISTENING */

  const stopListening =
    () => {
      if (
        recognitionRef.current
      ) {
        recognitionRef.current.stop();

        setListening(
          false
        );
      }
    };

  /* IMAGE */

  const handleImageChange =
    (e) => {
      const file =
        e.target.files[0];

      if (!file) return;

      setImage(file);

      setPreview(
        URL.createObjectURL(
          file
        )
      );
    };

  const removeImage = () => {
    setImage(null);

    setPreview("");

    if (
      fileInputRef.current
    ) {
      fileInputRef.current.value =
        "";
    }
  };

  /* SEND */

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (
        !message.trim() &&
        !image
      )
        return;

      await onSend(
        message,
        image
      );

      setMessage("");

      removeImage();

      if (
        textareaRef.current
      ) {
        textareaRef.current.style.height =
          "auto";
      }
    };

  /* ENTER SEND */

  const handleKeyDown =
    (e) => {
      if (
        e.key === "Enter" &&
        !e.shiftKey
      ) {
        e.preventDefault();

        handleSubmit(e);
      }
    };

  return (
    <>
    <div
      className="
        sticky
        bottom-0
        w-full
        z-20
        backdrop-blur-2xl
        bg-gradient-to-r
        from-[#031716]/95
        via-[#0b1f2d]/95
        to-[#111827]/95
        border-t
        border-white/10
        shadow-[0_-10px_40px_rgba(0,0,0,0.6)]
        px-3
        md:px-5
        py-4
      "
    >
      <div
        className="
          max-w-5xl
          mx-auto
        "
      >
        {/* IMAGE PREVIEW */}

        {preview && (
          <div
            className="
              relative
              w-fit
              mb-4
              animate-fadeIn
            "
          >
            <img
              src={preview}
              alt="preview"
              className="
                w-32
                h-32
                object-cover
                rounded-3xl
                border
                border-white/10
                shadow-2xl
              "
            />

            <button
              onClick={
                removeImage
              }
              className="
                absolute
                -top-2
                -right-2
                bg-red-500
                hover:bg-red-600
                text-white
                p-2
                rounded-full
                shadow-lg
                transition-all
              "
            >
              <FaTimes
                size={12}
              />
            </button>
          </div>
        )}

        {/* CHAT FORM */}

        <form
          onSubmit={
            handleSubmit
          }
          className="
            relative
            flex
            items-end
            gap-3
            bg-white/5
            border
            border-white/10
            rounded-[32px]
            px-3
            py-3
            backdrop-blur-xl
            shadow-2xl
          "
        >
          {/* LEFT ACTIONS */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            {/* IMAGE */}

            <label
              className="
                min-w-[52px]
                h-[52px]
                flex
                items-center
                justify-center
                rounded-2xl
                cursor-pointer
                bg-gradient-to-br
                from-[#173b38]
                to-[#0f172a]
                hover:scale-105
                transition-all
                duration-300
                text-white
                shadow-lg
              "
            >
              <FaImage
                size={18}
              />

              <input
                ref={
                  fileInputRef
                }
                type="file"
                hidden
                accept="image/*"
                onChange={
                  handleImageChange
                }
              />
            </label>

            {/* MIC */}

            <button
              type="button"
              onClick={
                listening
                  ? stopListening
                  : startListening
              }
              className={`
                min-w-[52px]
                h-[52px]
                flex
                items-center
                justify-center
                rounded-2xl
                transition-all
                duration-300
                shadow-lg
                ${
                  listening
                    ? `
                      bg-red-500
                      text-white
                      animate-pulse
                    `
                    : `
                      bg-white/5
                      hover:bg-white/10
                      text-cyan-400
                    `
                }
              `}
            >
              {listening ? (
                <FaStop
                  size={16}
                />
              ) : (
                <FaMicrophone
                  size={18}
                />
              )}
            </button>
          </div>

          {/* INPUT */}

          <div
            className="
              flex-1
              flex
              items-center
            "
          >
            <textarea
              ref={
                textareaRef
              }
              rows="1"
              placeholder={
                listening
                  ? "Listening..."
                  : "Ask Smart AI anything..."
              }
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              onKeyDown={
                handleKeyDown
              }
              className="
                w-full
                resize-none
                bg-transparent
                text-white
                placeholder:text-gray-400
                outline-none
                text-[15px]
                leading-7
                max-h-44
                py-3
                px-2
                overflow-y-auto
              "
            />
          </div>

          {/* SEND */}

          <button
            type="submit"
            disabled={loading}
            className={`
              min-w-[58px]
              h-[58px]
              rounded-2xl
              flex
              items-center
              justify-center
              transition-all
              duration-300
              shadow-xl
              ${
                loading
                  ? `
                    bg-gray-600
                    cursor-not-allowed
                  `
                  : `
                    bg-gradient-to-r
                    from-emerald-400
                    to-cyan-500
                    hover:scale-105
                    hover:shadow-cyan-500/30
                  `
              }
            `}
          >
            {loading ? (
              <div
                className="
                  w-5
                  h-5
                  border-2
                  border-white
                  border-t-transparent
                  rounded-full
                  animate-spin
                "
              />
            ) : (
              <FaPaperPlane
                className="
                  text-white
                  text-lg
                "
              />
            )}
          </button>
        </form>

        {/* FOOTER */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-2
            mt-3
            px-2
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              text-gray-400
            "
          >
            <FaRobot
              className="
                text-cyan-400
              "
            />

            Smart AI can make
            mistakes. Verify
            important information.
          </div>

          <div
            className="
              flex
              items-center
              gap-3
              text-xs
              text-gray-500
            "
          >
            <span>
              Enter ↵ to send
            </span>

            <span>
              Shift + Enter
              new line
            </span>
          </div>
        </div>
      </div>
    </div>
          {/* MIC POPUP */}

    {/* TOP ALERT */}

{showMicPopup && (
  <div
  className="
    fixed
    top-6
    left-0
    right-0
    mx-auto
    z-[9999]
    w-[95%]
    max-w-xl
    animate-[fadeIn_.3s_ease]
  "
>
    <div
      className="
        bg-gradient-to-r
        from-red-500/20
        to-pink-500/20
        backdrop-blur-xl
        border
        border-red-400/20
        rounded-3xl
        shadow-2xl
        overflow-hidden
      "
    >
      <div
        className="
          flex
          items-start
          gap-4
          p-5
        "
      >
        {/* ICON */}

        <div
          className="
            min-w-[55px]
            h-[55px]
            rounded-2xl
            bg-red-500
            flex
            items-center
            justify-center
            shadow-lg
          "
        >
          <FaMicrophoneSlash
            className="
              text-white
              text-xl
            "
          />
        </div>

        {/* CONTENT */}

        <div className="flex-1">
          <h2
            className="
              text-white
              font-bold
              text-lg
              mb-1
            "
          >
            Microphone Permission Blocked
          </h2>

          <p
            className="
              text-gray-300
              text-sm
              leading-6
            "
          >
            Please allow microphone
            access from your browser
            settings.

            <br />

            Click 🔒 near address bar
            → Allow Microphone
            → Refresh page.
          </p>

          {/* BUTTON */}

          <button
            onClick={() =>
              window.location.reload()
            }
            className="
              mt-4
              px-5
              py-2.5
              rounded-2xl
              bg-gradient-to-r
              from-emerald-400
              to-cyan-500
              text-white
              text-sm
              font-semibold
              hover:scale-[1.03]
              transition-all
            "
          >
            Refresh Page
          </button>
        </div>

        {/* CLOSE */}

        <button
          onClick={() =>
            setShowMicPopup(false)
          }
          className="
            text-gray-400
            hover:text-white
            transition-all
            p-2
          "
        >
          <FaTimes size={18} />
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
}

export default ChatBox;