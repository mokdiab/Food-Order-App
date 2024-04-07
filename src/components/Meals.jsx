import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
const config = {};
export default function Meals() {
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", config, []);
  if (isLoading)
    return (
      <div className="center">
        <ClimbingBoxLoader
          color="#ffc404"
          cssOverride=""
          loading={isLoading}
          size={15}
          speedMultiplier={1}
        />
      </div>
    );
  if (error) {
    return <Error title="An error occurred" message={error} />;
  }
  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
