import jwt from 'jsonwebtoken';

export const DecodeToken = (props: NDecodeToken.IProps) => {
  // get the decoded payload ignoring signature, no secretOrPrivateKey needed
  const decoded: G.ICookieParsed & jwt.JwtPayload = jwt.decode(
    props?.token
  ) as any;

  // get the decoded payload and header
  // const decodedFull = jwt.decode(props?.token, { complete: true });
  // console.log({ decoded, decodedFull });

  return { decoded };
};

export namespace NDecodeToken {
  export interface IProps {
    token: string;
  }
}
