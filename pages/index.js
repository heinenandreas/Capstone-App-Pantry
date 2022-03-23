//import Head from "next/head";
//import Image from "next/image";
import styled from "styled-components";
//import styles from "../styles/Home.module.css";
import { itemlist } from "../itemlist";
//import { Itemlist } from "../components/Itemlist";

export default function Home() {
  return (
    <DeviceContainer>
      <StyledList>
        {itemlist.map((item) => {
          return (
            <StyledItem key={item.id}>
              <StyledListName>{item.name}</StyledListName>
              <StyledListUnit>{item.unit}</StyledListUnit>
              <StyledListActualAmount>
                {item.actualAmount}
              </StyledListActualAmount>
            </StyledItem>
          );
        })}
      </StyledList>
    </DeviceContainer>
  );
}

/* Device-Container, remove later */
const DeviceContainer = styled.div`
  width: 375px;
  height: 812px;
  border: 2px solid black;
  border-radius: 15px;
`;

/* Style for Itemlist*/

const StyledList = styled.div`
  height: auto;
  width: 342px;
  border: 2px solid #2d2861;
  border-radius: 0 0 22px 0;
`;

const StyledItem = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const StyledListName = styled.p`
  color: darkblue;
  font-size: 20px;
`;

const StyledListUnit = styled.p`
  color: darkblue;
  font-size: 16px;
`;
const StyledListActualAmount = styled.p`
  color: --darkblue;
  font-size: 40px;
`;
