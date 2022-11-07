import axios, { AxiosResponse } from 'axios';
import type { Post } from './api/post';
import Head from 'next/head';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Footer } from '../components/Footer';

const MainImage = ({ text }: { text: string }) => {
  return (
    <Box pos='relative'>
      <Box
        color='white'
        fontSize={56}
        pos='absolute'
        transform='translate(-50%,-50%)'
        top='30%'
        left='25%'
      >
        {text}
      </Box>
      <Image src='/a.webp' boxSize='100%' alt='参考画像' />
    </Box>
  );
};

type FormDataType = {
  name: string;
  email: string;
  text: string;
};

const Home = () => {
  const email = process.env.NEXT_PUBLIC_EMAIL as string;
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSWR<AxiosResponse<Post[]>>(
    '/api/post',
    async () => await axios.get('/api/post')
  );
  const posts = data?.data;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormDataType>({ mode: 'onChange' });

  async function onSubmit({ name, email, text }: FormDataType) {
    try {
      setIsLoading(true);
      reset();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box>
      <Head>
        <title>ホーム</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container maxW='container.xl' pb={10}>
        <Text fontSize='6xl'>タイトル</Text>
        <Text fontSize='5xl'>サブタイトル</Text>
      </Container>

      <MainImage text='○○'></MainImage>

      <Container maxW='container.xl' py={30}>
        <Stack direction='row' gap={25} justifyContent='center'>
          <Image
            display='block'
            src='/b.webp'
            boxSize='30%'
            alt='参考画像'
            rounded='80%'
          />
          <Image
            display='block'
            src='/b.webp'
            boxSize='30%'
            alt='参考画像'
            rounded='80%'
          />
          <Image
            display='block'
            src='/b.webp'
            boxSize='30%'
            alt='参考画像'
            rounded='80%'
          />
        </Stack>
        <Text fontSize='4xl' textAlign='center'>
          ​建設業に特化したマッチングサービス
        </Text>
      </Container>

      <Container maxW='container.xl'>
        <Box>
          <Heading>サービス紹介</Heading>
          <Divider mb={5} />
          <Text m={0}>
            【働きたい日・時間】と【働いて欲しい日・時間】をマッチングするサービスです。
          </Text>
          <Text m={0}>
            企業は来て欲しい時間や求めるスキルを指定するだけで、条件にあった働き手とマッチングします。規模や時間を問わず、あらゆる形で利用可能です。
          </Text>
        </Box>
        <Box>
          <Heading pt={15}>お知らせ</Heading>
          <Divider mb={5} />
          {(posts || []).map((post) => (
            <Box key={post.key}>
              <Link href={`/${post.key}`}>
                <Heading fontSize='2xl'>{post.title}</Heading>
              </Link>
              <Text fontSize='xl'>{post.subTitle}</Text>
              <Text>{post.body}</Text>
              <Text textAlign='right'>
                公開日: {post.publishedAt.split('T')[0]}
              </Text>
            </Box>
          ))}
        </Box>
      </Container>

      <Grid pt={15} pr={10} templateColumns='repeat(10, 1fr)' gap={10}>
        <GridItem colSpan={6}>
          <Image display='block' src='/c.webp' boxSize='100%' alt='参考画像' />
        </GridItem>
        <GridItem colSpan={3}>
          <Stack whiteSpace='pre'>
            <Heading mt={5} mb={10} fontWeight={500} fontSize={45}>
              会社概要
            </Heading>
            <Text fontSize={20}>企業名: ○○</Text>
            <Text fontSize={20}>代表者: ○○</Text>
            <Text fontSize={20}>事業内容: ○○</Text>
            <Text fontSize={20}>所在地: ○○</Text>
          </Stack>
        </GridItem>
      </Grid>

      <Container maxW='container.xl' pt={15}>
        <Heading fontSize={40}>お問い合わせ</Heading>
        <Divider mb={5} />
        <Text mb={5}>
          ご不明点等ございましたら以下のフォームまたは
          <Link color='teal.500' href={`mailto:${email}`}>
            こちらのメール
          </Link>
          ({email}) にてお気軽にご連絡ください。
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.name && true}>
            <FormLabel htmlFor='name'>お名前</FormLabel>
            <Input
              id='name'
              placeholder='田中太郎'
              {...register('name', { required: '必須項目です' })}
            />
            <FormErrorMessage>
              {errors.name && (errors.name.message as string)}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email && true}>
            <FormLabel htmlFor='email'>メールアドレス</FormLabel>
            <Input
              id='email'
              placeholder='email@sample.com'
              type='email'
              {...register('email', {
                required: '必須項目です',
                pattern: {
                  value:
                    /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*.)+[a-zA-Z]{2,}$/,
                  message: '書式が正しくありません',
                },
              })}
            />
            <FormErrorMessage>
              {errors.email && (errors.email.message as string)}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.text && true}>
            <FormLabel htmlFor='text'>お問い合わせ内容</FormLabel>
            <Textarea
              id='text'
              placeholder='ご不明な点等をご記入ください。'
              resize='none'
              {...register('text', { required: '必須項目です' })}
            />
            <FormErrorMessage>
              {errors.text && (errors.text.message as string)}
            </FormErrorMessage>
          </FormControl>
          <Stack textAlign='center' mt={5}>
            <Button type='submit' w='70%' mx='auto'>
              {isLoading ? '送信中です・・・' : '送信する'}
            </Button>
          </Stack>
        </form>
      </Container>

      <Footer email={email} />
    </Box>
  );
};

export default Home;

