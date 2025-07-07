import { useNavigate } from 'react-router-dom'
import { HighlightedText } from '../highlightedText/HighlightedText'
import styles from './ProductCard.module.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const ProductCard = ({productTitle, productCategory, productPrice, productId, productImage}) => {
    const navigate = useNavigate()

    function handleClickOnProductCard() {
        navigate(`/product/${productId}`)
    }

    return (

    <article className={styles.productCardWrapper} onClick={handleClickOnProductCard}>
        <div className={styles.productImageWrapper}>
            <LazyLoadImage
                 effect="blur"
                 src={productImage}
                 className={styles.productImageTag}
            />
            <div className={styles.productTextWrapper}>
                <h2 className={styles.productTitle}>
                    {productTitle}
                </h2>
                <h3 className={styles.categoryName}>
                    {productCategory}
                </h3>
                <HighlightedText text={productPrice+'rsd'}/>
            </div>
        </div>
    </article>
  )
}
