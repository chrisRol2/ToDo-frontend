import axios from "../helpers/axios";

const getItems = async () => {
  const res = await axios.get("/items/all");
  return res.data;
};

const setItem = async (item: any) => {
  const res = await axios.put(`/items/${item.name}`, {
    name: item.name,
    isDone: item.isDone,
  });
  return res.data;
};

const addItem = async (item: any) => {
  const res = await axios
    .post("/items", {
      name: item.name,
      description: item.description,
      expireAt: item.expireAt,
      isDone: item.isDone,
    })
    .catch((err) => {
      console.log(err);
    });
  return res?.data;
};

const deleteItem = async (item: any) => {
  const res = await axios.delete(`/items/${item.name}`);
  return res.data;
};

const CoreService = {
  getItems,
  setItem,
  addItem,
  deleteItem,
};

export default CoreService;
