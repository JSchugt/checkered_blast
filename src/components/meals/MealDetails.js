import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { deleteMealById, getMealRecipeByMealId, getMealsById } from "../../modules/mealManager"
import { getMealRecipeById } from "../../modules/mealRecipeManager"
import { deleteRecipeById } from "../../modules/recipeManager"
import {userStorageKey} from "../auth/authSettings"

export const MealDetails = () => {
    const { mealsId } = useParams()
    const history = useHistory()
    const [meals, setMeals] = useState([{}])
    const [mealName, setMealName] = useState([])
    const [recipe, setRecipe] = useState([])


    useEffect(() => {
        getMealRecipeByMealId(mealsId)
            .then((responseFromAPi) => {
                if(responseFromAPi.length >0 ){

                    setMeals(responseFromAPi)
                    setMealName(responseFromAPi[0].meal.mealName)
                    setRecipe([...responseFromAPi.map((rec) => {
                        return rec.recipe
                    })])
                }
            })
    }, [])
    const handleRecipeClick = (evt) => {
        evt.preventDefault()
        history.push(`/recipes/${evt.target.id}`)
    }

    const handleDeleteMeal = (evt) => {
        evt.preventDefault()
        deleteMealById(mealsId).then(()=>{history.push("/meals/")})
    }
    return (<>
    
        <h1>{mealName}</h1>
        <button>Edit</button>
        <button onClick={handleDeleteMeal}>Delete</button>
        {console.log(recipe, "recipe in meal details")}
        { (recipe.length >0)?(recipe.map(item => {
            console.log(item, "item in meal details")
            return <p id={item.id} onClick={handleRecipeClick}>{item.recipeName}</p>
        })):""}

    </>)


}