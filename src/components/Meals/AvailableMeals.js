import { useEffect, useState } from "react";

import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";


const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch("https://react-http-75f3d-default-rtdb.firebaseio.com/meals.json");

      if(!response.ok) {
        throw new Error("Something went Wrong!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }
      setMeals(loadedMeals);
      setIsloading(false)
    }
    fetchMeals().catch(error => {
      setIsloading(false);
      setHttpError(error.message);
    });
  }, [])

  if(isLoading) {
    return <section className={styles.MealsLoading}>
      <p>Loading...</p>
    </section>
  }

  if (httpError) {
    return <section className={styles.MealsError}>
      <p>{httpError}</p>
    </section>
  }

  const mealsItem = meals.map(meal => <MealItem
    id={meal.id}
    key={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price} />);

  return <section className={styles.meals}>
    <Card>
      <ul>
        {mealsItem}
      </ul>
    </Card>
  </section>
};

export default AvailableMeals;