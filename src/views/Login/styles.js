import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginArea = styled.div`
  margin-top: 100px;
  display: flex;
  max-width: 500px;
  background: #fff;
  flex-direction: column;
  flex: 1;
  border-radius: 4px;
  padding: 20px 20px 40px;

  div {
    display: flex;
    padding: 15px;
    justify-content: center;
  }

  h3 {
    color: #ccc;
    font-size: 24px;
    text-transform: uppercase;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 15px;

  button {
    cursor: pointer;
    background: #bc4270;
    width: 300px;
    height: 40px;
    color: #fff;
    text-transform: uppercase;
    border-radius: 50px;
    border: 0;
    transition: background 0.3s;

    &:hover {
      background: ${darken(0.1, '#bc4270')};
    }
  }
`;

export const LoginInput = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 25px;
  width: 300px;
  transition: border-left 0.3s;
  border-radius: 3px;
  box-shadow: 1px 5px 17px 0px #0000002e;

  &:hover {
    border-left: 3px solid #8e3b6f;
    transition: 0.3s;
  }

  & + div {
    margin-top: 20px;
  }

  > span {
    align-self: flex-start;
    text-transform: uppercase;
    color: #666;
    font-size: 10px;
  }

  > input {
    display: flex;
    margin-top: 5px;
    align-self: flex-start;
    height: 30px;
    width: 100%;
    border: 0;
  }
`;

export const RememberPassword = styled.div`
  display: flex;
  margin-bottom: 10px;

  label {
    display: flex;

    > input {
      margin-right: 10px;
      padding: 0 5px;

      &::placeholder {
        padding: 0 5px;
      }
    }

    > strong {
      display: flex;
      color: #666;
      font-size: 12px;
    }
  }
`;
