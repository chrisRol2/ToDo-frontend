import { useContext, useEffect, useState } from "react";
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
  const response = await fetch(`${process.env.REACT_APP_API_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      username: username,
      name: item.name,
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
      isDone: e.target.isDone.checked,
    };
    addItem(getUser().username, getToken(), setItems, items, item);
    e.target.name.value = "";
    e.target.isDone.checked = false;
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
            ? items.map((item: any) => (
                <li key={item._id}>
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
                          items
                        );
                      }}
                    >
                      X
                    </button>
                  </div>
                </li>
              ))
            : "No items"}
          <li key={"add item"}>
            <form onSubmit={addOneItem}>
              <input type="text" name="name" id="" />
              <div>
                <input type="checkbox" name="isDone" id="1" />
                <button type="submit">➕</button>
              </div>
            </form>
          </li>
        </ul>
      </DashboardContainer>
    </Main>
  );
};

export default Dashboard;
