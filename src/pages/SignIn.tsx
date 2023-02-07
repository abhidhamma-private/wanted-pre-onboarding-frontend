import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../service/api";
import { ACCESS_TOKEN } from "../service/constant";
import { SigninRequest } from "../service/type";

export const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token !== null) {
      navigate("/todo");
    }
  }, []);

  const canSignIn = email.indexOf("@") !== -1 && password.length >= 8;
  const onSignIn = async (body: SigninRequest) => {
    const result = await signin(body);
    if (result.status === 200) {
      localStorage.setItem(ACCESS_TOKEN, result.data.access_token);
      navigate("/todo");
    }
  };

  return (
    <>
      <input
        data-testid='email-input'
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <input
        type={"password"}
        data-testid='password-input'
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <button
        data-testid='signup-button'
        disabled={!canSignIn}
        onClick={() => onSignIn({ email, password })}
      >
        로그인
      </button>
    </>
  );
};
