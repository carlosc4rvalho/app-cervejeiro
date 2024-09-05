import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 8,
    marginHorizontal: 16,
    marginVertical: 32,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#206A30',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'medium',
  },
  detail: {
    fontSize: 16,
  },
});

export default styles;
