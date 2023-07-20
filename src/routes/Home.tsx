import React from 'react';
import {Helmet} from 'react-helmet';
import {useNavigate} from 'react-router-dom';

import HomeBookList from '@/components/HomeBookList';
import HomeCarousel from '@/components/HomeCarousel';
import HomeSideNav from '@/components/HomeSideNav';
import ModalAddEditBook from '@/components/ModalAddEditBook';
import NavHeader from '@/components/NavHeader';
import useIsLogin from '@/hooks/useIsLogin';

const Home = () => {
  useIsLogin(true);
  const navigate = useNavigate();
  const [showSideNavOverlay, setShowSideNavOverlay] = React.useState(false);
  const [showModalAddBook, setShowModalAddBook] = React.useState(false);

  const onBookClick = React.useCallback((id: number) => {
    navigate(`/book/${id}`);
  }, []);

  return (
    <>
      <Helmet>
        <title>Library Home</title>
      </Helmet>
      <div className="flex min-h-screen justify-end dark:bg-dark-surface">
        <HomeSideNav
          overlay={showSideNavOverlay}
          onCloseOverlay={() => setShowSideNavOverlay(false)}
          onAddBook={() => {
            setShowModalAddBook(true);
            setShowSideNavOverlay(false);
          }}
        />
        <main className="min-h-full max-w-full transition-all dark:bg-dark-surface md:w-[90vw] lg:w-[75vw]">
          <NavHeader onBurgerClick={() => setShowSideNavOverlay(true)} />
          <div className="flex flex-col">
            <HomeCarousel onBookClick={onBookClick} />
            <HomeBookList onBookClick={onBookClick} />
          </div>
        </main>
      </div>
      <ModalAddEditBook
        mode="add"
        isVisible={showModalAddBook}
        onClose={() => setShowModalAddBook(false)}
      />
    </>
  );
};

export default Home;
