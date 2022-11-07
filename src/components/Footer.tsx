import { Box, Link, Stack, Text } from '@chakra-ui/react';

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
      <Stack direction='row'>
        <Link href='/terms'>プライバシーポリシー</Link>
      </Stack>
    </Box>
  );
};
