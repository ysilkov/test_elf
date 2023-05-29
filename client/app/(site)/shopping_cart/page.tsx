"use client";
import { createOrder } from "@/app/api/api";
import MyComponent from "@/app/api/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ShoppingCart() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  interface GetBurgers {
    id: string;
    img: string;
    name: string;
    dsc: string;
    price: number;
    rate: number;
    country: string;
  }
  const [cartItems, setCartItems] = useState<GetBurgers[] | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(1);
  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const savedItems = localStorage.getItem("cartItems");
    if (savedItems) {
      const parsedItems: GetBurgers[] = JSON.parse(savedItems);
      setCartItems(parsedItems);
    }
  }, []);
  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const itemsWithCount =
      cartItems?.map((item) => ({
        ...item,
        count: count,
        user: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      })) || [];

    const token = await recaptchaRef.current?.executeAsync();

    if (token) {
      createOrder(itemsWithCount);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
      localStorage.removeItem("cartItems");
      router.push("/");
    } else {
      setMessage("reCAPTCHA verification failed");
    }
  };
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-x-2 border-black rounded-xl col-span-1 text-center">
          <div className="mt-4 border border-x-2 border-black rounded-xl mx-4">
            <MyComponent address={formData.address} />
          </div>
          <div className="mt-4">
            <p className="mb-1">Name:</p>
            <input
              className="rounded-lg text-center"
              type="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="">
            <p className="mb-1">Email:</p>
            <input
              className="rounded-lg text-center"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="">
            <p className="mb-1">Phone:</p>
            <input
              className="rounded-lg text-center"
              type="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="mb-4">
            <p className="mb-1">Address:</p>
            <input
              className="rounded-lg text-center"
              type="address"
              name="address"
              value={formData.address}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>
        <div className="col-span-1 text-center border border-x-2 border-black rounded-xl">
          <div className="d-flex flex-wrap">
            {cartItems?.map((el) => (
              <div
                className="flex flex-row border border-x-2 border-black rounded-xl m-2"
                key={el.name}
              >
                <div className="flex justify-center mt-2">
                  <Image
                    src={el.img}
                    alt={el.name}
                    width={200}
                    height={100}
                    className="rounded-xl m-2"
                  />
                </div>
                <div className="flex flex-col my-16 ml-10 justify-between">
                  <p>{el.name}</p>
                  <div className="">
                    <input
                      value={count}
                      type="number"
                      onChange={(e) => setCount(Number(e.target.value))}
                      className="text-center rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end ml-auto mr-1 mt-4">
        <p className="mr-32">
          Total price: {cartItems?.reduce((acc, item) => acc + item.price, 0)} $
        </p>
        <form className="block">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6Lf1OksmAAAAAGklw79RH8y_khOFgX9kx5iGFDyo"
            size="invisible"
          />
        </form>
        <button
          className="border border-x-2 border-black rounded-xl py-1 px-8"
          onClick={(e) => handleSubmit(e)}
        >
          Create order
        </button>
      </div>
    </div>
  );
}
