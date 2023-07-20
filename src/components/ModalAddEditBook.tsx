import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import DatePicker from 'react-datepicker';
import {Controller, SubmitHandler, useForm, useWatch} from 'react-hook-form';
import toast from 'react-hot-toast';
import ReactModal from 'react-modal';
import Select from 'react-select';
import TextareaAutosize from 'react-textarea-autosize';

import LoadingButtonPlaceholder from '@/components/LoadingButtonPlaceholder';
import {useAppDispatch, useAppSelector} from '@/store';
import {
  addBook,
  Category,
  datePickerOptions,
  editBook,
  PublishedDate,
} from '@/store/reducers/book';
import {
  getDatePropsFromType,
  getLabelFromType,
  getRandomSeededColor,
} from '@/util/helper';

interface Props {
  mode: 'add' | 'edit';
  bookDetail?: BookInputs | null;
  isVisible: boolean;
  onClose: () => void;
}

interface BookInputs {
  id?: number;
  imgUrl: string;
  title: string;
  datePublished: PublishedDate;
  category: Category[];
  author: string;
  description: string;
}

const ModalAddEditBook: React.FC<Props> = ({
  mode,
  bookDetail = null,
  isVisible,
  onClose,
}) => {
  const categories = useAppSelector(state => state.book.categories);
  const dispatch = useAppDispatch();

  const isEdit = React.useMemo(() => mode === 'edit', [mode]);
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<BookInputs>({
    defaultValues: React.useMemo(
      () =>
        isEdit && bookDetail
          ? {
              id: 0,
              ...bookDetail,
              datePublished: {
                type: bookDetail.datePublished.type,
                date: new Date(bookDetail.datePublished.date),
              },
            }
          : undefined,
      [bookDetail]
    ),
  });

  const onSubmit: SubmitHandler<BookInputs> = React.useCallback(async data => {
    await new Promise<void>(resolve => {
      setTimeout(async () => resolve(), 2000);
    });
    onClose();
    const category = data.category.map(cat => cat.id);
    const newDate = new Date(data.datePublished.date);
    if (data.datePublished.type.code === 'month') {
      newDate.setDate(1);
    }
    if (data.datePublished.type.code === 'year') {
      newDate.setDate(1);
      newDate.setMonth(0);
    }
    if (mode === 'add') {
      dispatch(
        addBook({
          id: 0,
          ...data,
          category,
        })
      );
      toast.success('Book added successfully', {
        position: 'top-right',
        className: 'bg-green-200 dark:bg-green-700 text-black dark:text-white',
      });
      return;
    }
    dispatch(
      editBook({
        id: 0,
        ...bookDetail,
        ...data,
        category,
      })
    );
    toast.success('Book edited successfully', {
      position: 'top-right',
      className: 'bg-green-200 dark:bg-green-700 text-black dark:text-white',
    });
  }, []);

  const dateType = useWatch({control, name: 'datePublished.type.code'});

  const onAfterClose = React.useCallback(() => {
    reset();
  }, []);

  return (
    <ReactModal
      isOpen={isVisible}
      onAfterClose={onAfterClose}
      onRequestClose={onClose}
      closeTimeoutMS={400}
      className="mx-4 flex max-h-[95vh] min-w-full flex-col overflow-y-auto rounded-xl bg-white p-6 transition-all duration-300 dark:bg-dark-surface md:min-w-[40em] lg:min-w-[50em]"
      overlayClassName="fixed inset-0 z-[1000] items-center justify-center bg-black/30 px-4 opacity-0 transition-all duration-700 dark:bg-white/10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold dark:text-white">
          {mode === 'add' ? 'Add' : 'Edit'} Book
        </h1>
        <button
          type="button"
          className="text-2xl text-red-500"
          onClick={onClose}>
          <FontAwesomeIcon icon="times" />
        </button>
      </div>
      <form
        className="flex flex-col gap-4 py-4"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full items-center">
          <h2 className="hidden w-1/4 dark:text-white sm:inline">Image URL</h2>
          <div className="w-full sm:w-3/4">
            <div className="relative">
              <input
                type="text"
                aria-invalid={errors.imgUrl && 'true'}
                className={`peer w-full rounded-md border border-lighter-gray bg-white px-3 py-2 text-black drop-shadow-xl transition-all focus:pt-7 focus:outline-2 focus:outline-black disabled:bg-gray-100 aria-[invalid]:border-red-500 dark:bg-dark-surface dark:text-white dark:focus:outline-white dark:disabled:bg-white/10 ${
                  watch('imgUrl') ? 'pt-7' : ''
                }`}
                {...register('imgUrl', {
                  required: 'Image URL is required',
                  pattern: {
                    value:
                      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
                    message: 'Image URL must be a valid URL',
                  },
                })}
              />
              <label
                htmlFor="imgUrl"
                className={`pointer-events-none absolute top-0 bottom-0 left-3 flex items-center text-sm font-semibold text-lighter-gray transition-all peer-focus:-translate-y-[18%] peer-focus:text-black peer-aria-[invalid]:text-red-500 dark:peer-focus:text-white ${
                  watch('imgUrl') ? '-translate-y-[18%]' : ''
                }`}>
                Image URL
              </label>
            </div>
            {errors.imgUrl && (
              <span className="text-xs text-red-500">
                {errors.imgUrl.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex w-full items-center">
          <h2 className="hidden w-1/4 dark:text-white sm:inline">Title</h2>
          <div className="w-full sm:w-3/4">
            <div className="relative">
              <input
                type="text"
                aria-invalid={errors.title && 'true'}
                className={`peer w-full rounded-md border border-lighter-gray bg-white px-3 py-2 text-black drop-shadow-xl transition-all focus:pt-7 focus:outline-2 focus:outline-black disabled:bg-gray-100 aria-[invalid]:border-red-500 dark:bg-dark-surface dark:text-white dark:focus:outline-white dark:disabled:bg-white/10 ${
                  watch('title') ? 'pt-7' : ''
                }`}
                {...register('title', {
                  required: 'Title is required',
                })}
              />
              <label
                htmlFor="title"
                className={`pointer-events-none absolute top-0 bottom-0 left-3 flex items-center text-sm font-semibold text-lighter-gray transition-all peer-focus:-translate-y-[18%] peer-focus:text-black peer-aria-[invalid]:text-red-500 dark:peer-focus:text-white ${
                  watch('title') ? '-translate-y-[18%]' : ''
                }`}>
                Title
              </label>
            </div>
            {errors.title && (
              <span className="text-xs text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex w-full items-center">
          <h2 className="hidden w-1/4 dark:text-white sm:inline">Author</h2>
          <div className="w-full sm:w-3/4">
            <div className="relative">
              <input
                type="text"
                aria-invalid={errors.author && 'true'}
                className={`peer w-full rounded-md border border-lighter-gray bg-white px-3 py-2 text-black drop-shadow-xl transition-all focus:pt-7 focus:outline-2 focus:outline-black disabled:bg-gray-100 aria-[invalid]:border-red-500 dark:bg-dark-surface dark:text-white dark:focus:outline-white dark:disabled:bg-white/10 ${
                  watch('author') ? 'pt-7' : ''
                }`}
                {...register('author', {
                  required: 'Author is required',
                })}
              />
              <label
                htmlFor="author"
                className={`pointer-events-none absolute top-0 bottom-0 left-3 flex items-center text-sm font-semibold text-lighter-gray transition-all peer-focus:-translate-y-[18%] peer-focus:text-black peer-aria-[invalid]:text-red-500 dark:peer-focus:text-white ${
                  watch('author') ? '-translate-y-[18%]' : ''
                }`}>
                Author
              </label>
            </div>
            {errors.author && (
              <span className="text-xs text-red-500">
                {errors.author.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col sm:flex-row sm:items-center">
          <h2 className="dark:text-white sm:w-1/4">Date Type</h2>
          <div className="w-full sm:w-3/4">
            <Controller
              control={control}
              defaultValue={
                datePickerOptions.find(
                  val => val.code === bookDetail?.datePublished.type.code
                ) ?? datePickerOptions[2]
              }
              name="datePublished.type"
              render={({field}) => (
                <Select
                  {...field}
                  options={datePickerOptions}
                  getOptionValue={option => option.code}
                  getOptionLabel={option => getLabelFromType(option.code)}
                  classNames={{
                    input: () => '!text-black dark:!text-white',
                    singleValue: () => '!text-black dark:!text-white',
                    menu: () => 'dark:!bg-dark-surface',
                    menuList: () => 'dark:text-white',
                    option: data => (data.isFocused ? '!bg-white/10' : ''),
                    control: () =>
                      'rounded-md border !shadow-none !border-lighter-gray bg-white text-black drop-shadow-xl disabled:bg-gray-100 aria-[invalid]:border-red-500 dark:bg-dark-surface dark:text-white dark:focus:!border-white dark:disabled:bg-white/10',
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className="flex w-full flex-col sm:flex-row sm:items-center">
          <h2 className="dark:text-white sm:w-1/4">Publish Date</h2>
          <div className="w-full sm:w-3/4">
            <Controller
              control={control}
              defaultValue={new Date()}
              name="datePublished.date"
              render={({field}) => (
                <DatePicker
                  placeholderText="Select date"
                  onChange={date => field.onChange(date)}
                  selected={field.value}
                  className="w-full rounded-md border border-lighter-gray bg-white px-3 py-2 text-black drop-shadow-xl transition-all focus:outline-2 focus:outline-black disabled:bg-gray-100 aria-[invalid]:border-red-500 dark:bg-dark-surface dark:text-white dark:focus:outline-white dark:disabled:bg-white/10"
                  {...getDatePropsFromType(dateType)}
                />
              )}
            />
          </div>
        </div>
        <div className="flex w-full flex-col sm:flex-row sm:items-center">
          <h2 className="dark:text-white sm:w-1/4">Category</h2>
          <div className="w-full sm:w-3/4">
            <Controller
              control={control}
              defaultValue={bookDetail?.category ?? []}
              name="category"
              render={({field}) => (
                <Select
                  {...field}
                  options={categories}
                  isMulti
                  getOptionValue={option => `${option.id}`}
                  getOptionLabel={option => option.name}
                  classNames={{
                    input: () => '!text-black dark:!text-white',
                    multiValueLabel: () => '!text-white',
                    multiValueRemove: () => '!text-black hover:!text-red-600',
                    menu: () => 'dark:!bg-dark-surface',
                    menuList: () => 'dark:text-white',
                    option: data => (data.isFocused ? '!bg-white/10' : ''),
                    control: () =>
                      'rounded-md border !shadow-none !border-lighter-gray bg-white text-black drop-shadow-xl disabled:bg-gray-100 aria-[invalid]:border-red-500 dark:bg-dark-surface dark:text-white dark:focus:!border-white dark:disabled:bg-white/10',
                  }}
                  styles={{
                    multiValue: (base, state) => ({
                      ...base,
                      backgroundColor: getRandomSeededColor(state.data.name),
                    }),
                    menu: base => ({...base, position: 'relative'}),
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className="flex w-full flex-col sm:flex-row sm:items-center">
          <h2 className="dark:text-white sm:w-1/4">Description</h2>
          <div className="w-full sm:w-3/4">
            <div className="relative">
              <TextareaAutosize
                placeholder="Description"
                maxRows={15}
                aria-invalid={errors.description && 'true'}
                className="peer w-full rounded-md border border-lighter-gray bg-white px-3 py-2 text-black drop-shadow-xl transition-all focus:outline-2 focus:outline-black disabled:bg-gray-100 aria-[invalid]:border-red-500 dark:bg-dark-surface dark:text-white dark:focus:outline-white dark:disabled:bg-white/10"
                {...register('description', {
                  required: 'Description is required',
                })}
              />
            </div>
            {errors.description && (
              <span className="text-xs text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          aria-disabled={isSubmitting ? 'true' : 'false'}
          className="relative w-full overflow-hidden rounded-lg bg-green-600 px-6 py-2 font-bold text-white shadow-sm sm:w-auto sm:self-end">
          <LoadingButtonPlaceholder loading={isSubmitting} />
          Save
        </button>
      </form>
    </ReactModal>
  );
};

export default ModalAddEditBook;

ModalAddEditBook.defaultProps = {
  bookDetail: null,
};
