<template>
  <v-container>
    <h2 class="page-title">Список постов</h2>
    <v-btn @click="openCreatePostDrawer" color="primary" class="mb-4">
      Создать пост
    </v-btn>

    <v-simple-table v-if="$vuetify.breakpoint.mdAndUp">
      <thead>
        <tr>
          <th>ID</th>
          <th>Заголовок</th>
          <th>Текст</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="post in paginatedPosts"
          :key="post.id"
          @click="openEditPostDrawer(post)"
        >
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.body }}</td>
        </tr>
      </tbody>
    </v-simple-table>

    <!-- Модальное окно подтверждения -->
    <v-dialog v-model="isDeleteModalOpen" max-width="400">
      <v-card>
        <v-card-title class="headline"> Подтвердите удаление </v-card-title>
        <v-card-text>
          Вы уверены, что хотите удалить пост с ID: {{ selectedPostId }}?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="closeDeleteModal"> Отмена </v-btn>
          <v-btn color="error" text @click="confirmDeletePost"> Удалить </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Пагинация -->
    <v-pagination
      v-if="posts.length > 0"
      v-model:page="currentPage"
      :length="pageCount"
      :total-visible="$vuetify.breakpoint.mdAndUp ? 5 : 3"
      prev-icon="mdi-chevron-left"
      next-icon="mdi-chevron-right"
    />

    <!-- Drawer для создания поста -->
    <keep-alive>
      <v-navigation-drawer
        v-model="createDrawer"
        app
        :temporary="$vuetify.breakpoint.smAndDown"
      >
        <v-container>
          <div class="drawer-header">
            <h3>Создание поста</h3>
            <v-btn icon @click="closeCreateDrawer" class="close-btn">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <v-form>
            <v-text-field v-model="newPost.title" label="Заголовок" required />
            <v-textarea v-model="newPost.body" label="Текст" required />
            <v-btn
              type="submit"
              color="primary"
              :disabled="!newPost.title || !newPost.body"
              @click="saveNewPost"
            >
              Создать
            </v-btn>
          </v-form>
        </v-container>
      </v-navigation-drawer>
    </keep-alive>

    <!-- Drawer для редактирования поста -->
    <keep-alive>
      <v-navigation-drawer
        v-model="editDrawer"
        app
        :temporary="$vuetify.breakpoint.smAndDown"
      >
        <v-container>
          <div class="drawer-header">
            <h3>Редактирование поста</h3>
            <v-btn icon @click="closeEditDrawer" class="close-btn">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <v-form>
            <v-text-field
              v-model="selectedPost.title"
              label="Заголовок"
              required
            />
            <v-textarea v-model="selectedPost.body" label="Текст" required />
            <v-btn
              type="submit"
              color="primary"
              :disabled="!selectedPost.title || !selectedPost.body"
              @click="saveEditedPost"
            >
              Сохранить
            </v-btn>
            <v-btn
              color="error"
              :disabled="!selectedPost.title || !selectedPost.body"
              @click="openDeleteModal(selectedPost.id)"
            >
              Удалить
            </v-btn>
          </v-form>
        </v-container>
      </v-navigation-drawer>
    </keep-alive>

    <!-- Snackbar для уведомлений -->
    <v-snackbar v-model="snackbar.show" color="success" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import usePosts from "../utils/usePosts";

const {
  posts,
  currentPage,
  createDrawer,
  editDrawer,
  newPost,
  selectedPost,
  snackbar,
  isDeleteModalOpen,
  selectedPostId,
  openDeleteModal,
  closeDeleteModal,
  confirmDeletePost,
  pageCount,
  paginatedPosts,
  openCreatePostDrawer,
  closeCreateDrawer,
  closeEditDrawer,
  openEditPostDrawer,
  saveNewPost,
  saveEditedPost,
} = usePosts();
</script>

<style scoped>
.page-title {
  font-size: 24px;
  margin-bottom: 16px;
}

.mobile-cards {
  margin-top: 16px;
}

.v-card {
  margin-bottom: 16px;
  cursor: pointer;
}

.v-card-title {
  font-size: 18px;
}

@media (max-width: 600px) {
  .page-title {
    font-size: 20px;
    text-align: center;
  }

  .drawer-header h3 {
    font-size: 18px;
  }
}
</style>
