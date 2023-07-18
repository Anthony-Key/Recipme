import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Dancing_Script } from "@next/font/google";
import RecipeLister from "@/components/RecipeLister";
import { MealRoot } from "@/components/types/RecipeTypes";
import axios from "axios";

const dance = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  const [meals, setMeals] = useState<MealRoot>({ meals: [] });
  const url = "https://akportfolioapi.azurewebsites.net/Recipe";
  const [currentSearch, setSearch] = useState<string>("");

  useEffect(() => {
    axios.get<MealRoot>(url).then((response) => {
      const data = response.data;
      setMeals(data);
    });
  }, []);

  const search = (key: string, term: string) => {
    if (key === "Enter") {
      axios.get<MealRoot>(`${url}/${term}`).then((response) => {
        const data = response.data;
        setMeals(data);
      });
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-rose-100 to-teal-100 w-full h-full">
        <div className="flex items-center justify-center flex-col">
          <h1
            className={`${dance.className} text-8xl text-white font-semibold bg-emerald-600 bg-opacity-20 rounded-xl p-4 mt-[5%] mb-10`}
          >
            Recipme
          </h1>

          <div className="relative mb-6 w-1/4">
            <input
              type="text"
              id="input-group-1"
              className=" text-gray-900 text-lg rounded-full block w-full text-center p-2.5 placeholder:text-lg"
              placeholder="Search"
              onKeyUp={(input) => {
                search(input.key, currentSearch);
              }}
              onChange={(input) => {
                setSearch(input.target.value);
              }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
          <RecipeLister meals={meals} />
        </div>
      </div>
    </>
  );
}
