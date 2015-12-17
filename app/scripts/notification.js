function notifyMe(message) {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  else if (Notification.permission === "granted") {
        var options = {
                body: message,
                icon: "../images/favicon.png",
                dir : "ltr"
             };
          var notification = new Notification("Hi there",options);
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (!('permission' in Notification)) {
        Notification.permission = permission;
      }

      if (permission === "granted") {
        var options = {
              body: message,
              icon: "../images/favicon.png",
              dir : "ltr"
          };
        var notification = new Notification("Hi there.",options);
      }
    });
  }
}