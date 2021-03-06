import styled from "styled-components";

export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 80px;

  @media(max-width: 680px){
    padding: 20px 40px;
  }

  @media(max-width: 580px){
    padding: 20px 20px;
  }

  @media(max-width: 500px){
    padding: 20px 0;
  }
`;
