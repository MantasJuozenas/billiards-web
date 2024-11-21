import { PixinnImage } from '@components/utils/pixinn/image/pixinn-image/pixinn-image';
import { _, media } from '@utilsFn/breakpoint';
import { GetRestaurantLocation } from '@utilsFn/get-restaurant-data';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

export const PageOurTables = () => {
  const { t } = useTranslation();
  const { isVilnius } = GetRestaurantLocation();

  const tablesPhotos = isVilnius
    ? [
        '/img/tables/billiardVilnius1.jpg',
        '/img/tables/billiardVilnius2.jpg',
        '/img/tables/billiardVilnius3.jpg',
        '/img/tables/billiardVilnius4.jpg',
        '/img/tables/billiardVilnius5.jpg'
      ]
    : [
        '/img/tables/billiard4.jpg',
        '/img/tables/billiard2.jpg',
        '/img/tables/billiard3.jpg'
        // '/img/tables/billiard5.jpg'
        // '/img/tables/billiard1.jpg'
      ];
  return (
    <ContainerPageOurTables>
      <div className="PageOurTables_inner">
        {tablesPhotos?.map?.((item, i) => {
          return (
            <div key={i} className="tables_container_inner">
              <div className="photo_billiards_container">
                <div className="photo_billiards">
                  <PixinnImage
                    img={{
                      src: item,
                      alt: item
                    }}
                  />
                </div>
              </div>

              <div className="details_container_outer">
                <div className="details_container">
                  <div className="name">
                    {isVilnius
                      ? t(
                          `page-our-tables:::PageOurTables::nameVilnius${i + 1}`
                        )
                      : t(`page-our-tables:::PageOurTables::name${i + 1}`)}
                  </div>
                  <div className="price">
                    {isVilnius
                      ? t(
                          `page-our-tables:::PageOurTables::priceVilnius${
                            i + 1
                          }`
                        )
                      : t(`page-our-tables:::PageOurTables::price${i + 1}`)}
                  </div>
                  <div className="description">
                    {isVilnius
                      ? t(
                          `page-our-tables:::PageOurTables::descriptionVilnius${
                            i + 1
                          }`
                        )
                      : t(
                          `page-our-tables:::PageOurTables::description${i + 1}`
                        )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ContainerPageOurTables>
  );
};

const ContainerPageOurTables = styled.div`
  --paddingSide: 130px;
  .PageOurTables_inner {
    margin: 0 auto;
    width: 100%;
    max-width: 100%;
    width: calc(var(--layoutWidth) + 2 * var(--pagePaddingSide));
    padding: 0 var(--pagePaddingSide);
    height: 100%;
    color: #ffffff;
    line-height: 24px;
    letter-spacing: 0px;
    .tables_container_inner {
      display: flex;
      padding-bottom: 40px;
      justify-content: center;
      :last-child {
        padding-bottom: 80px;
      }
    }
    .details_container {
      display: flex;
      flex-direction: column;
      max-width: 450px;
      height: 100%;
      margin-left: 30px;
      margin-right: 30px;
      justify-content: center;
    }
    .name,
    .price {
      font-weight: 700;
    }
    .name {
      font-size: 18px;
      padding-bottom: 15px;
    }
    .price {
      font-size: 25px;
      padding-bottom: 30px;
    }
    .description {
      font-size: 14px;
    }
    .details_container_outer {
      display: flex;
      align-items: center;
    }

    .photo_billiards {
      max-width: 450px;
      max-height: 365px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
      }
    }
    .photo_billiards_container {
      display: flex;
      align-items: center;
    }
    //tablet
    ${_(media.max.custom(833))} {
      .photo_billiards {
        max-width: 100%;
      }
      .price {
        font-size: 18px;
      }
      .description {
        max-width: 600px;
      }
      .tables_container_inner {
        flex-direction: column;
        padding-bottom: 50px;
        :last-child {
          padding-bottom: 60px;
        }
      }
      .price {
        padding-bottom: 20px;
        font-size: 18px;
      }
      .photo_billiards_container {
        padding-bottom: 30px;
      }
      .details_container {
        margin-left: 0px;
        margin-right: 0px;
        max-width: 100%;
      }

      ${_(media.max.custom(710))} {
        .PageOurTables_inner {
          .description {
            max-width: 100%;
          }
        }
      }
      //mobile
      ${_(media.max.custom(600))} {
        padding-left: 0px;
        padding-right: 0px;
        .details_container_outer {
          padding-left: 15px;
          padding-right: 15px;
        }
        .tables_container_inner {
          padding-left: 0px;
          padding-right: 0px;
          padding-bottom: 40px;
          :last-child {
            padding-bottom: 40px;
          }
        }
        .photo_billiards_container {
          padding-bottom: 20px;
        }
      }
    }
  }
`;
