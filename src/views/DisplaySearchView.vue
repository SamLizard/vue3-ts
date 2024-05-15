<template>
  <div align="center" class="mt-8">
    <user-filter @filter="updatefilters"></user-filter>
    <v-progress-linear indeterminate color="primary" v-if="loadingItems" />
    <v-data-table :headers="headers" :items="filteredItems" hide-default-footer disable-pagination
      class="itemTable component" :key="$i18n.locale" v-else>
      <template v-for="header in headers" :key="header.value" #:[`header.${header.value}`]="{ header }">
        <span>{{ header.title }}2</span>
        <!-- <span>{{ $t(header.title) }}</span> -->
      </template>
      <!-- <template v-slot:[`item.actions`]="{ item }">
        <v-progress-circular indeterminate color="primary" v-if="deletingItem === item.id" />
        <v-icon @click="deleteItem(item)" class="me-2" :title="$t('cancel')" v-else>
          delete
        </v-icon>
      </template>
<template v-slot:[`item.itemDate`]="{ item }">
        <tr>
          <td>
            {{ formatDate(item.itemDate) }}
          </td>
        </tr>
      </template> -->
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { getItems, deleteItem } from "../DL/DL";
import UserFilter from "../components/UserFilter.vue";
import { ref, type Ref, computed } from "vue";
import { useI18n } from 'vue-i18n';
const i18n = useI18n();
const t = i18n.t;
import Swal from 'sweetalert2';

type item = {
  itemDate: string;
  itemTime: string;
  id: string;
};

const items: Ref<Array<Item>> = ref([]);
const filteredItems: Ref<Array<Item>> = ref([]);
const loadingItems: Ref<boolean> = ref(true);

const setupData = async () => {
  try {
    items.value = await getItems();
    removeTimeLeading();
    items.value = items.value.map((item) => ({
      ...item,
      itemDate: parseDate(item.itemDate),
    }));
    filteredItems.value = items.value;
    loadingItems.value = false;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: err.message,
      confirmButtonText: t("ok"),
    });
    loadingItems.value = false;
  }
};

const parseDate = (dateStr) => {
  let [day, month, year] = dateStr.split(".").map(Number);
  return new Date(year, month - 1, day);
};

setupData();

const currentTimePrecision: Ref<number> = ref(null);

const removeTimeLeading = () => {
  let maxPrecision = 0; // 0 means no seconds or milliseconds, 1 means seconds, 2 means milliseconds

  items.value.forEach((item) => {
    let timeParts = item.itemTime
      .split(/:|\./)
      .map((part) => parseInt(part));
    if (timeParts.length > 3 && timeParts[3] !== 0) {
      maxPrecision = 2;
    } else if (timeParts.length > 2 && timeParts[2] !== 0) {
      maxPrecision = 1;
    }
  });

  if (currentTimePrecision.value === maxPrecision) {
    return;
  }

  currentTimePrecision.value = maxPrecision;

  // Add leading zeros to the hours, minutes, and seconds (if necessary)
  for (let i = 0; i < items.value.length; i++) {
    let timeParts = items.value[i].itemTime
      .split(/:|\./)
      .map((part) => parseInt(part));
    if (maxPrecision === 2 && timeParts.length <= 3) {
      timeParts[3] = 0;
    }
    if (maxPrecision >= 1 && timeParts.length <= 2) {
      timeParts[2] = 0;
    }
    if (maxPrecision === 0 && timeParts.length > 2) {
      timeParts.splice(2, 2); // remove seconds
    }

    // Pad each part with zeroes until it reaches the desired length
    timeParts = timeParts.map((part, index) =>
      String(part).padStart(index < 3 ? 2 : 4, "0")
    );

    // Join the time parts back together
    if (timeParts.length === 4) {
      items.value[i].itemTime = [
        timeParts.slice(0, 3).join(":"),
        "." + timeParts[3],
      ].join("");
    } else {
      items.value[i].itemTime = timeParts.join(":");
    }
  }
};


const headers: Ref<Array<Record<string, string | boolean>>> = ref([
  { title: "date", value: "itemDate", sortable: true },
  { title: "time", value: "itemTime", sortable: true },
  { value: "actions", sortable: false },
]);


type Filters = {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
};

const filters: Ref<Filters> = ref({
  startDate: "0000-01-01",
  endDate: "9999-12-31",
  startTime: "00:00:00.0000",
  endTime: "23:59:59.9999",
});

const updatefilters = (filters: Filters): void => {
  filters.value = filters;
  filter();
};

const filter = () => {
  filteredItems.value = items.value.filter((item: item) => {
    return (
      item.itemDate.toISOString().substring(0, 10) >= filters.value.startDate &&
      item.itemDate.toISOString().substring(0, 10) <= filters.value.endDate &&
      timeToMillis(item.itemTime) >= timeToMillis(filters.value.startTime) &&
      timeToMillis(item.itemTime) <= timeToMillis(filters.value.endTime)
    );
  });
};

const timeToMillis = (time) => {
  const parts = time.split(/:|\./).map(Number);
  let hours = parts[0] || 0;
  let minutes = parts[1] || 0;
  let seconds = parts[2] || 0;
  let milliseconds = parts[3] || 0;
  return hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
};


//       deletingItem: null,
//   methods: {
//     async deleteItem(item) {
//       this.deletingItem = item.id;
//       try {
//         const deleted = await deleteItem(item.itemDate, item.itemTime, item.id);
//         if (deleted) {
//           this.items = this.items.filter((curr) => curr.id !== item.id);
//           this.removeTimeLeading();
//           this.filter();
//           this.$swal.fire({
//             title: this.$t("deleted") + "!",
//             text: this.$t("deletedItemMessage", {
//               itemName: this.$t("item.item"),
//             }),
//             icon: "success",
//             confirmButtonText: this.$t("ok"),
//           });
//         }
//       } catch (err) {
//         this.$swal.fire({
//           icon: "error",
//           title: err.message,
//           confirmButtonText: this.$t("ok"),
//         });
//       } finally {
//         this.deletingItem = null;
//       }
//     },

const dateFormatOptions = { year: "numeric", month: "numeric", day: "numeric" };

const formatDate = (date: Date): string => {
  return date.toLocaleDateString(i18n.locale, dateFormatOptions);
};

</script>
<style scoped>
.itemTable {
  width: 95%;
}
</style>