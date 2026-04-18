const { removeCategory } = useDeleteCategory();

const handleDelete = (id) => {
  if (confirm("Are you sure you want to delete this category?")) {
    removeCategory(id, () => {
      refetch(); // 🔥 reload data after delete
    });
  }
};
