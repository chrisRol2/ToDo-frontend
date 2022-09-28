import { useContext } from "react";
import ProfileContainer from "../../components/ProfileConteiner";
import { AccountContext } from "../../context/account/account";
import { Main } from "./styles";
const Profile = () => {
  const { account } = useContext(AccountContext);
  return (
    <Main>
      <ProfileContainer account={account} />
    </Main>
  );
};

export default Profile;
