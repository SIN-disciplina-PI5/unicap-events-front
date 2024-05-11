import styled from "styled-components";

export const Container = styled.div`
    margin: 20px 20px;
    background-color: white;
    border-radius: 10px;
`;

export const TitlePage = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

export const Title = styled.h1`
    margin: 0;
    font-size: 18px;
    font-weight: 500;
`;

export const ButtonWrapper = styled.div`
    margin-left: auto;
    
    @media screen and (max-width: 768px) {
        span {
            display: none;
        }
    }
`;

export const Main = styled.div`
      flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 85vh;
  margin-top: 10px;
  border-radius: 10px;
  background-color: white;
`;

export const MainHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  margin-top: 10px;
  border-radius: 10px;
  background-color: white;
`

export const TitlePageHome = styled.h1`
  font-size: 30px;
`;