'use client'

import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import api from "../helpers/utilities/api";
import { AuthContext } from "./auth";
import {
  onFollowContent,
  onUnFollowContent,
  onRateRecipe,
} from "./../helpers/userActions/saveContent";

export const UserSavedContentContext = React.createContext({});

const UserSavedContentProvider = ({ children }: { children: ReactNode }) => {
  // Context
  const authContext: { [key: string]: any } = useContext(AuthContext);

  // States
  const [, setLoading] = useState(true);
  const [contents, setContents] = useState<{ [key: string]: any }[]>([]);
  const [reloadData, setReloadData] = useState(false);
  const [ratings, setRatings] = useState({});

  const getUserContent = useCallback(async () => {
    const filterResults = (list: { userId: string; ref: any }[]) => {
      let UID = authContext?.currentUser?.id;

      return list
        .filter((item) => {
          if (item.userId === UID) {
            return item;
          }
        })
        .map((item) => {
          return item.ref;
        });
    };

    const apiRecipes = await api.get(`/recipe?limit=1000&page=1`);
    const apiGuides = await api.get(`/guide?limit=1000&page=1`);
    const apiArticles = await api.get(`/article?limit=1000&page=1`);
    const apiEpisodes = await api.get(`/video?limit=1000&page=1`);
    const apiShows = await api.get(`/show?limit=1000&page=1`);
    const apiCollections = await api.get(`/collection?limit=1000&page=1`);
    const apiChefs = await api.get("/chef?limit=1000&page=1");
    const apiProducts = await api.get("/product?limit=1000&page=1");

    let result = [
      {
        title: "recipes",
        items: filterResults(apiRecipes.data.results),
      },
      {
        title: "guides",
        items: filterResults(apiGuides.data.results),
      },
      {
        title: "articles",
        items: filterResults(apiArticles.data.results),
      },
      {
        title: "episodes",
        items: filterResults(apiEpisodes.data.results),
      },
      {
        title: "shows",
        items: filterResults(apiShows.data.results),
      },
      {
        title: "collections",
        items: filterResults(apiCollections.data.results),
      },
      {
        title: "chefs",
        items: filterResults(apiChefs.data.results),
      },
      {
        title: "products",
        items: filterResults(apiProducts.data.results),
      },
    ].filter((item) => {
      if (item.items.length > 0) {
        return item;
      }
    });

    setContents(result);
    setLoading(false);
    setReloadData(false);
  }, [authContext?.currentUser?.id]);

  const followContent = (type: string, id: string, callback: () => void) => {
    setReloadData(true);

    onFollowContent(type, id, () => {
      if (callback) {
        callback();
      }
      getUserContent();
      setReloadData(false);
    });
  };

  const unfollowContent = (type: string, id: string, callback: () => void) => {
    setReloadData(true);

    onUnFollowContent(type, id, () => {
      if (callback) {
        callback();
      }
      getUserContent();
      setReloadData(false);
    });
  };

  const getUserRatings = async (id: string) => {
    let ratingItem = await api.get(`/rating/recipe/${id}`);

    return ratingItem.data;
  };

  const getAverageRatings = async (id: string) => {
    try {
      let ratingItem = await api.get(`/rating/recipe/average/${id}`);
      return ratingItem.data;
    } catch (err) {
      console.log(err);
    }
  };

  const rateRecipe = async (
    id: string,
    rating: number,
    callback: () => void
  ) => {
    onRateRecipe(id, rating, async () => {
      if (callback) {
        callback();
      }

      await getUserRatings(id).then((res) => {
        setRatings(res);
      });
    });
  };

  useEffect(() => {
    if (authContext.isLoggedIn) {
      getUserContent();
    } else {
      setLoading(false);
    }
    return () => {};
  }, [reloadData, authContext.isLoggedIn, getUserContent]);

  const value = {
    contents,
    followContent,
    unfollowContent,
    ratings,
    rateRecipe,
    getUserRatings,
    getAverageRatings,
    setReloadData,
  };

  return (
    <UserSavedContentContext.Provider value={value}>
      {/* { !loading && children } */}
      {children}
    </UserSavedContentContext.Provider>
  );
};

export default UserSavedContentProvider;
