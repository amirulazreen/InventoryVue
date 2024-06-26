export function renderNotification(text) {
  let notification = document.getElementById("notification");
  notification.textContent = text;
  notification.style.border = "solid red";
  notification.style.color = "red";

  notification.style.transition = "none";
  notification.style.opacity = "1";

  setTimeout(function () {
    notification.style.transition = "opacity 1s ease";
    notification.style.opacity = "0";
    setTimeout(function () {
      notification.textContent = "";
    }, 1000);
  }, 3000);
}
