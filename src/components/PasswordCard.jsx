import React, { useState } from "react";
import { useForm } from "./useForm";
import { getRandomChar, getSymbol } from "./utils";
import { FaClipboard } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function PasswordGenerator() {
  const [values, setValues] = useForm({
    length: 6,
    uppercase: true,
    lowercase: true,
    numbers: false,
    symbols: false,
  });

  const [result, setResult] = useState("");

  const fieldArray = [
    {
      field: values.uppercase,
      getChar: () => getRandomChar(65, 90),
    },
    {
      field: values.lowercase,
      getChar: () => getRandomChar(97, 122),
    },
    {
      field: values.numbers,
      getChar: () => getRandomChar(48, 57),
    },
    {
      field: values.symbols,
      getChar: () => getSymbol(),
    },
  ];

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let generatedPassword = "";
    const checkedFields = fieldArray.filter(({ field }) => field);

    for (let i = 0; i < values.length; i++) {
      const index = Math.floor(Math.random() * checkedFields.length);
      const letter = checkedFields[index]?.getChar();

      if (letter) {
        generatedPassword += letter;
      }
    }
    if (generatedPassword) {
      setResult(generatedPassword);
    } else {
      toast.error("Please check at least one field");
    }
  };

  const handleClipboard = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      toast.success("Password copied to your clipboard");
    } else {
      toast.error("Error copying the password");
    }
  };

  return (
    <section className="w-[343px] h-[540px] lg:w-[540px] lg:h-[632px] bg-dark">
      <div className="container mx-auto flex flex-col justify-center items-center text-md">
        <form onSubmit={handleOnSubmit}>
          <div className="flex mt-10">
            <input
              type="text"
              id="result"
              placeholder="Your password"
              readOnly
              className="w-full bg-transparent text-center outline-none"
              value={result}
            />
            <div
              onClick={handleClipboard}
              className="cursor-pointer">
              <FaClipboard
                size={20}
                className="text-neon"
              />
            </div>
          </div>
          <div className="flex justify-center items-center pt-10 mb-10">
            <label
              htmlFor="length"
              className="w-full">
              Caracter length
            </label>
            <input
              type="number"
              id="length"
              min={6}
              max={20}
              name="length"
              value={values.length}
              onChange={setValues}
              className="w-10 bg-transparent outline-none text-neon text-xl"
            />
          </div>
          <div className="flex gap-x-4">
            <input
              type="checkbox"
              id="uppercase"
              name="uppercase"
              checked={values.uppercase}
              onChange={setValues}
            />
            <label htmlFor="uppercase">Include Uppercase letters</label>
          </div>
          <div className="flex gap-x-4 pt-2">
            <input
              type="checkbox"
              id="lowercase"
              name="lowercase"
              checked={values.lowercase}
              onChange={setValues}
            />
            <label htmlFor="lowercase">Include Lowercase letters</label>
          </div>
          <div className="flex gap-x-4 pt-2">
            <input
              type="checkbox"
              id="numbers"
              name="numbers"
              checked={values.numbers}
              onChange={setValues}
            />
            <label htmlFor="numbers">Include numbers</label>
          </div>
          <div className="flex gap-x-4 pt-2">
            <input
              type="checkbox"
              id="symbols"
              name="symbols"
              checked={values.symbols}
              onChange={setValues}
            />
            <label htmlFor="symbols">Include symbols</label>
          </div>
          <div className=" bg-background uppercase w-full py-5 px-10 mt-10">
            <span className="text-light opacity-80">Strength</span>
          </div>
          <button className="bg-neon w-full py-3 text-dark uppercase mt-10 text-sm">
            Generate
          </button>
        </form>
      </div>
    </section>
  );
}
