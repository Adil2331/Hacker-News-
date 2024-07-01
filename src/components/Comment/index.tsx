import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

interface CommentProps {
  id: number;
}

const fetchComment = async (id: number) => {
  const response = await axios.get(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  );
  return response.data;
};

const Comment = ({ id }: CommentProps) => {
  const [comment, setComment] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentData = await fetchComment(id);
        setComment(commentData);
      } catch (error) {
        console.error("Error fetching comment:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!comment) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  return (
    <>
      {comment.by && (
        <div className="comment__container">
          <div className="cooment__container-inner">
            <h3>{comment.by}</h3>
            <p>{new Date(comment?.time * 1000).toLocaleString()}</p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
          <div>
            {comment.kids?.map((kidId: number) => (
              <Comment key={kidId} id={kidId} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
