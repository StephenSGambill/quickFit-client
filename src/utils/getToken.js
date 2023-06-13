
export const getToken = () => {
  const auth = localStorage.getItem("qfs_user")

  return JSON.parse(auth).token
}