import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  max-width: 600px;
  width: 100%;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: 300;
  color: black;
  margin: 0 0 20px 0;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  input {
    flex: 1;
    padding: 10px;
    font-size: 1.2rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;
    margin-right: 10px;
    width: 80%; /* Делаем поле ввода шире */
  }
  button {
    padding: 10px 20px;
    font-size: 1.2rem;
    border: none;
    border-radius: 4px;
    background-color: #61dafb; /* Синий цвет кнопки */
    color: white;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
      background-color: #21a1f1; /* Темно-синий цвет при наведении */
      color: #fff; /* Изменяем цвет текста при наведении */
    }
  }
`;

export const List = styled.div`
  width: 100%;
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #888;
  font-weight: 700;

  button {
    background: none;
    border: none;
    font-size: 0.9rem;
    color: #61dafb; /* Blue link color */
    cursor: pointer;
    padding: 5px;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: blue; /* Darker blue on hover */
    }
  }
`;

export const Counter = styled.span`
  font-size: 1rem;
  color: #333;
`;

export const FilterButton = styled.button<{ isActive: boolean }>`
  background: none;
  border: ${({ isActive }) => (isActive ? '2px solid #61dafb' : 'none')};
  font-size: 0.9rem;
  color: ${({ isActive }) => (isActive ? '#61dafb' : '#888')};
  cursor: pointer;
  padding: 5px;
  transition: color 0.2s ease-in-out, border 0.2s ease-in-out;

  &:hover {
    color: #21a1f1; /* Darker blue on hover */
  }
`;

export const Item = styled.div<{ $completed: boolean }>`
  display: flex;
  width: 100%;
  font-size: 1.2rem;
  flex-direction: row;
  border: 1px solid #ccc;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${({ $completed }) => ($completed ? '#e0e0e0' : '#fff')};
  display: flex;
  align-items: center;
  height: 80px;
  input[type='checkbox'] {
    width: 30px;
    height: 30px;
    margin-right: 20px;
    cursor: pointer;
    appearance: none;
    border: 2px solid grey;
    border-radius: 50%; 
    position: relative;
    outline: none;
    transition: border-color 0.3s, background-color 0.3s;

    &:checked {
      border-color: #13ff18;
    }

    &:checked::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 6px;
      height: 12px;
      border: solid #13ff18;
      border-width: 0 2px 2px 0;
      transform: translate(-50%, -50%) rotate(45deg);
      transform-origin: center; 
    }
  }

  p {
    flex: 1;
    margin: 0;
    padding-right: 20px;
    text-decoration: ${({ $completed }) =>
      $completed ? 'line-through' : 'none'};
    color: ${({ $completed }) => ($completed ? 'grey' : 'black')};
  }

  button {
    background-color: #ff6b6b;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #ff4b4b;
    }
  }
`;
