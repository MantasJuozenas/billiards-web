___!!! README BEFORE USE !!!___

THIS IS A NEXT JS WHIT REACT JS BOILERPLATE FOR COMPANY 'PIXINN' PROJECTS
DOCUMENTATION CAN BE FOUND AND SHOULD BE KNOWN BEFORE STARTING TO WORK:
    https://nextjs.org/;
    https://reactjs.org/;
    https://formik.org/;
    https://www.npmjs.com/package/yup;
    https://www.notion.so/pixinn/

1. Must have Vs Code plugins:
    > ES7 React/Redux/GraphQL/React-Native snippets;
    > Auto Close Tag;
    > Auto Rename Tag;
    > Beautify;
    > Bracket Pair Colorizer;
    > Color Highlight;
    > CSS Modules;
    > Debugger for Chrome;
    > ESLint;
    > Git Blame;
    > GitLens — Git supercharged;
    > JavaScript standardjs styled snippets;
    > Live Server;
    > Live Share;
    > Material Icon Theme;
    > npm;
    > npm Intellisense;
    > Path Intellisense;
    > Prettier - Code formatter;
    > Remote - SSH;
    > Remote - SSH: Editing Configuration Files;
    > Simple React Snippets;
    > SVG Viewer;
    > TypeScript Toolbox;
    > vscode-icons;
    > vscode-styled-components;
    > GraphQL (by GraphlQL Foundation);
    > Todo Tree;
    > Code Spell Checker;
    
2. Custom snippets from Pixinn that is a must to use (temporary not available):
    > search for file 'pixinn-custom-snippets.code-snippets';

3. Do npm i or yarn, if needed do npm i --force --legacy-peer-deps(mostly for first time install).

4. Start project:
    > check .env, .env.development, .env.production files.
    > no changes allowed in these files!!!
    > to have your own .env setup (that you could change all what you need for your current project, but not affecting original setup) must create file .env.development.local with following initial data: 
      `
        #>>> ---env for localhost--- <<<
        #HOST=localhost
        #API_URL=http://localhost:10101

        #>>> ---env for dev server--- <<<
        #HOST=dev.pixinn.lt
        #API_URL=http://dev.pixinn.lt:10101

        #>>> ---env for work server--- <<<
        #HOST=0.0.0.0
        HOST=192.168.88.217
        API_URL=http://work.pixinn.lt:10101

        #>>> ---env for work2 server--- <<<
        #HOST=192.168.1.250
        #API_URL=http://work.pixinn.lt:50101

        #>>> ---env for all--- <<<
        PORT=44007
        #HOSTNAME=http://$HOST:$PORT
      `
    > change HOST if needed.
    > change PORT if needed.
    > change API_URL port if needed.

5. Use only custom navbar and layout.
    > Not allowed to use material ui or similar plugins, for simple components.
    > Only date picker uses material ui!!!

6. In pages dir we have our app routes:
    > pages/[lang]/index.tsx - is always home page;
    > only in pages we do our SEO whit SSR;
    > when new route created (ex: pages/[lang]/new/index.tsx) use snippet 'njspdc';
    > declare new route in constants.ts;
    > in new route import main component from @compnents/[lang]/news (ofcourse first create it!);
    > all further coding must be done in @components/[lang]/new;

7. App main colors and icons:
    > main colors must be declared and used from styles/colors.ts;
    > icons svgs that will need svg styling must be declared and used from styles/index.ts;
    > rest of images must be added to public/img dir;
    > fonts must be added to public/fonts/<font name>
    <!-- > for images is not allowed to use <src />!!! You must use <Image /> that comes from next!!!
        All information is here: https://nextjs.org/docs/api-reference/next/image. -->

8. App translation:
    > if needed must declare translations in same directory as file you are using it. Call it strings.ts
    > search for strings.ts to see how it's done.
    > to use translate import 'useTranslation' hook;

9. Check utils:
    > src/utils;
    > src/components/utils;
    > public/;
    > apollo/;
    > src/components/layout;

10. Global styles is in styles/global-styles.css;

11. For date manipulation use day.js (same as moment.js), because moment.js is a legacy project, now in maintenance mode;

