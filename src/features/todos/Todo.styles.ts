import styled, { createGlobalStyle } from 'styled-components';
import { RxCrossCircled } from 'react-icons/rx';
import { MdKeyboardArrowDown } from 'react-icons/md';

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
  background-color: #f5f5f5;
  max-width: 600px;
  width: 100%;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: 300;
  color: #e6d9d8;
  margin: 0 0 20px 0;
`;

const InputContainer = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  position: relative;

  input {
    flex: 1;
    height: 100%;
    font-size: 1.2rem;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    box-sizing: border-box;
    padding-left: 73px;
  }

  button {
    position: absolute;
    right: 10px;
    top: 15px;
    margin-top: -20px;
    padding: 10px 20px;
    font-size: 0.7rem;
    border: none;
    background: none;
    color: #797979;
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease,
      border 0.3s ease, opacity 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-origin: center; /* Устанавливаем точку масштабирования в центр */
    &:hover {
      transform: scale(1.05); /* Увеличиваем кнопку при наведении */
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }
  }
`;

const Arrow = styled(MdKeyboardArrowDown)`
  position: absolute;
  left: 10px; /* Располагаем стрелочку слева от поля ввода */
  top: 50%;
  transform: translateY(-50%);
  color: grey;
  height: 30px;
  width: 30px;
  margin-left: 13px;
`;

const List = styled.div`
  width: 100%;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.6rem;
  color: #888;
  font-weight: 700;
  background-color: #ffffff;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  height: 25px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15), 0 10px 0 -5px #eee,
    0 10px 1px -4px rgba(0, 0, 0, 0.15), 0 20px 0 -10px #eee,
    0 20px 1px -9px rgba(0, 0, 0, 0.15);
  padding: 10px;
`;

const RemoveCompletedBtn = styled.button`
  background: none;
  border: none;
  font-size: 0.7rem;
  color: #797979;
  height: 30px;
  cursor: pointer;
  margin-left: 4px;
  transition: transform 0.3s, background-color 0.3s, border 0.3s, opacity 0.3s;

  &:hover {
    transform: scale(1.1);
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
`;

const Counter = styled.span`
  font-size: 0.7rem;
  color: #797979;
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  border: 1.5px solid
    ${({ $isActive }) => ($isActive ? '#e6d9d8' : 'transparent')};
  background-color: transparent;
  padding: 10px;
  color: #797979;
  font-size: 0.7rem;
  margin: 5px;
  cursor: pointer;
  border-radius: 4px;
  transition: transform 0.3s ease, background-color 0.3s ease,
    border-color 0.3s ease, opacity 0.3s ease;
  transform-origin: center;

  &:hover {
    transform: scale(1.05);
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Item = styled.div<{ $completed: boolean }>`
  display: flex;
  width: 100%;
  font-size: 1.2rem;
  flex-direction: row;
  border-bottom: 1px solid #ccc;
  padding-left: 20px;
  padding-right: 40px;
  box-sizing: border-box;
  background-color: ${({ $completed }) => ($completed ? '#e0e0e0' : '#fff')};
  display: flex;
  align-items: center;
  height: 60px;

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
  Arrow,
  List,
  Footer,
  RemoveCompletedBtn,
  Counter,
  FilterButton,
  Item,
  DeleteButton,
};
