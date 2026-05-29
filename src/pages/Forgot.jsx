import {
  useState,
} from "react";

import axios from "axios";

import {
  Link,
} from "react-router-dom";

import {
  FaEnvelope,
  FaRobot,
} from "react-icons/fa";

function ForgotPassword() {
  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const submitHandler =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const { data } =
          await axios.post(
            "https://smart-ai-backend-0i0y.onrender.com/api/auth/forgot-password",
            { email }
          );

        setMessage(
          data.message
        );
      } catch (error) {
        setMessage(
          error.response?.data
            ?.message ||
            "Something went wrong"
        );
      }

      setLoading(false);
    };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-[#021b1a]
        via-[#0f172a]
        to-[#111827]
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
          shadow-2xl
        "
      >
        {/* LOGO */}

        <div
          className="
            flex
            flex-col
            items-center
            mb-8
          "
        >
          <div
            className="
              w-20
              h-20
              rounded-3xl
              bg-gradient-to-br
              from-emerald-400
              to-cyan-500
              flex
              items-center
              justify-center
              shadow-xl
              mb-4
            "
          >
            <FaRobot
              className="
                text-white
                text-4xl
              "
            />
          </div>

          <h1
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            Forgot Password
          </h1>

          <p
            className="
              text-gray-400
              text-sm
              mt-2
              text-center
            "
          >
            Enter your email to
            receive reset link
          </p>
        </div>

        {/* MESSAGE */}

        {message && (
          <div
            className="
              bg-cyan-500/10
              border
              border-cyan-500/20
              text-cyan-300
              p-4
              rounded-2xl
              mb-6
              text-sm
            "
          >
            {message}
          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={
            submitHandler
          }
          className="space-y-6"
        >
          <div>
            <label
              className="
                text-gray-300
                text-sm
                mb-2
                block
              "
            >
              Email Address
            </label>

            <div
              className="
                flex
                items-center
                bg-white/5
                border
                border-white/10
                rounded-2xl
                px-4
              "
            >
              <FaEnvelope
                className="
                  text-cyan-400
                "
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(
                  e
                ) =>
                  setEmail(
                    e.target
                      .value
                  )
                }
                required
                className="
                  w-full
                  bg-transparent
                  outline-none
                  px-4
                  py-4
                  text-white
                "
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
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
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>
        </form>

        {/* LOGIN */}

        <div
          className="
            text-center
            mt-6
          "
        >
          <Link
            to="/login"
            className="
              text-cyan-400
              hover:underline
              text-sm
            "
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;