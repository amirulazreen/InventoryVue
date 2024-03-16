<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Add item</h4>
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
            Save
          </button>
          <RouterLink to="inventory" class="btn btn-info"> Back </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ItemCreate",
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
      },
    };
  },
  methods: {
    saveItem() {
      axios
        .post("https://inventorybackend-4mye.onrender.com/add-inventory", this.model)
        .then((res) => {
          console.log(res);
          alert("Item added");
          this.$router.push({ path: "/inventory" });
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
