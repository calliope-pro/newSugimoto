import { Box, Link, UnorderedList, ListItem, Stack, Text } from '@chakra-ui/react';

export const Footer = ({ email }: { email: string }) => {
  return (
    <Box bgColor='blackAlpha.600' mt={10} pt={5} pb={50}>
      <Stack
        mx='auto'
        maxW='container.xl'
        direction='row'
        justifyContent='space-between'
      >
        <Text fontSize={'2xl'}>株式会社○○</Text>
        <Text fontSize={'2xl'}>{email}</Text>
      </Stack>
      <Stack mx='auto' maxW='container.xl' direction='column'>
        <UnorderedList>
          <Link href='/terms'>
            <ListItem>プライバシーポリシー</ListItem>
          </Link>
        </UnorderedList>
      </Stack>
    </Box>
  );
};
