import { StylePageDivCenter } from '@components/layout/style-page/style-page-div-center';
import { Button } from '@components/utils/buttons/button';
import { buildPath, routes } from '@constants/routes';
import { useSelector } from '@utilsFn/hooks/use-selector';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

export const PageOrderSuccess = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const params = router?.query as G.IQueryParams;

  const table = useSelector((s) => s.menu.table);

  return (
    <ContainerPageOrderSuccess>
      <div className="PageOrderSuccess_inner">
        <StylePageDivCenter className="PageOrderSuccess_StylePageDivCenter">
          <div className="PageOrderSuccess_r1">
            <Button
              button={{
                onClick: () => {
                  if (!table) return;

                  router?.replace?.(
                    buildPath(routes.menu, { ...params, table }, true)
                  );
                }
              }}
            >
              {t('page-order-success:::text1')}
            </Button>
          </div>

          <div className="PageOrderSuccess_r2">
            {t('page-order-success:::text2')}
          </div>
        </StylePageDivCenter>
      </div>
    </ContainerPageOrderSuccess>
  );
};

const ContainerPageOrderSuccess = styled.div`
  display: flex;
  flex: 1;

  .PageOrderSuccess_inner {
    display: flex;
    flex: 1;
  }

  .PageOrderSuccess_StylePageDivCenter {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .PageOrderSuccess_r1 {
    display: flex;
    justify-content: flex-end;
  }

  .PageOrderSuccess_r2 {
    margin: auto;

    font: normal normal medium 16px/19px Roboto;
    letter-spacing: 0px;
    color: #ffffff;
  }
`;
