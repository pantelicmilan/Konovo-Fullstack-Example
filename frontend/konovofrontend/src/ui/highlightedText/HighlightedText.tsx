import style from "./HighlightedText.module.css";

export const HighlightedText = ({text}) => {
  return (
        <div className={style.specificationBar}>
            <h3>{text}</h3>
        </div>
  )
}
