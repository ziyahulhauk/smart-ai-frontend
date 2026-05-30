import {
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FaLock,
  FaRobot,
} from "react-icons/fa";

function ResetPassword() {
  const { token } =
    useParams();

  const navigate =
    useNavigate();

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const submitHandler =
    async (e) => {
      e.preventDefault();

      if (
        password !==
        confirmPassword
      ) {
        return setMessage(
          "Passwords do not match"
        );
      }

      try {
        setLoading(true);

        const { data } =
          await axios.post(
            `https://smart-ai-backend-f9fd.onrender.com/api/auth/reset-password/${token}`,
            {
              password,
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
            Reset Password
          </h1>
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
              New Password
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
              <FaLock
                className="
                  text-cyan-400
                "
              />

              <input
                type="password"
                placeholder="Enter new password"
                value={
                  password
                }
                onChange={(
                  e
                ) =>
                  setPassword(
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

          <div>
            <label
              className="
                text-gray-300
                text-sm
                mb-2
                block
              "
            >
              Confirm Password
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
              <FaLock
                className="
                  text-cyan-400
                "
              />

              <input
                type="password"
                placeholder="Confirm password"
                value={
                  confirmPassword
                }
                onChange={(
                  e
                ) =>
                  setConfirmPassword(
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
              ? "Updating..."
              : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;