<template>
  <div class="formDiv pr">
    <form>
      <div class="form-group">
        <input
          onkeypress="if(event.keyCode == 13) return false;"
          @keyup.enter="getKey"
          v-model="searchKey"
          type="text"
          class="form-control"
          :placeholder="getPlaceholder"
        />
      </div>
      <span @click="getKey" class="searchBtn pa"></span>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["parentsCom"],
  data() {
    return {
      searchKey: "",
      getPlaceholder: ""
    };
  },
  created() {
    console.log(this.parentsCom);
    if (this.parentsCom == "person")
      this.getPlaceholder = "请输入理财人员名称、证书编号或从业机构";
    if (this.parentsCom == "home")
      this.getPlaceholder = "请输入理财产品名称、理财机构或产品登记编码";
  },
  methods: {
    ...mapActions(["setSearchKey", "setListNo", "setPageNum"]),
    getKey() {
      console.log(this.searchKey);
      this.setSearchKey(this.searchKey);
      this.setPageNum(1);
      this.setListNo(true);
    }
  },
  computed: mapGetters(["getSearchKey"]),
  watch: {
    getSearchKey: {
      handler(newVal, oldValue) {
        this.searchKey = newVal;
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.formDiv {
  width: 100%;
}

.formDiv input {
  width: 100%;
  height: 40px;
  border-radius: 12px;
  font-size: 1.2rem;
  padding-left: 40px;
  border: none;
  outline: none;
  color: #666;
}

.formDiv .searchBtn {
  display: block;
  width: 19px;
  height: 19px;
  background: url(../../images/searchBtn.png) no-repeat left top;
  background-size: 100% 100%;
  left: 11px;
  top: 11px;
}
</style>