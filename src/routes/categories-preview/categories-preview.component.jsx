import {useContext, Fragment} from 'react'
import { CategoriesContext } from '../../context/categories.context'
import ProductCard from '../../components/product-card/productCard.component'
import CategoryPreview from '../../components/category-preview/category-preview.component';
// import './categories-preview.styles.css'

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((key) => {
        const products = categoriesMap[key];
        return <CategoryPreview key={key} title={key} products={products} />;
      })}
    </Fragment>
  );
};

export default CategoriesPreview;