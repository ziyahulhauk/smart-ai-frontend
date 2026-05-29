import {
  useState,
} from "react";

import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaRobot,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Register() {

  const navigate =
    useNavigate();

  const [showPassword,
    setShowPassword,
  ] = useState(false);

  const [formData,
    setFormData,
  ] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading,
    setLoading,
  ] = useState(false);

  const [error,
    setError,
  ] = useState("");

  const [success,
    setSuccess,
  ] = useState("");

  const changeHandler =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  const submitHandler =
    async (e) => {

      e.preventDefault();

      setError("");
      setSuccess("");

      if (
        formData.password !==
        formData.confirmPassword
      ) {
        return setError(
          "Passwords do not match"
        );
      }

      try {

        setLoading(true);

        const { data } =
          await axios.post(
            "https://smart-ai-backend-0i0y.onrender.com/api/auth/register",
            {
              name:
                formData.name,

              email:
                formData.email,

              password:
                formData.password,
            }
          );

        setSuccess(
          data.message
        );

        setTimeout(() => {

          navigate(
            "/verify-otp",
            {
              state: {
                email:
                  formData.email,
              },
            }
          );

        }, 1000);

      } catch (error) {

        setError(
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
            Create Account
          </h1>

          <p
            className="
              text-gray-400
              mt-2
              text-sm
            "
          >
            Join Smart AI
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
              mb-4
              text-sm
            "
          >
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div
            className="
              bg-emerald-500/10
              border
              border-emerald-500/20
              text-emerald-400
              p-4
              rounded-2xl
              mb-4
              text-sm
            "
          >
            {success}
          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={
            submitHandler
          }
          className="
            space-y-5
          "
        >

          {/* NAME */}

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

            <FaUser
              className="
                text-cyan-400
              "
            />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={
                formData.name
              }
              onChange={
                changeHandler
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
              name="email"
              placeholder="Email Address"
              value={
                formData.email
              }
              onChange={
                changeHandler
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
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              value={
                formData.password
              }
              onChange={
                changeHandler
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

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
                text-gray-400
              "
            >
              {showPassword
                ? <FaEyeSlash />
                : <FaEye />}
            </button>

          </div>

          {/* CONFIRM PASSWORD */}

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
              name="confirmPassword"
              placeholder="Confirm Password"
              value={
                formData.confirmPassword
              }
              onChange={
                changeHandler
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

          {/* BUTTON */}

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
              ? "Creating..."
              : "Create Account"}
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
              text-sm
              hover:underline
            "
          >
            Already have an account?
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;