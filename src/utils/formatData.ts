const formatData = (form: HTMLFormElement): FormData => {
  const formData = new FormData(form);

  formData.append('file', form.files[0]);

  return formData;
};

export default formatData;
