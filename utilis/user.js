import { useUser } from "../src/context/UserContext";
import { getUser } from "../src/helpers/axioshelpers";

export const autoLogin = async () => {
  //   const { setUser } = useUser();
  const token = localStorage.getItem("jwttoken");
  if (token) {
    //call api to get user
    const { status, user } = await getUser();
    return status === "success" ? user : {};

    // setUser(response.user);
    // mount user to state
  }
};
