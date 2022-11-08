import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { AiFillHome } from 'react-icons/ai';
import useSWR from 'swr';
import {
  Box,
  Container,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';

import { Post } from './api/post';
import { Footer } from '../components/Footer';

const Home = () => {
  const router = useRouter();
  const { data, error } = useSWR<AxiosResponse<Post[]>>(
    '/api/post',
    async () => await axios.get('/api/post')
  );
  const post = (data?.data ?? []).find(
    ({ key }) => key === router.query.post_key
  );
  if (!data && !error) return <>Loading...</>;
  else if (!post) return <>Not Found</>;
  return (
    <Stack minH='100vh' justifyContent='space-between'>
      <Container py={5}>
        <Text fontSize='6xl'>{post.title}</Text>
        <Text fontSize='5xl'>{post.subTitle}</Text>
        <Text textAlign='right'>{post.publishedAt.split('T')[0]}</Text>
        <Text fontSize='2xl'>{post.body}</Text>
      </Container>
      <Box textAlign='center'>
        <Link href='/'>
          <IconButton
            aria-label='go back'
            size='lg'
            icon={<Icon fontSize={40} href='/' as={AiFillHome} />}
          />
        </Link>
      </Box>
      <Footer email={process.env.NEXT_PUBLIC_EMAIL as string} />
    </Stack>
  );
};

export default Home;
