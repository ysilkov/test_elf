"use client";
import { useEffect, useState } from "react";
import { getBurgers } from "../api/api";
import Image from "next/image";

interface GetBurgers {
  id: string;
  img: string;
  name: string;
  dsc: string;
  price: number;
  rate: number;
  country: string;
}
export default function Home() {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [buttonsDisabled, setButtonsDisabled] = useState<
    Record<string, boolean>
  >({
    "Mc Donny": false,
    CFK: false,
    "King Burger": false,
    "Big Burger": false,
    "Little Burger": false,
  });
  const country = [
    "New York, NY",
    "Lynchburg, VA",
    "Seguin, TX",
    "Brooklyn, NY",
    "Los Angeles, CA",
  ];

  const [burgers, setBurgers] = useState<GetBurgers[]>([]);

  const handleButtonClick = async (buttonName: string, country: string) => {
    setActiveButton(buttonName);
    const response = await getBurgers(country);
    setBurgers(response);
    setButtonsDisabled((prevState) => {
      const updatedState = Object.fromEntries(
        Object.entries(prevState).map(([key, value]) => [key, true])
      ) as Record<string, boolean>;
      return updatedState;
    });
  };
  useEffect(() => {
    localStorage.getItem("cartItems");
  }, []);
  const addToCart = (id: string) => {
    const selectedProduct = burgers.find((burger) => burger.id === id);
    if (selectedProduct) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const productExists = cartItems.some(
        (item: { id: string }) => item.id === selectedProduct.id
      );
      if (!productExists) {
        const updatedCartItems = [...cartItems, selectedProduct];
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }
    }
  };
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="border border-x-2 border-black rounded-xl col-span-1 text-center">
        <p className="pt-4 text-base">Shops:</p>
        {Object.keys(buttonsDisabled).map((buttonName, index) => (
          <button
            key={buttonName}
            className={`my-2 mx-20 text-lg border border-x-[1px] rounded-lg border-black p-4 w-36 ${
              activeButton === buttonName
                ? "bg-blue-500 text-white cursor-not-allowed"
                : ""
            }`}
            onClick={() => handleButtonClick(buttonName, country[index])}
            disabled={buttonsDisabled[buttonName]}
          >
            {buttonName}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 col-span-2 border border-x-2 border-black rounded-xl">
        {burgers.map((burger) => (
          <div
            className="flex flex-col border border-x-2 border-black rounded-xl my-3 mx-12"
            key={burger.id}
          >
            <div className="flex justify-center mt-2">
              <Image
                src={burger.img}
                alt={burger.name}
                width={250}
                height={200}
                className="rounded-xl"
              />
            </div>
            <p className="my-2 ml-11">{burger.name}</p>
            <button
              className="text-center flex justify-end mb-4 mr-3 border border-x-2 border-black rounded-xl py-1 pr-3 w-28 ml-auto"
              onClick={() => addToCart(burger.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
