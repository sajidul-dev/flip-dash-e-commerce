export async function isAdminRequest(email: string, res: any) {
  const adminEmails = ["admin@gmail.com"];

  //   const session = GetCookies("user");
  //   console.log(session, "Session");
  if (!adminEmails.includes(email)) {
    res.status(401);
    res.end();
    throw "Not an admin";
  }
}