12. Modals and forms:
    > All infomation for using formik and yup is here:
        !!! READ IT !!!
        > https://formik.org/ (do not use <Formik />!!! Use hook useFormik instead)
        > https://www.npmjs.com/package/yup
    > All forms has to be in @components/modals-and-forms/
    > All forms must be done by following:
        > Form name should be named by table name from backend or if it doesn't have one or doesn't represent one, should be by 
          route name or by function what it does.
        > When we know the name of form we create @components/modals-and-forms/<form name>
        > Then @components/modals-and-forms/<form name>/components
        > Then in @components/modals-and-forms/<form name>/components:
            > we must create two files, one for modal, and one for form.
            > file names cant have names like 'modal.tsx' or 'form.tsx', it must be named by 'form-<form name>.tsx' and 'modal-<form name>.tsx'.
            <!-- > create modal use snippet custom_modal. -->
            > see Examples 1
            <!-- > create form use snippet custom_form. -->
            > see Examples 2
            > after form is done it must be imported to modal.
            > form must work in modal and without the same way.
            > form query must be done in @components/modals-and-forms/<form name>/query.ts  (see Examples 3)
            > only queries for selects or dropdowns or some kind of user phone validation or query that could be reused in other components must
                be placed in store/modules/<table name>/query.ts.
            > form interface must in @components/modals-and-forms/forms-interfaces.ts.
            > all enums must be in graphql/enums-schema.ts. Names for enums must be strict to what it is and for what table.
            > for controlling modal and form also must create store actions in store/modules/modals-and-forms/
            > to use modal need to add created Modal<modal name> to file modals-container.tsx and then add to this array 'const modals: Modals = [ModalConfirmation];'
            > then don't import modals in components!!! When it's added to modals-container.tsx it will be global available, you just need to call actions to open in.
            > modal cant have any props!!! all must come from redux store, when you call actions.

13. Creating gql schemas:
    <!-- > All schemas must be in apollo/custom!!! -->
    <!-- > all schemas must created by using gql_schema snippet!!! -->
    > schemas enums must be in graphql/enums-schema.ts!!!

14. Regex:
    > regex must be declared and used from constants/regex.ts!!!

15. Custom reusable functions:
    > put it to src/utils/<proper name for function>.

16. Custom reusable components:
    > may be stored in src/components/utils.

17. Folder and files structure:
    > May not change!!!:
        > src will always have just:
            > apollo, components, constants, pages, store, styles, typings, utils!!!
        > src/pages will always have just:
            > [lang], api, _app.tsx, _document.tsx, _error.tsx, 404.tsx, 500.tsx, index.tsx
        > src/components will always have just:
            > lang, layout, modals-and-forms, utils.
    > components folders layout must be identical to our pages route layout!!! IT's a must and very important!!!.
        also names must be identical for folders just in components we don't use '[]'

18. No coding in pages dir!!! Only in components!!!

19. Do not modify GQL or any other backend tables or columns names, url links or anything else, without asking to DIRECTOR of pixinn!!!!!!!!!!!!!!!

20. If you use plugin from package.json:
    > first copy the name of the plugin!!!
    > open chrome, then google.com, and copy that name and at the end write npm, press enter.
    > then read read read what are you using, all the documentation.
    > then use the plugin

20. For commit code run this in your command line:
    > git add .
    > git commit -m <'YOUR COMMIT MESSAGE'>
    > git push origin <YOUR BRANCH NAME>

21. Analyze, the app, ask questions if needed, get to know what you are using before starting.

22. Don't touch auth-provider.tsx or any with auth associated files without consulting to DIRECTOR of pixinn!!!!!!!!!!!!!!! (only very few people knows what and how it works)

23. Every route in pages dir must have authLevel added according to it needs:
  `
    export default HomeLang;

    HomeLang.defaultProps = { authLevel: 'administrator' };
  `

>>> FINAL >>> Keep app clean!!!

>>> EXAMPLES

