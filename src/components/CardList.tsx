import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { Fragment, useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE

  return (
    <>
      <div>
          {/* TODO CARD GRID */
            cards?.map(card => {
              return (
              <Fragment key={card.id}>
              <h1>{card.title}</h1>
              </Fragment>
              )
            })
          }
      </div>
      {/* TODO MODALVIEWIMAGE */}
    </>
  );
}
