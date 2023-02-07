import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../service/api";
import { ACCESS_TOKEN } from "../service/constant";
import { SignupRequest } from "../service/type";

export const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token !== null) {
      navigate("/todo");
    }
  }, []);

  const canSignUp = email.indexOf("@") !== -1 && password.length >= 8;
  const onSignUp = async (body: SignupRequest) => {
    const result = await signup(body);
    if (result.status === 201) {
      localStorage.setItem(ACCESS_TOKEN, result.data.access_token);
      navigate("/signin");
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
        disabled={!canSignUp}
        onClick={() => onSignUp({ email, password })}
      >
        회원가입
      </button>
    </>
  );
};