1. Modal:
  `
    import { CustomModal } from '@components/utils/pixinn/custom-modal';
    import { setUserData } from '@store/modules/modals-and-forms/actions';
    import useTranslation from '@utilsFn/hooks/use-translation';
    import React from 'react';
    import { useDispatch, useSelector } from 'react-redux';

    import FormAddOrEditUser from './form-add-or-edit-user';
    import { strings } from './strings';

    const fileName = 'modal-add-or-edit-user.tsx';

    const ModalAddOrEditUser = () => {
      const { t } = useTranslation();

      const dispatch = useDispatch();
      const { isMobile } = useSelector((s) => s.device);
      const { user } = useSelector((s) => s.modalsAndForms);

      const tStrings = {
        create: t(strings[fileName].create),
        edit: t(strings[fileName].edit)
      };

      const modalTitle =
        user?.openModalType === 'edit' ? tStrings.edit : tStrings.create;

      return (
        <CustomModal
          title={modalTitle}
          isOpen={!!user?.openModalType}
          onReqClose={() => {
            dispatch(setUserData({ openModalType: null }));
          }}
          requiredIdOne="FormAddOrEditUser"
          classNameButtonsDiv="__Modal_Buttons_Div__"
          isModalFullscreen={isMobile}
          showCloseBtn={false}
          style={{
            overlay: {
              zIndex: user?.modalZIndex || 1100,
              ...user?.styleOverlay
            },
            content: { ...user?.styleContent }
          }}
        >
          <FormAddOrEditUser />
        </CustomModal>
      );
    };

    export default ModalAddOrEditUser;
  `

