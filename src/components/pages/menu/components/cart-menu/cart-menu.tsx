/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Button } from '@components/utils/buttons/button';
import { buildPath, routes } from '@constants/routes';
import {
  AddRemoveCartItem,
  ChangeCartItemQuantity
} from '@store/modules/cart/actions';
import { flag_SetCartMenuOpen } from '@store/modules/flags/actions';
import { SVGIconClose3 } from '@styles/global-icons/icons/svg-icon-close-3';
import { SVGIconEuro } from '@styles/global-icons/icons/svg-icon-euro';
import { SVGIconPlusIcon } from '@styles/global-icons/icons/svg-icon-plus-icon';
import { med } from '@utilsFn/breakpoint';
import { isBrowser } from '@utilsFn/check-browser';
import { toArray } from '@utilsFn/dictionary';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

export const CartMenu = () => {
  const { t } = useTranslation('page-menu');
  const router = useRouter();

  const params = router?.query as G.IQueryParams;

  const dispatch = useDispatch();
  const isMobile = useSelector((s) => s.device.isMobile);
  const cartItems = useSelector((s) => s.cart.cartItems);
  const totalAmount = useSelector((s) => s.cart.totalAmount);
  const pageYOffset = useSelector((s) => s.device.pageYOffset);
  const screenWidth = useSelector((s) => s.device.screenWidth);
  const screenHeight = useSelector((s) => s.device.screenHeight);
  const products = useSelector((s) => s.menu.menuList.products);
  const groupModifiers = useSelector((s) => s.menu.menuList.groupModifiers);

  const handlerCartMenuItemsDivHeight = () => {
    const docCartMenu = document.getElementById('__CartMenu');
    const docCartMenuR2 = document.getElementById('__CartMenu_r2');

    if (!docCartMenu || !docCartMenuR2) return;

    const docParent = docCartMenu?.parentElement?.parentElement;

    if (!docParent) return;

    const docParentRect = docParent?.getBoundingClientRect?.() as DOMRect;

    const maxHeight = (docParentRect?.height || 0) - (isMobile ? 249 : 270);
    docCartMenuR2.style.maxHeight = `${maxHeight}px`;
  };

  const handlerOnClickClose = () => {
    dispatch(flag_SetCartMenuOpen(false));
  };

  const handlerRemoveItem = (productId: string, index: number) => {
    dispatch(
      AddRemoveCartItem({
        productId,
        index,
        action: 'remove'
      })
    );
  };

  const handlerOnClickChangeQuantity = (
    productId: string,
    index: number,
    dir: '-' | '+'
  ) => {
    dispatch(ChangeCartItemQuantity({ productId, index, action: dir }));
  };

  const handlerOnClickOrder = () => {
    router?.push?.(buildPath(routes.cart, { ...params }));
  };

  React.useEffect(() => {
    if (isBrowser()) handlerCartMenuItemsDivHeight();
  }, [pageYOffset, screenHeight, screenWidth]);

  return (
    <ContainerCartMenu id="__CartMenu">
      <div className="CartMenu_inner">
        <div className="CartMenu_r1">
          <p>{t('CartMenu::text1')}</p>

          <div
            className="CartMenu_r1_SVGIconClose3"
            onClick={() => handlerOnClickClose()}
          >
            <SVGIconClose3 />
          </div>
        </div>

        <div id="__CartMenu_r2" className="CartMenu_r2">
          {cartItems?.map?.((item, i) => {
            const productData = item?.product;
            const productName =
              productData?.ikos_product_json?.product?.name || '';
            const productPrice = (item?.price || 0)
              ?.toFixed?.(2)
              ?.replace?.('.', ',');
            const itemModifiers = toArray(item?.modifiers || {});

            return (
              <div key={productData?.ikko_id} className="CartMenu_r2_item">
                <p className="CartMenu_r2_item_name">{productName}</p>

                <p className="CartMenu_r2_item_price">
                  <SVGIconEuro />
                  {productPrice}
                </p>

                {itemModifiers?.length ? (
                  <div className="CartMenu_r2_item_modifiers">
                    {itemModifiers?.map?.((modifier, ii) => {
                      const modifierData = products?.[modifier?.productId];
                      const modifierGroup =
                        groupModifiers?.[
                          modifierData?.ikos_product_json?.product?.groupId ||
                            ''
                        ];

                      return (
                        <div
                          key={`${modifier?.productId}_${ii}`}
                          className="CartMenu_r2_item_modifiers_item"
                        >
                          <p className="modifierGroupName">
                            {modifierGroup?.name}:
                          </p>

                          <p className="modifierName">
                            {modifierData?.ikos_product_json?.product?.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                <div className="CartMenu_r2_item_actions">
                  <p
                    className="CartMenu_r2_item_delete"
                    onClick={() => {
                      handlerRemoveItem(productData?.ikko_id || '', i);
                    }}
                  >
                    {t('CartMenu::text2')}
                  </p>

                  <div className="CartMenu_r2_item_changeQuantity">
                    <div
                      className="CartMenu_r2_item_minus"
                      onClick={() => {
                        handlerOnClickChangeQuantity(
                          productData?.ikko_id || '',
                          i,
                          '-'
                        );
                      }}
                    >
                      <div />
                    </div>

                    <div className="CartMenu_r2_item_count">
                      {item?.quantity}
                    </div>

                    <div
                      className="CartMenu_r2_item_plus"
                      onClick={() => {
                        handlerOnClickChangeQuantity(
                          productData?.ikko_id || '',
                          i,
                          '+'
                        );
                      }}
                    >
                      <SVGIconPlusIcon />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="CartMenu_r3">
          <p className="CartMenu_r3_label">{t('CartMenu::text3')}</p>

          <p className="CartMenu_r3_totalAmount">
            <SVGIconEuro />
            {totalAmount?.toFixed?.(2)?.replace?.('.', ',')}
          </p>
        </div>

        <div className="CartMenu_r4">
          <Button
            button={{
              onClick: () => {
                handlerOnClickOrder();
              }
            }}
          >
            {t('CartMenu::text4')}
          </Button>
        </div>
      </div>
    </ContainerCartMenu>
  );
};

const ContainerCartMenu = styled.div`
  position: relative;

  background-color: #181818;

  .CartMenu_inner {
    overflow: hidden;
  }

  .CartMenu_r1 {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 20px;

    p {
      margin: 0;

      font: normal normal 500 20px/24px Roboto;
      letter-spacing: 0.3px;
      color: #ffffff;
    }
  }

  .CartMenu_r1_SVGIconClose3 {
    cursor: pointer;

    display: flex;
  }

  .CartMenu_r2 {
    overflow: auto;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .CartMenu_r2_item {
    padding-bottom: 17px;

    box-shadow: inset 0 -1px 0 0 #383838;

    :not(:last-child) {
      margin-bottom: 23px;
    }
  }

  p.CartMenu_r2_item_name {
    margin: 0;
    margin-bottom: 15px;

    font: normal normal 400 16px/19px Roboto;
    letter-spacing: 0.4px;
    color: #ffffff;
  }

  p.CartMenu_r2_item_price {
    display: flex;
    align-items: center;

    margin: 0;
    margin-bottom: 20px;

    font: normal normal 400 16px/19px Roboto;
    letter-spacing: 0.4px;
    color: #ffffff;

    svg {
      margin-right: 5px;
    }
  }

  .CartMenu_r2_item_modifiers {
    margin-bottom: 20px;
  }

  .CartMenu_r2_item_modifiers_item {
    display: flex;
    align-items: center;

    :not(:last-child) {
      margin-bottom: 5px;
    }
  }

  .modifierGroupName,
  .modifierName {
    margin: 0;

    font: normal normal normal 14px/17px Roboto;
    letter-spacing: 0px;
    color: #ffffff;
  }

  .modifierName {
    margin-left: 5px;
  }

  .CartMenu_r2_item_actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  p.CartMenu_r2_item_delete {
    cursor: pointer;

    margin: 0;

    font: normal normal 400 15px/18px Roboto;
    letter-spacing: 0.38px;
    color: #a9a9a9;
  }

  .CartMenu_r2_item_changeQuantity {
    display: flex;
    align-items: center;
  }

  .CartMenu_r2_item_minus,
  .CartMenu_r2_item_plus {
    cursor: pointer;

    min-width: 14px;
    width: 14px;
    max-width: 14px;
    min-height: 14px;
    height: 14px;
    max-height: 14px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .CartMenu_r2_item_minus {
    div {
      width: 100%;
      height: 2px;

      border-radius: 20px;
      background-color: #ff0055;
    }
  }

  .CartMenu_r2_item_count {
    margin: 0 25px;

    font: normal normal 400 15px/14px Roboto;
    letter-spacing: 0.47px;
    color: #ffffff;
  }

  .CartMenu_r2_item_plus {
    //
  }

  .CartMenu_r3 {
    height: 80px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 10px;
    margin-bottom: 15px;
    padding: 0 25px;

    border-radius: 6px;
    background-color: #292929;
  }

  p.CartMenu_r3_label {
    margin: 0;

    font: normal normal 400 16px/19px Roboto;
    letter-spacing: 0px;
    color: #a9a9a9;
  }

  p.CartMenu_r3_totalAmount {
    display: flex;
    align-items: center;

    margin: 0;

    font: normal normal 500 25px/30px Roboto;
    letter-spacing: 0px;
    color: #ffffff;

    svg {
      width: 19px;
      height: 22px;

      margin-right: 7px;
    }
  }

  .CartMenu_r4 {
    display: flex;

    button {
      width: 100%;
    }
  }

  /** mobile */
  ${med.max.sm} {
    .CartMenu_inner {
      height: calc(var(--screenHeight) - var(--navbarHeight) - 55px);

      display: flex;
      flex-direction: column;
    }

    .CartMenu_r1_SVGIconClose3 {
      display: none;
    }

    .CartMenu_r2 {
      margin-bottom: auto;
    }
  }
`;
