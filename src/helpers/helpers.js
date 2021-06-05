export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = err => reject(err);
    reader.onload = () => resolve(reader.result.toString("base64"));
    reader.readAsDataURL(file);
  });
}
