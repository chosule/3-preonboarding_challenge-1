## 📌1. 프로젝트 실행 방법

```
  $ npm run dev
```

## 📌2. 요구사항

1. 로그인 MockData를 만들어 form에서 username과 password를 받아 login함수 호출하기
2. 컴포넌트에 유저정보를 보여줄수 있도록 구현

## 📌3. 키워드

1. JSON.stringify
2. JSON.parse
3. FormData

## 📌4. 키워드 알아보기

### 4-1) JSON.stringify

JSON.stringify() 함수는 javascript 객체나 배열을 JSON 문자열로 변환하는 역할을 한다.
해당 실습에서는 login함수에서 username과 password 가 담긴 user을 반환하는데 이때 `token`에 `userInfo`와 `_secret`을 JSON문자열로 변환하였다.

```js
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
```

javascript에서 JSON문자열로 변환하는 이유는 데이터교환, 데이터 저장, 데이터 표현의 편의성과 표준화등 다양한 이점을 얻기 위해서 자주 사용된다.

### 4-2) JSON.parse

JSON.stringify과는 정반대로 생각해주면 되는데 JSON문자열을 javascript 객체로 변환하는 역할을 한다.
즉, JSON 문자열을 파싱하여 JavaScript 데이터로 역직렬화(deserialize)해준다.

코드에서 login함수에 JSON문자열로 변환한 token을 getUserInfo 함수 에서 다시 객체로 변환시켜 주고있다.

```js
const getUserInfo = async (token: string): Promise<UserInfo | null> => {
  const parseToken = JSON.parse(token); //parseToken에는 userInfo와 secret이 담겨있어야함
  if (!parseToken?.secret || parseToken.secret !== _secret) return null;

  const loggedUser: User | undefined = users.find((user: User) => {
    if (user.userInfo.name === parseToken.user.name) return user;
    console.log("user?", user);
  });
  return loggedUser ? loggedUser.userInfo : null;
};
```

### 4-3) FormData

- FormData는 웹 개발에서 자바스크립트를 사용하여 웹 페이지에서 HTML 폼(form)데이터를 동적으로 수집하고 제출하는 데 사용된다. 이를 통해 사용자가 웹 페이지의 폼에 입력한 데이터를 서버로 전송하거나, 클라이언트 측에서 자바스크립트를 사용하여 데이터를 가공하고 처리 할 수 있다.
- FormData는 폼의 각 입력 필드와 그 값을 쉽게 접근하고, 특정 데이터를 추가, 수정 또는 삭제할 수 있는 메서드를 제공한다.
- FormData를 사용하면 사용자 입력을 쉽게 수집하고 AJAX를 통해 비동기적으로 서버에 데이터를 전송하거나, Fetch API와 함께 사용하여 네트워크 요청을 생성할 수 있다.

코드에서는 FormData를 객체를 생성 후 username과 password의 키 값을 반환해준다.

```js
   const loginRes = await login(
      formData.get("username") as string,
      formData.get("password") as string
    );
    if (!loginRes) return;
```
