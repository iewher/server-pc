import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header";
import Footer from "../footer/footer";

/*
Компонент PageLayout
Обычно используется, чтобы не переиспользовать Header/Footer
В данном проекте не нужен, создал по привычке
*/

function PageLayout({ children }) {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageLayout;
