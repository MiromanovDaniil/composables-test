<script setup lang="ts">
import Form from './Form.vue';
</script>

<template>
  <div class="form-container">
   <Form></Form>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 20px;
}
</style>