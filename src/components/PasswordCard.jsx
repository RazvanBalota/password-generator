import React, { useState } from "react";
import { useForm } from "./useForm";
import { getRandomChar, getSymbol } from "./utils";

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
    }
  };

  return (
    <section className="w-[343px] h-[540px] lg:w-[540px] lg:h-[632px] bg-dark">
      <div className="container mx-auto px-4">
        <form onSubmit={handleOnSubmit}>
          <div>
            <input
              type="text"
              id="result"
              placeholder="Your password"
              readOnly
              className="w-full bg-transparent"
              value={result}
            />
          </div>
          <div className="flex pt-10">
            <label
              htmlFor="length"
              className="w-2/3 ">
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
              className="w-1/3 text-black"
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
          <div className="flex gap-x-4">
            <input
              type="checkbox"
              id="lowercase"
              name="lowercase"
              checked={values.lowercase}
              onChange={setValues}
            />
            <label htmlFor="lowercase">Include Lowercase letters</label>
          </div>
          <div className="flex gap-x-4">
            <input
              type="checkbox"
              id="numbers"
              name="numbers"
              checked={values.numbers}
              onChange={setValues}
            />
            <label htmlFor="numbers">Include numbers</label>
          </div>
          <div className="flex gap-x-4">
            <input
              type="checkbox"
              id="symbols"
              name="symbols"
              checked={values.symbols}
              onChange={setValues}
            />
            <label htmlFor="symbols">Include symbols</label>
          </div>
          <div>
            <span>Strength</span>
          </div>
          <button>Generate password</button>
        </form>
      </div>
    </section>
  );
}
