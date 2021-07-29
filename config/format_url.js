module.exports = (text) => {
  return text.trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-");
}