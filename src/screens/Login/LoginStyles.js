import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    margin: 48,
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 32,
    gap: 20,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, .5)',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    color: '#A8805F',
    borderWidth: 2,
    borderRadius: 20,
    padding: 16,
    fontSize: 16,
  },
  loginBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#683B0F',
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '90%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  registerBtnText: {
    color: '#683B0F',
    fontWeight: 'bold',
    fontSize: 12,
  },
});