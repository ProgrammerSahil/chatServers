const getTheme = (chatRoom) => {
    let colors = {
      background: "#00a8ff",
      primary: "#0266c8",
      light: "#0266c8"
    }
    if(chatRoom == "Vercetti"){
      colors = {
        background: "#00a8ff",
        primary: "#0266c8",
        light: "#0266c8"
      }
    }
    else if(chatRoom == "Vagos"){
      colors = {
        background: "#ffc95b",
        primary: "#f98f21",
        light: "#25bcc0"
      }
    }
    else{
      colors = {
        background: "#e1e1e1",
        primary: "#36682c",
        light: "#accbf1"
      }
    }
    return colors;
  }

module.exports = { getTheme };