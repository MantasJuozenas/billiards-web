import { Button } from '@components/utils/buttons/button';
import { CustomForm } from '@components/utils/form';
import { InputCheckbox } from '@components/utils/inputs/input-checkbox';
import { AddRemoveCartItem } from '@store/modules/cart/actions';
import {
  MergeMenuItemData,
  SetMenuItemData
} from '@store/modules/modals-and-forms/actions';
import { SVGIconEuro } from '@styles/global-icons/icons/svg-icon-euro';
import { med } from '@utilsFn/breakpoint';
import { toArray } from '@utilsFn/dictionary';
import { HandlerShowToast } from '@utilsFn/handler-show-toast';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

export const FormViewMenuItem = () => {
  const { t } = useTranslation('modals-and-forms');

  const dispatch = useDispatch();
  const products = useSelector((s) => s.menu.menuList.products);
  const menuItem = useSelector((s) => s.modalsAndForms.menuItem);
  const groupModifiers = useSelector((s) => s.menu.menuList.groupModifiers);

  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const product =
    products?.[menuItem?.productId || '']?.ikos_product_json?.product;
  const productPrice = `${(
    product?.sizePrices?.[0]?.price?.currentPrice || 0
  )?.toFixed?.(2)}`?.replace?.('.', ',');
  const productDescription = product?.description || '';
  // const productDescription =
  //   'description description description description description description description description';

  const toastStrings: G.IToastStrings = {
    ok: {
      create: {
        title: t('FormViewMenuItem::text3'),
        msg: t('FormViewMenuItem::text4')
      }
    }
  };

  const handlerCloseModal = () => {
    dispatch(SetMenuItemData({ openModalType: null }));
  };

  const handlerClickSave = () => {
    if (isSubmitting) return;

    if (
      product?.groupModifiers?.length !==
      toArray(menuItem?.modifiers || {})?.length
    ) {
      setError(() => 'Nepasirinkti visi variantai');

      return;
    }

    setIsSubmitting(() => true);
    if (error) setError(() => '');

    dispatch(
      AddRemoveCartItem({
        onPrepare: () => setIsSubmitting(() => true),
        productId: menuItem?.productId || '',
        action: 'add',
        onSuccess: () => {
          handlerCloseModal();

          HandlerShowToast({
            dispatch,
            color: 'blue',
            toastType: 'create',
            toastCode: 'ok',
            toastStrings,
            autoCloseAfter: 5000
          });
        },
        onCleanup: () => setIsSubmitting(() => false)
      })
    );
  };

  return (
    <ContainerFormViewMenuItem
      id="FormViewMenuItem"
      onSubmit={(e) => {
        e.preventDefault();
        handlerClickSave();
      }}
    >
      <div className="FormViewMenuItem_inner">
        <div className="FormViewMenuItem_inner_inner">
          <div className="FormViewMenuItem_r1">
            <span>
              <SVGIconEuro />
              {productPrice}
            </span>
          </div>

          <div className="FormViewMenuItem_r2">
            {productDescription ? (
              <div className="FormViewMenuItem_r2_r1">{productDescription}</div>
            ) : null}
          </div>

          <div className="FormViewMenuItem_r3">
            {product?.groupModifiers?.map?.((groupModifier, i) => {
              const groupModifierData = groupModifiers?.[groupModifier?.id];

              return (
                <div
                  key={groupModifier?.id}
                  className="FormViewMenuItem_r3_item"
                >
                  <p>{groupModifierData?.name}</p>

                  {groupModifier?.childModifiers?.map?.((childModifier) => {
                    const childModifierData =
                      products?.[childModifier?.id]?.ikos_product_json;

                    const isChecked =
                      menuItem?.modifiers?.[i]?.productId === childModifier?.id;

                    return (
                      <InputCheckbox
                        key={childModifier?.id}
                        input={{
                          checked: !!isChecked,
                          placeholder: childModifierData?.product?.name,
                          onChange: () => {
                            if (isChecked) return;

                            dispatch(
                              MergeMenuItemData({
                                modifiers: {
                                  ...menuItem?.modifiers,
                                  [i]: {
                                    productId: childModifier?.id,
                                    amount: '1',
                                    productGroupId:
                                      childModifierData?.product?.groupId ||
                                      null
                                  }
                                }
                              })
                            );
                          }
                        }}
                        borderRadius="br-50"
                        checkboxPlacement="left"
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>

          {error ? <div className="FormViewMenuItem_r4">{error}</div> : ''}
        </div>
      </div>

      <div className="__Modal_Buttons_Div__">
        <Button
          btnHeight={45}
          btnColor="grey383838"
          button={{
            disabled: isSubmitting,
            onClick: () => handlerCloseModal()
          }}
        >
          {t(`FormViewMenuItem::text1`)}
        </Button>

        <Button
          btnHeight={45}
          isLoading={isSubmitting}
          button={{ type: 'submit', disabled: isSubmitting }}
        >
          {t(`FormViewMenuItem::text2`)}
        </Button>
      </div>
    </ContainerFormViewMenuItem>
  );
};

const ContainerFormViewMenuItem = styled(CustomForm)`
  --sidePadding: 30px;

  .FormViewMenuItem_inner {
    //
  }

  .FormViewMenuItem_inner_inner {
    width: 450px;
    max-width: 100%;

    padding: 0 var(--sidePadding);
    padding-bottom: 20px;
  }

  .FormViewMenuItem_r1 {
    display: flex;

    span {
      display: flex;
      align-items: center;

      font: normal normal 500 16px/19px Roboto;
      letter-spacing: 0.4px;
      color: #ffffff;
      line-height: 0px;

      svg {
        margin-right: 5px;
      }
    }
  }

  .FormViewMenuItem_r2 {
    margin-top: 30px;
  }

  .FormViewMenuItem_r2_r1 {
    font: normal normal 400 14px/22px Roboto;
    letter-spacing: 0px;
    color: #ffffff;
  }

  .FormViewMenuItem_r3 {
    /*  */
  }

  .FormViewMenuItem_r3_item {
    margin-top: 15px;
    padding-top: 15px;

    border-top: 1px solid #383838;

    > p {
      margin: 0;
      margin-bottom: 15px;

      font: normal normal medium 16px/22px Roboto;
      letter-spacing: 0px;
      color: #ffffff;
    }

    ._InputCheckbox {
      :not(:last-child) {
        margin-bottom: 11px;
      }
    }

    .InputCheckbox_r1_r2 {
      font: normal normal normal 14px/22px Roboto;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }

  .FormViewMenuItem_r4 {
    margin-top: 20px;

    font: normal normal medium 14px/24px Roboto;
    letter-spacing: 0.11px;
    color: #df0303;
  }

  .__Modal_Buttons_Div__ {
    //
  }

  /** mobile */
  ${med.max.sm} {
    --sidePadding: 15px;

    .FormViewMenuItem_inner_inner {
      width: 100%;
      margin-bottom: 110px;
    }

    .__Modal_Buttons_Div__ {
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
`;
