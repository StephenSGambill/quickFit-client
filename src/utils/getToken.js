
// export const getToken = () => {
//   return localStorage.getItem("qfs_user")
// }

export const getToken = () => {
  const storedUser = localStorage.getItem("qfs_user");

  if (storedUser) {
    const userObj = JSON.parse(storedUser);

    return userObj.token;
  }

  return null;
};
