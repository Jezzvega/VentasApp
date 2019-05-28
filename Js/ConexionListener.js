var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
if (snap.val() === true) {
  iziToast.success({
  title: 'Estado',
  message: 'Online!',
  });
} else {
  iziToast.error({
      title: 'Estado',
      message: 'Offline',
  });
}
});
