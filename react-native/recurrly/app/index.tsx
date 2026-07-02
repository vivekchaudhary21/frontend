import '@/global.css'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-success">
        Welcome to Native wind!
      </Text>
      <Link
        href="/(auth)/sign-in"
        className="mt-4 rounder bg-primary text-white p-4"
      >
        Sign In
      </Link>
      <Link
        href="/(auth)/sign-up"
        className="mt-4 rounder bg-primary text-white p-4"
      >
        Sign Up
      </Link>
    </View>
  )
}
