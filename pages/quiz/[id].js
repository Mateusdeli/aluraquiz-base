import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';
import db from '../../db.json';

export default function QuizDaGalera({ dbQuiz }) {
  return (
    <ThemeProvider theme={dbQuiz.theme}>
      <QuizScreen
        dbQuiz={dbQuiz}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  console.log(context.res);
  const [projectName, githubUser] = context.query.id.split('___');
  try {
    const dbQuiz = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw new Error('Erro ao pegar quiz externo');
      })
      .then((data) => data.json())
      .catch((err) => {
        console.log(err);
      });

    return {
      props: {
        dbQuiz,
      },
    };
  } catch (err) {
    console.log(err);
  }
}
