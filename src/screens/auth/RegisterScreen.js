import colors from "../../constants/colors";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation();

    const handlerRegister = async () => {
        if (!name || !email || !passWord || !confirmPassWord) {
            setError("Los campos deben de ser obligatorios!");
            return;
        }

        if (password !== confirmPassWord) {
            setError("Las contraseñas no coinciden!");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe de tener minimo 6 caracteres");
            return;
        }
        setError('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Actualizar y mostrar el nombre del usuario
            await updateProfile(user, { displayName: name });
            Alert.alert("Registro exitoso",);
        } catch (error) {
            console.error("Código de error:", error.code);
            console.error("Mensaje de error:", error.message);
            console.error("Error completo:", error);

            let errorMessage = "Error al registar el usuario.";

            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = "El correo electrónico ya está en uso.";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "El formato del correo electrónico no es válido.";
                    break;
                case 'auth/weak-password':
                    errorMessage = "La contraseña es muy débil.";
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = "La operación no está permitida.";
                    break;
                case 'auth/network-request-failed':
                    errorMessage = "Error de red. Por favor, inténtalo de nuevo.";
                    break;
                case 'auth/invalid-apy-key':
                    errorMessage = "La API key no esta configurada correctamente.";
                    break;
                case 'auth/configuration-not-found':
                    errorMessage = "La configuración de firebase no se encontró.";
                    break;
                default:
                    errorMessage = `${error.message || `Error desconocido`} (Código: ${error.code})`;
                    break;
            }

            setError(errorMessage);
        }
    }

    return (
        <LinearGradient colors={[colors.gradientePrimario, colors.gradienteSecundario]} style={styles.container}>
            <view>
                <Text styles={styles.title}>Registro</Text>
                <Ionicons name="person-outline" size={24} color={colors.blanco} />
                <TextInput styles={styles.input} placeholder="Nombre Completo" value={name}
                    onChangeText={setName}
                    autoCapitalizate="words"
                />
            </view>
            {error ? <Text>{error}</Text> : null}

            <TouchableOpacity onPress={handlerRegister}>
                <Text>Registarse</Text>
            </TouchableOpacity>

        </LinearGradient>
    )

};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.principal,
    },
};


export default RegisterScreen;