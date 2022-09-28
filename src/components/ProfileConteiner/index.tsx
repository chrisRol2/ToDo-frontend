import { Aside, Describe, UserData, UserImg, Username } from "./styles";

const ProfileContainer = ({ account }: any) => {
  account = account?.account;
  return (
    <Aside>
      <UserData>
        <div>
          <UserImg src={account?.img} alt="" />
          <Username>{account?.username}</Username>
        </div>
        <Describe>{!account?.describe && "presentacion!!"}</Describe>
      </UserData>
    </Aside>
  );
};

export default ProfileContainer;
