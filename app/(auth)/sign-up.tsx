import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
const SignUp = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setisSubmitting] = useState(false);
  const handleSubmit = async () => {
    if (!form.email || !form.password || form.userName)
      Alert.alert("Error", "Please fill in all the fields");

    setisSubmitting(true);
    try {
      await createUser(form.email, form.password, form.userName);
      // set it to global state...
      router.replace("/sign-in");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setisSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-white text-2xl text-semibold mt-10 font-psemibold">
            {" "}
            Sign Up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.userName}
            handleChangeText={(e) =>
              setForm({
                ...form,
                userName: e,
              })
            }
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) =>
              setForm({
                ...form,
                email: e,
              })
            }
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) =>
              setForm({
                ...form,
                password: e,
              })
            }
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex-row gap-2 justify-center pt-5 text-center">
            <Text className="text-lg text-gray-100 font-pregular ">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg text-secondary-100 font-psemibold"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
