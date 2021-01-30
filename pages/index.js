import React from 'react';
import { useRouter } from 'next/router';
import db from '../db.json';
import { motion } from 'framer-motion';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';

import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <Widget
            as={motion.section}
            variants={{
              show: { opacity: 1, x: '0' },
              hidden: { opacity: 0, x: '-100%'}
            }}
            transition={{ delay: 0.5, duration: 1}}
            initial="hidden"
            animate="show"
          >
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <form onSubmit={function (event) {
                event.preventDefault();
                router.push(
                  {
                    pathname: '/quiz',
                    query: {
                      name: `${name}`,
                    },
                  },
                );
              }}
              >
                <Input
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Digita seu nome ai.."
                  name="nomeDoUsuario"
                  value={name}
                />
                <Button
                  type="submit"
                  disabled={name.length === 0}
                >
                  {`Jogar ${name}`}
                </Button>
              </form>
            </Widget.Content>
          </Widget>

          <Widget
            as={motion.section}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0}
            }}
            transition={{ delay: 1, duration: 2}}
            initial="hidden"
            animate="show"
          >
            <Widget.Content>
              <h1>Quizes da Galera</h1>
              <ul>
                {db.external.map((linkExterno, index) => {
                  const [projectName, githubUser] = linkExterno
                    .replace(/\//g, '')
                    .replace('https:', '')
                    .replace('.vercel.app', '')
                    .split('.');
                  return (
                    <li
                    key={index}
                    >
                      <Widget.Topic
                        as={Link}
                        href={`quiz/${projectName}___${githubUser}`}>
                        {`${projectName}/${githubUser}`}
                      </Widget.Topic>
                    </li>
                  );
                })}
              </ul>
            </Widget.Content>
          </Widget>
          <Footer 
            as={motion.section}
            variants={{
              show: { opacity: 1, y: '0'},
              hidden: { opacity: 0, y: '100%'}
            }}
            transition={{ delay: 1, duration: 2}}
            initial="hidden"
            animate="show"
          />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/Mateusdeli" />
      </QuizBackground>
    </>
  );
}
