import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

//COMPONENTS
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

//UTILS
import { CallImages } from '../utils/callimages';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    ({ pageParam = null }) => CallImages(pageParam)
    ,
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: (lastPage, pages) => lastPage.data.after,//console.log(lastPage, pages),
    }
  );

  const formattedData: Card[] = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    const value = data?.pages.map(group => {
      const filter = group.data.data.map(date => {
        return date;
      });
      return filter;
    })
    return value?.flat();
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) {
    return (
      <Loading />
    )
  }
  // TODO RENDER ERROR SCREEN
  if (isError) {
    return (
      <Error />
    )
  }

  return (
    <>
      <Header />
      <Box maxW={1120} px={[5, 20]} mx="auto" my={[10, 20]}>
        {<CardList cards={formattedData} />}
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        {
          (hasNextPage || isFetchingNextPage) &&
          <Button onClick={() => fetchNextPage()} maxWidth="134px" marginTop="40px">
            {
              isFetchingNextPage
                ? 'Carregando...'
                : 'Carregar mais'
            }
          </Button>
        }
      </Box>
    </>
  );
}
