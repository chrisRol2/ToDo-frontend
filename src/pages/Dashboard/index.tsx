import { useContext, useEffect, useState } from "react";
import Countdown from "../../components/Countdown";
import { AccountContext } from "../../context/account/account";
import { DashboardContainer, Header, Main } from "./styles";
const getItems = async (username: string, token: string) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/items/all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ username: username }),
  });

  const data = await response.json();
  return data;
};
const setItem = async (username: string, token: string, item: any) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/items/${item.name}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        username: username,
        name: item.name,
        isDone: item.isDone,
      }),
    }
  );
  return response;
};
const deleteItem = async (
  username: string,
  token: string,
  item: any,
  setItem: any,
  items: any
) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/items/${item.name}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        username: username,
        name: item.name,
      }),
    }
  );
  const data = await response.json();
  if (data.message === "deleted") {
    setItem(items.filter((i: any) => i.name !== item.name));
  }

  return response;
};

const addItem = async (
  username: string,
  token: string,
  setItem: any,
  items: any,
  item: any
) => {
  console.log(JSON.stringify(item));
  const response = await fetch(`${process.env.REACT_APP_API_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      username: username,
      name: item.name,
      description: item.description,
      expireAt: item.expireAt,
      isDone: item.isDone,
    }),
  });
  const data = await response.json();
  const status = await response.status;
  if (status === 200) {
    setItem([...items, data]);
  }
};

const Dashboard = () => {
  const { getToken, getUser } = useContext(AccountContext);

  const [items, setItems] = useState([]);

  const addOneItem = (e: any) => {
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
    addItem(getUser().username, getToken(), setItems, items, item);
    e.target.name.value = "";
    e.target.isDone.checked = false;
    e.target.description.value = "";
    e.target.expirationDate.value = "";
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      getItems(getUser().username, token).then((data) => setItems(data));
    }
  }, [getToken, getUser]);

  const onChanges = (e: any) => {
    const newItems: any = items.map((item: any) => {
      if (item._id === e.target.id) {
        item.isDone = e.target.checked;
        setItem(getUser().username, getToken(), item);
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
          <button
            onClick={() => {
              // addItem(getUser().username, getToken(), setItems, items);
              console.log("add");
            }}
          >
            ➕
          </button>
        </Header>
        <ul>
          {items && items.length > 0
            ? items.map((item: any, _: number, thisItems: any) => {
                // console.log(item);
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
                        <button
                          onClick={() => {
                            deleteItem(
                              getUser().username,
                              getToken(),
                              item,
                              setItems,
                              thisItems
                            );
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                      <span className="description">
                        <hr />
                        {item.description}
                      </span>
                      <Countdown futureTimestamp={item.expireAt} />
                    </div>
                  </li>
                );
              })
            : "No items"}
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
        </ul>
      </DashboardContainer>
    </Main>
  );
};

export default Dashboard;
