import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Comment from "../../components/Comment";
import "./style.css";

const About = () => {
  const location = useLocation();
  const { news } = location.state || {};
  const navigate = useNavigate();
  const [comments, setComments] = useState<number[]>([]);
  const [textArea, setTextArea] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [userComments, setUserComments] = useState<
    { id: number; name: string; comment: string }[]
  >([]);
  const [editCommentIndex, setEditCommentIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (news?.kids && Array.isArray(news.kids)) {
          setComments(news.kids);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (news && news.kids?.length > 0) {
      fetchData();
    }
  }, [news]);

  const handlePostComment = () => {
    if (!name.trim() || !comment.trim()) {
      alert("Both name and comment are required.");
      return;
    }

    if (editCommentIndex !== null) {
      const updatedComments = [...userComments];
      updatedComments[editCommentIndex] = {
        id: news?.id ?? 0,
        name: name,
        comment: comment,
      };
      setUserComments(updatedComments);
      setEditCommentIndex(null);
    } else {
      const newComment = {
        id: news?.id ?? 0,
        name: name,
        comment: comment,
      };
      setUserComments((prevComments) => [...prevComments, newComment]);
    }

    setTextArea(false);
    setName("");
    setComment("");
  };

  const handleEditComment = (index: number) => {
    setName(userComments[index].name);
    setComment(userComments[index].comment);
    setEditCommentIndex(index);
    setTextArea(true);
  };

  const handleDeleteComment = (index: number) => {
    const updatedComments = userComments.filter((_, i) => i !== index);
    setUserComments(updatedComments);
  };

  return (
    <div>
      <div className="about__conatiner">
        <button className="about__btn" onClick={() => navigate(-1)}>
          Back
        </button>
        <h2>{news?.by}</h2>
        <p>{new Date(news?.time * 1000).toLocaleString()}</p>
      </div>
      <h2 className="about__title">{news?.title}</h2>
      <div
        className="comment_subtitle"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Comments: {`${news?.descendants + userComments.length}`}</h3>
        <button onClick={() => setTextArea(!textArea)}>Add comment</button>
      </div>
      {textArea && (
        <div className="textArea_container">
          <textarea
            className="name__textArea"
            placeholder="Enter your first and last name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></textarea>
          <textarea
            className="comment__textArea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            style={{
              width: "200px",
            }}
            onClick={handlePostComment}
          >
            {editCommentIndex !== null ? "Update comment" : "Post comment"}
          </button>
        </div>
      )}
      {comments.length > 0 || userComments.length > 0 ? (
        <>
          {userComments.length > 0 && (
            <div>
              {userComments.map((userComment, index) => (
                <div key={index} className="comment__container">
                  <h3>{userComment.name}</h3>
                  <p>{userComment.comment}</p>
                  <div className="" style={{ display: "flex", gap: "20px" }}>
                    <button onClick={() => handleEditComment(index)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteComment(index)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {comments.map((id) => (
            <Comment key={id} id={id} />
          ))}
        </>
      ) : (
        <p className="no__comments">No comments</p>
      )}
    </div>
  );
};

export default About;
