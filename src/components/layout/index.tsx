/* eslint-disable sonarjs/no-duplicate-string */
import dynamic from 'next/dynamic';

import { NLayout } from './layout';
import { NLayoutAdmin } from './layout-admin';
/**
 * Layout only for client render
 */
export const Layout = dynamic<NLayout.IProps>(
  import('./layout').then((m) => m.Layout),
  { ssr: false }
);

export const LayoutAdmin = dynamic<NLayoutAdmin.IProps>(
  import('./layout-admin').then((m) => m.LayoutAdmin),
  { ssr: false }
);
/**
 * Layout for server and client render
 */
export const LayoutSSR = dynamic<NLayout.IProps>(
  import('./layout').then((m) => m.Layout)
);

export const LayoutAdminSSR = dynamic<NLayoutAdmin.IProps>(
  import('./layout-admin').then((m) => m.LayoutAdmin)
);

/** LayoutComponent */
export const LayoutComponent = (props: NLayoutComponent.IProps) => {
  if (
    !props?.layoutSSR &&
    props?.['x-hasura-default-role'] === 'administrator'
  ) {
    return (
      <LayoutAdmin {...props?.propsLayout} {...props?.propsLayoutAdmin}>
        {props?.children}
      </LayoutAdmin>
    );
  }

  if (
    props?.layoutSSR &&
    props?.['x-hasura-default-role'] === 'administrator'
  ) {
    return (
      <LayoutAdminSSR {...props?.propsLayout} {...props?.propsLayoutAdmin}>
        {props?.children}
      </LayoutAdminSSR>
    );
  }

  if (!props?.layoutSSR) {
    return (
      <Layout {...props?.propsLayout} {...props?.propsAnyLayout}>
        {props?.children}
      </Layout>
    );
  }

  return (
    <LayoutSSR {...props?.propsLayout} {...props?.propsAnyLayout}>
      {props?.children}
    </LayoutSSR>
  );
};

export namespace NLayoutComponent {
  export interface IProps {
    /** Page component */
    children: JSX.Element;
    layoutSSR?: boolean;
    'x-hasura-default-role'?: G.IHasuraAuth['x-hasura-default-role'];
    propsLayout?: Omit<NLayout.IProps, 'children'>;
    propsLayoutAdmin?: Omit<NLayoutAdmin.IProps, 'children'>;
    propsAnyLayout?: Omit<NLayout.IProps, 'children'>;
  }
}
