import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import { IStory } from "../../types/news.types";
import { useNews } from "../../redux/news";
import "./style.css";

export const Home = () => {
  const [newsList, setNewsList] = useState<IStory[]>([]);
  const { getNewNewsList, newNewsList } = useNews();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(newNewsList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    getNewNewsList();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const currentItems = newNewsList.slice(
          indexOfFirstItem,
          indexOfLastItem
        );
        const newsData = currentItems.map(async (id: string) => {
          const getNewsData = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          );
          return getNewsData.data;
        });

        const allNews = await Promise.all(newsData);
        setNewsList(allNews);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (newNewsList.length > 0) {
      fetchData();
    }
  }, [newNewsList, currentPage]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("ru-RU");
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleRefresh = () => {
    getNewNewsList();
  };

  return (
    <>
      <h1 className="title">News</h1>
      <button className="refresh-button" onClick={handleRefresh}>
        Refresh News
      </button>
      {isLoading ? (
        <h3 style={{ textAlign: "center" }}>Loading...</h3>
      ) : (
        <div className="container">
          {!newsList.length ? (
            <h3 style={{ textAlign: "center" }}>No news available</h3>
          ) : (
            newsList.map((news) => (
              <div className="news__container" key={news.id}>
                <div className="left__inner-container">
                  <h3>{news.by}</h3>
                  <p>{formatDate(news.time)}</p>
                </div>
                <div className="right__inner-container">
                  <h4>{news.title}</h4>
                  <Link
                    className="home__link"
                    to={`/about/${news.id}`}
                    state={{ news }}
                  >
                    detail
                  </Link>
                </div>
              </div>
            ))
          )}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};
