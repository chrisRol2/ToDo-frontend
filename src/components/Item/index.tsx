import { useContext } from "react";
import { AccountContext } from "../../context/account/account";
import Countdown from "../Countdown";

const Item = ({
  item,
  onChanges,
  deleteItem,
}: {
  item: any;
  onChanges: any;
  deleteItem: any;
}) => {
  const { getToken, getUser } = useContext(AccountContext);
  return (
    <li key={item._id}>
      <div>
        <span>{item.name}</span>
        <div>
          <input
            type="checkbox"
            name="isDone"
            id={item._id}
            checked={item.isDone}
            onChange={onChanges}
          />
          <button onClick={deleteItem}>🗑️</button>
        </div>
        <span className="description">
          <hr />
          {item.description}
        </span>
        <Countdown futureTimestamp={item.expireAt} />
      </div>
    </li>
  );
};

export default Item;
