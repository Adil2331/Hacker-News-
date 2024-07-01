import { useDispatch, useSelector } from "../../hooks";
import { newNewsList } from "./thunk/newNewsList";

export const useNews = () => {
  const dispatch = useDispatch();
  const getNewNewsList = () => dispatch(newNewsList());

  return {
    isLoading: useSelector(({ news }) => news.isLoading),
    newNewsList: useSelector(({ news }) => news.newNewsList),
    getNewNewsList,
  };
};
