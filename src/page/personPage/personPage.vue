<template>
  <div>
    <headerCom parentsCom="person"></headerCom>
    <personListCom></personListCom>
  </div>
</template>

<script>
import headerCom from "../../components/header/header";
import personListCom from "../../components/itemList/personList";
export default {
  components: { headerCom, personListCom }
};
</script>

<style>
</style>