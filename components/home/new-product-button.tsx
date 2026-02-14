import { BorderWidths, Colors, Paddings } from "@/constants/theme";
import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";

export default function NewProductButton() {
  return (
    <Link href="/products/new" style={styles.button}>
      <Text style={styles.buttonText}>Agregar</Text>
    </Link>
  );
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    padding: Paddings.button,
    borderRadius: BorderWidths.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.foreground,
    textAlign: 'center',
  },
});