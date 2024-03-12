<script setup>
import { ref, watch } from "vue";
import throttle from 'lodash/throttle';
import DeleteModal from "../../../global-components/modal/IndexDeleteModal.vue";
import SearchInput from "../../../components/filters/SearchInput.vue";
import PageSizeSelect from "../../../components/filters/PageSizeSelect.vue";
import Pagination from "../../../components/filters/Pagination.vue";
import { useAccountsStore } from "../../../stores/accountsStore";

const accountsStore = useAccountsStore();
const showModal = ref(false)
const search = ref("")
const AccountToDelete = ref(null)

const deleteAccount = () => {
    console.log('delete ' + AccountToDelete.value);
    showModal.value = false;
    accountsStore.deleteAccount(AccountToDelete.value);
};

function pageSelection(value) {
    accountsStore.setPageNumber(value);
};

const showDeleteModal = (id) => {
    showModal.value = true;
    AccountToDelete.value = id;
};


watch(
    () => accountsStore.getFilters,
    () => {
        accountsStore.fetchAccounts()
    },
    { immediate: true, deep: true }
)
watch(
    search,
    throttle(() => {
        accountsStore.setSearchFilter(search.value);
    }, 1200), { deep: true }
)
</script>

<template>
    <h2 class="intro-y text-lg font-medium mt-10">
        Accounts</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
            <router-link class="btn btn-primary shadow-md mr-2" :to="{ name: 'account.create' }">Aggiungi Account</router-link>
            <Dropdown>
                <DropdownToggle class="btn px-2 box">
                    <span class="w-5 h-5 flex items-center justify-center">
                          <PlusIcon class="w-4 h-4" />
                        </span>
                </DropdownToggle>
                <DropdownMenu class="w-40">
                    <DropdownContent>
                        <DropdownItem>
                            <PrinterIcon class="w-4 h-4 mr-2" /> Print
                        </DropdownItem>
                        <DropdownItem>
                            <FileTextIcon class="w-4 h-4 mr-2" /> Export to Excel
                        </DropdownItem>
                        <DropdownItem>
                            <FileTextIcon class="w-4 h-4 mr-2" /> Export to PDF
                        </DropdownItem>
                    </DropdownContent>
                </DropdownMenu>
            </Dropdown>
            <div class="hidden md:block mx-auto text-slate-500">
            </div>
            <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                <search-input v-model="search"></search-input>
            </div>
        </div>
        <!-- BEGIN: Data List -->
        <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
            <table class="table table-report -mt-2">
                <thead>
                    <tr>
                        <th class="whitespace-nowrap">IMAGES</th>
                        <th class="whitespace-nowrap">ACCOUNT</th>
                        <th class="text-center whitespace-nowrap">SALDO INIZIALE</th>
                        <th class="text-center whitespace-nowrap">STATUS</th>
                        <th class="text-center whitespace-nowrap">AZIONI</th>
                    </tr>
                </thead>
                <tbody v-show="!accountsStore.getIsLoading">
                    <tr v-for="account in accountsStore.accounts" :key="account.id" class="intro-x">
                        <td class="w-40">
                            <div class="flex">
                                <div class="w-10 h-10 image-fit zoom-in">
                                    <Tippy tag="img" alt="Rocketman Tailwind HTML Admin Template" class="rounded-full" src="" content="" />
                                </div>
                            </div>
                        </td>
                        <td>
                            <a href="" class="font-medium whitespace-nowrap">
                                {{ account.name }}
                            </a>
                            <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                
                            </div>
                        </td>
                        <td class="text-center"></td>
                        <td class="w-40">
                            <div class="flex items-center justify-center">
                                <CheckSquareIcon class="w-4 h-4 mr-2" />
                                <!-- {{ faker.trueFalse[0] ? "Active" : "Inactive" }} -->
                            </div>
                        </td>
                        <td class="table-report__action w-56">
                            <div class="flex justify-center items-center">
                                <router-link :to="{ name: 'account.edit', params: { slug: account.slug } }" class="flex items-center mr-3" href="javascript:;">
                                    <CheckSquareIcon class="w-4 h-4 mr-1" /> Modifica
                                </router-link>
                                <a class="flex items-center text-danger" href="javascript:;" @click="showDeleteModal(account.id)">
                                    <Trash2Icon class="w-4 h-4 mr-1" /> Elimina
                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- END: Data List -->
        <!-- BEGIN: Pagination -->
        <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
            <Pagination v-model="accountsStore.pagination" @pageSelection="pageSelection"></Pagination>
            <PageSizeSelect v-model="accountsStore.filters.pageSize" />
        </div>
        <!-- END: Pagination -->
    </div>
    <DeleteModal v-model="showModal" @delete="deleteAccount" />
</template>
  
  
  