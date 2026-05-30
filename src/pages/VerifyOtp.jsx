import {
  useState,
} from "react";

import axios from "axios";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaKey,
  FaRobot,
} from "react-icons/fa";

function VerifyOtp() {
  const location =
    useLocation();

  const navigate =
    useNavigate();

  const email =
    location.state?.email;

  const [otp, setOtp] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const submitHandler =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const { data } =
          await axios.post(
            "https://smart-ai-backend-2bue.onrender.com/api/auth/verify-otp",
            {
              email,
              otp,
            }
          );

        setMessage(
          data.message
        );

        setTimeout(() => {
          navigate(
            "/login"
          );
        }, 2000);

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
            Verify OTP
          </h1>

          <p
            className="
              text-gray-400
              text-sm
              mt-2
            "
          >
            OTP sent to
            {email}
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
            <FaKey
              className="
                text-cyan-400
              "
            />

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(
                e
              ) =>
                setOtp(
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
                tracking-[8px]
                text-center
                text-xl
              "
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-gradient-to-r
              from-emerald-400
              to-cyan-500
              text-white
              py-4
              rounded-2xl
              font-semibold
              hover:scale-[1.02]
              transition-all
            "
          >
            {loading
              ? "Verifying..."
              : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;