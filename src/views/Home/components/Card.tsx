import React from 'react';
import styled from 'styled-components';
import { GamemodePackage } from '../index';

interface CardProps {
  thumbnail: string;
}

const Card = styled.div<CardProps>`
  padding: 16px;
  background-color: grey;
  background-image: url("${(props) => props.thumbnail}");
  background-size: cover;
  border-radius: 16px;
  width: 250px;
  height: 250px;
  box-shadow: 5px 5px 30px rgb(0 0 0 / 40%);
`;

interface Props {
  gamemode: GamemodePackage;
}

function MenuCard(props: Props) {
  const { gamemode } = props;
  return (
    <Card thumbnail={gamemode.thumb}>
      hello world
    </Card>
  );
}

export default MenuCard;