2. Form:
  `
    import { useLazyQuery } from '@apollo/client';
    import { CustomForm } from '@components/utils/form';
    import { CustomButton2 } from '@components/utils/pixinn/buttons/custom-button2';
    import { CustomSelect2 } from '@components/utils/pixinn/inputs/input-select2';
    import { InputSwitch2 } from '@components/utils/pixinn/inputs/input-switch2';
    import InputText2 from '@components/utils/pixinn/inputs/input-text2';
    import { InputTextarea2 } from '@components/utils/pixinn/inputs/input-textarea2';
    import { setUserData } from '@store/modules/modals-and-forms/actions';
    import { RolesSelect } from '@store/modules/roles/selects-arr';
    import { ERoles } from '@typings/graphql/enum-schema';
    import useTranslation from '@utilsFn/hooks/use-translation';
    import { useFormik } from 'formik';
    import React from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import styled from 'styled-components';
    import * as Yup from 'yup';

    import { AddOrEditUserMutation, GetAddOrEditUserGqlQuery } from './query';
    import { strings } from './strings';

    const fileName = 'form-add-or-edit-user.tsx';

    const FormAddOrEditUser = () => {
      const { t } = useTranslation();

      const dispatch = useDispatch();
      const { user } = useSelector((s) => s.modalsAndForms);

      /* eslint-disable prettier/prettier */
      const [roleSelect, setRoleSelect] = React.useState<G.TSelect | null>(null);

      const afterSubmitCallback = React.useCallback((data?: any) => user?.afterSubmitCallback?.(data), []);
      const onErrorCallBack = React.useCallback((error?: any) => user?.onErrorCallBack?.(error), []);
      const callBack = React.useCallback((values: Form.FAddOrEditUser) => user?.callBack?.(values), []);
      /* eslint-enable prettier/prettier */

      const tStrings = {
        username: t(strings[fileName].username),
        name: t(strings[fileName].name),
        surname: t(strings[fileName].surname),
        email: t(strings[fileName].email),
        phone: t(strings[fileName].phone),
        role: t(strings[fileName].role),
        description: t(strings[fileName].description),
        isBlocked: t(strings[fileName].isBlocked),
        passwordNew: t(strings[fileName].passwordNew),
        passwordRepeatNew: t(strings[fileName].passwordRepeatNew),
        required: t(strings[fileName].required),
        passwordNotMatch: t(strings[fileName].passwordNotMatch),
        emailNotValid: t(strings[fileName].emailNotValid),
        phoneNotValid: t(strings[fileName].phoneNotValid)
      };

      const [getUser, { data: dataUser, loading: loadingUser }] = useLazyQuery<
        GQL_gen.Queries.GetAddOrEditUserGqlQuery,
        GQL_gen.Queries.GetAddOrEditUserGqlQueryVariables
      >(GetAddOrEditUserGqlQuery, {
        variables: {
          where: { id: { _eq: user?.userId || 0 } },
          limit: 1
        },
        fetchPolicy: 'no-cache'
      });

      let rolesSelect = RolesSelect();
      if (user?.formType !== 'superAdmin') {
        rolesSelect = rolesSelect?.filter(
          (role) => role?.value !== ERoles.superAdmin
        );
      }

      const handlerAfterQueryDone = () => {
        if (user?.afterSubmitCallback) afterSubmitCallback?.();

        dispatch(setUserData({ openModalType: null }));
        // HandlerShowToast({
        //   toastType:
        //     companies?.openModalType === 'create' || !companies?.companyId
        //       ? 'create'
        //       : companies?.openModalType === 'edit' || companies?.companyId
        //       ? 'edit'
        //       : 'delete',
        //   toastCode: 'ok',
        //   showTime: 5000,
        //   toastStrings: toastInfo,
        //   dispatch
        // });
      };

      const handlerAfterQueryError = (error: any) => {
        if (user?.onErrorCallBack) onErrorCallBack?.(error);

        // HandlerShowToast({
        //   toastType:
        //     companies?.openModalType === 'create' || !companies?.companyId
        //       ? 'create'
        //       : companies?.openModalType === 'edit' || companies?.companyId
        //       ? 'edit'
        //       : 'delete',
        //   toastCode: 'error',
        //   showTime: 5000,
        //   toastStrings: toastInfo,
        //   dispatch
        // });
      };

      const handlerOnSubmit = async (data: { userValues: Form.FAddOrEditUser }) => {
        if (data?.userValues?.passwordNew !== data?.userValues?.passwordRepeatNew) {
          formikAddOrEditUser?.setFieldError(
            'passwordRepeatNew',
            tStrings.passwordNotMatch
          );
        } else if (user?.callBack) {
          callBack?.(data?.userValues);
        } else {
          await AddOrEditUserMutation({
            mutationData: { user: data?.userValues },
            afterQueryDone: handlerAfterQueryDone,
            afterQueryError: handlerAfterQueryError
          });
        }
      };

      let schemaAddOrEditUser = Yup.object().shape<Form.FAddOrEditUser | any>({
        id: Yup.number(),
        password: Yup.string(),
        passwordNew: Yup.string(),
        passwordRepeatNew: Yup.string(),
        username: Yup.string().required(tStrings.required),
        first_name: Yup.string(),
        last_name: Yup.string(),
        email: Yup.string()
          .email(tStrings.emailNotValid)
          .required(tStrings.required),
        phone: Yup.number().typeError(tStrings.phoneNotValid),
        role_id: Yup.number().min(1, tStrings.required).required(tStrings.required),
        description: Yup.string(),
        blocked: Yup.boolean(),
        internet_service_provider_id: Yup.number().nullable()
      });

      if (user?.openModalType === 'create') {
        schemaAddOrEditUser = Yup.object().shape<Form.FAddOrEditUser | any>({
          id: Yup.number(),
          password: Yup.string(),
          passwordNew: Yup.string().required(tStrings.required),
          passwordRepeatNew: Yup.string().required(tStrings.required),
          username: Yup.string().required(tStrings.required),
          first_name: Yup.string(),
          last_name: Yup.string(),
          email: Yup.string()
            .email(tStrings.emailNotValid)
            .required(tStrings.required),
          phone: Yup.number().typeError(tStrings.phoneNotValid),
          role_id: Yup.number()
            .min(1, tStrings.required)
            .required(tStrings.required),
          description: Yup.string(),
          blocked: Yup.boolean(),
          internet_service_provider_id: Yup.number().nullable()
        });
      }

      const formikAddOrEditUser = useFormik<Form.FAddOrEditUser>({
        initialValues: {
          id: 0,
          password: '',
          passwordNew: '',
          passwordRepeatNew: '',
          username: '',
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          role_id: 0,
          description: '',
          blocked: false,
          // @ts-ignore
          internet_service_provider_id: null
        },
        validationSchema: () => {
          return schemaAddOrEditUser;
          // if (submitClicked) {
          //   setSubmitClicked(false);
          //   return schemaAddOrEditUser;
          // }
          // setSubmitClicked(false);
          // return TempHackSchema;
        },
        validateOnChange: false,
        validateOnBlur: false,
        validateOnMount: false,
        onSubmit: async (values) => {
          await handlerOnSubmit({ userValues: values });
        }
      });

      // console.log('formikAddOrEditUser', formikAddOrEditUser);

      const handlerSetFieldValue = (
        field: keyof Form.FAddOrEditUser,
        value: any
      ) => {
        formikAddOrEditUser?.setFieldValue(field, value);
      };

      const handlerSetInitial = () => {
        if (!loadingUser && dataUser?.user?.[0]?.id) {
          const userData = dataUser?.user?.[0];

          setRoleSelect(
            () =>
              rolesSelect?.find((role) => role?.value === userData?.role_id) || null
          );

          formikAddOrEditUser?.setValues({
            ...formikAddOrEditUser?.initialValues,
            id: userData?.id,
            // password: userData?.password || '',
            username: userData?.username,
            first_name: userData?.first_name || '',
            last_name: userData?.last_name || '',
            email: userData?.email || '',
            phone: userData?.phone || '',
            role_id: userData?.role_id,
            description: userData?.description || '',
            blocked: !!userData?.blocked,
            // @ts-ignore
            internet_service_provider_id: user?.internetServiceProviderId || null
          });
        } else if (user?.formType === 'superAdmin') {
          setRoleSelect(() => rolesSelect?.[0]);

          formikAddOrEditUser?.setValues({
            ...formikAddOrEditUser?.initialValues,
            role_id: ERoles.superAdmin
          });
        } else {
          formikAddOrEditUser?.setValues({
            ...formikAddOrEditUser?.initialValues,
            // @ts-ignore
            internet_service_provider_id: user?.internetServiceProviderId || null
          });
        }
      };

      React.useEffect(() => {
        handlerSetInitial();
      }, [loadingUser]);

      React.useEffect(() => {
        if (user?.userId) getUser();
      }, [user?.userId]);

      return (
        <ContainerFormAddOrEditUser
          id="FormAddOrEditUser"
          onSubmit={formikAddOrEditUser.handleSubmit}
        >
          <div className="FormAddOrEditUser_inner">
            <div className="FormAddOrEditUser_inner_inner">
              <div className="FormAddOrEditUser_row1">
                <InputText2
                  topLabel={tStrings.username}
                  value={formikAddOrEditUser?.values?.username}
                  onChange={(e) => {
                    const value = e?.target?.value;
                    handlerSetFieldValue('username', value);
                  }}
                  error={formikAddOrEditUser?.errors?.username || ''}
                />

                <InputText2
                  topLabel={tStrings.name}
                  value={formikAddOrEditUser?.values?.first_name || ''}
                  onChange={(e) => {
                    const value = e?.target?.value;
                    handlerSetFieldValue('first_name', value);
                  }}
                  error={formikAddOrEditUser?.errors?.first_name || ''}
                />
              </div>

              <div className="FormAddOrEditUser_row2">
                <InputText2
                  topLabel={tStrings.surname}
                  value={formikAddOrEditUser?.values?.last_name || ''}
                  onChange={(e) => {
                    const value = e?.target?.value;
                    handlerSetFieldValue('last_name', value);
                  }}
                  error={formikAddOrEditUser?.errors?.last_name || ''}
                />

                <InputText2
                  topLabel={tStrings.email}
                  value={formikAddOrEditUser?.values?.email || ''}
                  onChange={(e) => {
                    const value = e?.target?.value;
                    handlerSetFieldValue('email', value);
                  }}
                  error={formikAddOrEditUser?.errors?.email || ''}
                />
              </div>

              <div className="FormAddOrEditUser_row3">
                <InputText2
                  topLabel={tStrings.phone}
                  value={formikAddOrEditUser?.values?.phone || ''}
                  onChange={(e) => {
                    const value = e?.target?.value;
                    handlerSetFieldValue('phone', value);
                  }}
                  error={formikAddOrEditUser?.errors?.phone || ''}
                />

                <CustomSelect2
                  topLabel={tStrings.role}
                  isDisabled={user?.formType === 'superAdmin'}
                  options={rolesSelect}
                  value={roleSelect}
                  onChange={(val) => {
                    setRoleSelect(val);
                    handlerSetFieldValue('role_id', val?.value);
                  }}
                  error={formikAddOrEditUser?.errors?.role_id || ''}
                />
              </div>

              <div className="FormAddOrEditUser_row4">
                <InputText2
                  type="password"
                  topLabel={tStrings.passwordNew}
                  value={formikAddOrEditUser?.values?.passwordNew || ''}
                  onChange={(e) => {
                    const value = e?.target?.value;
                    handlerSetFieldValue('passwordNew', value);
                  }}
                  error={formikAddOrEditUser?.errors?.passwordNew || ''}
                />

                <InputText2
                  type="password"
                  topLabel={tStrings.passwordRepeatNew}
                  value={formikAddOrEditUser?.values?.passwordRepeatNew || ''}
                  onChange={(e) => {
                    const value = e?.target?.value;
                    handlerSetFieldValue('passwordRepeatNew', value);
                  }}
                  error={formikAddOrEditUser?.errors?.passwordRepeatNew || ''}
                />
              </div>

              <div className="FormAddOrEditUser_row5">
                <InputTextarea2
                  topLabel={tStrings.description}
                  value={formikAddOrEditUser?.values?.description || ''}
                  onChange={(e) => {
                    const value = e?.target?.value;
                    handlerSetFieldValue('description', value);
                  }}
                  error={formikAddOrEditUser?.errors?.description || ''}
                />
              </div>

              <div className="FormAddOrEditUser_row6">
                <label>{tStrings.isBlocked}</label>

                <InputSwitch2
                  checked={formikAddOrEditUser?.values?.blocked}
                  onChange={(value) => {
                    handlerSetFieldValue('blocked', value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="__Modal_Buttons_Div__">
            <CustomButton2
              styleType="background"
              color="black"
              iconPlacement="left"
              disabled={formikAddOrEditUser.isSubmitting}
              onClick={(e) => {
                e.preventDefault();
                dispatch(setUserData({ openModalType: null }));
              }}
            >
              Cancel
            </CustomButton2>
            <CustomButton2
              type="submit"
              styleType="background"
              color="green"
              iconPlacement="left"
              disabled={formikAddOrEditUser.isSubmitting}
              onClick={() => {
                // setSubmitClicked(true);
              }}
            >
              Save
            </CustomButton2>
          </div>
        </ContainerFormAddOrEditUser>
      );
    };

    export default FormAddOrEditUser;

    const ContainerFormAddOrEditUser = styled(CustomForm)`
      .FormAddOrEditUser_inner {
      }
      .FormAddOrEditUser_inner_inner {
        width: calc(898px - 50px);
        max-width: calc(100%);
      }
      .FormAddOrEditUser_row1,
      .FormAddOrEditUser_row2,
      .FormAddOrEditUser_row3,
      .FormAddOrEditUser_row4,
      .FormAddOrEditUser_row5,
      .FormAddOrEditUser_row6 {
        display: flex;
        margin-bottom: 20px;
      }
      .FormAddOrEditUser_row1,
      .FormAddOrEditUser_row2,
      .FormAddOrEditUser_row3,
      .FormAddOrEditUser_row4 {
        > div {
          :first-child {
            margin-right: 20px;
          }
        }
      }
      .FormAddOrEditUser_row6 {
        margin-bottom: 0;
      }
      .__Modal_Buttons_Div__ {
        //
      }
    `;
  `

