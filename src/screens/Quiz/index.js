import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Widget from '../../components/Widget';
import GitHubCorner from '../../components/GitHubCorner';
import QuizBackground from '../../components/QuizBackground';
import Button from '../../components/Button';
import QuizContainer from '../../components/QuizContainer';
import LoadingBase from '../../components/Loading';
import AlternativesForm from '../../components/AlternativesForm';

const SCREEN_STATES = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

const QUIZ_STATES = {
  WIN: 'WIN',
  LOSE: 'LOSE',
  ANSWERING: 'ANSWERING',
};

function ResultWidget({ results }) {
  const router = useRouter();
  return (
    <Widget>
      <Widget.Header>
        Resultados
      </Widget.Header>
      <Widget.Content>
        <p>
          Parabéns,
          {' '}
          {router.query.name}
          {' '}
          <br />
          <br />
          <strong>
            Você fez
            {' '}
            {results.reduce((somatoriaAtual, result) => {
              const isAcerto = result === true;
              return isAcerto ? somatoriaAtual + 1 : somatoriaAtual;
            }, 0)}
            {' '}
            pontos.
          </strong>
        </p>
        <ul>
          {results.map((result, index) => (
            <li
              key={index}
            >
              #Pergunta
              {' '}
              {index + 1}
              {' '}
              {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
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

function QuestionWinner({ handleNextQuestion }) {
  return (
    <Widget>
      <Widget.Content>
        <p>Parabéns você acertou a pergunta!</p>
        <Button
          onClick={handleNextQuestion}
          type="submit"
        >
          Proxima
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
  question,
  hasQuestionSelectioned,
  questionId,
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
          <AlternativesForm onSubmit={handleSubmitQuiz}>
            {question.alternatives.map((alternative, index) => {
              const alternativeId = `alternative__${index}`;
              const [questionCurrent, setQuestionCurrent] = React.useState(undefined);
              const result = question.answer == questionCurrent ? 'SUCCESS' : 'ERROR';
              return (
                <Widget.Topic
                  as="label"
                  key={alternativeId}
                  data-selected={question.answer == questionCurrent}
                  data-status = {result}
                  htmlFor={alternativeId}
                >
                  <Widget.Topic.Alternative
                    onChange={() => {
                      setQuestionCurrent(index);
                      setResponseQuestion(index);
                    }}
                    name={questionId}
                    id={alternativeId}
                    type="radio"
                  />
                  { alternative }
                </Widget.Topic>
              );
            })}
            <Button
              type="submit"
              disabled={hasQuestionSelectioned}
            >
              Confirmar
            </Button>
          </AlternativesForm>
        )}

      </Widget.Content>
    </Widget>
  );
}

ResultWidget.propTypes = {
  results: PropTypes.array.isRequired,
};

QuestionWinner.propTypes = {
  handleNextQuestion: PropTypes.func.isRequired,
};

QuestionLose.propTypes = {
  handleResetQuestion: PropTypes.func.isRequired,
};

QuestionWidget.propTypes = {
  hasQuestionSelectioned: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object.isRequired,
  handleSubmitQuiz: PropTypes.func.isRequired,
  resultQuizState: PropTypes.string.isRequired,
  setResponseQuestion: PropTypes.func.isRequired,
  questionId: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};

export default function Quiz({ dbQuiz }) {
  const [screenState, setScreenState] = React.useState(SCREEN_STATES.LOADING);
  const [resultQuizState, setResultQuizState] = React.useState(QUIZ_STATES.ANSWERING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = dbQuiz.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [responseQuestion, setResponseQuestion] = React.useState(undefined);
  const [countQuestionAnswered, setCountQuestionAnswered] = React.useState(1);
  const questionIndex = currentQuestion;
  const question = dbQuiz.questions[questionIndex];
  const hasQuestionSelectioned = responseQuestion === undefined;

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(SCREEN_STATES.QUIZ);
    }, 1 * 1100);
  }, []);

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  function handleSubmitQuiz(event) {
    event.preventDefault();
    if (responseQuestion == question.answer) {
      addResult(true);
      setResultQuizState(QUIZ_STATES.WIN);
      return;
    }
    addResult(false);
    setResultQuizState(QUIZ_STATES.LOSE);
  }

  function handleResetQuestion() {
    setResultQuizState(QUIZ_STATES.ANSWERING);
  }

  function handleNextQuestion() {
    if (countQuestionAnswered === totalQuestions) {
      setResultQuizState(QUIZ_STATES.ANSWERING);
      setScreenState(SCREEN_STATES.RESULT);
      return;
    }

    setCountQuestionAnswered(countQuestionAnswered + 1);
    setCurrentQuestion(questionIndex + 1);
    setResultQuizState(QUIZ_STATES.ANSWERING);
  }

  return (
    <QuizBackground backgroundImage={dbQuiz.bg}>
      <QuizContainer>
        {screenState === SCREEN_STATES.QUIZ && (
        <QuestionWidget
          handleSubmitQuiz={handleSubmitQuiz}
          question={question}
          totalQuestions={totalQuestions}
          resultQuizState={resultQuizState}
          questionId={questionIndex}
          hasQuestionSelectioned={hasQuestionSelectioned}
          handleNextQuestion={handleNextQuestion}
          setResponseQuestion={setResponseQuestion}
        />
        )}

        {resultQuizState === QUIZ_STATES.WIN
          && <QuestionWinner handleNextQuestion={handleNextQuestion} />}

        {resultQuizState === QUIZ_STATES.LOSE
        && (<QuestionLose handleResetQuestion={handleResetQuestion} />)}

        {screenState === SCREEN_STATES.LOADING && <LoadingScreen />}

        {screenState === SCREEN_STATES.RESULT && <ResultWidget results={results} />}

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Mateusdeli" />
    </QuizBackground>
  );
}
