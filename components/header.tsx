import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Header() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Banco</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgb(51, 66, 110)",
  },
});