3. Query:
 `
  import { addOrEditUserQuery } from '@store/modules/users/query';
  import gql from 'graphql-tag';

  export const GetAddOrEditUserGqlQuery = gql`
    query GetAddOrEditUserGqlQuery($where: user_bool_exp, $limit: Int) {
      user(where: $where, limit: $limit) {
        id
        username
        first_name
        last_name
        email
        phone
        role_id
        description
        blocked
        internet_service_provider_id
      }
    }
  `;

  interface IAddOrEditUserMutationProps
    extends Omit<G.IQMutationProps, 'client' | 'refetchQueries' | 'extraProps'> {
    mutationData: {
      user: Form.FAddOrEditUser;
    };
  }

  export const AddOrEditUserMutation = async (
    props: IAddOrEditUserMutationProps
  ) => {
    const { mutationData, afterQueryDone, afterQueryError } = props;
    try {
      await addOrEditUserQuery(mutationData?.user);

      afterQueryDone?.();
    } catch (error: any) {
      console.error(`AddOrEditUserMutation > ERROR: ${error?.toString?.()}`);
      afterQueryError?.();
    }
  };
 `

4. Strings:
  `
    export const strings = {
      'modal-add-or-edit-user.tsx': {
        create: ['Create'],
        edit: ['Edit']
      },
      'form-add-or-edit-user.tsx': {
        username: [`Username`],
        name: [`Name`],
        surname: [`Surname`],
        email: [`Email`],
        phone: [`Phone`],
        role: [`Role`],
        description: [`Description`],
        isBlocked: [`Is blocked`],
        passwordNew: [`New password`],
        passwordRepeatNew: [`Repeat new password`],
        required: [`Field is required`],
        passwordNotMatch: [`Password doesn't match`],
        emailNotValid: [`Email must be a valid email`],
        phoneNotValid: [`Phone must be a valid phone`]
      }
    };
  `

5. Index:
  `
    export { default as FormAddOrEditUser } from './form-add-or-edit-user';
    export { default as ModalAddOrEditUser } from './modal-add-or-edit-user';
  `
