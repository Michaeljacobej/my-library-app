import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import ReactModal from 'react-modal';

import LoadingButtonPlaceholder from '@/components/LoadingButtonPlaceholder';
import {useAppDispatch} from '@/store';
import {removeBook} from '@/store/reducers/book';

interface Props {
  isVisible: boolean;
  bookId: number;
  bookTitle: string;
  onAfterDelete: () => void;
  onClose: () => void;
}

const ModalConfirmDelete: React.FC<Props> = ({
  isVisible,
  bookId,
  bookTitle,
  onAfterDelete,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);

  const onDelete = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(removeBook(bookId));
      onClose();
      onAfterDelete();
    }, 2000);
  }, []);

  return (
    <ReactModal
      isOpen={isVisible}
      onRequestClose={onClose}
      closeTimeoutMS={400}
      className="mx-4 flex min-w-full flex-col rounded-xl bg-white p-6 transition-all duration-300 dark:bg-dark-surface md:min-w-[40em] lg:min-w-[50em]"
      overlayClassName="fixed inset-0 z-[1000] items-center justify-center bg-black/30 px-4 opacity-0 transition-all duration-700 dark:bg-white/10">
      <div className="flex flex-col items-center py-4">
        <FontAwesomeIcon
          icon="trash"
          className="h-40 w-40 pb-6 text-red-400 dark:text-red-700"
        />
        <h2 className="text-black dark:text-white">
          Are you sure to delete <span className="font-bold">{bookTitle}</span>?
        </h2>
        <div className="flex w-full gap-6 pt-4">
          <button
            type="button"
            className="relative flex-1 overflow-hidden rounded-lg bg-red-400 px-6 py-2 font-bold text-white shadow-sm dark:bg-red-700 sm:w-auto sm:self-end"
            onClick={onDelete}>
            <LoadingButtonPlaceholder loading={loading} />
            <span>Delete</span>
          </button>
          <button
            type="button"
            className="relative flex-1 overflow-hidden rounded-lg border border-lighter-gray px-6 py-2 font-bold text-light-gray shadow-sm dark:text-white sm:w-auto sm:self-end"
            onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default ModalConfirmDelete;
