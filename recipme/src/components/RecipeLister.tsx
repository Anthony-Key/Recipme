import { useEffect, useState } from "react";
import { MealRoot } from "./types/RecipeTypes";

export default function RecipeLister(props: { meals: MealRoot }) {
  const [currentMeals, setMeals] = useState<MealRoot>({ meals: [] });

  useEffect(() => {
    setMeals(props.meals);
  }, [props.meals]);

  return (
    <>
      <div className="grid grid-cols-5 gap-10">
        {currentMeals?.meals.map((meal, index) => (
          <div
            key={index}
            className="w-52 h-auto flex flex-col bg-black rounded-3xl bg-opacity-[3%]"
          >
            <img
              src={meal.strMealThumb}
              className="w-full h-full rounded-2xl"
            ></img>
            <p className="text-gray-600 text-center p-1 font-bold">
              {meal.strMeal}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
