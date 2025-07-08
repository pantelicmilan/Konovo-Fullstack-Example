import { useState } from "react";
import { InputField } from "../../ui/inputField/InputField";
import StickyBar from "../../ui/stickyBar/StickyBar";
import styles from "./Products.module.css";
import { ProductCard } from "../../ui/productCard/ProductCard";
import { LoadingSpinner } from "../../ui/loadingSpinner/LoadingSpinner";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";

export const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTermTemp, setSearchTermTemp] = useState("");

  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useCategories();
  const { data: products, isLoading: isProductsLoading, error: productsError , isError: isProductsError} = useProducts(searchTerm, categoryId, pageNumber)
  
  function handleSearchTermChange(){
    setSearchTerm(searchTermTemp);
    setPageNumber(1);
  }

  function handleTempSearchTermChange(text){
    setSearchTermTemp(text);
  }

  function handleCategoryChange(e) {
    if(e.target.value === "") {
      setCategoryId("")
      setPageNumber(1); 
    }else{
      setCategoryId(e.target.value);
      setPageNumber(1); // vrati na prvu stranicu ako se menja kategorija
    }
  }

  function handlePagePlus(){
    setPageNumber(pageNumber + 1);

  }

  function handlePageMinus(){
    if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
      }
  }

  return (

    <div className={styles.productsWrapper}>
      <StickyBar/>
      <div className={styles.exploreWrapper}>
        <div className={styles.searchWrapper}>
          <InputField placeholder={"Pretraga"} value= {searchTermTemp} onChange={handleTempSearchTermChange}/>
          <div className={styles.searchIconWrapper} onClick={handleSearchTermChange}>
            <img src="/icons/searchOutline.svg" alt="" className={styles.searchIcon}/>
          </div>
        </div>

        <div className={styles.filterWrapper}>
          <select value={categoryId} onChange={handleCategoryChange} name="" id="">
            <option value="">Sve</option>
            {categories?.map((category) => (
              <option key={category.sif_productcategory} value={category.sif_productcategory}>{category.categoryName}</option>
            ))}
          </select>
        </div>
      </div>
      {!isProductsLoading && products?.length > 0 ? <h3 className={styles.text}> Rezultati: </h3> : null}
      {isProductsLoading ? <div className={styles.spinnerWrapper}><LoadingSpinner/></div> : null}

      <main className={styles.productWrapper}>
        {products?.map((product) => (

          <ProductCard
            key={product.sif_product}
            productImage={product.imgsrc}
            productTitle={product.naziv}
            productPrice={product.price}
            productCategory={product.categoryName? product.categoryName : "Bez kategorije"}
            productId={product.sif_product}
          />

        ))}
      </main>

      {!isProductsLoading && products?.length == 0 &&  (
          <h3
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '50px',
            }}
          >
            404, Ne postoje proizvodi :(
          </h3>
      )}

      {!isProductsLoading && 
            <div className={styles.paginationBarWrapper}>
            {pageNumber > 1 && <div onClick={handlePageMinus} className={styles.paginationButton}><img src="/icons/leftArrow.svg" alt="" /></div>}
            {pageNumber == 1 &&  products.length == 10 ? <p className={styles.pageNumber}>{pageNumber}</p>: null}
            {pageNumber > 1  && <p className={styles.pageNumber}>{pageNumber}</p>}
           
            { products.length == 10 &&  
            <div onClick={handlePagePlus} className={styles.paginationButton}>
              <img src="/icons/rightArrow.svg" alt="" />
            </div>}
          </div>
        }
    </div>

  )
}
