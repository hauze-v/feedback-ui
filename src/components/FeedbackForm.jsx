import Card from './shared/Card';
import { useState, useContext, useEffect } from "react";
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';

export default function FeedbackForm() {
  const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  // Takes in an array of dependencies which, basically is a list of items which
  // when changed, will trigger the useEffect function to run again.  If the array
  // is empty, the useEffect function will only run once when the component is mounted
  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit])

  const handleTextChange = (event) => {
    if (text === '') {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== '' && text.trim().length < 10) {
      setBtnDisabled(true);
      setMessage('Your review must be at least 10 characters long');
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }

    setText(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating
      }

      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }
      setText('');
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input type="text" 
                 placeholder="Write a review"
                 onChange={handleTextChange}
                 value={text} />
          <Button type="submit" isDisabled={btnDisabled}>Send</Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}