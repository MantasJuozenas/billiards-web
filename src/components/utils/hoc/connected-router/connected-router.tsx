import { ConnectedRouter as Router } from 'connected-next-router';

export const ConnectedRouter = (props: NConnectedRouter.IProps) => {
  return <Router>{props?.children}</Router>;
};

export namespace NConnectedRouter {
  export interface IProps {
    children: React.ReactNode;
  }
}
