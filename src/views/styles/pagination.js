import styled from 'styled-components';

export const PaginationButton = styled.button`
  background: none;
  border: none;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  svg {
    padding: 5px;
  }
`;
