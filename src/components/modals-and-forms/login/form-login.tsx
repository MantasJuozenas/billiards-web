import { Button } from '@components/utils/buttons/button';
import { CustomForm } from '@components/utils/form';
import { Input } from '@components/utils/inputs/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { login as aLogin } from '@store/modules/auth/actions';
import { ELoginResError } from '@typings/custom/enum-custom';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';

export const FormLogin = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const login = useSelector((s) => s.modalsAndForms.login);
  const loginError = useSelector((s) => s.auth.loginError);
  const authCheckComplete = useSelector((s) => s.auth.authCheckComplete);

  const schema = yup.object().shape<G.YupMap<Form.FLogin>>({
    username: yup.string().required(t(`modals-and-forms:::FormLogin::text7`)),
    password: yup.string().required(t(`modals-and-forms:::FormLogin::text7`)),
    rememberMe: yup.boolean().notRequired()
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
    // control
  } = useForm<Form.FLogin>({
    resolver: yupResolver(schema),
    defaultValues: { username: '', password: '', rememberMe: true }
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(
      aLogin({
        username: data?.username,
        password: data?.password,
        rememberMe: data?.rememberMe,
        loginFrom: login?.loginFrom || 'default-login',
        redirectPathAfterLogin: login?.redirectPathAfterLogin || ''
      })
    );
  });

  return (
    <ContainerFormLogin id="FormLogin" onSubmit={onSubmit}>
      <div className="FormLogin_inner">
        <div className="FormLogin_inner_inner">
          {loginError &&
          loginError !== ELoginResError['Netinkamas kortelės numeris'] &&
          loginError !== ELoginResError['Netinkamas kodas'] ? (
            <div className="FormLogin_r4">
              <p>
                {loginError ? t(`modals-and-forms:::FormLogin::text6`) : ''}
              </p>
            </div>
          ) : null}

          <div className="FormLogin_r1">
            <Input
              input={{
                placeholder: t(`modals-and-forms:::FormLogin::text2`),
                ...register('username')
              }}
              msgError={
                (loginError === ELoginResError['Netinkamas kortelės numeris']
                  ? loginError
                  : '') ||
                errors?.username?.message ||
                ''
              }
            />
          </div>

          <div className="FormLogin_r2">
            <Input
              input={{
                placeholder: t(`modals-and-forms:::FormLogin::text3`),
                type: 'password',
                ...register('password')
              }}
              msgError={
                (loginError === ELoginResError['Netinkamas kodas']
                  ? loginError
                  : '') ||
                errors?.password?.message ||
                ''
              }
            />
          </div>

          {/* <div className="FormLogin_r3">
            <Controller
              defaultValue
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <PixinnInputCheckbox
                  input={{
                    ...(field as any),
                    checked: field?.value,
                    placeholder: t(`modals-and-forms:::FormLogin::text4`),
                    onChange: (val) => {
                      field?.onChange?.(val);
                    }
                  }}
                />
              )}
            />
          </div> */}
        </div>
      </div>

      <div className="__Modal_Buttons_Div__">
        <Button
          button={{ type: 'submit', disabled: !authCheckComplete }}
          isLoading={!authCheckComplete}
        >
          {t(`modals-and-forms:::FormLogin::text5`)}
        </Button>
      </div>
    </ContainerFormLogin>
  );
};

const ContainerFormLogin = styled(CustomForm)`
  .FormLogin_inner_inner {
    width: 326px;
    max-width: 100%;
  }

  .FormLogin_r4 {
    margin-bottom: 13px;
    p {
      margin: 0;
      height: 16px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      font-feature-settings: 'salt' on;
      color: #be080d;
    }
  }

  .FormLogin_r1,
  .FormLogin_r2 {
    margin-bottom: 15px;
  }

  .FormLogin_r3 {
    margin-bottom: 35px;
  }

  .__Modal_Buttons_Div__ {
    //
  }
`;
