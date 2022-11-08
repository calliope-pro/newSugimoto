import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method === 'POST') {
    const { name, email, text } = req.body;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.FORM_EMAIL_USER,
        pass: process.env.FORM_EMAIL_PW,
      },
      secure: true,
    });
    const content = {
      from: process.env.FORM_EMAIL_USER,
      to: email,
      subject: 'お問い合わせありがとうございます。',
      text: `${name}様

お問い合わせいただきありがとうございます。

以下のお問い合わせ内容にて受け付けました。
------------------------------------------
${text}
------------------------------------------

頂いたお問い合わせは数営業日をめどに順次ご案内します。
恐れ入りますが、お待ちいただけますようにお願いいたします。

弊社からのメールが届かない場合は迷惑メールフォルダ等をご確認のうえ再度ご連絡くださいませ。

※このメールに関して
本メールは自動配信メールです。身に覚えのない場合はお手数をおかけしますがこちらのメールは削除していただけますと幸いです。
`,
    };
    try {
      await transporter.sendMail(content);
      return res.status(200).send('OK');
    } catch (e) {
      console.log(e);
      return res.status(500).send('Internal Server Error');
    }
  }
}
