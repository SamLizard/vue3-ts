import { sleep } from "@/composables/utils";

type details = {
  name: string;
  phone: string;
};

type item = {
  itemDate: string;
  itemTime: string;
  id: string;
};

const login = async (username: string, password: string): Promise<details> => {
  const personalDetails = {
    name: "Sam",
    phone: "065666666",
  };

  await sleep();

  return personalDetails;
};

const register = async (
  username: string,
  password: string,
  phone: string
): Promise<details> => {
  const personalDetails = {
    name: "Sam",
    phone: "067666666",
  };

  await sleep();

  return personalDetails;
};

const getItems = async (): Promise<Array<item>> => {
  const items = [
    { itemDate: "21.12.2023", itemTime: "09:35:00", id: "0" },
    { itemDate: "24.12.2023", itemTime: "11:10:00.0001", id: "1" },
    { itemDate: "01.01.2024", itemTime: "15:45:00", id: "2" },
  ];

  await sleep();

  return items;
};

const deleteItem = async (
  date: string,
  time: string,
  id: string
): Promise<boolean> => {
  await delay();

  return true;
};

export { login, register, getItems, deleteItem };
