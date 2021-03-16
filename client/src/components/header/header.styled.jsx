import styled, {css} from "styled-components";
import {Link} from "react-router-dom";

const OptionContainerStyles = css`
  padding: 10px 15px;
  cursor: pointer;
`;

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  @media(max-width: 400px){
    flex-direction: column;
    height: 140px;
    margin-bottom: 5px;
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 10px;

  @media(max-width: 400px){
    width: 100%;
    text-align: center;
  }
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media(max-width: 400px){
    width: 100%;
  }
`;

export const OptionLink = styled(Link)`
  ${OptionContainerStyles}
`;
