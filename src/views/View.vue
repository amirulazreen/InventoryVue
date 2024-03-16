<template>
  <div class="containerx">
    <h2 class="header">Inventory System</h2>
    <div class="search_column">
      <input type="text" placeholder="search..." v-model="search" />
      <select v-model="selectedOption">
        <option value="ID">ID</option>
        <option value="Item">Item</option>
        <option value="Quantity">Quantity</option>
        <option value="Price">Price</option>
      </select>
      <RouterLink to="add-inventory" class="btn btn-primary">
        Add item
      </RouterLink>
      <button
        type="button"
        @click="addManyItems()"
        class="btn btn-danger"
        :disabled="loading"
      >
        {{ loading ? "Loading..." : "Populate" }}
      </button>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th class="idd">No</th>
            <th class="idd" @click="handleSort('ID')">ID</th>
            <th @click="handleSort('item')">Item</th>
            <th class="numb" @click="handleSort('quantity')">Quantity</th>
            <th class="numb" @click="handleSort('price')">Price/Product (RM)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in paginatedInventory"
            :key="item.ID"
            @click="goToEdit(item.ID)"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.ID }}</td>
            <td>{{ item.item }}</td>
            <td class="numb">{{ item.quantity.toLocaleString() }}</td>
            <td class="numb"> 
                {{
                  item.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <button
        class="btn btn-primary"
        @click="previousPage"
        :disabled="currentPage === 1"
      >
        Prev
      </button>
      <span class="page">Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        class="btn btn-primary"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "inventory",
  data() {
    return {
      search: "",
      selectedOption: "Item",
      inventory: [],
      pageSize: 10,
      currentPage: 1,
      sortBy: "",
      sortDirection: "asc",
      loading: false,
    };
  },
  mounted() {
    this.getInventory();
  },
  methods: {
    getInventory() {
      axios
        .get("https://inventorybackend-4mye.onrender.com/inventory")
        .then((response) => {
          this.inventory = response.data;
        })
        .catch((error) => {
          console.error("Error fetching inventory:", error);
        });
    },
    goToEdit(itemid) {
      this.$router.push({ path: `/inventory/${itemid}` });
    },
    handleSort(column) {
      if (this.sortBy === column) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortBy = column;
        this.sortDirection = "asc";
      }

      this.inventory.sort((a, b) => {
        let aValue = a[column];
        let bValue = b[column];

        if (column === "Price" || column === "Quantity") {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        }

        if (this.sortDirection === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      this.currentPage = 1;
    },
    addManyItems() {
      if (confirm("Populate?")) {
        this.loading = true; 
        axios
          .post("http://localhost:8080/add-many")
          .then((response) => {
            console.log(response.data);
            this.getInventory();
          })
          .catch((error) => {
            console.error("Error adding items:", error);
            alert(error);
          })
          .finally(() => {
            this.loading = false; 
          });
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  computed: {
    filteredInventory() {
      const searchTerm = this.search.toLowerCase();
      const selectedOption = this.selectedOption;

      return this.inventory.filter((item) => {
        switch (selectedOption) {
          case "Item":
            return item.item.toLowerCase().includes(searchTerm);
          case "Price":
            return item.price.toString().includes(searchTerm);
          case "ID":
            return item.ID.toString().includes(searchTerm);
          case "Quantity":
            return item.quantity.toString().includes(searchTerm);
          default:
            return true;
        }
      });
    },
    paginatedInventory() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredInventory.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredInventory.length / this.pageSize);
    },
  },
};
</script>
