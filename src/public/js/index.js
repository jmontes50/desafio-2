console.log("it workssss");

const useSocket = async () => {
  const socket = io();
  const form = document.getElementById("formProduct");
  const listProducts = document.getElementById("listProducts");

  const listenersDelete = () => {
    const btnsDelete = document.querySelectorAll(".btnDelete");
    btnsDelete.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        console.log("id: ", id);
        try {
          await fetch(`/deleteproduct/${id}`, {
            method: "DELETE",
          });
        } catch (error) {
          console.log("error: ", error);
        }
      });
    });
  };

  listenersDelete();

  const drawProducts = (data) => {
    listProducts.innerHTML = "";

    let htmlProducts = "";
    data.forEach((product) => {
      htmlProducts += `
        <div class="product">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>${product.price}</p>
            <button class="btnDelete" data-id="${product.id}">Borrar</button>
        </div>
        `;
    });

    listProducts.innerHTML = htmlProducts;
    listenersDelete();
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { title, description, price, thumbnail, code, stock } =
      e.target.elements;
    const newProduct = {
      title: title.value,
      description: description.value,
      price: price.value,
      thumbnail: thumbnail.value,
      code: code.value,
      stock: stock.value,
    };

    console.log("newProduct: ", newProduct);

    try {
      await fetch("/createproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
    } catch (error) {
      console.log("error: ", error);
    }
  });

  socket.on("new-product", (data) => {
    // console.log("socket new product: ", data);
    drawProducts(data);
  });

  socket.on("delete-product", (data) => {
    console.log("socket delete product: ", data);
    drawProducts(data);
  });
};

useSocket();
