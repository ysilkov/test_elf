"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getArchive } from "@/app/api/api";

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
  name: string;
  email: string;
  phone: string;
  address: string;
  data: GetBurgers[];
}

export default function History() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });
  const [data, setData] = useState<Data[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await getArchive(formData.email, formData.phone);
      setData(response);
    } catch (error) {
      console.error("Failed to fetch archive:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getArchive(formData.email, formData.phone);
      setData(response);
    } catch (error) {
      console.error("Failed to fetch archive:", error);
    }
  };

  return (
    <div className="flex flex-col border border-x-2 border-black rounded-xl col-span-1 text-center ">
      <form onSubmit={handleSubmit}>
        <div className="border border-x-2 border-black rounded-xl col-span-1 text-center m-2">
          <div className="mt-2">
            <p className="mb-1">Email:</p>
            <input
              className="rounded-lg text-center"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <p className="mb-1">Phone:</p>
            <input
              className="rounded-lg text-center mb-4"
              type="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="px-3 py-2 border border-x-2 border-black rounded-xl mb-4 mx-4"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="border border-x-2 border-black rounded-xl col-span-1 text-center m-2">
        {data.map((el) => (
          <div key={el.name}>
            <div className="flex justify-start border border-x-2 border-black rounded-xl text-center m-2">
              {el.data.map((burger) => (
                <div key={burger.id} className="">
                  <div className="flex justify-center border border-x-2 border-black rounded-xl m-2">
                    <Image
                      src={burger.img}
                      alt={burger.name}
                      width={150}
                      height={100}
                      className="rounded-xl m-2"
                    />
                    <div className="flex flex-col justify-center mr-2">
                      <p>{burger.name}</p>
                      <p>{burger.price} $</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-end ml-auto mr-4">
                <p>
                  Total price:{" "}
                  {el.data.reduce((total, burger) => total + burger.price, 0)} $
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
