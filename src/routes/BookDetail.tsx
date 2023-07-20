import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React from 'react';
import {Helmet} from 'react-helmet';
import toast from 'react-hot-toast';
import {Navigate, useNavigate, useParams} from 'react-router-dom';

import BookCategory from '@/components/BookCategory';
import HTMLBreakText from '@/components/HTMLBreakText';
import ModalAddEditBook from '@/components/ModalAddEditBook';
import ModalConfirmDelete from '@/components/ModalConfirmDelete';
import {useAppDispatch, useAppSelector} from '@/store';
import {
  addToCarousel,
  bookDetailSelector,
  isInCarouselSelector,
  removeFromCarousel,
} from '@/store/reducers/book';
import {getImageFromURL, getMomentFormatFromType} from '@/util/helper';

const BookDetail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {bookId} = useParams<{bookId: string}>();
  const bookDetail = useAppSelector(state =>
    bookDetailSelector(state, parseInt(bookId ?? '0', 10))
  );
  const isInCarousel = useAppSelector(state =>
    isInCarouselSelector(state, parseInt(bookId ?? '0', 10))
  );

  const [showModalEditBook, setShowModalEditBook] = React.useState(false);
  const [showModalDeleteBook, setShowModalDeleteBook] = React.useState(false);

  if (!bookDetail) {
    return <Navigate to="/404" replace />;
  }

  const addRemoveFromCarousel = () => {
    if (isInCarousel) {
      dispatch(removeFromCarousel(bookDetail.id ?? 0));
      return;
    }
    dispatch(addToCarousel(bookDetail.id ?? 0));
  };

  return (
    <>
      <Helmet>
        <title>{bookDetail.title} - Library App</title>
      </Helmet>
      <div className="flex h-screen flex-col">
        <header
          className="flex w-screen flex-[2] flex-col justify-between bg-cover bg-center"
          style={{
            backgroundImage: `url(${getImageFromURL(bookDetail.imgUrl)})`,
          }}>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="m-4 aspect-square h-10 rounded-full bg-white shadow-md transition-all hover:scale-125 dark:bg-dark-surface dark:text-white"
              onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon="arrow-left" />
            </button>
            <div className="mx-4 flex gap-6 font-bold text-white dark:text-black">
              <button
                type="button"
                className="group flex aspect-square h-10 items-center overflow-hidden rounded-lg bg-black/60 px-4 py-2 transition-all hover:bg-white/60 hover:text-black dark:bg-white/60 dark:hover:bg-black/60 dark:hover:text-white min-[320px]:aspect-auto min-[320px]:hover:px-6"
                onClick={() => setShowModalEditBook(true)}>
                <FontAwesomeIcon icon="pencil" />
                <span className="text-[0] transition-all duration-700 group-hover:ml-2 group-hover:text-base">
                  Edit
                </span>
              </button>
              <button
                type="button"
                className="group flex aspect-square h-10 items-center overflow-hidden rounded-lg bg-black/60 px-4 py-2 transition-all hover:bg-white/60 hover:text-black dark:bg-white/60 dark:hover:bg-black/60 dark:hover:text-white min-[320px]:aspect-auto min-[320px]:hover:px-6"
                onClick={() => setShowModalDeleteBook(true)}>
                <FontAwesomeIcon icon="trash" />
                <span className="text-[0] transition-all duration-700 group-hover:ml-2 group-hover:text-base">
                  Delete
                </span>
              </button>
              <button
                type="button"
                className="group flex aspect-square h-10 items-center overflow-hidden rounded-lg bg-black/60 px-4 py-2 transition-all hover:bg-white/60 hover:text-black dark:bg-white/60 dark:hover:bg-black/60 dark:hover:text-white min-[320px]:aspect-auto min-[320px]:hover:px-6"
                onClick={addRemoveFromCarousel}>
                <FontAwesomeIcon
                  icon={
                    (isInCarousel
                      ? 'fa-solid fa-star'
                      : 'fa-regular fa-star') as IconProp
                  }
                />
                <span className="text-[0] transition-all duration-700 group-hover:ml-2 group-hover:text-base">
                  {isInCarousel ? 'Remove' : 'Add'} to Gallery
                </span>
              </button>
            </div>
          </div>
          <div
            className="mx-2 aspect-[calc(2/3)] w-40 translate-y-[16%] self-end overflow-hidden rounded-md bg-cover bg-center shadow-lg md:mx-10 md:translate-y-[50%]"
            style={{
              backgroundImage: `url(${getImageFromURL(bookDetail.imgUrl)})`,
            }}
          />
        </header>
        <main className="flex flex-[3] flex-col dark:bg-dark-surface md:flex-row">
          <div className="flex-1 py-3 px-3 dark:text-white md:flex-[4] md:px-6 lg:px-12">
            <BookCategory categories={bookDetail.category} />
            <div className="flex flex-col items-start md:flex-row md:items-center">
              <div className="flex flex-1 flex-col items-start gap-1">
                <h1 className="text-3xl font-bold">{bookDetail.title}</h1>
                <h2 className="font-bold">
                  {moment(bookDetail.datePublished.date).format(
                    getMomentFormatFromType(bookDetail.datePublished.type.code)
                  )}
                </h2>
              </div>
              <h2 className="font-bold text-green-500">Available</h2>
            </div>
            <p className="py-4 text-sm">
              <HTMLBreakText>{bookDetail.description}</HTMLBreakText>
            </p>
          </div>
          <div className="flex flex-col items-center justify-end px-2 py-3 md:flex-1 md:self-end md:px-14 md:py-12">
            <button
              type="button"
              className="w-full rounded-lg bg-yellow-400 px-6 py-2 text-2xl font-bold text-white shadow-lg">
              Borrow
            </button>
          </div>
        </main>
      </div>
      <ModalAddEditBook
        mode="edit"
        bookDetail={bookDetail}
        isVisible={showModalEditBook}
        onClose={() => setShowModalEditBook(false)}
      />
      <ModalConfirmDelete
        isVisible={showModalDeleteBook}
        bookId={bookDetail.id}
        bookTitle={bookDetail.title}
        onAfterDelete={() => {
          navigate(-1);
          toast.success('Success deleting book', {
            position: 'top-right',
            className:
              'bg-green-200 dark:bg-green-700 text-black dark:text-white',
          });
        }}
        onClose={() => setShowModalDeleteBook(false)}
      />
    </>
  );
};

export default BookDetail;
