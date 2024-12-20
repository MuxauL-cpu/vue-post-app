import { ref, onMounted, computed } from "vue";
import api from "../utils/Api";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function usePosts() {
  const posts = ref<Post[]>([]);
  const error = ref<string | null>(null);

  const currentPage = ref(1);
  const postsPerPage = 10;

  const createDrawer = ref(false);
  const editDrawer = ref(false);

  const newPost = ref<Post>({ id: 0, title: "", body: "" });
  const selectedPost = ref<Post>({ id: 0, title: "", body: "" });

  const snackbar = ref({ show: false, message: "" });

  const isDeleteModalOpen = ref(false);
  const selectedPostId = ref<number | null>(null);

  const openDeleteModal = (id: number) => {
    selectedPostId.value = id;
    isDeleteModalOpen.value = true;
  };

  const closeDeleteModal = () => {
    selectedPostId.value = null;
    isDeleteModalOpen.value = false;
  };

  const confirmDeletePost = () => {
    if (selectedPostId.value !== null) {
      posts.value = posts.value.filter(
        (post) => post.id !== selectedPostId.value
      );
      localStorage.setItem("posts", JSON.stringify(posts.value));
      snackbar.value = { show: true, message: "Пост удален успешно" };
    }
    closeDeleteModal();
    closeEditDrawer();
  };

  const pageCount = computed(() => {
    return Math.ceil(posts.value.length / postsPerPage);
  });

  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage;
    const end = start + postsPerPage;
    return posts.value.slice(start, end);
  });

  const openCreatePostDrawer = () => {
    newPost.value = { id: 0, title: "", body: "" };
    createDrawer.value = true;
  };

  const closeCreateDrawer = () => {
    createDrawer.value = false;
  };

  const openEditPostDrawer = (post: Post) => {
    selectedPost.value = { ...post };
    editDrawer.value = true;
  };

  const closeEditPostDrawer = () => {
    editDrawer.value = false;
  };

  const closeEditDrawer = () => {
    editDrawer.value = false;
  };

  const saveNewPost = () => {
    const maxId =
      posts.value.length > 0
        ? Math.max(...posts.value.map((post) => post.id))
        : 0;
    const newPostData = { ...newPost.value, id: maxId + 1 };
    posts.value.push(newPostData);
    localStorage.setItem("posts", JSON.stringify(posts.value));

    closeCreateDrawer();
    snackbar.value = { show: true, message: "Новый пост создан успешно" };
  };

  const saveEditedPost = () => {
    const index = posts.value.findIndex((p) => p.id === selectedPost.value.id);
    if (index !== -1) {
      posts.value.splice(index, 1, { ...selectedPost.value });
      localStorage.setItem("posts", JSON.stringify(posts.value));
    }

    closeEditPostDrawer();
    snackbar.value = { show: true, message: "Пост отредактирован успешно" };
  };

  onMounted(async () => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      posts.value = JSON.parse(savedPosts);
    } else {
      api
        .getPosts()
        .then((data) => {
          posts.value = data;
          localStorage.setItem("posts", JSON.stringify(posts.value));
        })
        .catch((err) => {
          error.value = err.error || "Неизвестная ошибка";
        });
    }
  });

  return {
    posts,
    error,
    currentPage,
    postsPerPage,
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
    openEditPostDrawer,
    closeEditPostDrawer,
    saveNewPost,
    saveEditedPost,
    closeEditDrawer,
  };
}
