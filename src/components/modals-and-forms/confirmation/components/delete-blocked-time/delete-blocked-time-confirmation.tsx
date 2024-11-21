import { Button } from '@components/utils/buttons/button';
import { setConfirmationData } from '@store/modules/modals-and-forms/actions';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { DeleteBlockedTimeMutation } from '../../../add-or-edit-blocked-time/gql-documents';

export const DeleteBlockedTimeConfirmation = (
  props: NDeleteConfirmation.IProps
) => {
  const { toastStrings, refetchQueries, afterQueryDone, afterQueryError } =
    props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handlerDelete = async () => {
    DeleteBlockedTimeMutation({
      mutationData: { id: props.id },
      toastStrings,
      refetchQueries,
      dispatch,
      afterQueryDone,
      afterQueryError
    });
    dispatch(setConfirmationData({ openModalType: null }));
  };

  return (
    <ContainerBlockedTimeConfirmation>
      <div className="CustomDeleteConfirmationContent_inner">
        <div className="CustomDeleteConfirmationContent_inner_inner">
          <div className="CustomDeleteConfirmationContent_row">
            {t(`modals-and-forms:::FormConfirmation::DeleteBlockedTime::text`, {
              replace: { dateRange: props?.dateIntervalString }
            })}
          </div>

          <div className="__Modal_Buttons_Div__ buttons-div">
            <div className="delete-buttons">
              <Button
                btnType="text"
                button={{
                  onClick: () =>
                    dispatch(setConfirmationData({ openModalType: null }))
                }}
              >
                {t(
                  'modals-and-forms:::FormConfirmation::DeleteBlockedTime::Cancel'
                )}
              </Button>

              <Button
                btnType="background"
                button={{
                  onClick: handlerDelete
                }}
              >
                {t(
                  'modals-and-forms:::FormConfirmation::DeleteBlockedTime::Delete'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ContainerBlockedTimeConfirmation>
  );
};

export namespace NDeleteConfirmation {
  export interface IProps extends G.IQMutationProps {
    id: number;
    dateIntervalString: string;
    toastStrings: G.IToastStrings;
  }
}

const ContainerBlockedTimeConfirmation = styled.div`
  .CustomDeleteConfirmationContent_inner_inner {
    max-width: 500px;
    padding: 0 30px;
    background-color: #383838ee;
    color: #ffffff;
  }
  .CustomDeleteConfirmationContent_row {
    word-wrap: break-word;
    padding-top: 30px;
  }
  .highlighted {
    font-style: italic;
  }

  .delete-buttons {
    display: flex;
    justify-content: space-around;
    button:not(:last-child) {
      margin-right: 5px;
    }
  }
  .buttons-div {
    background-color: transparent !important;
  }
`;
