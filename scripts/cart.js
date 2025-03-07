export const getCartData = () => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      return JSON.parse(cartData);
      
    }
    return [];
  };
  export const addCartData = (item) => {
    item.count = 1;
    const cartData = getCartData();
    
    const newCartData = JSON.stringify([item, ...cartData]);
    localStorage.setItem("cart", newCartData);
    console.log(newCartData)
  };

  export function updateCartCount() {
    const cartData = getCartData();
    let count = cartData.length >= 10 ? "9+" : cartData.length;
    $("#cart_count").html(count);
  }

  export const removeDataFromCart = (item) => {
    const cartData = getCartData();
    const filteredCart = cartData.filter((i) => i.id !== item.id);
    const newCartData = JSON.stringify(filteredCart);
    localStorage.setItem("cart", newCartData);
  };
  
  function showCartItems() {
    const cartData = getCartData();
    const cartCards = cartData.map((i) => createProduct(i));
    $("#cart_products").append(cartCards);
  }
  
  const createProduct = (product) => {
    const { thumbnail, price, title, brand, rating, discountPercentage } =
      product;
    const prodcutCard = $(` <div class="product_card">
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
                     <button class="add_cart_btn">Remove from Cart</button>
                </div>`);
  
    const cartBtn = prodcutCard.find(".add_cart_btn");
  
    cartBtn.on("click", function (e) {
      removeDataFromCart(product);
      prodcutCard.remove();
    });
  
    return prodcutCard;
  };
  
  showCartItems();