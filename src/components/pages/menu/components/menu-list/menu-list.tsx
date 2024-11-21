import { SetMenuItemData } from '@store/modules/modals-and-forms/actions';
import { SVGIconEuro } from '@styles/global-icons/icons/svg-icon-euro';
import { SVGIconShoppingCart } from '@styles/global-icons/icons/svg-icon-shopping-cart';
import { med } from '@utilsFn/breakpoint';
import { useDispatch, useSelector } from '@utilsFn/hooks/use-selector';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

export const MenuList = () => {
  const { t } = useTranslation('page-menu');

  const dispatch = useDispatch();
  const group = useSelector((s) => s.menu.menuList.group);
  const products = useSelector((s) => s.menu.menuList.products);
  const groupIds = useSelector((s) => s.menu.menuList.groupIds);
  // const mainGroups = useSelector((s) => s.menu.menuList.mainGroups);
  const parentGroups = useSelector((s) => s.menu.menuList.parentGroups);

  const handlerOnClickItem = (productId: string) => {
    dispatch(SetMenuItemData({ openModalType: 'create', productId }));
  };

  return (
    <ContainerMenuList>
      {groupIds?.map?.((mainGroupId, i) => {
        const mainGroup = group?.[mainGroupId];

        if (!mainGroup?.hasProducts) return null;

        // const mainGroupData = mainGroups?.[mainGroupId];
        const mainGroupNameId = `mainGroupName${i}`;

        return (
          <div key={mainGroupId} id={mainGroupNameId} className="MenuList_list">
            {mainGroup?.parentGroupIds?.map?.((parentGroupId) => {
              const parentGroup = mainGroup?.parentGroup?.[parentGroupId];

              if (!parentGroup?.hasProducts) return null;

              const parentGroupData = parentGroups?.[parentGroupId];
              const parentGroupName =
                parentGroupData?.ikos_group_json?.group?.name || '';

              return (
                <div key={parentGroupId} className="MenuList_list_item">
                  <p className="MenuList_list_item_name">{parentGroupName}</p>

                  <div className="MenuList_list2">
                    {parentGroup?.productIds?.map?.((productId) => {
                      const productData = products?.[productId];
                      const productName =
                        productData?.ikos_product_json?.product?.name || '';
                      const productDesc =
                        productData?.ikos_product_json?.product?.description ||
                        '';
                      // 'description description description description description description description description';
                      let productPrice: string | number =
                        productData?.ikos_product_json?.product?.sizePrices?.[0]
                          ?.price?.currentPrice || 0;
                      if (productPrice) productPrice = productPrice?.toFixed(2);

                      return (
                        <div key={productId} className="MenuList_list2_item">
                          <div className="MenuList_list2_item_inner">
                            <p className="MenuList_list2_item_groupName">
                              {parentGroupName}
                            </p>

                            <p className="MenuList_list2_item_productName">
                              {productName}
                            </p>

                            <p className="MenuList_list2_item_productDesc">
                              {productDesc}
                            </p>

                            <div className="MenuList_list2_item_bottom">
                              <p className="MenuList_list2_item_productPrice">
                                <SVGIconEuro />
                                {`${productPrice}`?.replace?.('.', ',')}
                              </p>

                              <div
                                className="MenuList_list2_item_addToCart"
                                onClick={() => handlerOnClickItem(productId)}
                              >
                                <SVGIconShoppingCart />

                                <p>{t('MenuList::text1')}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </ContainerMenuList>
  );
};

const ContainerMenuList = styled.div`
  color: white;

  .MenuList_list {
    scroll-margin-top: 222px;
  }

  .MenuList_list_item {
    margin-bottom: 70px;

    :last-child {
      margin-bottom: 50px;
    }
  }

  p.MenuList_list_item_name {
    margin: 0;
    margin-bottom: 30px;

    font: normal normal 500 22px/27px Roboto;
    letter-spacing: 0.88px;
    color: #ffffff;
  }

  .MenuList_list2 {
    display: flex;
    flex-wrap: wrap;
  }

  .MenuList_list2_item {
    min-width: 295px;
    width: 295px;
    max-width: 295px;
    /* min-height: 216px;
    height: 216px;
    max-height: 216px; */
    min-height: 241px;
    height: 241px;
    max-height: 241px;

    padding: 24px 0;

    /* box-shadow: inset 0 0 0 1px #ff0055; */
  }

  .MenuList_list2_item_inner {
    height: 100%;
    display: flex;
    flex-direction: column;

    padding: 22px 0;

    /* box-shadow: inset 0 0 0 1px #ff0055; */
  }

  p.MenuList_list2_item_groupName,
  p.MenuList_list2_item_productName,
  p.MenuList_list2_item_productDesc {
    padding: 0 45px;
  }

  p.MenuList_list2_item_groupName {
    margin: 0;
    margin-bottom: 8px;

    font: normal normal 500 13px/17px Roboto;
    letter-spacing: 0px;
    color: #a9a9a9;
  }

  p.MenuList_list2_item_productName {
    margin: 0;
    margin-bottom: 8px;

    font: normal normal 400 16px/19px Roboto;
    letter-spacing: 0px;
    color: #ffffff;
  }

  p.MenuList_list2_item_productDesc {
    margin: 0;
    margin-bottom: 10px;

    font: normal normal 400 14px/22px Roboto;
    letter-spacing: 0px;
    color: #ffffff;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .MenuList_list2_item_bottom {
    height: 19px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-left: 45px;

    margin-top: auto;
  }

  p.MenuList_list2_item_productPrice {
    display: flex;
    align-items: center;

    margin: 0;

    font: normal normal 500 16px/19px Roboto;
    letter-spacing: 0.4px;
    color: #ffffff;

    svg {
      margin-right: 4px;
    }
  }

  .MenuList_list2_item_addToCart {
    cursor: pointer;
    overflow: hidden;
    visibility: hidden;

    height: 100%;
    width: 0;

    display: flex;
    align-items: center;

    padding-right: 27px;

    svg {
      min-width: 18px;
      width: 18px;
    }

    p {
      margin: 0;
      margin-left: 10px;

      font: normal normal 500 15px/18px Roboto;
      letter-spacing: 0px;
      color: #ffffff;
      white-space: nowrap;
    }
  }

  /** hover */
  .MenuList_list2_item:hover {
    transition: box-shadow ease-out 0.5s;

    box-shadow: inset 0 0 0 1px #ff0055;

    .MenuList_list2_item_addToCart {
      transition: width ease-out 0.3s;

      visibility: visible;

      width: 150px;
    }
  }

  .MenuList_list2_item_addToCart:hover {
    svg {
      path {
        fill: #ff0055;
      }
    }

    p {
      color: #ff0055;
    }
  }

  /** mobile */
  ${med.max.sm} {
    .MenuList_list_item {
      margin-bottom: 50px;
    }

    p.MenuList_list_item_name {
      font: normal normal 500 16px/19px Roboto;
      letter-spacing: 0.64px;
      color: #ffffff;
    }

    .MenuList_list2 {
      flex-wrap: nowrap;
      flex-direction: column;
    }

    .MenuList_list2_item {
      min-width: 100%;
      width: 100%;
      max-width: 100%;
      min-height: unset;
      height: unset;
      max-height: unset;

      padding: 25px 0;

      background-color: #181818;
      box-shadow: none !important;

      :not(:last-child) {
        margin-bottom: 10px;
      }
    }

    .MenuList_list2_item_inner {
      padding: 0;
    }

    p.MenuList_list2_item_groupName,
    p.MenuList_list2_item_productName,
    p.MenuList_list2_item_productDesc {
      padding: 0 15px;
    }

    p.MenuList_list2_item_groupName {
      font: normal normal 500 13px/15px Roboto;
    }

    p.MenuList_list2_item_productName {
      font: normal normal 500 16px/19px Roboto;
    }

    p.MenuList_list2_item_productDesc {
      margin-bottom: 15px;
    }

    .MenuList_list2_item_bottom {
      padding-left: 15px;
    }

    .MenuList_list2_item_addToCart {
      visibility: visible;

      width: unset !important;

      padding-right: 15px;

      svg {
        path {
          fill: #ff0055;
        }
      }

      p {
        color: #ff0055;
      }
    }
  }
`;
