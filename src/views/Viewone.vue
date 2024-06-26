<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Item detail</h4>
      </div>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div class="card-body">
          <img class="image" src="../assets/tools.jpg" />
          <h1>ID: {{ product && product.ID }}</h1>
          <br />
          <h2>{{ product && product.item }}</h2>
          <div class="lister" v-if="product">
            <p>Quantity:</p>
            <p class="rev">{{ product.quantity.toLocaleString() }}</p>
          </div>
          <div class="lister" v-if="product">
            <p>Price (RM):</p>
            <p class="rev">
              {{
                product.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </p>
          </div>
          <div class="lister" v-if="product">
            <p>Total (RM):</p>
            <p class="rev">
              {{
                (product.quantity * product.price).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </p>
          </div>
          <br />
          <h3 v-if="product">Supplier</h3>
          <p v-if="product">{{ product.supplier.name }}</p>
          <p v-if="product">{{ product.supplier.address }}</p>
          <p v-if="product">{{ product.supplier.tel }}</p>
          <br />
          <div v-if="product">
            <router-link
              :to="{ path: '/inventory/' + product.ID + '/edit' }"
              class="btn btn-primary"
            >
              Edit
            </router-link>
            <button
              type="button"
              @click="deleteInventory(product.ID)"
              class="btn btn-danger"
            >
              Delete
            </button>
            <router-link to="/inventory" class="btn btn-info">Back</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      product: null,
      loading: true,
    };
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
    fetchProduct() {
      const id = this.$route.params.id;
      fetch(`https://inventorybackend-4mye.onrender.com/inventory/${id}`)
        .then((response) => response.json())
        .then((data) => {
          this.product = data;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          this.loading = false;
        });
    },
    deleteInventory(itemid) {
      axios
        .delete(
          `https://inventorybackend-4mye.onrender.com/delete-inventory/${itemid}`
        )
        .then(() => {
          this.fetchProduct();
          this.$router.push({ path: "/inventory" });
        });
    },
    goToEdit(itemid) {
      this.$router.push({ path: `/inventory/${itemid}` });
    },
  },
};
</script>
