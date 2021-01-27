import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <Widget>
            <Widget.Header>
              <h1>Combat Arms</h1>
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
                <Widget.Input
                  placeholder="Digita seu nome ai.."
                  onChange={(event) => {
									  setName(event.target.value);
                  }}
                />
                <Widget.Button type="submit" disabled={name.length === 0 ? 'disabled' : ''}>
                  Jogar
                </Widget.Button>
              </form>
            </Widget.Content>
          </Widget>

          <Widget>
            <Widget.Header>
              <h1>Quizes da Galera</h1>
            </Widget.Header>
            <Widget.Content>
              <p>Lorem ipsun dolor sit amet...</p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/Mateusdeli" />
      </QuizBackground>
    </>
  );
}
