
// to be completed
export const isStaff = () => {
  const auth = localStorage.getItem("gfs_user")
  const userType = JSON.parse(auth)
  return userType?.staff
}
