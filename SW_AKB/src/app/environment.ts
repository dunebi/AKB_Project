export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyC7AvXXPfeMbKALWH6oEnCopl9yVZYNHC4",
    authDomain: "swakb-75fd5.firebaseapp.com",
    projectId: "swakb-75fd5",
    storageBucket: "swakb-75fd5.appspot.com",
    messagingSenderId: "524286232758",
    appId: "1:524286232758:web:8c28447a507d660761fe17",
    measurementId: "G-ZH1PSN66ZS"
  };

export const snapshotToArray = snapshot => {
    let returnArray = []
    snapshot.forEach(element => {
        let item = element.val()
        item.key = element.key
        returnArray.push(item)
    });
    return returnArray
}