import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  greeting: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 20,
    padding: 16,
    backgroundColor: '#A6A6A6',
    opacity: 0.8,
  },
  addBtnText: {
    fontSize: 32,
    fontWeight: 'semibold',
  },
});

export default styles;
