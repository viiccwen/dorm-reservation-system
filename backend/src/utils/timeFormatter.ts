const FormateTime = (time: string) => {
  const date = new Date(time);
  return date.toISOString().replace("T", " ").split(".")[0];
};

export default FormateTime;