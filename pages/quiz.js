import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import db from '../db.json';
import Widget from '../src/components/Widget';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import LoadingBase from '../src/components/Loading';

const SCREEN_STATES = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

const QUIZ_STATES = {
  WIN: 'WIN',
  LOSE: 'LOSE',
  ANSWERING: 'ANSWERING',
  FINISH: 'FINISH',
};

function LoadingScreen() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        <LoadingBase />
      </Widget.Content>
    </Widget>
  );
}

function QuestionFinished() {
  const router = useRouter();
  return (
    <Widget>
      <Widget.Content>
        <p>Parabéns você acertou todas as questões!</p>
        <Button
          onClick={() => router.push({ pathname: '/' })}
          type="submit"
        >
          Voltar ao Inicio
        </Button>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWinner({ handleNextQuestion }) {
  return (
    <Widget>
      <Widget.Content>
        <p>Parabéns você certou a pergunta!</p>
        <Button
          onClick={handleNextQuestion}
          type="submit"
        >
          Confirmar
        </Button>
      </Widget.Content>
    </Widget>
  );
}

function QuestionLose({ handleResetQuestion }) {
  return (
    <Widget>
      <Widget.Content>
        <p>Você não acertou, deseja tentar novamente?</p>
        <Button
          onClick={handleResetQuestion}
          type="submit"
        >
          Tentar Novamente
        </Button>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  handleSubmitQuiz,
  resultQuizState,
  setResponseQuestion,
  question, questionId,
  totalQuestions,
}) {
  return (
    <Widget>
      <Widget.Header>
        <h1>
          {`Pergunta ${questionId + 1} de ${totalQuestions}`}
        </h1>
      </Widget.Header>
      <Widget.Content>
        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src={question.image}
        />
      </Widget.Content>
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        {resultQuizState === QUIZ_STATES.ANSWERING && (
          <form onSubmit={handleSubmitQuiz}>
            {question.alternatives.map((alternative, index) => {
              const alternativeId = `alternative__${index}`;
              return (
                <Widget.Topic
                  as="label"
                  key={alternativeId}
                  htmlFor={alternativeId}
                >
                  <Widget.Topic.Alternative
                    onChange={(event) => {
                      setResponseQuestion(event.target.value);
                    }}
                    name={questionId}
                    id={alternativeId}
                    value={index}
                    type="radio"
                  />
                  { alternative }
                </Widget.Topic>
              );
            })}
            <Button
              type="submit"
            >
              Confirmar
            </Button>
          </form>
        )}

      </Widget.Content>
    </Widget>
  );
}

QuestionWinner.propTypes = {
  handleNextQuestion: PropTypes.func.isRequired,
};

QuestionLose.propTypes = {
  handleResetQuestion: PropTypes.func.isRequired,
};

QuestionWidget.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object.isRequired,
  handleSubmitQuiz: PropTypes.func.isRequired,
  resultQuizState: PropTypes.string.isRequired,
  setResponseQuestion: PropTypes.func.isRequired,
  questionId: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};

export default function Quiz() {
  const [screenState, setScreenState] = React.useState(SCREEN_STATES.LOADING);
  const [resultQuizState, setResultQuizState] = React.useState(QUIZ_STATES.ANSWERING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [responseQuestion, setResponseQuestion] = React.useState(0);
  const [countQuestionAnswered, setCountQuestionAnswered] = React.useState(1);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(SCREEN_STATES.QUIZ);
    }, 1 * 1100);
  }, []);

  function handleSubmitQuiz(event) {
    event.preventDefault();

    if (responseQuestion == question.answer) {
      setResultQuizState(QUIZ_STATES.WIN);
      return;
    }

    setResultQuizState(QUIZ_STATES.LOSE);
  }

  function handleResetQuestion() {
    setResultQuizState(QUIZ_STATES.ANSWERING);
  }

  function handleNextQuestion() {
    setCountQuestionAnswered(countQuestionAnswered + 1);

    if (countQuestionAnswered === totalQuestions) {
      setResultQuizState(QUIZ_STATES.FINISH);
      return;
    }

    setCurrentQuestion(questionIndex + 1);
    setResultQuizState(QUIZ_STATES.ANSWERING);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        {screenState === SCREEN_STATES.QUIZ && (
        <QuestionWidget
          handleSubmitQuiz={handleSubmitQuiz}
          question={question}
          totalQuestions={totalQuestions}
          resultQuizState={resultQuizState}
          questionId={questionIndex}
          handleNextQuestion={handleNextQuestion}
          setResponseQuestion={setResponseQuestion}
        />
        )}

        {resultQuizState === QUIZ_STATES.WIN
          && <QuestionWinner handleNextQuestion={handleNextQuestion} />}

        {resultQuizState === QUIZ_STATES.LOSE
        && (<QuestionLose handleResetQuestion={handleResetQuestion} />)}

        {resultQuizState === QUIZ_STATES.FINISH && <QuestionFinished />}

        {screenState === SCREEN_STATES.LOADING && <LoadingScreen />}

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Mateusdeli" />
    </QuizBackground>
  );
}
