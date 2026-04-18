import { useState, useEffect } from "react";
import { useCategory } from "./useShowCategory";

export const useEditCategoryForm = (id) => {
  const { data, loading } = useCategory(id);

  const [form, setForm] = useState({ name: "" });

  useEffect(() => {
    if (data) {
      setForm({ name: data.name });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return {
    form,
    setForm,
    handleChange,
    loading,
  };
};