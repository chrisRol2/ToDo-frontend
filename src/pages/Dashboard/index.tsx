import { useContext, useEffect, useState } from "react";
import Item from "../../components/Item";
import ListItem from "../../components/ListItem";
import { AccountContext } from "../../context/account/account";
import CoreService from "../../services/CoreService";
import { DashboardContainer, Header, Main } from "./styles";
const getItems = async () => {
  const items = await CoreService.getItems();

  return items;
};
const setItem = async (item: any) => {
  const response = await CoreService.setItem(item);
  return response;
};
const deleteItem = async (item: any, setItem: any, items: any) => {
  const response = await CoreService.deleteItem(item);
  if (response.message === "deleted") {
    setItem(items.filter((i: any) => i.name !== item.name));
  }
  return response;
};

const addItem = async (
  setItem: any,
  items: any,
  item: any
): Promise<Boolean> => {
  try {
    const alreadyExists = items.find((i: any) => i.name === item.name);
    if (alreadyExists) {
      console.log("already exists");
      return false;
    }
    const response = await CoreService.addItem(item);
    console.log("res:", response);
    if (response.message === "created") {
      setItem([...items, response.item]);
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const Dashboard = () => {
  const { getToken } = useContext(AccountContext);

  const [items, setItems] = useState([]);

  const addOneItem = async (e: any) => {
    e.preventDefault();
    if (e.target.name.value === "") {
      return;
    }
    const item = {
      name: e.target.name.value,
      description: e.target.description.value,
      isDone: e.target.isDone.checked,
      expireAt: new Date(e.target.expirationDate.value).getTime(),
    };
    if (await addItem(setItems, items, item)) {
      e.target.name.value = "";
      e.target.isDone.checked = false;
      e.target.description.value = "";
      e.target.expirationDate.value = "";
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      getItems().then((data) => setItems(data));
    }
  }, [getToken]);

  const onChanges = (e: any) => {
    const newItems: any = items.map((item: any) => {
      if (item._id === e.target.id) {
        item.isDone = e.target.checked;
        setItem(item);
      }
      return item;
    });

    setItems(newItems);
  };
  const [minDateTime, setMinDateTime] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const day = ("0" + now.getDate()).slice(-2);
    const hours = ("0" + now.getHours()).slice(-2);
    const minutes = ("0" + now.getMinutes()).slice(-2);

    const datetime = `${year}-${month}-${day}T${hours}:${minutes}`;

    setMinDateTime(datetime);
  });

  return (
    <Main>
      <DashboardContainer>
        <Header>
          <div />
          <h1>Dashboard</h1>
          <span />
        </Header>
        <ListItem>
          {items && items.length > 0
            ? items.map((item: any, _: number, thisItems: any) => {
                return (
                  <Item
                    item={item}
                    onChanges={onChanges}
                    key={item._id}
                    deleteItem={() => {
                      deleteItem(item, setItems, items);
                    }}
                  />
                );
              })
            : "No items"}
          {/* </ul>
        <ul> */}
          <li key={"add item"}>
            <form onSubmit={addOneItem}>
              <input type="text" name="name" id="" placeholder="Name" />
              <div>
                <input type="checkbox" name="isDone" id="1" />
                <button type="submit">💾</button>
              </div>
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                className="description"
              />
              <input
                type="datetime-local"
                name="expirationDate"
                min={minDateTime}
                onChange={(e) => {
                  const expirationDate = new Date(e.target.value);
                  console.log(expirationDate.getTime());
                }}
              />
            </form>
          </li>
        </ListItem>
      </DashboardContainer>
    </Main>
  );
};

export default Dashboard;
