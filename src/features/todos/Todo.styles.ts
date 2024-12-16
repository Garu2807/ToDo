import styled, { createGlobalStyle } from 'styled-components';
import { RxCrossCircled } from 'react-icons/rx';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #f0f2f5;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  max-width: 600px;
  width: 100%;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: 300;
  color: #333;
  margin: 0 0 20px 0;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  input {
    flex: 1;
    padding: 10px;
    font-size: 1.2rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;
    margin-right: 10px;
    width: 80%;
  }
`;

const AddTodoBtn = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: #0056b3;
    color: #fff;
  }
`;

const List = styled.div`
  width: 100%;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #888;
  font-weight: 700;
  margin-top: 20px;
`;

const RemoveCompletedBtn = styled.button`
  background: none;
  border: none;
  font-size: 0.9rem;
  color: #007bff;
  cursor: pointer;
  padding: 5px;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #0056b3;
  }
`;

const Counter = styled.span`
  font-size: 1rem;
  color: #333;
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  background-color: ${({ $isActive }) => ($isActive ? '#007bff' : '#e0e0e0')};
  color: ${({ $isActive }) => ($isActive ? 'white' : '#333')};
  border: none;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? '#0056b3' : '#c0c0c0')};
  }
`;

const Item = styled.div<{ $completed: boolean }>`
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
  margin-bottom: 10px;
  border-radius: 4px;
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

const DeleteButton = styled(RxCrossCircled)`
  background-color: transparent;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  color: #ff6b6b;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s, transform 0.3s;

  &:hover {
    background-color: #ff6b6b;
    color: white;
    transform: scale(1.2);
  }
`;
export {
  GlobalStyle,
  Container,
  Header,
  InputContainer,
  AddTodoBtn,
  List,
  Footer,
  RemoveCompletedBtn,
  Counter,
  FilterButton,
  Item,
  DeleteButton,
};
