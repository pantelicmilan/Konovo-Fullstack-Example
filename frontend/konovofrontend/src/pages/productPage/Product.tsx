import { useNavigate, useParams } from 'react-router-dom'
import { HighlightedText } from '../../ui/highlightedText/HighlightedText'
import StickyBar from '../../ui/stickyBar/StickyBar'
import styles from './Product.module.css'
import { LoadingSpinner } from '../../ui/loadingSpinner/LoadingSpinner'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import DOMPurify from 'dompurify';
import { useProduct } from '../../hooks/useProduct'

export const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const {data: product, isLoading: isProductLoading, error: productError} = useProduct(id);
  const sanitizedDescription = DOMPurify.sanitize(product?.description);

  function homeNavigation(){
    navigate("/products")
  }

  return (
    <div className={styles.productWrapper}>
      <StickyBar/>
      {isProductLoading && <div className={styles.spinnerWrapper}><LoadingSpinner/></div>}
      {
        !isProductLoading && (
            <>
              <div className={styles.navigationBar}>
                <button className={styles.navigationButton} onClick={homeNavigation}>Home</button>
                <img src="/icons/chevronRight.svg" alt="" />
                <button className={styles.navigationButton2}>{product?.categoryName ? product?.categoryName : "Nedodeljena kategorija"}</button>
              </div>

              <div className={styles.productPageWrapper}>

                <div className={styles.productHeader}>
                  <LazyLoadImage
                    src={product?.imgsrc}
                    effect="blur"
                    style={{width:"225px", height: "225px", borderRadius: "20px"}}
                  />
                  
                  <div className={styles.shortSpecificationWrapper}>
                
                    <div className={styles.higlightedTextWrapper}>
                      <h3 className={styles.highlightTitle}>Cena</h3>
                      <HighlightedText text={product?.price+'rsd'}/>
                    </div>

                    <div className={styles.higlightedTextWrapper}>
                      <h3 className={styles.highlightTitle}>Ime brenda</h3>
                      <HighlightedText text={product?.brandName ? product.brandName : "Brend nije poznat" }/>
                    </div>
                    
                    <div className={styles.higlightedTextWrapper}>
                      <h3 className={styles.highlightTitle}>Na stanju</h3>
                      <HighlightedText text={product?.stocks ? product.stocks : "Na upit"}/>
                    </div>

                  </div>
                </div>

                <div className={styles.titleAndDescWrapper}>
                  <h1 className={styles.productTitle}>
                    {product?.naziv}
                  </h1>
                  <h2 dangerouslySetInnerHTML={{__html: sanitizedDescription}}className={styles.productDescription}>
                  </h2>
                </div>

              </div>

              <div className={styles.callToActionWrapper}> 
                <p className={styles.callToActionP}>Pozovi na telefon da narucis</p>
                <div className={styles.phoneNumberWrapper}>
                  <img src="/icons/phone.svg" alt="Phone icon"/>
                  <p>0605144425</p>
                </div>
              </div>
            </>
        )
      }
    </div>
  )
}
