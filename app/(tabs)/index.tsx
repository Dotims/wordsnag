import { useWordStore } from "@/store/words";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// hard offset, zero blur = 3D block shadow (neobrutalist)
const blockShadow = {
  boxShadow: "5px 5px 0px #E0E3FF",
};

export default function Home() {
  const insets = useSafeAreaInsets();
  const wordCount = useWordStore((s) => s.words.length);

  return (
    <View className="flex-1 bg-surface">
      <ScrollView
        className="px-[20px] py-[10px]"
        showsVerticalScrollIndicator={false}
      >
        {/* header */}
        <View className="pb-7 pt-3">
          <Text className="text-sm font-medium text-muted">Good to see you</Text>
          <View className="mt-1 flex-row items-center justify-between">
            <Text className="text-3xl font-bold text-ink">Let&apos;s learn</Text>
            <View className="rounded-full bg-primary-tint px-3 py-1.5">
              <Text className="text-xs font-semibold text-primary">5 day streak</Text>
            </View>
          </View>
        </View>

        {/* today card */}
        <Animated.View entering={FadeInDown.duration(450)}>
          <View
            className="rounded-3xl border border-line bg-white p-6"
            style={blockShadow}
          >
            <Text className="text-xs font-semibold uppercase tracking-widest text-muted">
              Today
            </Text>
            <Text className="mt-2 text-2xl font-bold text-ink">
              5 words to review
            </Text>

            <View className="mt-5 h-1.5 overflow-hidden rounded-full bg-line">
              <View
                className="h-1.5 rounded-full bg-primary"
                style={{ width: "40%" }}
              />
            </View>
            <Text className="mt-2 text-xs text-muted">2 of 5 done</Text>

            <Pressable className="mt-6">
              {({ pressed }) => (
                <View style={{ height: 56 }}>
                  {/* base: dark, anchored to bottom, never moves */}
                  <View
                    className="absolute inset-x-0 rounded-2xl bg-primary-dark"
                    style={{ bottom: 0, height: 52 }}
                  />
                  {/* face: bright, drops down 4px on press to cover the base */}
                  <View
                    className="absolute inset-x-0 items-center justify-center rounded-2xl bg-primary"
                    style={{ top: pressed ? 4 : 0, height: 52 }}
                  >
                    <Text className="text-base font-semibold text-white">
                      Start review
                    </Text>
                  </View>
                </View>
              )}
            </Pressable>
          </View>
        </Animated.View>

        {/* stats row */}
        <Animated.View entering={FadeInDown.delay(90).duration(450)}>
          <View className="mt-4 flex-row">
            <View
              className="mr-2 flex-1 rounded-2xl border border-line bg-white p-5"
              style={blockShadow}
            >
              <Text className="text-3xl font-bold text-ink">{wordCount}</Text>
              <Text className="mt-1 text-xs font-medium text-muted">Words saved</Text>
            </View>
            <View
              className="ml-2 flex-1 rounded-2xl border border-line bg-white p-5"
              style={blockShadow}
            >
              <Text className="text-3xl font-bold text-ink">5</Text>
              <Text className="mt-1 text-xs font-medium text-muted">Day streak</Text>
            </View>
          </View>
        </Animated.View>

        {/* daily goal */}
        <Animated.View entering={FadeInDown.delay(180).duration(450)}>
          <View
            className="mt-4 rounded-2xl border border-line bg-white p-5"
            style={blockShadow}
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-semibold text-ink">Daily goal</Text>
              <Text className="text-sm font-semibold text-primary">40%</Text>
            </View>
            <View className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
              <View
                className="h-1.5 rounded-full bg-primary"
                style={{ width: "40%" }}
              />
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
