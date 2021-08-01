import { SimpleGrid, Flex, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
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
  const { onOpen, isOpen, onClose } = useDisclosure();
  // TODO SELECTED IMAGE URL STATE
  const [urlImage, setUrlImage] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handlerOpenImage(url: string) {
    setUrlImage(url);
    onOpen();
  }

  return (
    <>
      <Flex w="100%" maxW={1160} mx="auto" flexDirection="column">
        <SimpleGrid
          flex="1"
          minChildWidth="293px"
          gap="40px"
        >
          {/* TODO CARD GRID */

            cards?.map(card => {
              return (
                <SimpleGrid flex="1"  key={card.id}  >
                <Card data={card} viewImage={handlerOpenImage} />
                </SimpleGrid>
              )
            })
          }
        </SimpleGrid>
      </Flex>
      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={urlImage}/>
    </>
  );
}
