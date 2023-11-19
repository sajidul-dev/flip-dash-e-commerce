import Cookies from "universal-cookie";
export const SetCookies = (name: string, value: any) => {
  const cookies = new Cookies();
  cookies.set(name, JSON.stringify(value), {
    path: "/",
    expires: new Date(Date.now() + 86400000),
  });
};

export const GetCookies = (name: string) => {
  const cookies = new Cookies();
  return cookies.get(name);
};

export const RemoveCookies = (name: string) => {
  const cookies = new Cookies();
  cookies.remove(name);
};
