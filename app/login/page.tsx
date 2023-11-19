import "./login.scss";

import { authenticate } from "../../utils/auth";

import Image from "next/image";

import logo from "../../public//assets/logo-light.svg";

export default function LoginPage() {
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
            <form className="form" action={authenticate}>
              <p className="email">Username</p>
              <input type="text" id="username" required name="username" />
              <p className="password">Password</p>
              <div className="passWrapper">
                <input type="password" id="txtPass" required name="password" />
              </div>
              <br />
              <button
                className="submit-login bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 transition-all "
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
