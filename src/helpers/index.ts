export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const refreshToken = async (refreshToken: string) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: {
        refreshToken: refreshToken,
      },
    }),
  });
  const data = await res.json();
  return data;
};

const backendRequest = async ({
  resourse,
  method,
  body,
}: {
  resourse: string;
  method: string;
  body: any;
}) => {
  const accessToken = localStorage.getItem("accessToken");
  const ArefreshToken = localStorage.getItem("refreshToken");
  if (!accessToken) {
    return [];
  }
  // let accessToken = accessToken ? accessToken : null;
  const actualRefreshToken = ArefreshToken || "";
  const retry = 3;
  let intent = 0;
  let response = null;

  const get = async (accessToken: any) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/${resourse}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(body),
    });
  };

  while (intent < retry) {
    response = await get(accessToken);
    const data = await response.json();
    if (response.status === 200) {
      return data;
    }
    const refreshedToken = await refreshToken(actualRefreshToken);
    if (refreshedToken.status === 200) {
      //aca hay que actualzar los tokens
      // localStorage.removeItem("account");
      localStorage.setItem("refreshToken", refreshedToken.refreshToken);
      localStorage.setItem("accessToken", refreshedToken.accessToken);
    }
    intent++;
    await delay(1000);
  }
};

export const getData = async ({ resourse }: { resourse: string }) => {
  const account = localStorage.getItem("account");
  if (!account) {
    return [];
  }
  let token = account ? JSON.parse(account).account.accessToken : null;
  const actualRefreshToken = account
    ? JSON.parse(account).account.refreshToken
    : null;
  const username = account ? JSON.parse(account).account.username : null;
  const retry = 3;
  let intent = 0;
  let response = null;

  const get = async (accessToken: any) => {
    return await fetch(`${process.env.REACT_APP_API_URL}/${resourse}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ username: username }),
    });
  };

  while (intent < retry) {
    response = await get(token);
    const data = await response.json();
    if (response.status === 200) {
      return data;
    }
    const refreshedToken = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: {
            refreshToken: actualRefreshToken,
          },
        }),
      }
    );
    const refreshedTokenData = await refreshedToken.json();
    if (refreshedToken.status === 200) {
      //aca hay que actualzar los tokens
      const accountObj = JSON.parse(account);
      accountObj.account.accessToken = refreshedTokenData.accessToken;
      token = refreshedTokenData.accessToken;
      accountObj.account.refreshToken = refreshedTokenData.refreshToken;
      localStorage.removeItem("account");
      localStorage.setItem("account", JSON.stringify(accountObj));
    }
    intent++;
    await delay(1000);
  }
};

const MainService = { getData };

export default MainService;
