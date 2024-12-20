<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="elevation-3">
          <v-card-title class="text-h5 text-center"
            >Загрузка файла</v-card-title
          >
          <v-divider></v-divider>
          <v-card-text>
            <v-file-input
              label="Выберите файл"
              v-model="uploadedFile"
              prepend-icon="mdi-upload"
              accept="image/*, .pdf, .doc, .docx"
              outlined
              dense
            />

            <v-btn
              @click="uploadFile"
              :disabled="!uploadedFile"
              color="primary"
              class="mt-3"
            >
              Отправить
            </v-btn>

            <v-alert
              v-if="uploadSuccess"
              type="success"
              dismissible
              class="mt-3"
            >
              Файл успешно загружен.
            </v-alert>

            <v-alert v-if="uploadError" type="error" dismissible class="mt-3">
              {{ uploadError }}
            </v-alert>

            <v-btn
              v-if="downloadUrl"
              :href="downloadUrl"
              target="_blank"
              download
              color="success"
              class="mt-3"
            >
              Скачать файл
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";

const uploadedFile = ref<File | null>(null);
const uploadSuccess = ref(false);
const uploadError = ref<string | null>(null);
const downloadUrl = ref<string | null>(null);

const uploadFile = async () => {
  if (uploadedFile.value) {
    const formData = new FormData();
    formData.append("file", uploadedFile.value);

    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Файл успешно загружен:", result);

      uploadSuccess.value = true;
      uploadError.value = null;
      downloadUrl.value = result.location || result.url || "";
    } catch (error) {
      console.error("Ошибка при загрузке файла:", error);
      uploadSuccess.value = false;
      uploadError.value =
        error instanceof Error ? error.message : "Неизвестная ошибка";
    }
  }
};
</script>

<style scoped>
.v-card {
  padding: 20px;
  border-radius: 12px;
  background-color: #f9f9f9;
}

.v-btn {
  width: 100%;
}

.v-alert {
  font-size: 14px;
}
</style>
