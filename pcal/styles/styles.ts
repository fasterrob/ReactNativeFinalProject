import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "70%",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    elevation: 10,
  },

  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  backgroundScreen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  circle: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "35%",
    backgroundColor: "#2AB793",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    elevation: 10,
  },

  circleScreen: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "20%",
    backgroundColor: "#2AB793",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    elevation: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginTop: 10,
    marginLeft: 15,
  },
  logoContainer: {
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: 80,
    top: 40,
    textAlign: "center",
  },
  logoText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 80,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2AB793",
    borderRadius: 60,
    height: 120,
    padding: 30,
    marginVertical: 20,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 16,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainerBMI:{
    marginLeft: 10,
    marginTop: 10,
    width:100,
    height:100,
  },
  backgroundBMI: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  containerBMI: {
    width: '80%',
    height: '40%',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 10,
    marginTop: 20,

  },
  headerBMI: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '15%',
    position: 'absolute',

  },
  circleBMI: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '20%',
    backgroundColor: '#2AB793',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    elevation: 10,
  },
  titleBMI: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 30,
  },
  fontBMI: {
    fontSize: 18,
    marginLeft: 30,
    marginTop: 20,
  },
  textBox: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#dedede',
    height: 40,
    paddingLeft: 10,
  },
  caloriePlanText:{
    marginRight: 30,
    textAlign: 'right',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
});
export default styles;
