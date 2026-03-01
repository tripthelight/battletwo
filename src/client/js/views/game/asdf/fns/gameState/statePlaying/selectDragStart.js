export default (event) => {
  event.dataTransfer.setData("Text", event.target.innerHTML);
};
