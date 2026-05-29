
import {
  useState,
  useEffect,
} from "react";

import {
  login,
} from "../api/authApi";

import {
  Link,
} from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaRobot,
} from "react-icons/fa";

function Login() {
  const [email, setEmail] =
    useState("");

  const [password,
    setPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const userInfo =
      localStorage.getItem(
        "userInfo"
      );

    if (userInfo) {
      window.location.href =
        "/";
    }
  }, []);

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        setError("");

        const data =
          await login({
            email,
            password,
          });

        localStorage.setItem(
          "userInfo",
          JSON.stringify(data)
        );

        window.location.href =
          "/";

      } catch (error) {

        setError(
          error.response?.data
            ?.message ||
            "Login Failed"
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
            Welcome Back
          </h1>

          <p
            className="
              text-gray-400
              text-sm
              mt-2
            "
          >
            Login to Smart AI
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div
            className="
              bg-red-500/10
              border
              border-red-500/20
              text-red-400
              p-4
              rounded-2xl
              mb-6
              text-sm
            "
          >
            {error}
          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >
          {/* EMAIL */}

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
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
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

          {/* PASSWORD */}

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
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
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

          {/* FORGOT */}

          <div
            className="
              flex
              justify-end
            "
          >
            <Link
              to="/forgot-password"
              className="
                text-cyan-400
                text-sm
                hover:underline
              "
            >
              Forgot Password?
            </Link>
          </div>

          {/* BUTTON */}

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
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        {/* REGISTER */}

        <div
          className="
            text-center
            mt-6
          "
        >
          <p
            className="
              text-gray-400
              text-sm
            "
          >
            Don't have an
            account?

            <Link
              to="/register"
              className="
                text-cyan-400
                ml-2
                hover:underline
              "
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
