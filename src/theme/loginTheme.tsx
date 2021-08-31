import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    height: 600,
    marginBottom: 50
  },
  title: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop:20
  },
  label: {
    marginTop: 25,
    fontSize: 20,
    color: '#ffffff',
    fontWeight: "bold",
  },
  inputField: {
    color: '#ffffff',
    fontSize: 20,
    flex:1
  },
  inputFieldIos: {
    borderBottomColor: '#ffffff',
    borderBottomWidth: 2,
    paddingBottom: 4
  },
  buttonContainer: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 2,
    borderColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff'  
  },
  newUserContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputIcon: {
    marginTop: 2,
    marginRight: 2
  }
});

export default loginStyles