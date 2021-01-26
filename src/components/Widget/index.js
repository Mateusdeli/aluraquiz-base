import styled from 'styled-components';

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: .5px solid #B06523;
  background-color: #1C1814;
  border-radius: 4px;
  overflow: hidden;

  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};

  * {
    margin: 0;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;
  & > *::first-child {
    margin-top: 0;
  }
  & > *::last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;

Widget.Input = styled.input`
  padding: 10px;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 0 0;
  outline: 0;
  color: #ffffff;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary};
`;

Widget.Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  outline: none;
  border: none;
  height: 100%;
  color: #ffffff;
  border-radius: 3px;
  padding: 10px;
  width: 100%;
  margin-top: 20px;
`;

export default Widget;
