import { Route } from "react-router"
import { EventPlanner } from "./components/events/EventPlanner"
import { DashBoard } from "./components/Home"
import { Meals } from "./components/meals/Meals"
import { RecipeEntryForm } from "./components/recipes/RecipeEntryFrom"
import {RecipeEditForm} from "./components/recipes/RecipeEditForm"
import { Recipes } from "./components/recipes/RecipeList"
import { RecipeSearch } from "./components/recipes/RecipeSearch"
import { RecipeCard } from "./components/recipes/RecipeCards"
import { MealDetails } from "./components/meals/MealDetails"
import { MealEntryForm } from "./components/meals/MealEntryForm"
import { MealEdit } from "./components/meals/MealEdit"
import { EventCreate } from "./components/events/EventCreate"
import { EventDetails } from "./components/events/EventDetails"
import { EventEdit }  from "./components/events/EventEdit"
import { EmptySpotLight } from "./helpers/EmptySpotLight"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <DashBoard />
            </Route>
            <Route exact path="/events">
                <EventPlanner />
            </Route>
            <Route exact path="/events/:eventId(\d+)">
                <EventDetails />
            </Route>
            <Route exact path="/events/:eventId(\d+)/edit">
                <EventEdit />
            </Route>
            <Route exact path="/events/create">
                <EventCreate />
            </Route>
            {/* Meal Routing */}
            <Route exact path="/meals">
                <Meals />
            </Route>
            <Route exact path="/meals/create">
                <MealEntryForm />
            </Route>
            <Route exact path="/meals/:mealsId(\d+)">
                <MealDetails />
            </Route>
            <Route exact path="/meals/:mealsId(\d+)/edit">
                <MealEdit />
            </Route>
            {/* Recipe routing */}
            <Route exact path="/recipes">
                <Recipes />
            </Route>
            <Route exact path="/recipes/search">
                <RecipeSearch />
            </Route>
            <Route exact path="/recipes/create">
                <RecipeEntryForm />
            </Route>
            <Route exact path="/recipes/:recipeId(\d+)/edit">
                <RecipeEditForm />
            </Route>
            <Route exact path="/recipes/:recipeId(\d+)">
                <RecipeCard />
            </Route>
            <Route exact path="/empty/planner">
                <EmptySpotLight />
            </Route>
        </>
    )
}