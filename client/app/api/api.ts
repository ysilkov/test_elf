import axios from "axios";

interface GetBurgers {
  id: string;
  img: string;
  name: string;
  dsc: string;
  price: number;
  rate: number;
  country: string;
  count: number;
}
interface Data {
  user: string;
  email: string;
  phone: string;
  address: string;
  id: string;
  img: string;
  name: string;
  dsc: string;
  price: number;
  rate: number;
  country: string;
  count: number;
}

export const getBurgers = async (country: string) => {
  try {
    const response = await axios.post(
      "https://still-temple-53038.herokuapp.com/api/burgersCountry",
      {
        country: country,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
export const getArchive = async (email: string, phone: string) => {
  try {
    const response = await axios.post(
      `https://still-temple-53038.herokuapp.com/api/archiveOrder`, {
        email: email,
        phone: phone,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (itemsWithCount: Data[]) => {
  try {
    const response = await axios.post("https://still-temple-53038.herokuapp.com/api/createOrder", {
      data: itemsWithCount,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
