import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'Literally the best service I have ever received!',
      rating: 10
    },
    {
      id: 2,
      text: 'I am so happy with my purchase. I will definitely be buying more work from you in the future!',
      rating: 9
    },
    {
      id: 3,
      text: 'It was meh...',
      rating: 5
    }
  ]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  });

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      const newFeedback = feedback.filter((item) => item.id !== id);
      setFeedback(newFeedback);
    }
  }

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true });
  }

  const updateFeedback = (id, updatedItem) => {
    setFeedback(feedback.map((item) => item.id === id ? updatedItem : item));
  }

  return (
    <FeedbackContext.Provider value={{
      feedback,
      feedbackEdit,
      deleteFeedback,
      addFeedback,
      editFeedback,
      updateFeedback
    }}>
      {children}
    </FeedbackContext.Provider>
  );
}

export default FeedbackContext;