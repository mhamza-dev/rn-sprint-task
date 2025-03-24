import { StyleSheet } from "react-native";

// Components
import AppText from "../AppText";

// Utils
import { colors, fontFamily, fontSize, spacing } from "../../utils";

const ErrorMessage = ({ error }) => {
  if (!error) return null;
  return <AppText style={styles.errorText}>{error}</AppText>;
};

const styles = StyleSheet.create({
  errorText: {
    color: colors.error,
    fontSize: fontSize.small,
    marginLeft: spacing.small,
    fontFamily: fontFamily.italic,
  },
});

export default ErrorMessage;
