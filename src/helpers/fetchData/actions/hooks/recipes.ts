import { formatRecipeData } from "@/helpers/category";
import { gqlGetRecipe } from "../gql/recipes";

export const useGetRecipe = async (slug:string) => {
    try {
        const data = await gqlGetRecipe(decodeURI(slug));

        const recipeData = data?.data?.getRecipeBySiteUuidAndSlug;
        if (!recipeData) {
            throw new Error("Recipe not found");
        }
        return formatRecipeData(recipeData);
    } catch (e) {
        // console.log("Error fetching recipe:", slug, e)
        return null;
    }
};