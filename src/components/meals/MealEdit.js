import React, { useEffect, useState } from "react"
import { userStorageKey } from "../auth/authSettings"
import { getRecipesByUser } from "../../modules/recipeManager"
import {  createMealRecipe, deleteMealRecipeByMealAndRecipeId, getMealAndRecipeByMealId } from "../../modules/mealRecipeManager"
import { useHistory, useParams } from "react-router"
import {  getMealsById, updateMealById } from "../../modules/mealManager"
import { confirmAlert } from "react-confirm-alert"
import "./Meals.css"
export const MealEdit = () => {
    const history = useHistory()
    const { mealsId } = useParams()
    const [recipeList, setRecipeList] = useState([0])
    const [mealRecipes, setMealRecipes] = useState([])
    const [recipes, setRecipes] = useState([])
    const [mealName, setMealName] = useState([""])

    // Get Recipes that the user has to fill the drop down
    useEffect(() => {
        getRecipesByUser(sessionStorage.getItem(userStorageKey)).then(response => {
            setRecipes(response)
        })
    }, [])

    useEffect(() => {
        getMealAndRecipeByMealId(mealsId).then(responseFromApi => {
            setMealRecipes(responseFromApi.map(rec => {
                return rec.recipe
            }))
        })
        getMealsById(mealsId).then(res => setMealName(res.mealName))
    }, [mealsId])

    const handleRemoveRecipeClick = index => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>You want to remove this recipe?</p>
                        <p>This can't be undone</p>
                        <button onClick={onClose}>No</button>
                        <button
                            onClick={() => {
                                const temp = [...mealRecipes];
                                let deleteItem = temp.splice(index, 1);
                                deleteMealRecipeByMealAndRecipeId(mealsId, deleteItem[0])
                                setMealRecipes(temp);
                                onClose();
                            }}
                        >
                            Yes, Delete it!
                    </button>
                    </div>
                );
            }
        });
    }

    const handleRemoveNewRecipeClick = index => {
        const temp = [...recipeList];

        temp.splice(index, 1);
        setRecipeList(temp);
    }
    const handleAddRecipeClick = (evt) => {
        setRecipeList([...recipeList, 0])
    }
    const handleSaveNameChange = (evt) => {
        evt.preventDefault()
        setMealName(evt.target.value)
    }
    const handleSaveMeal = () => {
        let temp2 = [...recipeList.map(rec => {
            return parseInt(rec)
        })]
        let hold = []
        for (let i = 0; i < recipeList.length; i++) {
            if (temp2[i] !== 0) {
                hold.push(temp2[i])
            }
        }
        updateMealById(mealsId, mealName)
        if (hold.length === 0) {
            
            history.push("/meals")
        } else {
            Promise.all(hold.map((recipe)=> createMealRecipe(recipe, parseInt(mealsId))))
            .then(() => { history.push("/meals")})
        }
    }

    const handleInputChange = (evt, index) => {
        let temp = [...recipeList];
        temp[index] = evt.target.value;
        setRecipeList(temp)
    }
    const handleRecipeOnClick = (evt) => {
        history.push(`/recipes/${evt.target.id}`)
    }
    // Meal Create Page
    return (<>
        <h1 className="editMealH1">Edit Meal: {mealName}</h1>
        <div>
            <input className="mealEditMealNameInput" type="text" defaultValue={mealName} id="mealName"
                placeholder={mealName}
                onChange={handleSaveNameChange} />
            <button onClick={handleSaveMeal}>Save Meal</button>
        </div>
        {mealRecipes.map((mealRec, i) => {
            return (
                <div key={mealRec.id}>
                    <div className="mealRecipeEditName" id={mealRec.id} value={mealRec.recipeName} onClick={handleRecipeOnClick}>{mealRec.recipeName}</div>
                    <div className="btn-box">
                        {mealRecipes.length !== 0 && <button
                            className="recipeRemoveButton"
                            onClick={() => handleRemoveRecipeClick(i)}>Remove</button>}
                    </div>
                </div>
            )
        })}

        {recipeList.map((x, i) => {
            return (
                <div key={i}>
                    <select onChange={evt => handleInputChange(evt, i)} placeholder="Select A Recipe">
                        <option key={"0"}defaultValue="0">Select A recipe</option>
                        {recipes.map((recipe) => {
                            return <option key={recipe.id} id={recipe.id} value={recipe.id} >{recipe.recipeName}</option>
                        })}
                    </select>
                    <div className="btn-box">
                        {recipeList.length !== 1 && <button
                            className="recipeRemoveButton"
                            onClick={() => handleRemoveNewRecipeClick(i)}>Remove</button>}
                        {recipeList.length - 1 === i && <button onClick={handleAddRecipeClick}>Add</button>}
                    </div>
                </div>
            )
        })}
    </>)
}