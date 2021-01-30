import QuizScreen from '../../src/screens/Quiz';
import db from '../../db.json';

export default function Quiz() {
  return (
      <QuizScreen dbQuiz={db}  />
  );
}
