// Api
import api from "../utilities/api";

export const onFollowContent = async (
  type: string,
  id: string,
  callback: () => void
) => {
  try {
    await api
      .post(`/${type}`, {
        ref: id.toString(),
      })
      .then(() => {
        if (callback) {
          callback();
        }
      });
  } catch (error) {}
};

export const onUnFollowContent = async (
  type: string,
  id: string,
  callback: () => void
) => {
  try {
    await api.delete(`/${type}/${id}`).then(() => {
      callback();
    });
  } catch (error) {}
};

export const onRateRecipe = async (
  id: string,
  rating: number,
  callback: () => void
) => {
  try {
    await api
      .post(`/rating/recipe`, {
        ref: id.toString(),
        rating: rating,
      })
      .then(() => {
        if (callback) {
          callback();
        }
      });
  } catch (error) {}
};
