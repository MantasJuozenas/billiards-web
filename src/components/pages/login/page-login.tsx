import { StylePageDivCenter } from '@components/layout/style-page/style-page-div-center';
import { FormLogin } from '@components/modals-and-forms/login';
import { Loaders } from '@components/utils/loaders';
import { buildPath, routes } from '@constants/routes';
import { setLoginData } from '@store/modules/modals-and-forms/actions';
import { med } from '@utilsFn/breakpoint';
import { useEffect } from '@utilsFn/hooks/use-effect';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

export const PageLogin = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const params = router?.query as G.IQueryParams;

  const dispatch = useDispatch();
  const isAuthOn = useSelector((s) => s.flags.isAuthOn);
  const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);
  const login = useSelector((s) => s.modalsAndForms.login);
  const authCheckComplete = useSelector((s) => s.auth.authCheckComplete);

  const handlerRedirect = () => {
    if (!isAuthOn) {
      router?.replace(buildPath(routes.home, { ...params }));
    } else if (authCheckComplete && isLoggedIn) {
      router?.replace?.(
        login?.redirectPathAfterLogin || buildPath(routes.home, { ...params })
      );
    }
  };

  const handlerSetLoginData = () => {
    if (isLoggedIn) return;

    dispatch(
      setLoginData({
        openModalType: null,
        loginFrom: login?.loginFrom || 'default-login',
        redirectPathAfterLogin: login?.redirectPathAfterLogin || ''
      })
    );
  };

  useEffect({
    effect: () => {
      handlerRedirect();

      if (isAuthOn) handlerSetLoginData();
    },
    deps: [authCheckComplete, isLoggedIn]
  });

  useEffect({
    cleanup: () => {
      if (isAuthOn) dispatch(setLoginData({ openModalType: null }));
    },
    deps: []
  });

  if (isLoggedIn || !isAuthOn) return <Loaders isLoading />;

  return (
    <ContainerPageLogin>
      <div className="PageLogin_inner">
        <div className="PageLogin_r1">
          <p>{t('modals-and-forms:::FormLogin::text8')}</p>
        </div>

        <div className="PageLogin_r2">
          <FormLogin />
        </div>
      </div>
    </ContainerPageLogin>
  );
};

const ContainerPageLogin = styled(StylePageDivCenter)`
  display: flex;
  justify-content: center;
  margin: 0 auto;

  .PageLogin_inner {
    padding-top: 128px;
  }

  .PageLogin_r1 {
    padding: 30px 40px;
    padding-bottom: 45px;
    border-radius: 10px 10px 0 0;
    background-color: #181818;

    p {
      margin: 0;

      font: normal normal bold 17px/20px Roboto;
      letter-spacing: 0.34px;
      color: #ffffff;
    }
  }

  .PageLogin_r2 {
    //
  }

  #FormLogin {
    width: 440px;
    padding: 30px 40px;
    padding-top: 0;
    border-radius: 0 0 10px 10px;
    background-color: #181818;
  }

  .FormLogin_inner_inner {
    width: 100% !important;
    margin: 0;
    margin-bottom: 30px;
  }

  .__Modal_Buttons_Div__ {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 auto;
  }
  // mobile
  ${med.max.sm} {
    .PageLogin_inner {
      width: 100%;
      display: flex;
      flex-direction: column;
      flex: 1;
      padding-top: 115px;
    }

    .PageLogin_r1 {
      padding: 0 var(--pagePaddingSide);
      padding-bottom: 30px;
      background-color: transparent;

      p {
        font: normal normal bold 16px/19px Roboto;
        letter-spacing: 0.32px;
      }
    }

    .PageLogin_r2 {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    #FormLogin {
      width: 100%;
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 0 var(--pagePaddingSide);
      background-color: transparent;
    }

    .__Modal_Buttons_Div__ {
      margin: 0;
      margin-top: auto;
      margin-bottom: 25px;

      button {
        width: 100%;
        height: 50px;
      }
    }
  }
`;
