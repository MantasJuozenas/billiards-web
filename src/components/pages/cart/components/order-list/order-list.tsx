import {
  AddRemoveCartItem,
  ChangeCartItemQuantity
} from '@store/modules/cart/actions';
import { SVGIconEuro } from '@styles/global-icons/icons/svg-icon-euro';
import { SVGIconPlusIcon } from '@styles/global-icons/icons/svg-icon-plus-icon';
import { toArray } from '@utilsFn/dictionary';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

export const OrderList = () => {
  const { t } = useTranslation('page-cart');

  const dispatch = useDispatch();
  const cartItems = useSelector((s) => s.cart.cartItems);
  const products = useSelector((s) => s.menu.menuList.products);
  const groupModifiers = useSelector((s) => s.menu.menuList.groupModifiers);

  const handlerOnClickChangeQuantity = (
    productId: string,
    index: number,
    dir: '-' | '+'
  ) => {
    dispatch(ChangeCartItemQuantity({ productId, index, action: dir }));
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

  return (
    <ContainerOrderList>
      {cartItems?.map?.((item, i) => {
        const productData = item?.product;
        const productName = productData?.ikos_product_json?.product?.name || '';
        const productPrice = (item?.price || 0)
          ?.toFixed?.(2)
          ?.replace?.('.', ',');

        const itemModifiers = toArray(item?.modifiers || {});

        return (
          <div key={productData?.ikko_id} className="OrderList_item">
            <div className="OrderList_item_name">{productName}</div>

            <div className="OrderList_item_price">
              <SVGIconEuro />
              {productPrice}
            </div>

            {itemModifiers?.length ? (
              <div className="OrderList_item_modifiers">
                {itemModifiers?.map?.((modifier, ii) => {
                  const modifierData = products?.[modifier?.productId];
                  const modifierGroup =
                    groupModifiers?.[
                      modifierData?.ikos_product_json?.product?.groupId || ''
                    ];

                  return (
                    <div
                      key={`${modifier?.productId}_${ii}`}
                      className="OrderList_item_modifiers_item"
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

            <div className="OrderList_item_actions">
              <div
                className="OrderList_item_delete"
                onClick={() => {
                  handlerRemoveItem(productData?.ikko_id || '', i);
                }}
              >
                {t('OrderList::text1')}
              </div>
              <div className="OrderList_item_quantity">
                <div
                  className="OrderList_item_minus"
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

                <div className="OrderList_item_count">{item?.quantity}</div>

                <div
                  className="OrderList_item_plus"
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
    </ContainerOrderList>
  );
};

const ContainerOrderList = styled.div`
  .OrderList_item {
    padding: 20px 0;

    border-bottom: 1px solid #383838;

    :first-child {
      padding-top: 0;
    }
  }

  .OrderList_item_name {
    margin-bottom: 10px;

    font: normal normal 400 16px/19px Roboto;
    letter-spacing: 0.4px;
    color: #ffffff;
  }

  .OrderList_item_price {
    display: flex;
    align-items: center;

    font: normal normal 400 16px/19px Roboto;
    letter-spacing: 0.4px;
    color: #ffffff;

    svg {
      width: 13px;
      height: 15px;

      margin-right: 5px;
    }
  }

  .OrderList_item_modifiers {
    margin-top: 20px;
  }

  .OrderList_item_modifiers_item {
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

  .OrderList_item_actions {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 30px;
  }

  .OrderList_item_delete {
    cursor: pointer;

    font: normal normal 400 15px/18px Roboto;
    letter-spacing: 0.38px;
    color: #a9a9a9;
  }

  .OrderList_item_quantity {
    display: flex;
    align-items: center;
  }

  .OrderList_item_minus,
  .OrderList_item_plus {
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

  .OrderList_item_minus {
    div {
      width: 100%;
      height: 2px;

      border-radius: 20px;
      background-color: #ff0055;
    }
  }

  .OrderList_item_count {
    margin: 0 25px;

    font: normal normal 400 15px/14px Roboto;
    letter-spacing: 0.47px;
    color: #ffffff;
  }

  .OrderList_item_plus {
    //
  }
`;
