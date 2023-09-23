"use client";

import "./login.scss";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../../firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import logo from "../../public//assets/logo.svg";
import eye from "../../public/assets/eye.svg";
import eyeoff from "../../public/assets/eye-off.svg";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(firebaseApp);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const HidePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email: string) => {
    // This regex pattern checks if the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // This regex pattern checks if the password is at least 8 characters long and contains at least one digit and one uppercase letter
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one digit and one uppercase letter"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login bg-white">
      <div className="login-container">
        <div className="login-cols flex justify-center items-center h-screen w-full">
          <div className="login-cols-2 bg-white w-full mx-3 md:max-0  px-7 py-10 md:w-[23rem] rounded-lg">
            <div className="flex items-center  gap-3">
              <Image
                src={logo}
                width={500}
                height={500}
                alt="logo"
                className="w-8"
              />
              <h1 className="text-2xl font-semibold text-[#27255F] uppercase">
                Furqan
              </h1>
            </div>

            <h2 className="text-left mt-[2rem]  text-[1.2rem] font-medium text-[#27255F]">
              Login to your account
            </h2>
            <form className="form" onSubmit={handleLogin}>
              <p className="email">Email</p>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={handleEmailChange}
                // onBlur={handleEmailBlur}
              />
              {/* {emailError && <p className="error">{emailError}</p>} */}
              <p className="password">Password</p>
              <div className="passWrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="txtPass"
                  required
                  // placeholder="Enter your password"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  // onBlur={handlePasswordBlur}

                  value={password}
                  onChange={handlePasswordChange}
                />
                {showPassword ? (
                  <Image
                    src={eye}
                    width={500}
                    height={500}
                    alt="eye"
                    className="w-4 cursor-pointer"
                    onClick={HidePassword}
                  />
                ) : (
                  <Image
                    src={eyeoff}
                    width={500}
                    height={500}
                    alt="eyeoff"
                    className="w-4 cursor-pointer"
                    onClick={HidePassword}
                  />
                )}
              </div>
              {passwordError && <p className="error">{passwordError}</p>}
              <br />
              <Link href="#">
                <p className="forget_link text-[#0B63E5]">forgot password?</p>
              </Link>
              <div className="btn_login-wrapper">
                <button
                  className="submit-login bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 transition-all "
                  type="submit"
                  disabled={Boolean(emailError) || Boolean(passwordError)}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <h1>Login Page</h1>
    //   <form onSubmit={handleLogin}>
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       value={email}
    //       onChange={handleEmailChange}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={handlePasswordChange}
    //     />
    //     <button type="submit">Login</button>
    //   </form>
    // </div>
  );
}
