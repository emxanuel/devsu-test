import { BorderWidths, Colors, Paddings } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface DeleteProductModalProps {
  visible: boolean;
  productName: string;
  onClose: () => void;
  onConfirm: () => void;
  isPending?: boolean;
}

export default function DeleteProductModal({
  visible,
  productName,
  onClose,
  onConfirm,
  isPending = false,
}: DeleteProductModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.drawer} onPress={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={24} color={'#777'} />
            </Pressable>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentText}>¿Estás seguro de eliminar el producto {productName}?</Text>
          </View>
          <View style={styles.buttons}>
            <Pressable
              style={[styles.deleteButton, isPending && styles.deleteButtonDisabled]}
              onPress={onConfirm}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator size="small" color={Colors.foregroundLight} />
              ) : (
                <Text style={styles.deleteText}>Confirmar</Text>
              )}
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 32,
  },
  header: {
    padding: 16,
    alignItems: "flex-end",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  contentText: {
    fontSize: 16,
    textAlign: "center",
  },
  content: {
    marginBottom: 24,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight,
  },
  buttons: {
    gap: 12,
    padding: 16,
  },
  cancelButton: {
    padding: Paddings.button,
    borderRadius: BorderWidths.button,
    alignItems: "center",
    backgroundColor: Colors.gray,
  },
  cancelText: {
    color: Colors.foreground,
    fontWeight: "600",
  },
  deleteButton: {
    padding: Paddings.button,
    borderRadius: BorderWidths.button,
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  deleteButtonDisabled: {
    opacity: 0.7,
  },
  deleteText: {
    color: Colors.foreground,
    fontWeight: "600",
  },
});
