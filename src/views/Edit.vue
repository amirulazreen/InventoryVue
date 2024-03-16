<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Edit item</h4>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="">Item</label>
          <input type="text" v-model="model.item" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="">Price</label>
          <input type="number" v-model="model.price" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="">Quantity</label>
          <input type="number" v-model="model.quantity" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="">Supplier Name</label>
          <input
            type="text"
            v-model="model.supplier.name"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="">Supplier Contact</label>
          <input
            type="text"
            v-model="model.supplier.tel"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="">Supplier Address</label>
          <input
            type="text"
            v-model="model.supplier.address"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <button type="button" @click="saveItem" class="btn btn-primary">
            Update
          </button>
          <router-link to="/inventory" class="btn btn-info">Back</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "InventoryEdit",
  data() {
    return {
      model: {
        item: "",
        price: null,
        quantity: null,
        supplier: {
          name: "",
          address: "",
          tel: "",
        },
        originalData: {},
      },
    };
  },
  mounted() {
    const itemId = this.$route.params.id;
    this.getItemData(itemId);
  },
  methods: {
    getItemData(itemId) {
      axios
        .get(`https://inventorybackend-4mye.onrender.com/inventory/${itemId}`)
        .then((response) => {
          this.model = { ...response.data };
          this.setOriginalData();
        })
        .catch((error) => {
          console.error("Error fetching item data:", error);
        });
    },
    setOriginalData() {
      this.model.originalData = { ...this.model }; 
    },
    saveItem() {
      axios
        .put(
          `https://inventorybackend-4mye.onrender.com/update-inventory/${this.$route.params.id}`,
          this.model
        )
        .then((response) => {
          console.log(response);
          alert("Item updated successfully");
          this.$router.push({
            path: `/inventory/${this.$route.params.id}`,
          });
        })
        .catch((error) => {
          let errorMessage = "Failed to add item";
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            errorMessage = error.response.data.error;
          }
          alert(errorMessage);
        });
    },
  },
};
</script>
