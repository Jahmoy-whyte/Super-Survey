import css from "./CSS.module.css";

const StepsCards = ({ icon, text, img }) => {
  return (
    <>
      <div className={css.cardcontainer}>
        <div className={css.headingdiv}>
          <img loading="lazy" src={icon} />
          <p>{text}</p>
        </div>
        <div className={css.imgdiv}>
          <img loading="lazy" src={img} />
        </div>
      </div>
    </>
  );
};

export default StepsCards;
