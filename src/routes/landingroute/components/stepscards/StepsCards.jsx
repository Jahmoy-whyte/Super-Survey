import css from "./CSS.module.css";

const StepsCards = ({ icon, text, img }) => {
  return (
    <>
      <div className={css.cardcontainer}>
        <div className={css.headingdiv}>
          <img src={icon} />
          <p>{text}</p>
        </div>
        <div className={css.imgdiv}>
          <img src={img} />
        </div>
      </div>
    </>
  );
};

export default StepsCards;
