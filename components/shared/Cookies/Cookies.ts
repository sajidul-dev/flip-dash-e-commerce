import Cookies from "universal-cookie";
export const SetCookies = (name: string, value: any) => {
  const cookies = new Cookies();
  //   cookies.set("token", "token", { path: "/" });
  //   cookies.set("user", "user", { path: "/" });
  //   cookies.set("role", "role", { path: "/" });
  //   cookies.set("id", "id", { path: "/" });
  //   cookies.set("name", "name", { path: "/" });
  //   cookies.set("email", "email", { path: "/" });
  //   cookies.set("avatar", "avatar", { path: "/" });
  //   cookies.set("phone", "phone", { path: "/" });
  //   cookies.set("address", "address", { path: "/" });
  //   cookies.set("birthday", "birthday", { path: "/" });
  //   cookies.set("gender", "gender", { path: "/" });
  //   cookies.set("status", "status", { path: "/" });
  //   cookies.set("created_at", "created_at", { path: "/" });
  //   cookies.set("updated_at", "updated_at", { path: "/" });
  cookies.set(name, JSON.stringify(value));
};

export const GetCookies = (name: string) => {
  const cookies = new Cookies();
  return cookies.get(name);
};

export const RemoveCookies = (name: string) => {
  const cookies = new Cookies();
  cookies.remove(name);
};
