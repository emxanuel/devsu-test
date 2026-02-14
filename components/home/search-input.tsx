import { StyleSheet, TextInput, View } from "react-native";

export default function SearchInput() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Search" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});