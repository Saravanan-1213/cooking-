import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();
  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `https://recipe-backend-8s83.onrender.com/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipe();
  }, []);

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => {
          return (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
              </div>
              <div className="instructions">
                <p>{recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SavedRecipes;
