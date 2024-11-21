import { SetIsAppReady } from '@store/modules/global/actions';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import { useRouter } from 'next/router';
import React from 'react';

export const AppCheck = (props: NAppCheck.TProps) => {
  const router = useRouter();

  const dispatch = useDispatch();
  const isAppReady = useSelector((s) => s.global.isAppReady);
  const localeInitDone = useSelector((s) => s.translations.localeInitDone);

  React.useEffect(() => {
    if (!router?.isReady) return;
    if (!localeInitDone) return;
    if (isAppReady) return;

    dispatch(SetIsAppReady(true));
  }, [router?.isReady, localeInitDone]);

  return <>{props?.children}</>;
};

export namespace NAppCheck {
  export type TProps = {
    children: React.ReactNode;
  };
}
