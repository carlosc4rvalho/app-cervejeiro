import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 32,
    padding: 20,
  },
  header: {
    fontSize: 36,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    width: '100%',
  },
  button: {
    backgroundColor: '#1D5928',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    width: '100%',
    height: 150,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
});
