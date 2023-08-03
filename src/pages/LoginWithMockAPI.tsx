import React, { useState } from "react";

type LoginSuccessMessage = "SUCCESS";
type LoginFailMessage = "FAIL";

interface LoginResponse {
  message: LoginSuccessMessage | LoginFailMessage;
  token: string;
}
interface UserInfo {
  name: string;
}
interface User {
  username: string;
  password: string;
  userInfo: UserInfo;
}

const users: User[] = [
  {
    username: "chosule",
    password: "1234",
    userInfo: { name: "chosule info" },
  },
  {
    username: "bosule",
    password: "1234",
    userInfo: { name: "bosule info" },
  },
  {
    username: "ensoo",
    password: "1234",
    userInfo: { name: "ensoo info" },
  },
];

const _secret: string = "1234asdf";

const login = async (
  username: string,
  password: string
): Promise<LoginResponse | null> => {
  const user: User | undefined = users.find((user: User) => {
    return user.username === username && user.password === password;
  });
  return user
    ? {
        message: "SUCCESS",
        token: JSON.stringify({ user: user.userInfo, secret: _secret }),
      }
    : null;
};

const getUserInfo = async (token: string): Promise<UserInfo | null> => {
  const parseToken = JSON.parse(token); //parseToken에는 userInfo와 secret이 담겨있어야함
  if (!parseToken?.secret || parseToken.secret !== _secret) return null;

  const loggedUser: User | undefined = users.find((user: User) => {
    if (user.userInfo.name === parseToken.user.name) return user;
    console.log("user?", user);
  });
  return loggedUser ? loggedUser.userInfo : null;
};

const LoginWithMockAPI = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: "" });

  const loginSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const loginRes = await login(
      formData.get("username") as string,
      formData.get("password") as string
    );
    if (!loginRes) return;

    const userInfo = await getUserInfo(loginRes.token);
    if (!userInfo) return;

    setUserInfo(userInfo);
  };
  console.log("userInfo", userInfo);
  return (
    <div>
      <h1>Login with Mock API</h1>
      <form onSubmit={loginSubmitHandler}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>
        <h2>User info</h2>
        {JSON.stringify(userInfo)}
      </div>
    </div>
  );
};

export default LoginWithMockAPI;
