const api = async () => {
  const url = "https://api.freeapi.app/api/v1/public/randomproducts";
  try {
    const res = await fetch(url, {
      method: "GET",
    });

    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();

      return data.data;
    }
    throw new Error("Something went wrong", { cause: res });
  } catch (e) {
    console.log(e, url);
    throw e;
  }
};
const createProduct = (product) => {
  const { thumbnail, price, title, brand, rating, discountPercentage } =
    product;
  const productCard = $(` <div class="product_card">
                <div class="product_img">
                    <img src=${thumbnail} />
                </div>
                <div class="product_content">
                    <p class="product_title">${title}</p>
                    <p class="product_brand">${brand}</p>
                    <p class="product_stats">
                        <span class="product_rating"> ${Math.ceil(
                          rating
                        )} ⭐ </span>
                        <span class="product_discout"> ${Math.ceil(
                          discountPercentage
                        )}% off </span>
                    </p>
                    <p class="product_price">${Math.ceil(price)} Rs.</p>
                </div>
                 <button class="add_cart_btn">Add to Cart</button>
            </div>`);
  return productCard;
};
const showProducts = (products) => {
  const container = $("#products");
  const productCards = products.map((product) => createProduct(product));
  container.append(productCards);
};
const getProducts = async () => {
  try {
    const res = await api();
    if (res && res.data && res.data.length) {
      const products = res.data;
      showProducts(products);
    } else {
      //show no products available
    }
  } catch (e) {
    console.log(e);
  }
};

getProducts();
